"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var commander_1 = require("commander");
var _ls_1 = __importDefault(require("./_ls"));
var _set_1 = __importDefault(require("./_set"));
var _code_1 = __importDefault(require("./_code"));
var _hot_1 = __importDefault(require("./_hot"));
var _open_1 = __importDefault(require("./_open"));
var _google_1 = __importDefault(require("./_google"));
var _git_sc_1 = __importDefault(require("./_git_sc"));
exports.default = (function () {
    var main = new commander_1.Command();
    main
        .version(require("../package.json").version)
        .description(chalk_1.default.green("jvs") + " is a friend and chamberlain to front-end engineers, helps you to manage workflow and improve efficiency. Also, it makes you coooooler in work.")
        .addCommand(_ls_1.default)
        .addCommand(_set_1.default)
        .addCommand(_code_1.default)
        .addCommand(_google_1.default)
        .addCommand(_hot_1.default)
        .addCommand(_open_1.default)
        .addCommand(_git_sc_1.default);
    main.parse(process.argv);
});
process.on("uncaughtException", function (e) {
    console.log(chalk_1.default.red("\n>> " + e.message + "\n"));
});
process.on("unhandledRejection", function (e) {
    console.log(chalk_1.default.red("\n>> " + e.message + "\n"));
});
