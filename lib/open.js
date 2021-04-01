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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenTarget = void 0;
var consts_1 = require("./consts");
var utils_1 = require("./utils");
var child_process_1 = require("child_process");
var config_1 = require("./config");
var OpenTarget;
(function (OpenTarget) {
    OpenTarget["GOOGLE"] = "google";
    OpenTarget["ALL"] = "all";
})(OpenTarget = exports.OpenTarget || (exports.OpenTarget = {}));
var runGoogleAsync = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) {
                var cmd = child_process_1.spawn("open", [url]);
                cmd.on("close", function () {
                    resolve(consts_1.SPAWN_STATUS.SPAWN_STATUS_OK);
                });
            })];
    });
}); };
var runOpen = function (target, opts) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) {
                var status = 0;
                var options = [];
                if (target) {
                    options.push(target);
                }
                if (opts) {
                    options.push.apply(options, opts);
                }
                var cmd = child_process_1.spawn("open", options);
                cmd.stdout.on("data", function (data) {
                    // console.log(data.toString());
                });
                cmd.stderr.on("data", function (data) {
                    // console.log(data.toString());
                    status++;
                });
                cmd.on("close", function () {
                    if (status === 0) {
                        resolve(consts_1.SPAWN_STATUS.SPAWN_STATUS_OK);
                    }
                    else {
                        resolve(consts_1.SPAWN_STATUS.SPAWN_STATUS_ERRER);
                    }
                });
            })];
    });
}); };
var OpenGoogle = /** @class */ (function () {
    function OpenGoogle() {
    }
    OpenGoogle.prototype.run = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = options.target
                            ? "http://www.google.com/search?q=" + encodeURIComponent(options.target)
                            : "http://www.google.com";
                        return [4 /*yield*/, runGoogleAsync(url)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        utils_1.Support([consts_1.PLATFORM.DARWIN], "open google")
    ], OpenGoogle.prototype, "run", null);
    return OpenGoogle;
}());
var OpenAll = /** @class */ (function () {
    function OpenAll() {
    }
    OpenAll.prototype.run = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var opts, target, _target, status, _shortCut, shortCut;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        opts = undefined;
                        if (options.a) {
                            // opts = `-a${options.a}`;
                            opts = ["-a", options.a];
                        }
                        target = options.target;
                        _target = target === "." ? process.cwd() : target;
                        status = -1;
                        if (!_target) return [3 /*break*/, 3];
                        return [4 /*yield*/, config_1.getShortCut(_target)];
                    case 1:
                        _shortCut = _a.sent();
                        if (!_shortCut) return [3 /*break*/, 3];
                        return [4 /*yield*/, runOpen(_shortCut.target, _shortCut.opts)];
                    case 2:
                        status = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(status !== 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, runOpen(_target, opts)];
                    case 4:
                        status = _a.sent();
                        _a.label = 5;
                    case 5:
                        // 如果用户设置了保存快捷键
                        // todo save to .jvs.json
                        if (status === 0 && options.s) {
                            shortCut = {
                                key: options.s,
                                target: _target,
                                opts: opts,
                            };
                            config_1.setShortCut(shortCut);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        utils_1.Support([consts_1.PLATFORM.DARWIN], "open all")
    ], OpenAll.prototype, "run", null);
    return OpenAll;
}());
var OpenCache = new Map();
/**
 * @description OpenFactory
 * @param {OpenTarget} target
 */
exports.default = (function (target, force) {
    if (force === void 0) { force = false; }
    var instance = OpenCache.get(target);
    if (force || !instance) {
        switch (target) {
            case OpenTarget.GOOGLE:
                instance = new OpenGoogle();
                break;
            case OpenTarget.ALL:
                instance = new OpenAll();
                break;
        }
        OpenCache.set(target, instance);
    }
    return instance;
});
