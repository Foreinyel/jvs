/**
 * create branch
 */

import { Command } from "commander";
import chalk from "chalk";
import { exec } from "child_process";
import inquirer from "inquirer";
import git from "./simple-git";

const runGitConfig: (branchName: string, desc: string) => Promise<void> = (
  branchName,
  desc
) => {
  return new Promise((resolve, reject) => {
    exec(`git config branch.${branchName}.description ${desc}`, (err) => {
      if (err) {
        reject();
      } else {
        resolve();
      }
    });
  });
};

const action = async () => {
  try {
    const branchCodeQuestion = {
      type: "input",
      name: "branchCode",
      message: "Please input branch code",
      validate: (input: string) => {
        return (
          /^[0-9a-zA-Z_-]{1,}$/.test(input) ||
          "invalid branch code(1-9a-zA-z_-)"
        );
      },
    };
    const branchTypeQuestion = {
      type: "rawlist",
      name: "branchType",
      message: "Please select a branch type",
      choices: ["feat", "fix", "other"],
      default: "feat",
    };
    const branchOriginQustion = {
      type: "input",
      name: "branchOrigin",
      message: "Please input branch origin",
      validate: (input: string) => !!input || "branch origin required",
      default: "master",
    };
    const branchDescQustion = {
      type: "input",
      name: "branchDesc",
      message: "Please input branch description",
    };
    const { branchCode, branchType, branchOrigin, branchDesc } =
      await inquirer.prompt([
        branchCodeQuestion,
        branchTypeQuestion,
        branchOriginQustion,
        branchDescQustion,
      ]);

    let branchName = branchCode;
    if (["feat", "fix"].includes(branchType)) {
      branchName = `${branchType}_${branchCode}`.replace(/-/g, "_");
    }
    await git.checkoutBranch(branchName, `origin/${branchOrigin}`);
    if (branchDesc) {
      await runGitConfig(branchName, branchDesc);
    }
    console.log(`${chalk.green(`${branchName} created.`)}`);
  } catch (err) {
    console.log(err);
  }
};

const cb = new Command("cb")
  .description(
    `${chalk.green(
      "jvs cb"
    )} will help you create a new branch from master and mark it with description.`
  )
  .action(action);

export default cb;
