"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.post('/', function (req, res) {
    console.log('POST');
    res.send('POST: /message');
});
router.get('/', function (req, res) {
    console.log('GET');
    res.send('GET: /message');
});
exports.default = router;
