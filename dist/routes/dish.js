"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dish_controller_1 = require("../controllers/dish.controller");
var auth_1 = require("../middleware/auth");
var router = express_1.default.Router();
router.get('/dish/:category', dish_controller_1.getDishesByCategory);
router.get('/dish/:name', dish_controller_1.getDishByName);
router.post('/dish', auth_1.auth, dish_controller_1.postDish);
router.put('/dish/:name', auth_1.auth, dish_controller_1.updateDish);
router.delete('/dishes/:name', auth_1.auth, dish_controller_1.deleteDish);
exports.default = router;
//# sourceMappingURL=dish.js.map