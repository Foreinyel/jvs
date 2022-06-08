/**
 * yarn add batch
 */
import { Command } from "commander";
import chalk from "chalk";
import { exec } from "child_process";
import inquirer from "inquirer";

import git from "./simple-git";
import path from "path";

const runAdd = function (pkgs: string[]) {
  return new Promise((resolve, reject) => {
    exec(`yarn add ${pkgs.join(" ")}`, (err, data) => {
      if (err) {
        reject();
      } else {
        resolve("");
      }
    });
  });
};

const action = async (args: string[]) => {
  try {
    const all = !!args.find((item) => item === ".");

    const cwd = process.cwd();
    console.log(`🚀 ~ file: _add.ts ~ line 34 ~ action ~ cwd`, cwd);
    const pkgJson = require(path.resolve(cwd, "package.json"));
    const dependencies = Object.keys(pkgJson.dependencies || {});
    const devDependencies = Object.keys(pkgJson.devDependencies || {});
    const pkgs = new Set<string>([...dependencies, ...devDependencies]);
    console.log(`🚀 ~ file: _add.ts ~ line 39 ~ action ~ pkgs`, pkgs);
    if (all) {
      await runAdd(Array.from(pkgs));
    } else {
      const pkgArr: string[] = [];
      pkgs.forEach((item) => {
        for (let arg of args) {
          if (new RegExp(arg).test(item)) {
            pkgArr.push(item);
          }
        }
      });
      if (pkgArr.length) {
        await runAdd(pkgArr);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

const add = new Command("add")
  .arguments("<package_name...>")
  .description(
    `${chalk.green(
      "jvs add"
    )} will help you batch add packages in dependencies and devDependencies with yarn.`,
    {
      package_name: `\`.\` will be all. Regexp supported`,
    }
  )
  .action(action);

export default add;
