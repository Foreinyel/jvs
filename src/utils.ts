import fs from "fs";
import path from "path";
import { strict as assert } from "assert";
// import { ConfigFilePath } from "./consts";
import { getWorkspaceAndProject, IConfigKey } from "./config";
import natural from "natural";
import { PLATFORM } from "./consts";
import chalk from "chalk";
import { ITerminal } from "./interface";

// import os from "os";

const { platform } = process;

// maybe it's better to use `fs.access` instead of `fs.existsSync`
export const isPathExist = (path: string) => fs.existsSync(path);

export const convertPath = (_path: string) => {
  assert(!!_path, "Sir, path can't be null!");
  const path = _path === "." ? process.cwd() : _path;
  assert(fs.existsSync(_path), `Sir, path(${_path}) dose not exists!`);
  return path;
};

export interface FoundLikePath {
  workspace?: string;
  project: string;
  path: string;
  closely?: number;
}

const distinctFoundResults = (data: Array<FoundLikePath>) => {
  const map = new Map<string, FoundLikePath>();
  data.forEach((item) => map.set(item.path, item));
  return Array.from(map.values());
};

export const findProject = async (projectName?: string) => {
  const found: Array<FoundLikePath> = [];
  const workspaces = await getWorkspaceAndProject(IConfigKey.WORKSPACE);

  if (workspaces.length > 0) {
    workspaces.forEach((item) => {
      const projectList = fs.readdirSync(item);
      projectList
        .filter((item) => item.indexOf(".") < 0)
        .forEach((prj) => {
          if (projectName) {
            const closely = natural.JaroWinklerDistance(prj, projectName);
            if (prj.indexOf(projectName) >= 0 && closely < 0.6) {
              found.push({
                workspace: item,
                project: prj,
                path: path.join(item, prj),
                closely: 0.9,
              });
            } else if (closely >= 0.6) {
              found.push({
                workspace: item,
                project: prj,
                path: path.join(item, prj),
                closely: closely < 0.6 ? 0.75 : closely,
              });
            }
          } else {
            found.push({
              workspace: item,
              project: prj,
              path: path.join(item, prj),
            });
          }
        });
    });
  }

  const projects = await getWorkspaceAndProject(IConfigKey.PROJECT);

  if (projects.length > 0) {
    projects.forEach((item) => {
      const pathSeped = item.split(path.sep);
      const prj = pathSeped[pathSeped.length - 1];
      if (projectName) {
        const closely = natural.JaroWinklerDistance(prj, projectName);
        if (prj.indexOf(projectName) >= 0 && closely < 0.6) {
          found.push({
            project: prj,
            path: item,
            closely: 0.9,
          });
        } else if (closely >= 0.6) {
          found.push({
            project: prj,
            path: item,
            closely,
          });
        }
      } else {
        found.push({
          project: prj,
          path: item,
        });
      }
    });
  }

  const exact = found.find((item) => item.closely === 1);

  return exact ? exact.path : distinctFoundResults(found);
};

export const padEnd = (text: string = "", length: number = 30) => {
  if (text.length > length) {
    return text.substr(0, length);
  }
  return text.padEnd(length, " ");
};

/**
 * @description 设置支持的平台
 * @param platforms 命令支持平台
 * @param name 命令名
 * @returns
 */
export const Support = <T extends ITerminal>(
  platforms: PLATFORM[],
  name: string
) => {
  return (target: T, _: string, descriptor: PropertyDescriptor) => {
    const originFunc = descriptor.value as Function;
    descriptor.value = (...args: any[]) => {
      assert(
        platforms.includes(platform as PLATFORM),
        `Sir, \`${name}\` not supported on ${platform}`
      );
      originFunc.apply(target, args);
      // if () {

      // } else {
      // console.log(
      //   chalk.red(`\n>> \`${name}\` not supported on ${platform}\n`)
      // );
      // assert(`Sir, \`${name}\` not supported on ${platform}`);
      // }
    };
  };
};

// export const Title = (title: string) => {
//   return <T extends { new (...args: any[]): {} }>(constructor: T) => {
//     return class extends constructor {
//       title = title;
//     };
//   };
// };
