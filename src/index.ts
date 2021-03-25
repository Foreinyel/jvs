import chalk from "chalk";
import program from "./commands";

export default () => {
  console.log(chalk.green("Hello Jarvis!"));
  console.info(program.parse(process.argv).opts());
};
