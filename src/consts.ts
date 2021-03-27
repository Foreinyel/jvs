import os from "os";

export const HomePath = os.homedir();

export const ConfigFilePath = `${HomePath}/.jvs.json`;

export enum SPAWN_STATUS {
  SPAWN_STATUS_OK,
  SPAWN_STATUS_ERRIR,
}
