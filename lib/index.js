"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var commander_1 = require("commander");
var _ls_1 = __importDefault(require("./_ls"));
var _set_1 = __importDefault(require("./_set"));
// import open from "./_open";
var _code_1 = __importDefault(require("./_code"));
exports.default = (function () {
    var main = new commander_1.Command();
    main
        .description(chalk_1.default.green("jvs") + " is a friend and chamberlain to front-end engineers, helps you to manage workflow and improve efficiency. Also, it makes you coooooler in work.")
        // .option("-h, --help", "Display help for command")
        .addCommand(_ls_1.default)
        .addCommand(_set_1.default)
        // .addCommand(go)
        .addCommand(_code_1.default);
    // console.log(chalk.green("Hello Jarvis!"));
    main.parse(process.argv);
});
process.on("uncaughtException", function (e) {
    console.log(chalk_1.default.red("\n"));
    console.log(chalk_1.default.red(">> " + e.message));
    console.log(chalk_1.default.red("\n"));
});
process.on("unhandledRejection", function (e) {
    console.log(chalk_1.default.red("\n"));
    console.log(chalk_1.default.red(">> " + e.message));
    console.log(chalk_1.default.red("\n"));
});
