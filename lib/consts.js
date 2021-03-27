"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPAWN_STATUS = exports.ConfigFilePath = exports.HomePath = void 0;
var os_1 = __importDefault(require("os"));
exports.HomePath = os_1.default.homedir();
exports.ConfigFilePath = exports.HomePath + "/.jvs.json";
var SPAWN_STATUS;
(function (SPAWN_STATUS) {
    SPAWN_STATUS[SPAWN_STATUS["SPAWN_STATUS_OK"] = 0] = "SPAWN_STATUS_OK";
    SPAWN_STATUS[SPAWN_STATUS["SPAWN_STATUS_ERRIR"] = 1] = "SPAWN_STATUS_ERRIR";
})(SPAWN_STATUS = exports.SPAWN_STATUS || (exports.SPAWN_STATUS = {}));
