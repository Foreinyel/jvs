"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var ls = new commander_1.Command("ls").option("-a", "list all").action(function (options) {
    console.log("\uD83D\uDE80 ~ file: _ls.ts ~ line 4 ~ ls ~ options", options);
});
exports.default = ls;
