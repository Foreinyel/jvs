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
exports.padEnd = exports.findProject = exports.convertPath = exports.isPathExist = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var assert_1 = require("assert");
// import { ConfigFilePath } from "./consts";
var config_1 = require("./config");
var natural_1 = __importDefault(require("natural"));
// import os from "os";
var isPathExist = function (path) { return fs_1.default.existsSync(path); };
exports.isPathExist = isPathExist;
var convertPath = function (_path) {
    assert_1.strict(!!_path, "Sir, path can't be null!");
    var path = _path === "." ? process.cwd() : _path;
    assert_1.strict(fs_1.default.existsSync(_path), "Sir, path(" + _path + ") dose not exists!");
    return path;
};
exports.convertPath = convertPath;
var distinctFoundResults = function (data) {
    var map = new Map();
    data.forEach(function (item) { return map.set(item.path, item); });
    return Array.from(map.values());
};
var findProject = function (projectName) { return __awaiter(void 0, void 0, void 0, function () {
    var found, workspaces, projects, exact;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                found = [];
                return [4 /*yield*/, config_1.getWorkspaceAndProject(config_1.IConfigKey.WORKSPACE)];
            case 1:
                workspaces = _a.sent();
                if (workspaces.length > 0) {
                    workspaces.forEach(function (item) {
                        var projectList = fs_1.default.readdirSync(item);
                        projectList
                            .filter(function (item) { return item.indexOf(".") < 0; })
                            .forEach(function (prj) {
                            if (projectName) {
                                var closely = natural_1.default.JaroWinklerDistance(prj, projectName);
                                if (closely >= 0.6) {
                                    found.push({
                                        workspace: item,
                                        project: prj,
                                        path: path_1.default.join(item, prj),
                                        closely: closely,
                                    });
                                }
                            }
                            else {
                                found.push({
                                    workspace: item,
                                    project: prj,
                                    path: path_1.default.join(item, prj),
                                });
                            }
                        });
                    });
                }
                return [4 /*yield*/, config_1.getWorkspaceAndProject(config_1.IConfigKey.PROJECT)];
            case 2:
                projects = _a.sent();
                if (projects.length > 0) {
                    projects.forEach(function (item) {
                        var pathSeped = item.split(path_1.default.sep);
                        var prj = pathSeped[pathSeped.length - 1];
                        if (projectName) {
                            var closely = natural_1.default.JaroWinklerDistance(prj, projectName);
                            if (closely >= 0.6) {
                                found.push({
                                    project: prj,
                                    path: item,
                                    closely: closely,
                                });
                            }
                        }
                        else {
                            found.push({
                                project: prj,
                                path: item,
                            });
                        }
                    });
                }
                exact = found.find(function (item) { return item.closely === 1; });
                return [2 /*return*/, exact ? exact.path : distinctFoundResults(found)];
        }
    });
}); };
exports.findProject = findProject;
var padEnd = function (text, length) {
    if (text === void 0) { text = ""; }
    if (length === void 0) { length = 30; }
    if (text.length > length) {
        return text.substr(0, length);
    }
    return text.padEnd(length, " ");
};
exports.padEnd = padEnd;
