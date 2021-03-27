"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var config_1 = require("./config");
var assert_1 = require("assert");
var chalk_1 = __importDefault(require("chalk"));
var action = function (args, _a) {
    if (args === void 0) { args = "."; }
    var w = _a.w, p = _a.p;
    assert_1.strict(!w || !p, "Sir, you should not specify `w` and `p` at the same time.");
    config_1.setWorkspaceAndProject(p ? config_1.IConfigKey.PROJECT : config_1.IConfigKey.WORKSPACE, args);
};
var set = new commander_1.Command("set")
    .arguments("[path]")
    .description("Set path as Workspace or Project, by default it would be set as " + chalk_1.default.green("Workspace") + ". A workspace contains multiple projects. See more with " + chalk_1.default.blue("jvs set -h") + ".", {
    path: "needs a absolute path, however `.` and empty value represent current path",
})
    .option("-w", "set path as Workspace")
    .option("-p", "set path as Project")
    .action(action);
exports.default = set;
