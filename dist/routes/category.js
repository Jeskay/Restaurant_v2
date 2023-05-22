"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = require("../middleware/auth");
var category_controller_1 = require("../controllers/category.controller");
var router = express_1.default.Router();
router.get('/category', category_controller_1.getCategories);
router.post('/category/:name', auth_1.auth, category_controller_1.postCategory);
router.delete('/category/:name', auth_1.auth, category_controller_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=category.js.map