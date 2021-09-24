"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPAWN_STATUS = exports.BashProfile = exports.PLATFORM = exports.HotCommandsPath = exports.ConfigFilePath = exports.HomePath = void 0;
var os_1 = __importDefault(require("os"));
var path_1 = __importDefault(require("path"));
exports.HomePath = os_1.default.homedir();
exports.ConfigFilePath = "" + exports.HomePath + path_1.default.sep + ".jvs.json";
exports.HotCommandsPath = path_1.default.join(exports.HomePath, ".jvs_hot_commands");
var PLATFORM;
(function (PLATFORM) {
    PLATFORM["DARWIN"] = "darwin";
    PLATFORM["LINUX"] = "linux";
    PLATFORM["WIN32"] = "win32";
})(PLATFORM = exports.PLATFORM || (exports.PLATFORM = {}));
exports.BashProfile = (_a = {},
    _a[PLATFORM.DARWIN] = [
        path_1.default.join(exports.HomePath, ".zshenv"),
        path_1.default.join(exports.HomePath, ".bash_profile"),
        path_1.default.join(exports.HomePath, ".profile"),
        path_1.default.join(exports.HomePath, ".bashrc"),
        path_1.default.join(exports.HomePath, ".zshrc"),
    ],
    _a[PLATFORM.LINUX] = [
        path_1.default.join(exports.HomePath, ".bash_profile"),
        path_1.default.join(exports.HomePath, ".profile"),
        path_1.default.join(exports.HomePath, ".bashrc"),
    ],
    _a);
var SPAWN_STATUS;
(function (SPAWN_STATUS) {
    SPAWN_STATUS[SPAWN_STATUS["SPAWN_STATUS_OK"] = 0] = "SPAWN_STATUS_OK";
    SPAWN_STATUS[SPAWN_STATUS["SPAWN_STATUS_ERRER"] = 1] = "SPAWN_STATUS_ERRER";
})(SPAWN_STATUS = exports.SPAWN_STATUS || (exports.SPAWN_STATUS = {}));
