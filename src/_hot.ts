/**
 * auto generate hot command including:
 * 1. quick enter projects
 */
import { Command } from "commander";
import fs from "fs";
import os from "os";
import chalk from "chalk";
import { BashProfile, HotCommandsPath, PLATFORM, HomePath } from "./consts";
import { findProject, FoundLikePath } from "./utils";

// darwin, linux
const padToBash = async (paths: string[]) => {
  for (let path of paths) {
    if (fs.existsSync(path)) {
      try {
        const content = fs.readFileSync(path);
        if (content.indexOf(HotCommandsPath) >= 0) {
          return path;
        }
        fs.appendFileSync(path, `source ${HotCommandsPath}`);
        return path;
      } catch {}
    }
  }
  return;
};

const createHotCommands = async () => {
  const paths = await findProject();

  const projects = (paths as Array<FoundLikePath>).filter(
    (item) => item.project
  );

  const hotCommands = projects.map(
    (item) => `alias go_${item.project.replace(/-/g, "_")}="cd ${item.path}"`
  );
  hotCommands.push(`alias go_home="cd ${HomePath}"`);

  const file = fs.openSync(HotCommandsPath, "w");

  fs.writeFileSync(file, hotCommands.join("\n"));

  // add .jvs_hot_commands to PATH
  const platform = os.platform();
  let bashPath;
  switch (platform) {
    case PLATFORM.LINUX:
      // bashPath = await padToBash(BashProfile[platform]);
      break;
    case PLATFORM.DARWIN:
      bashPath = await padToBash(BashProfile[platform]);
      break;
    case PLATFORM.WIN32:
      break;
    default:
  }

  if (bashPath) {
    console.log(
      chalk.green(`Added \`source ${HotCommandsPath}\` to ${bashPath}`)
    );
    console.log(
      chalk.green(
        `Go home directory and Run \`source ${bashPath}\` or reload Terminal to activate hot commands.`
      )
    );
  }
};

const action = async () => {
  await createHotCommands();
  console.log(
    chalk.green(
      `Successfully add hot commands to PATH. Try \`go_[project_name]\` for fun.`
    )
  );
};

const hot = new Command("hot")
  // .arguments("[command]")
  .description(
    "add hot commands to PATH so you don't have to use `cd [long_fuzzy_path_to_project]` to enter projects, instead, you could simply type `go_[prefix_of_project_name]` to enter any projects you've added to jvs.",
    {
      // command: "",
    }
  )
  .action(action);

export default hot;
