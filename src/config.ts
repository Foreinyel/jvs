import fs from "fs";
// const os = require("os");
// import os from "os";
import { cosmiconfig } from "cosmiconfig";
import { strict as assert } from "assert";
import chalk from "chalk";
import { convertPath } from "./utils";
import { ConfigFilePath } from "./consts";

export enum IConfigKey {
  WORKSPACE = "workspaces",
  PROJECT = "projects",
}

export interface IConfig {
  [IConfigKey.WORKSPACE]?: string[];
  [IConfigKey.PROJECT]?: string[];
}

const isConfExists = () => {
  return fs.existsSync(ConfigFilePath);
};

const saveConfig = (data: IConfig) => {
  const file = fs.openSync(ConfigFilePath, "w");

  fs.writeFileSync(file, JSON.stringify(data));
};

export const loadConfig: () => Promise<IConfig> = async () => {
  if (!isConfExists()) {
    return {};
  }
  const explorer = cosmiconfig("jvs");
  const result = await explorer.load(ConfigFilePath);
  return result ? (result.config as IConfig) : {};
};

export const setConfig = async (key: keyof IConfig, value: any) => {
  assert(!!key, "Param required: key");
  assert(!!value, "Param required: value");

  const config = await loadConfig();
  // 设置 workspace
  if (key === IConfigKey.WORKSPACE) {
    assert(fs.existsSync(value), "path not exists");
    config[key] = config[key]
      ? !config[key]!.includes(value)
        ? [...config[key]!, value]
        : config[key]
      : [value];
  }

  saveConfig(config);
};

export const getConfig = async (key: keyof IConfig) => {
  const config = await loadConfig();
  console.log(`🚀 ~ file: config.ts ~ line 74 ~ getConfig ~ config`, config);
};

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
