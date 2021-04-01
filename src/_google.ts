import { Command } from "commander";
import openFactory, { OpenTarget } from "./open";

const action = async (target: string | undefined) => {
  openFactory(OpenTarget.GOOGLE).run({ target });
};

const google = new Command("google")
  .arguments("[text]")
  .description("a short cut of opening google.com with searched results.", {
    text: "what you want to search",
  })
  .action(action);

export default google;
