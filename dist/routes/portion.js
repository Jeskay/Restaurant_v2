"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var portion_controller_1 = require("../controllers/portion.controller");
var auth_1 = require("../middleware/auth");
var router = express_1.default.Router();
router.get('/portion', portion_controller_1.getPortions);
router.get('/portion/:dish', portion_controller_1.getPortionsByDish);
router.post('/portion/:name', express_1.default.json(), auth_1.auth, portion_controller_1.postPortionsForDish);
router.delete('/portion/:id', auth_1.auth, portion_controller_1.deletePortionById);
exports.default = router;
//# sourceMappingURL=portion.js.map