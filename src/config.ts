import fs from "fs";
const os = require("os");
import { cosmiconfig } from "cosmiconfig";
import { strict as assert } from "assert";
const HomePath = os.homedir();

const ConfigFilePath = `${HomePath}/.jvs.json`;

export enum IConfigKey {
  WORKSPACE = "workspace",
}

export interface IConfig {
  [IConfigKey.WORKSPACE]?: string[];
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
    assert(fs.existsSync(value), "directory not exists");
    config[key] = config[key]
      ? !config[key]!.includes(value)
        ? [...config[key]!, value]
        : config[key]
      : [value];
  }

  saveConfig(config);
};

const convertPath = (_path: string) => {
  assert(!!_path, "Sir, path of your workspace can't be null!");
  const path = _path === "." ? process.cwd() : _path;
  assert(fs.existsSync(_path), "Sir, path of your workspace dose not exists!");
  return path;
};

export const setWorkspace = async (_path: string) => {
  const path = convertPath(_path);
  const config = await loadConfig();
  config[IConfigKey.WORKSPACE] = config[IConfigKey.WORKSPACE]
    ? !config[IConfigKey.WORKSPACE]!.includes(path)
      ? [...config[IConfigKey.WORKSPACE]!, path]
      : config[IConfigKey.WORKSPACE]
    : [path];
  saveConfig(config);
};

export const getConfig = (key: keyof IConfig) => {};
