/**
 * executing [path] with vscode
 */

import { Command } from "commander";
import chalk from "chalk";
import { spawn } from "child_process";
import { SPAWN_STATUS } from "./consts";
import * as utils from "./utils";
import inquirer from "inquirer";
import os from "os";

const runCdSync = async (_path: string) => {
  return new Promise((resolve) => {
    const cmd = spawn("cd", ["."], {
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
    await runCdSync(path);
  } else {
    const question = {
      type: "rawlist",
      name: "selectProject",
      message: "Which project do you want to go?",
      choices: path.map((item) => `${item.project}(${item.path})`),
      // rawList: {
      //   choices: path.map((item) => `${item.project}(${item.path})`),
      // },
    };
    const { selectProject } = await inquirer.prompt([question]);
    const matchedPath = selectProject.match(/\(.*\)$/i)[0];
    const selectedPath = matchedPath.replace("(", "").replace(")", "");
    await runCdSync(selectedPath);
  }
};

const go = new Command("go")
  .arguments("[project_name]")
  .description(
    `${chalk.green(
      "jvs go"
    )} will search project in all workspaces and projects by project (folder) name and enter it`,
    {
      project_name: `project folder name, \`.\` and empty value represent current path`,
    }
  )
  .action(action);
export default go;
