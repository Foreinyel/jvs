/**
 * executing [path] with vscode
 */

import { Command } from "commander";
import chalk from "chalk";
import { spawn } from "child_process";
import { SPAWN_STATUS } from "./consts";
import * as utils from "./utils";
import inquirer from "inquirer";

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

const action = async (args: string = ".") => {
  const path =
    args === "." ? utils.convertPath(args) : await utils.findProject(args);

  if (typeof path === "string") {
    await runCodeSync(path);
  } else {
    const question = {
      type: "rawlist",
      name: "selectProject",
      message: "Which project do you want to open?",
      choices: path
        .sort((p1, p2) => p2.closely! - p1.closely!)
        .map((item) => `${item.project}(${item.path})`),
      // rawList: {
      //   choices: path.map((item) => `${item.project}(${item.path})`),
      // },
    };
    const { selectProject } = await inquirer.prompt([question]);
    const matchedPath = selectProject.match(/\(.*\)$/i)[0];
    const selectedPath = matchedPath.replace("(", "").replace(")", "");
    await runCodeSync(selectedPath);
  }
};

const vscode = new Command("code")
  .arguments("[project_name]")
  .description(
    `${chalk.green(
      "jvs code"
    )} will search project in all workspaces and projects by project (folder) name and open it with ${chalk.green(
      "visual studio code"
    )}`,
    {
      project_name: `project folder name, \`.\` and empty value represent current path`,
    }
  )
  .action(action);
export default vscode;
