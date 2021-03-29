import { Command } from "commander";
import { findProject, FoundLikePath, padEnd } from "./utils";
import { getWorkspaceAndProject, IConfigKey } from "./config";
import chalk from "chalk";
import { Table } from "console-table-printer";
export interface ILsOptions {
  w: boolean;
  p: boolean;
}

const printWorkspace = async (name: string) => {
  console.log(`\n${chalk.bold("Workspaces")}:\n`);
  const workspaces = await getWorkspaceAndProject(IConfigKey.WORKSPACE);
  const filtered = workspaces.filter(
    (item) => !name || item.indexOf(name) >= 0
  );
  if (filtered.length > 0) {
    const table = new Table({
      columns: [
        { name: "index", alignment: "left" },
        { name: "workspace", alignment: "left", color: "green" },
      ],
    });
    const rows = filtered.map((item, index) => {
      return {
        index,
        workspace: item,
      };
    });
    table.addRows(rows);
    table.printTable();
  } else {
    console.log(
      name
        ? `${chalk.red(`no workspaces found with filter: ${name}`)}`
        : `${chalk.red(`no workspaces found`)}`
    );
  }
};

const printProject = async (name: string) => {
  const paths = await findProject();

  const filtered = (paths as Array<FoundLikePath>).filter(
    (item) => item.project && (!name || item.project.indexOf(name) >= 0)
  );
  console.log(`\n${chalk.bold("Projects")}:\n`);

  if (filtered.length > 0) {
    const projectTable = new Table({
      columns: [
        { name: "index", alignment: "left" },
        { name: "project_name", alignment: "left", color: "green" },
        { name: "path", alignment: "left" },
      ],
    });
    const rows = filtered.map((item, index) => {
      return {
        index,
        project_name: item.project,
        path: item.path,
      };
    });
    projectTable.addRows(rows);
    projectTable.printTable();
  } else {
    console.log(
      name
        ? `${chalk.red(`no projects found with filter: ${name}`)}`
        : `${chalk.red(`no projects found`)}`
    );
  }
};

const action = async (name: string = "", opts: ILsOptions) => {
  if (opts.w && !opts.p) {
    await printWorkspace(name);
  } else if (opts.p && !opts.w) {
    await printProject(name);
  } else {
    await printWorkspace(name);
    await printProject(name);
  }
};

const ls = new Command("ls")
  .arguments("[name]")
  .description("list workspaces and projects", {
    name: "use to filter results",
  })
  .option("-w", "list all workspaces")
  .option("-p", "list all projects")
  .action(action);

export default ls;
