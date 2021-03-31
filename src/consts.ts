import os from "os";
import path from "path";

export const HomePath = os.homedir();

export const ConfigFilePath = `${HomePath}${path.sep}.jvs.json`;

export const HotCommandsPath = path.join(HomePath, ".jvs_hot_commands");

export enum PLATFORM {
  DARWIN = "darwin",
  LINUX = "linux",
  WIN32 = "win32",
}

export const BashProfile = {
  [PLATFORM.DARWIN]: [
    path.join(HomePath, ".bash_profile"),
    path.join(HomePath, ".profile"),
    path.join(HomePath, ".bashrc"),
    path.join(HomePath, ".zshrc"),
  ],
  [PLATFORM.LINUX]: [
    path.join(HomePath, ".bash_profile"),
    path.join(HomePath, ".profile"),
    path.join(HomePath, ".bashrc"),
  ],
};

export enum SPAWN_STATUS {
  SPAWN_STATUS_OK,
  SPAWN_STATUS_ERRER,
}
