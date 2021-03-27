import chalk from "chalk";
import { Command, description } from "commander";
import ls from "./_ls";
import set from "./_set";
import open from "./_open";

export default () => {
  const main = new Command();
  main
    .description(
      `${chalk.green(
        "jvs"
      )} is a friend and chamberlain to front-end engineers, helps you to manage workflow and improve efficiency. Also, it makes you coooooler in work.`
    )
    .addCommand(ls)
    .addCommand(set)
    .addCommand(open);
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
