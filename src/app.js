"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bodyParser = __importStar(require("body-parser"));
var message_1 = __importDefault(require("./route/message"));
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var message_2 = require("./models/message");
var port = process.env.PORT || 3000;
var database = process.env.RDS_DB_NAME;
var user = process.env.RDS_USERNAME;
var host = process.env.RDS_HOSTNAME;
var password = process.env.RDS_PASSWORD;
var dbPort = process.env.RDS_PORT ? parseInt(process.env.RDS_PORT) : 5432;
function start() {
    return __awaiter(this, void 0, void 0, function () {
        var app, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    app = express_1.default();
                    app.use(bodyParser.json());
                    app.use('/message', message_1.default);
                    _a = app.locals;
                    return [4 /*yield*/, connectToPostgres()];
                case 1:
                    _a.db = _b.sent();
                    return [4 /*yield*/, startServer(app)];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function connectToPostgres() {
    return __awaiter(this, void 0, void 0, function () {
        var connection, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, typeorm_1.createConnection({
                            type: 'postgres',
                            host: host,
                            port: dbPort,
                            username: user,
                            password: password,
                            database: database,
                            entities: [message_2.Message]
                        })];
                case 1:
                    connection = _a.sent();
                    return [4 /*yield*/, connection.synchronize()];
                case 2:
                    _a.sent();
                    console.log('Connection to postgres was succesful');
                    return [2 /*return*/, connection];
                case 3:
                    err_1 = _a.sent();
                    console.log('Could not connect to postgres');
                    console.log(err_1);
                    process.exit(-1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function startServer(app) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            app.get('/', function (req, res) {
                res.send("Hello from express server");
            });
            app.listen(port, function () {
                console.log("Server is running on port " + port + " ...");
            });
            return [2 /*return*/];
        });
    });
}
start();
