"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var commands_1 = __importDefault(require("./commands"));
exports.default = (function () {
    console.log(chalk_1.default.green("Hello Jarvis!"));
    console.info(commands_1.default.parse(process.argv).opts());
});
