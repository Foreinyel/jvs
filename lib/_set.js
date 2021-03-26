"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var config_1 = require("./config");
var assert_1 = require("assert");
var action = function (_a) {
    var w = _a.w, p = _a.p;
    assert_1.strict(!w || !p, "Sir, you should tell me exactly");
    if (w) {
        config_1.setWorkspace(w);
    }
};
var set = new commander_1.Command("set")
    .description("set directory as Workspace or Project, see more with `jvs set -h`")
    .option("-w [path]", "set as a workspace")
    .option("-p [pre]", "setd d d asuuu333ct")
    .action(action);
exports.default = set;
