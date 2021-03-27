import { Command } from "commander";
import { setWorkspaceAndProject, IConfigKey } from "./config";
import { strict as assert } from "assert";
import chalk from "chalk";

export interface ISetOptions {
  w: string;
  p: string;
}

const action = (args: string = ".", { w, p }: ISetOptions) => {
  assert(!w || !p, "Sir, you should not specify `w` and `p` at the same time.");
  setWorkspaceAndProject(p ? IConfigKey.PROJECT : IConfigKey.WORKSPACE, args);
};

const set = new Command("set")
  .arguments("[path]")
  .description(
    `Set path as Workspace or Project, by default it would be set as ${chalk.green(
      "Workspace"
    )}. A workspace contains multiple projects. See more with ${chalk.blue(
      "jvs set -h"
    )}`,
    {
      path:
        "needs a absolute path, however `.` and empty value will be set with `current path`",
    }
  )
  .option("-w", "set path as Workspace")
  .option("-p", "set path as Project")
  .action(action);

export default set;
