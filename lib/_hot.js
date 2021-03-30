"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
/**
 * auto generate hot command including:
 * 1. quick enter projects
 */
var commander_1 = require("commander");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var chalk_1 = __importDefault(require("chalk"));
var consts_1 = require("./consts");
var utils_1 = require("./utils");
var config_1 = require("./config");
var platform = process.platform;
// darwin, linux
var padToBash = function (paths) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, paths_1, path_2, content;
    return __generator(this, function (_a) {
        for (_i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
            path_2 = paths_1[_i];
            if (fs_1.default.existsSync(path_2)) {
                try {
                    content = fs_1.default.readFileSync(path_2);
                    if (content.indexOf(consts_1.HotCommandsPath) >= 0) {
                        return [2 /*return*/, path_2];
                    }
                    fs_1.default.appendFileSync(path_2, "source " + consts_1.HotCommandsPath);
                    return [2 /*return*/, path_2];
                }
                catch (_b) { }
            }
        }
        return [2 /*return*/];
    });
}); };
var HotCommand = /** @class */ (function () {
    function HotCommand() {
    }
    HotCommand.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var paths, workspaces, projects, hotCommands, goWorkspaces, file, bashPath, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, utils_1.findProject()];
                    case 1:
                        paths = _b.sent();
                        return [4 /*yield*/, config_1.getWorkspaceAndProject(config_1.IConfigKey.WORKSPACE)];
                    case 2:
                        workspaces = _b.sent();
                        projects = paths.filter(function (item) { return item.project; });
                        hotCommands = projects.map(function (item) { return "alias go_" + item.project + "=\"cd " + item.path + "\""; }
                        // (item) => `alias go_${item.project.replace(/-/g, "_")}="cd ${item.path}"`
                        );
                        hotCommands.push("alias go_home=\"cd " + consts_1.HomePath + "\"");
                        goWorkspaces = workspaces.map(function (item) {
                            var arr = item.split(path_1.default.sep);
                            return "alias go_" + arr[arr.length - 1] + "=\"cd " + item + "\"";
                        });
                        hotCommands = __spreadArray(__spreadArray([], hotCommands), goWorkspaces);
                        file = fs_1.default.openSync(consts_1.HotCommandsPath, "w");
                        fs_1.default.writeFileSync(file, hotCommands.join("\n"));
                        _a = platform;
                        switch (_a) {
                            case consts_1.PLATFORM.LINUX: return [3 /*break*/, 3];
                            case consts_1.PLATFORM.DARWIN: return [3 /*break*/, 5];
                            case consts_1.PLATFORM.WIN32: return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 8];
                    case 3: return [4 /*yield*/, padToBash(consts_1.BashProfile[platform])];
                    case 4:
                        bashPath = _b.sent();
                        return [3 /*break*/, 8];
                    case 5: return [4 /*yield*/, padToBash(consts_1.BashProfile[platform])];
                    case 6:
                        bashPath = _b.sent();
                        return [3 /*break*/, 8];
                    case 7: return [3 /*break*/, 8];
                    case 8:
                        if (bashPath) {
                            console.log(chalk_1.default.green("Added `source " + consts_1.HotCommandsPath + "` to " + bashPath));
                            console.log(chalk_1.default.green("Go home directory and Run `source " + bashPath + "` or reload Terminal to activate hot commands."));
                        }
                        console.log(chalk_1.default.green("Successfully add hot commands to PATH. Try `go_[project_name]` for fun."));
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        utils_1.Support([consts_1.PLATFORM.DARWIN, consts_1.PLATFORM.LINUX], "generate hot commands")
    ], HotCommand.prototype, "run", null);
    return HotCommand;
}());
var action = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new HotCommand().run()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var hot = new commander_1.Command("hot")
    // .arguments("[command]")
    .description("add hot commands to PATH so you don't have to use `cd [long_fuzzy_path_to_project]` to enter projects, instead, you could simply type `go_[prefix_of_project_name]` to enter any projects you've added to jvs.", {
// command: "",
})
    .action(action);
exports.default = hot;
