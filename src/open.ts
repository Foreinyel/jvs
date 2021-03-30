import { PLATFORM, SPAWN_STATUS } from "./consts";
import { Support } from "./utils";
import { spawn } from "child_process";
import { ITerminal, ITerminalOptions } from "./interface";

export enum OpenTarget {
  GOOGLE = "google",
}

const runGoogleAsync = async (url: string) => {
  return new Promise((resolve) => {
    const cmd = spawn("open", [url]);

    cmd.on("close", () => {
      resolve(SPAWN_STATUS.SPAWN_STATUS_OK);
    });
  });
};

class OpenGoogle implements ITerminal {
  @Support([PLATFORM.DARWIN], "open google")
  async run(options: ITerminalOptions) {
    const url = options.text
      ? `http://www.google.com/search?q=${encodeURIComponent(options.text)}`
      : "http://www.google.com";
    await runGoogleAsync(url);
  }
}

const OpenCache = new Map<OpenTarget, ITerminal>();

/**
 * @description OpenFactory
 * @param {OpenTarget} target
 */
export default (target: OpenTarget, force = false) => {
  let instance = OpenCache.get(target);
  if (force || !instance) {
    switch (target) {
      case OpenTarget.GOOGLE:
        instance = new OpenGoogle();
        break;
    }
    OpenCache.set(target, instance);
  }
  return instance;
};
