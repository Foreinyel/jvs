import { Command } from "commander";
import chalk from "chalk";
import dayjs from "dayjs";

import git from "./simple-git";

const action = async (target: string, source?: string) => {
  let targetOrigin = "origin";
  let sourceOrigin = "origin";

  let targetBranch = target;
  let sourceBranch: string | null | undefined = source;

  if (target?.indexOf("/") > 0) {
    const arr = target.split("/");
    targetOrigin = arr[0];
    targetBranch = arr[1];
  }

  if (source && source.indexOf("/") > 0) {
    const arr = source!.split("/");
    sourceOrigin = arr[0];
    sourceBranch = arr[1];
  }

  const status = await git.status();
  sourceBranch = source || status.current;
  const tmpBranchName =
    `merge_${sourceBranch}_into_${targetBranch}_${dayjs().format(
      "YYYYMMDDHHmm"
    )}`
      .replace(/-/g, "_")
      .replace(/\//g, "_");

  // 从target分支创建一个临时分支
  await git.checkoutBranch(tmpBranchName, `${targetOrigin}/${targetBranch}`);

  console.log(`Created a new branch: ${chalk.green(tmpBranchName)}`);

  await git.pull(targetOrigin, targetBranch);
  await git.pull(sourceOrigin, sourceBranch!);
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
