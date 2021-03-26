import { Command } from "commander";
import { setWorkspace, IConfigKey } from "./config";
import { strict as assert } from "assert";

export interface ISetOptions {
  w: string;
  p: string;
}

const action = ({ w, p }: ISetOptions) => {
  assert(!w || !p, "Sir, you should tell me exactly");

  if (w) {
    setWorkspace(w);
  }
};

const set = new Command("set")
  .description(
    "set directory as Workspace or Project, see more with `jvs set -h`"
  )
  .option("-w [path]", "set as a workspace")
  .option("-p [pre]", "setd d d asuuu333ct")
  .action(action);

export default set;
