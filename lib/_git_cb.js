"use strict";
/**
 * create branch
 */
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
var inquirer_1 = __importDefault(require("inquirer"));
var simple_git_1 = __importDefault(require("./simple-git"));
var runGitConfig = function (branchName, desc) {
    return new Promise(function (resolve, reject) {
        child_process_1.exec("git config branch." + branchName + ".description " + desc, function (err) {
            if (err) {
                reject();
            }
            else {
                resolve();
            }
        });
    });
};
var action = function () { return __awaiter(void 0, void 0, void 0, function () {
    var branchCodeQuestion, branchTypeQuestion, branchOriginQustion, branchDescQustion, _a, branchCode, branchType, branchOrigin, branchDesc, branchName, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                branchCodeQuestion = {
                    type: "input",
                    name: "branchCode",
                    message: "Please input branch code",
                    validate: function (input) {
                        return (/^[0-9a-zA-Z_-]{1,}$/.test(input) ||
                            "invalid branch code(1-9a-zA-z_-)");
                    },
                };
                branchTypeQuestion = {
                    type: "rawlist",
                    name: "branchType",
                    message: "Please select a branch type",
                    choices: ["feat", "fix", "other"],
                    default: "feat",
                };
                branchOriginQustion = {
                    type: "input",
                    name: "branchOrigin",
                    message: "Please input branch origin",
                    validate: function (input) { return !!input || "branch origin required"; },
                    default: "master",
                };
                branchDescQustion = {
                    type: "input",
                    name: "branchDesc",
                    message: "Please input branch description",
                };
                return [4 /*yield*/, inquirer_1.default.prompt([
                        branchCodeQuestion,
                        branchTypeQuestion,
                        branchOriginQustion,
                        branchDescQustion,
                    ])];
            case 1:
                _a = _b.sent(), branchCode = _a.branchCode, branchType = _a.branchType, branchOrigin = _a.branchOrigin, branchDesc = _a.branchDesc;
                branchName = branchCode;
                if (["feat", "fix"].includes(branchType)) {
                    branchName = (branchType + "_" + branchCode).replace(/-/g, "_");
                }
                return [4 /*yield*/, simple_git_1.default.checkoutBranch(branchName, "origin/" + branchOrigin)];
            case 2:
                _b.sent();
                if (!branchDesc) return [3 /*break*/, 4];
                return [4 /*yield*/, runGitConfig(branchName, branchDesc)];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                console.log("" + chalk_1.default.green(branchName + " created."));
                return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                console.log(err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var cb = new commander_1.Command("cb")
    .description(chalk_1.default.green("jvs cb") + " will help you create a new branch from master and mark it with description.")
    .action(action);
exports.default = cb;
