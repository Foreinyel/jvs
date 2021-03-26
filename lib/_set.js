"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var set = new commander_1.Command("set")
    .option("-w [path]", "set as a workspace")
    .option("-p [path]", "set as a project")
    .action(function (options) {
    console.log("\uD83D\uDE80 ~ file: _ls.ts ~ line 4 ~ ls ~ options", options);
});
exports.default = set;
