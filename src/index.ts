import chalk from "chalk";
import { Command } from "commander";
import ls from "./_ls";
import set from "./_set";
import open from "./_open";

export default () => {
  const main = new Command();
  main
    .option("-p", "test option")
    .addCommand(ls)
    .addCommand(set)
    .addCommand(open);
  console.log(chalk.green("Hello Jarvis!"));
  main.parse(process.argv);
};
