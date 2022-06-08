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
/**
 * yarn add batch
 */
var commander_1 = require("commander");
var chalk_1 = __importDefault(require("chalk"));
var child_process_1 = require("child_process");
var path_1 = __importDefault(require("path"));
var runAdd = function (pkgs) {
    return new Promise(function (resolve, reject) {
        child_process_1.exec("yarn add " + pkgs.join(" "), function (err, data) {
            if (err) {
                reject();
            }
            else {
                resolve("");
            }
        });
    });
};
var action = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var all, cwd, pkgJson, dependencies, devDependencies, pkgs, pkgArr_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                all = !!args.find(function (item) { return item === "."; });
                cwd = process.cwd();
                pkgJson = require(path_1.default.resolve(cwd, "package.json"));
                dependencies = Object.keys(pkgJson.dependencies || {});
                devDependencies = Object.keys(pkgJson.devDependencies || {});
                pkgs = new Set(__spreadArray(__spreadArray([], dependencies), devDependencies));
                if (!all) return [3 /*break*/, 2];
                return [4 /*yield*/, runAdd(Array.from(pkgs))];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2:
                pkgArr_1 = [];
                pkgs.forEach(function (item) {
                    for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
                        var arg = args_1[_i];
                        if (new RegExp(arg).test(item)) {
                            pkgArr_1.push(item);
                        }
                    }
                });
                if (!pkgArr_1.length) return [3 /*break*/, 4];
                return [4 /*yield*/, runAdd(pkgArr_1)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                console.error(err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var add = new commander_1.Command("add")
    .arguments("<package_name...>")
    .description(chalk_1.default.green("jvs add") + " will help you batch add packages in dependencies and devDependencies with yarn.", {
    package_name: "`.` will be all. Regexp supported",
})
    .action(action);
exports.default = add;
