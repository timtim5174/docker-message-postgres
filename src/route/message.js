"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.post('/', function (req, res) {
    var db = res.app.locals.db;
    db.query("INSERT INTO messages(message, created_on) VALUES('" + req.body.message + "', '" + new Date().toISOString() + "');")
        .then(function (data) {
        res.send("Insert " + req.body.message + " into database");
    });
});
router.get('/', function (req, res) {
    var db = res.app.locals.db;
    db.query('Select * from messages')
        .then(function (data) {
        res.send(data.rows);
    }).catch(function (err) { return res.send(err); });
});
exports.default = router;
