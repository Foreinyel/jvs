"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var open = new commander_1.Command("open").option("[project]", "open with project name or project absolute path");
exports.default = open;
