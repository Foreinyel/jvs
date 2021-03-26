import { Command } from "commander";

const ls = new Command("ls").option("-a", "list all").action((options) => {
  console.log(`🚀 ~ file: _ls.ts ~ line 4 ~ ls ~ options`, options);
});

export default ls;
