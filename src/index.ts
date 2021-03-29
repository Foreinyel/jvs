import chalk from "chalk";
import { Command, description, option } from "commander";
import ls from "./_ls";
import set from "./_set";
// import open from "./_open";
import code from "./_code";
import hot from "./_hot";
// import pkg from "../package.json";
export default () => {
  const main = new Command();
  main
    .version(require("../package.json").version)
    .description(
      `${chalk.green(
        "jvs"
      )} is a friend and chamberlain to front-end engineers, helps you to manage workflow and improve efficiency. Also, it makes you coooooler in work.`
    )
    // .option("-h, --help", "Display help for command")
    .addCommand(ls)
    .addCommand(set)
    // .addCommand(go)
    .addCommand(code)
    .addCommand(hot);
  // console.log(chalk.green("Hello Jarvis!"));
  main.parse(process.argv);
};

process.on("uncaughtException", (e) => {
  console.log(chalk.red("\n"));
  console.log(chalk.red(`>> ${e.message}`));
  console.log(chalk.red(`\n`));
});

process.on("unhandledRejection", (e: any) => {
  console.log(chalk.red("\n"));
  console.log(chalk.red(`>> ${e.message}`));
  console.log(chalk.red(`\n`));
});
