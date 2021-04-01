"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.getShortCut = exports.setShortCut = exports.getWorkspaceAndProject = exports.setWorkspaceAndProject = exports.loadConfig = exports.IConfigKey = void 0;
var fs_1 = require("fs");
// const os = require("os");
// import os from "os";
var cosmiconfig_1 = require("cosmiconfig");
var chalk_1 = __importDefault(require("chalk"));
var utils_1 = require("./utils");
var consts_1 = require("./consts");
var IConfigKey;
(function (IConfigKey) {
    IConfigKey["WORKSPACE"] = "workspaces";
    IConfigKey["PROJECT"] = "projects";
    IConfigKey["SHORTCUT"] = "shortCuts";
})(IConfigKey = exports.IConfigKey || (exports.IConfigKey = {}));
var isConfExists = function () {
    // return fs.existsSync(ConfigFilePath);
    try {
        if (!fs_1.existsSync(consts_1.ConfigFilePath)) {
            return false;
        }
        fs_1.accessSync(consts_1.ConfigFilePath, fs_1.constants.R_OK | fs_1.constants.W_OK);
        return true;
    }
    catch (_a) {
        console.log(chalk_1.default.red("Sir, no access to " + consts_1.ConfigFilePath));
    }
    return false;
};
var saveConfig = function (data) {
    var file = fs_1.openSync(consts_1.ConfigFilePath, "w");
    var json = __assign({}, data);
    if (data.shortCuts) {
        json.shortCuts = Array.from(data.shortCuts).reduce(function (obj, _a) {
            var _b;
            var key = _a[0], value = _a[1];
            return Object.assign(obj, (_b = {}, _b[key] = value, _b));
        }, // Be careful! Maps can have non-String keys; object literals can't.
        {});
    }
    fs_1.writeFileSync(file, JSON.stringify(json));
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
                if (result === null || result === void 0 ? void 0 : result.config[IConfigKey.SHORTCUT]) {
                    result.config[IConfigKey.SHORTCUT] = new Map(Object.entries(result.config[IConfigKey.SHORTCUT]));
                }
                return [2 /*return*/, result ? result.config : {}];
        }
    });
}); };
exports.loadConfig = loadConfig;
// export const setConfig = async (key: keyof IConfig, value: any) => {
//   assert(!!key, "Param required: key");
//   assert(!!value, "Param required: value");
//   const config = await loadConfig();
//   // 设置 workspace
//   if (key === IConfigKey.WORKSPACE) {
//     assert(fs.existsSync(value), "path not exists");
//     config[key] = config[key]
//       ? !config[key]!.includes(value)
//         ? [...config[key]!, value]
//         : config[key]
//       : [value];
//   }
//   saveConfig(config);
// };
// export const getConfig = async (key: keyof IConfig) => {
//   const config = await loadConfig();
// };
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
var setShortCut = function (shortCut) { return __awaiter(void 0, void 0, void 0, function () {
    var config, shortCuts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.loadConfig()];
            case 1:
                config = _a.sent();
                shortCuts = config[IConfigKey.SHORTCUT] || new Map();
                shortCuts.set(shortCut.key, shortCut);
                config[IConfigKey.SHORTCUT] = shortCuts;
                saveConfig(config);
                console.log(chalk_1.default.green("Successfully saved short cut, try `jvs open " + shortCut.key + "`"));
                return [2 /*return*/];
        }
    });
}); };
exports.setShortCut = setShortCut;
var getShortCut = function (key) { return __awaiter(void 0, void 0, void 0, function () {
    var config, shortCuts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.loadConfig()];
            case 1:
                config = _a.sent();
                shortCuts = config[IConfigKey.SHORTCUT] || new Map();
                return [2 /*return*/, shortCuts.get(key)];
        }
    });
}); };
exports.getShortCut = getShortCut;
