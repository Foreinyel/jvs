import { Command } from "commander";
import openFactory, { OpenTarget } from "./open";

interface OpenOptions {
  a?: string;
  s?: string;
}

const action = async (target: string, options: OpenOptions) => {
  console.log(`🚀 ~ file: _open.ts ~ line 10 ~ action ~ options`, options);
  console.log(`🚀 ~ file: _open.ts ~ line 10 ~ action ~ target`, target);

  openFactory(OpenTarget.ALL).run({ target, ...options });
};

const open = new Command("open")
  .arguments("[target]")
  .description(
    "short cut for opening websites, projects and files with detault apps",
    {
      target: "url, path_to_folder, path_to_file or a short name of them",
    }
  )
  .option("-s <name>", "save short name for the open target")
  .option("-a <app>", "the app you want to use to open target")
  .action(action);

export default open;
