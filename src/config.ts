import { accessSync, constants, openSync, writeFileSync, existsSync } from "fs";
// const os = require("os");
// import os from "os";
import { cosmiconfig } from "cosmiconfig";
import chalk from "chalk";
import { convertPath } from "./utils";
import { ConfigFilePath } from "./consts";

export enum IConfigKey {
  WORKSPACE = "workspaces",
  PROJECT = "projects",
  SHORTCUT = "shortCuts",
}

export interface IShortCut {
  key: string;
  target?: string;
  opts?: string[];
}

export interface IConfig {
  [IConfigKey.WORKSPACE]?: string[];
  [IConfigKey.PROJECT]?: string[];
  [IConfigKey.SHORTCUT]?: Map<string, IShortCut>;
}

const isConfExists = () => {
  // return fs.existsSync(ConfigFilePath);
  try {
    if (!existsSync(ConfigFilePath)) {
      return false;
    }
    accessSync(ConfigFilePath, constants.R_OK | constants.W_OK);
    return true;
  } catch {
    console.log(chalk.red(`Sir, no access to ${ConfigFilePath}`));
  }
  return false;
};

const saveConfig = (data: IConfig) => {
  const file = openSync(ConfigFilePath, "w");
  const json: any = { ...data };
  if (data.shortCuts) {
    json.shortCuts = Array.from(data.shortCuts).reduce(
      (obj, [key, value]) => Object.assign(obj, { [key]: value }), // Be careful! Maps can have non-String keys; object literals can't.
      {}
    );
  }
  writeFileSync(file, JSON.stringify(json));
};

export const loadConfig: () => Promise<IConfig> = async () => {
  if (!isConfExists()) {
    return {};
  }
  const explorer = cosmiconfig("jvs");
  const result = await explorer.load(ConfigFilePath);
  if (result?.config[IConfigKey.SHORTCUT]) {
    result.config[IConfigKey.SHORTCUT] = new Map(
      Object.entries(result.config[IConfigKey.SHORTCUT])
    );
  }
  return result ? (result.config as IConfig) : {};
};

// export const setConfig = async (key: keyof IConfig, value: any) => {
//   assert(!!key, "Param required: key");
//   assert(!!value, "Param required: value");

//   const config = await loadConfig();
//   // 设置 workspace
//   if (key === IConfigKey.WORKSPACE) {
//     assert(fs.existsSync(value), "path not exists");
//     config[key] = config[key]
//       ? !config[key]!.includes(value)
//         ? [...config[key]!, value]
//         : config[key]
//       : [value];
//   }

//   saveConfig(config);
// };

// export const getConfig = async (key: keyof IConfig) => {
//   const config = await loadConfig();
// };

export const setWorkspaceAndProject = async (
  key: IConfigKey.PROJECT | IConfigKey.WORKSPACE,
  _path: string
) => {
  const path = convertPath(_path);
  const config = await loadConfig();
  config[key] = config[key]
    ? !config[key]!.includes(path)
      ? [...config[key]!, path]
      : config[key]
    : [path];
  saveConfig(config);
  console.log(chalk.green(`Successfully add ${path} to ${key}.`));
};

export const getWorkspaceAndProject = async (
  key: IConfigKey.WORKSPACE | IConfigKey.PROJECT
) => {
  const config = await loadConfig();
  return config[key] || [];
};

export const setShortCut = async (shortCut: IShortCut) => {
  const config = await loadConfig();
  const shortCuts = config[IConfigKey.SHORTCUT] || new Map<string, IShortCut>();
  shortCuts.set(shortCut.key, shortCut);

  config[IConfigKey.SHORTCUT] = shortCuts;
  saveConfig(config);
  console.log(
    chalk.green(
      `Successfully saved short cut, try \`jvs open ${shortCut.key}\``
    )
  );
};

export const getShortCut = async (key: string) => {
  const config = await loadConfig();
  const shortCuts = config[IConfigKey.SHORTCUT] || new Map<string, IShortCut>();
  return shortCuts.get(key);
};
