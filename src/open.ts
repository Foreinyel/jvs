import { PLATFORM, SPAWN_STATUS } from "./consts";
import { Support } from "./utils";
import { spawn } from "child_process";
import { ITerminal, ITerminalOptions } from "./interface";

export enum OpenTarget {
  GOOGLE = "google",
  ALL = "all",
}

const runGoogleAsync = async (url: string) => {
  return new Promise((resolve) => {
    const cmd = spawn("open", [url]);
    cmd.on("close", () => {
      resolve(SPAWN_STATUS.SPAWN_STATUS_OK);
    });
  });
};

const runOpen: (
  target: string | undefined,
  opts: string[] | undefined
) => Promise<number> = async (target, opts) => {
  return new Promise((resolve) => {
    let status = 0;
    const options = [];
    if (target) {
      options.push(target!);
    }
    if (opts) {
      options.push(...opts);
    }
    const cmd = spawn("open", options);
    cmd.stdout.on("data", (data) => {
      // console.log(data.toString());
    });
    cmd.stderr.on("data", (data) => {
      // console.log(data.toString());
      status++;
    });
    cmd.on("close", () => {
      if (status === 0) {
        resolve(SPAWN_STATUS.SPAWN_STATUS_OK);
      } else {
        resolve(SPAWN_STATUS.SPAWN_STATUS_ERRER);
      }
    });
  });
};

class OpenGoogle implements ITerminal {
  @Support([PLATFORM.DARWIN], "open google")
  async run(options: ITerminalOptions) {
    const url = options.target
      ? `http://www.google.com/search?q=${encodeURIComponent(options.target)}`
      : "http://www.google.com";
    await runGoogleAsync(url);
  }
}

class OpenAll implements ITerminal {
  @Support([PLATFORM.DARWIN], "open all")
  async run(options: ITerminalOptions) {
    let opts: string[] | undefined = undefined;
    if (options.a) {
      // opts = `-a${options.a}`;
      opts = ["-a", options.a];
    }
    let status = await runOpen(options.target, opts);

    // 打开失败，尝试打开项目目录，打开app
    // status = await runOpen();

    // 如果打开的是网站，并且用户设置了保存快捷键
    // todo save to .jvs.json
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
      case OpenTarget.ALL:
        instance = new OpenAll();
        break;
    }
    OpenCache.set(target, instance);
  }
  return instance;
};
