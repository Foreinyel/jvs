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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var chalk_1 = __importDefault(require("chalk"));
var dayjs_1 = __importDefault(require("dayjs"));
var child_process_1 = require("child_process");
var simple_git_1 = __importDefault(require("./simple-git"));
var consts_1 = require("./consts");
var runCodeSync = function (_path) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) {
                var cmd = child_process_1.spawn("open", [".", "-a", "visual studio code"], {
                    cwd: _path,
                });
                cmd.on("close", function () {
                    resolve(consts_1.SPAWN_STATUS.SPAWN_STATUS_OK);
                });
            })];
    });
}); };
var action = function (target, source) { return __awaiter(void 0, void 0, void 0, function () {
    var status, _sourceBranch, tmpBranchName;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, simple_git_1.default.status()];
            case 1:
                status = _a.sent();
                _sourceBranch = source || status.current;
                tmpBranchName = "merge_" + _sourceBranch + "_into_" + target + "_" + dayjs_1.default().format("YYYYMMDDHH");
                // 从target分支创建一个临时分支
                return [4 /*yield*/, simple_git_1.default.checkoutBranch(tmpBranchName, "origin/" + target)];
            case 2:
                // 从target分支创建一个临时分支
                _a.sent();
                console.log("Created a new branch: " + chalk_1.default.green(tmpBranchName));
                return [4 /*yield*/, simple_git_1.default.pull("origin", target)];
            case 3:
                _a.sent();
                return [4 /*yield*/, simple_git_1.default.pull("origin", source)];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var sc = new commander_1.Command("sc")
    .arguments("<target_branch> [source_branch]")
    .description(chalk_1.default.green("jvs sc") + " will create a new branch from target branch, then pull source branch into it. Used when there are conflicts merging source branch into target branch", {
    target_branch: "target branch, required",
    source_branch: "source branch, optional",
})
    .action(action);
exports.default = sc;
