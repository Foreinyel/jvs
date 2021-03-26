import { Command } from "commander";

const set = new Command("set")
  .option("-w [path]", "set as a workspace")
  .option("-p [path]", "setd      d asct")
  .action((options) => {});

export default set;
