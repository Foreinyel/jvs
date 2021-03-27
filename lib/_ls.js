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
var utils_1 = require("./utils");
var config_1 = require("./config");
var chalk_1 = __importDefault(require("chalk"));
var console_table_printer_1 = require("console-table-printer");
var printWorkspace = function (name) { return __awaiter(void 0, void 0, void 0, function () {
    var workspaces, filtered, table, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("\n" + chalk_1.default.bold("Workspaces") + ":\n");
                return [4 /*yield*/, config_1.getWorkspaceAndProject(config_1.IConfigKey.WORKSPACE)];
            case 1:
                workspaces = _a.sent();
                filtered = workspaces.filter(function (item) { return !name || item.indexOf(name) >= 0; });
                if (filtered.length > 0) {
                    table = new console_table_printer_1.Table({
                        columns: [
                            { name: "index", alignment: "left" },
                            { name: "workspace", alignment: "left", color: "green" },
                        ],
                    });
                    rows = filtered.map(function (item, index) {
                        return {
                            index: index,
                            workspace: item,
                        };
                    });
                    table.addRows(rows);
                    table.printTable();
                }
                else {
                    console.log(name
                        ? "" + chalk_1.default.red("no workspaces found with filter: " + name)
                        : "" + chalk_1.default.red("no workspaces found"));
                }
                return [2 /*return*/];
        }
    });
}); };
var printProject = function (name) { return __awaiter(void 0, void 0, void 0, function () {
    var paths, filtered, projectTable, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, utils_1.findProject()];
            case 1:
                paths = _a.sent();
                filtered = paths.filter(function (item) { return item.project && (!name || item.project.indexOf(name) >= 0); });
                console.log("\n" + chalk_1.default.bold("Projects") + ":\n");
                if (filtered.length > 0) {
                    projectTable = new console_table_printer_1.Table({
                        columns: [
                            { name: "index", alignment: "left" },
                            { name: "project_name", alignment: "left", color: "green" },
                            { name: "path", alignment: "left" },
                        ],
                    });
                    rows = filtered.map(function (item, index) {
                        return {
                            index: index,
                            project_name: item.project,
                            path: item.path,
                        };
                    });
                    projectTable.addRows(rows);
                    projectTable.printTable();
                }
                else {
                    console.log(name
                        ? "" + chalk_1.default.red("no projects found with filter: " + name)
                        : "" + chalk_1.default.red("no projects found"));
                }
                return [2 /*return*/];
        }
    });
}); };
var action = function (name, opts) {
    if (name === void 0) { name = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!opts.w) return [3 /*break*/, 2];
                    return [4 /*yield*/, printWorkspace(name)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 2:
                    if (!opts.p) return [3 /*break*/, 4];
                    return [4 /*yield*/, printProject(name)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 4: return [4 /*yield*/, printWorkspace(name)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, printProject(name)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
};
var ls = new commander_1.Command("ls")
    .arguments("[name]")
    .description("list workspaces and projects", {
    name: "use to filter results",
})
    .option("-w", "list all workspaces")
    .option("-p", "list all projects")
    .action(action);
exports.default = ls;
