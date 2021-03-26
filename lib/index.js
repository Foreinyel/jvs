"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var commander_1 = require("commander");
var _ls_1 = __importDefault(require("./_ls"));
var _set_1 = __importDefault(require("./_set"));
var _open_1 = __importDefault(require("./_open"));
exports.default = (function () {
    var main = new commander_1.Command();
    main
        .option("-p", "test option")
        .addCommand(_ls_1.default)
        .addCommand(_set_1.default)
        .addCommand(_open_1.default);
    console.log(chalk_1.default.green("Hello Jarvis!"));
    main.parse(process.argv);
});
