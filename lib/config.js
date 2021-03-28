"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkspaceAndProject = exports.setWorkspaceAndProject = exports.getConfig = exports.setConfig = exports.loadConfig = exports.IConfigKey = void 0;
var fs_1 = __importDefault(require("fs"));
// const os = require("os");
// import os from "os";
var cosmiconfig_1 = require("cosmiconfig");
var assert_1 = require("assert");
var chalk_1 = __importDefault(require("chalk"));
var utils_1 = require("./utils");
var consts_1 = require("./consts");
var IConfigKey;
(function (IConfigKey) {
    IConfigKey["WORKSPACE"] = "workspaces";
    IConfigKey["PROJECT"] = "projects";
})(IConfigKey = exports.IConfigKey || (exports.IConfigKey = {}));
var isConfExists = function () {
    return fs_1.default.existsSync(consts_1.ConfigFilePath);
};
var saveConfig = function (data) {
    var file = fs_1.default.openSync(consts_1.ConfigFilePath, "w");
    fs_1.default.writeFileSync(file, JSON.stringify(data));
};
var loadConfig = function () { return __awaiter(void 0, void 0, void 0, function () {
    var explorer, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!isConfExists()) {
                    return [2 /*return*/, {}];
                }
                explorer = cosmiconfig_1.cosmiconfig("jvs");
                return [4 /*yield*/, explorer.load(consts_1.ConfigFilePath)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result ? result.config : {}];
        }
    });
}); };
exports.loadConfig = loadConfig;
var setConfig = function (key, value) { return __awaiter(void 0, void 0, void 0, function () {
    var config;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                assert_1.strict(!!key, "Param required: key");
                assert_1.strict(!!value, "Param required: value");
                return [4 /*yield*/, exports.loadConfig()];
            case 1:
                config = _a.sent();
                // 设置 workspace
                if (key === IConfigKey.WORKSPACE) {
                    assert_1.strict(fs_1.default.existsSync(value), "path not exists");
                    config[key] = config[key]
                        ? !config[key].includes(value)
                            ? __spreadArray(__spreadArray([], config[key]), [value]) : config[key]
                        : [value];
                }
                saveConfig(config);
                return [2 /*return*/];
        }
    });
}); };
exports.setConfig = setConfig;
var getConfig = function (key) { return __awaiter(void 0, void 0, void 0, function () {
    var config;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.loadConfig()];
            case 1:
                config = _a.sent();
                console.log("\uD83D\uDE80 ~ file: config.ts ~ line 74 ~ getConfig ~ config", config);
                return [2 /*return*/];
        }
    });
}); };
exports.getConfig = getConfig;
var setWorkspaceAndProject = function (key, _path) { return __awaiter(void 0, void 0, void 0, function () {
    var path, config;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                path = utils_1.convertPath(_path);
                return [4 /*yield*/, exports.loadConfig()];
            case 1:
                config = _a.sent();
                config[key] = config[key]
                    ? !config[key].includes(path)
                        ? __spreadArray(__spreadArray([], config[key]), [path]) : config[key]
                    : [path];
                saveConfig(config);
                console.log(chalk_1.default.green("Successfully add " + path + " to " + key + "."));
                return [2 /*return*/];
        }
    });
}); };
exports.setWorkspaceAndProject = setWorkspaceAndProject;
var getWorkspaceAndProject = function (key) { return __awaiter(void 0, void 0, void 0, function () {
    var config;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.loadConfig()];
            case 1:
                config = _a.sent();
                return [2 /*return*/, config[key] || []];
        }
    });
}); };
exports.getWorkspaceAndProject = getWorkspaceAndProject;