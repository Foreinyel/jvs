import { Command } from "commander";
import openFactory, { OpenTarget } from "./open";

const action = async (text: string | undefined) => {
  openFactory(OpenTarget.GOOGLE).run({ text });
};

const google = new Command("google")
  .arguments("[text]")
  .description("a short cut of opening google.com with searched results.", {
    text: "what you want to search",
  })
  .action(action);

export default google;
