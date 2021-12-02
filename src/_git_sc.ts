import { Command } from "commander";
import chalk from "chalk";
import dayjs from "dayjs";
import { spawn } from "child_process";
import inquirer from "inquirer";

import git from "./simple-git";

import { SPAWN_STATUS } from "./consts";
import * as utils from "./utils";
const runCodeSync = async (_path: string) => {
  return new Promise((resolve) => {
    const cmd = spawn("open", [".", "-a", "visual studio code"], {
      cwd: _path,
    });

    cmd.on("close", () => {
      resolve(SPAWN_STATUS.SPAWN_STATUS_OK);
    });
  });
};

const action = async (target: string, source?: string) => {
  const status = await git.status();
  const _sourceBranch = source || status.current;
  const tmpBranchName = `merge_${_sourceBranch}_into_${target}_${dayjs().format(
    "YYYYMMDDHH"
  )}`;

  // 从target分支创建一个临时分支
  await git.checkoutBranch(tmpBranchName, `origin/${target}`);

  console.log(`Created a new branch: ${chalk.green(tmpBranchName)}`);

  await git.pull("origin", target);
  await git.pull("origin", source);
};

const sc = new Command("sc")
  .arguments("<target_branch> [source_branch]")
  .description(
    `${chalk.green(
      "jvs sc"
    )} will create a new branch from target branch, then pull source branch into it. Used when there are conflicts merging source branch into target branch`,
    {
      target_branch: "target branch, required",
      source_branch: "source branch, optional",
    }
  )
  .action(action);
export default sc;
