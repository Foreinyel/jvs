import { Command } from "commander";
import openFactory, { OpenTarget } from "./open";

interface OpenOptions {
  a?: string;
  s?: string;
}

const action = async (target: string, options: OpenOptions) => {
  openFactory(OpenTarget.ALL).run({ target, ...options });
};

const open = new Command("open")
  .arguments("[target]")
  .description("short cut for opening websites, projects and files with apps", {
    target: "url, path_to_folder, path_to_file or a short name of them",
  })
  .option("-s <name>", "save short name for the open target")
  .option("-a <app>", "the app you want to use to open target")
  .action(action);

export default open;
