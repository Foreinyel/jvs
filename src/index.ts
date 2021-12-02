import chalk from "chalk";
import { Command } from "commander";
import ls from "./_ls";
import set from "./_set";
import code from "./_code";
import hot from "./_hot";
import open from "./_open";
import google from "./_google";
import sc from "./_git_sc";

export default () => {
  const main = new Command();
  main
    .version(require("../package.json").version)
    .description(
      `${chalk.green(
        "jvs"
      )} is a friend and chamberlain to front-end engineers, helps you to manage workflow and improve efficiency. Also, it makes you coooooler in work.`
    )
    .addCommand(ls)
    .addCommand(set)
    .addCommand(code)
    .addCommand(google)
    .addCommand(hot)
    .addCommand(open)
    .addCommand(sc);
  main.parse(process.argv);
};

process.on("uncaughtException", (e) => {
  console.log(chalk.red(`\n>> ${e.message}\n`));
});

process.on("unhandledRejection", (e: any) => {
  console.log(chalk.red(`\n>> ${e.message}\n`));
});
