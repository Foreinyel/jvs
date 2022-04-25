/**
 * remove branches
 */
import { Command } from "commander";
import chalk from "chalk";
import { exec } from "child_process";
import inquirer from "inquirer";

import git from "./simple-git";

type BranchInfo = {
  name: string;
  description?: string;
};

const runGitBr: () => Promise<Array<BranchInfo>> = () => {
  return new Promise((resolve, reject) => {
    exec("git br", (err, data) => {
      if (err) {
        reject();
      } else {
        const branchList: Array<BranchInfo> = [];
        const rows = data.split("\n");
        if (rows.length) {
          rows.forEach((row) => {
            const _row = row
              .replace(/\x1b[^m]*m/g, "")
              .replace("* ", "")
              .trim();

            if (_row) {
              const firstBlankIndex = _row.indexOf(" ");

              if (firstBlankIndex > 0) {
                branchList.push({
                  name: _row.slice(0, firstBlankIndex),
                  description: _row.slice(firstBlankIndex + 1),
                });
              } else {
                branchList.push({
                  name: _row,
                });
              }
            }
          });
        }
        resolve(branchList);
      }
    });
  });
};

const action = async () => {
  try {
    const branchList = await runGitBr();
    console.log(
      `🚀 ~ file: _git_rb.ts ~ line 48 ~ action ~ branchList`,
      branchList
    );
    if (branchList.length) {
      const question = {
        type: "checkbox",
        name: "selectBranches",
        message: "select branches to remove",
        choices: branchList.map((item) =>
          !!item.description ? `${item.name} - ${item.description}` : item.name
        ),
      };
      const { selectBranches } = await inquirer.prompt([question]);
      console.log(
        `🚀 ~ file: _git_rb.ts ~ line 59 ~ action ~ selectBranches`,
        selectBranches
      );

      const selectedBranches = (selectBranches as string[]).map(
        (item) => item.split(" - ")[0]
      );
      console.log(
        `🚀 ~ file: _git_rb.ts ~ line 65 ~ action ~ selectedBranches`,
        selectedBranches
      );
      await git.deleteLocalBranches(selectedBranches);
      console.log(`${chalk.green("Branches removed successfully.")}`);
    }
  } catch (err) {
    console.error(err);
  }
};

const rb = new Command("rb")
  .description(
    `${chalk.green(
      "jvs rb"
    )} will help you batch remove local branches. To use this command, you should install git, git-br first.`
  )
  .action(action);

export default rb;
