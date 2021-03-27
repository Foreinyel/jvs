"use strict";
/**
 * executing [path] with vscode
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var chalk_1 = __importDefault(require("chalk"));
var child_process_1 = require("child_process");
var consts_1 = require("./consts");
var utils = __importStar(require("./utils"));
var inquirer_1 = __importDefault(require("inquirer"));
var runCodeSync = function (_path) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) {
                var cmd = child_process_1.spawn("code", ["."], {
                    cwd: _path,
                });
                cmd.on("close", function () {
                    resolve(consts_1.SPAWN_STATUS.SPAWN_STATUS_OK);
                });
            })];
    });
}); };
var action = function (args) {
    if (args === void 0) { args = "."; }
    return __awaiter(void 0, void 0, void 0, function () {
        var path, _a, question, selectProject, matchedPath, selectedPath;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(args === ".")) return [3 /*break*/, 1];
                    _a = utils.convertPath(args);
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, utils.findProject(args)];
                case 2:
                    _a = _b.sent();
                    _b.label = 3;
                case 3:
                    path = _a;
                    if (!(typeof path === "string")) return [3 /*break*/, 5];
                    return [4 /*yield*/, runCodeSync(path)];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 5:
                    question = {
                        type: "rawlist",
                        name: "selectProject",
                        message: "Which project do you want to open?",
                        choices: path.map(function (item) { return item.project + "(" + item.path + ")"; }),
                        // rawList: {
                        //   choices: path.map((item) => `${item.project}(${item.path})`),
                        // },
                    };
                    return [4 /*yield*/, inquirer_1.default.prompt([question])];
                case 6:
                    selectProject = (_b.sent()).selectProject;
                    matchedPath = selectProject.match(/\(.*\)$/i)[0];
                    selectedPath = matchedPath.replace("(", "").replace(")", "");
                    return [4 /*yield*/, runCodeSync(selectedPath)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
};
var vscode = new commander_1.Command("code")
    .arguments("[project_name]")
    .description(chalk_1.default.green("jvs code") + " will search project in all workspaces and projects by project (folder) name and open it with " + chalk_1.default.green("vscode") + ", it means to use this command you must install " + chalk_1.default.green("visual studio code") + " and install " + chalk_1.default.green("code") + " command in PATH first. See https://code.visualstudio.com/docs/editor/command-line for details.", {
    project_name: "project folder name, `.` and empty value represent current path",
})
    .action(action);
exports.default = vscode;
