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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.getDishByName = exports.deleteDish = exports.updateDish = exports.postDish = exports.getDishesByCategory = void 0;
var services_1 = require("../services");
var getDishesByCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dishes, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, services_1.databaseService.getDishes(req.params.category)];
            case 1:
                dishes = _a.sent();
                res.status(200).json(dishes);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(500).send("Server Error")];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getDishesByCategory = getDishesByCategory;
var postDish = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var picture, image_url, _a, dish, description, category, result, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                if (!req.files || Object.keys(req.files).length === 0 || req.files.image instanceof Array)
                    return [2 /*return*/, res.status(400).send('No images were uploaded')];
                picture = req.files.image;
                return [4 /*yield*/, services_1.cloudinaryService.uploadImage(picture.data)];
            case 1:
                image_url = _b.sent();
                _a = req.body, dish = _a.dish, description = _a.description, category = _a.category;
                return [4 /*yield*/, services_1.databaseService.createDish({
                        name: dish,
                        description: description,
                        image: image_url,
                        category: {
                            connect: {
                                name: category
                            }
                        }
                    })];
            case 2:
                result = _b.sent();
                res.status(200).json(result);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                return [2 /*return*/, res.status(500).send("Server Error")];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.postDish = postDish;
var updateDish = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, category, description, image_url, result, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, category = _a.category, description = _a.description;
                image_url = undefined;
                if (!!(!req.files || Object.keys(req.files).length === 0 || req.files.image instanceof Array)) return [3 /*break*/, 2];
                return [4 /*yield*/, services_1.cloudinaryService.updateImage(req.files.image.data)];
            case 1:
                image_url = _b.sent();
                _b.label = 2;
            case 2:
                console.log(image_url);
                return [4 /*yield*/, services_1.databaseService.updateDish(req.params.name, {
                        categoryName: category,
                        image: image_url,
                        description: description
                    })];
            case 3:
                result = _b.sent();
                res.status(200).json(result);
                return [3 /*break*/, 5];
            case 4:
                err_3 = _b.sent();
                return [2 /*return*/, res.status(500).send("Server Error")];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateDish = updateDish;
var deleteDish = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, services_1.databaseService.deleteDish(req.params.name)];
            case 1:
                result = _a.sent();
                if (!result.image) return [3 /*break*/, 3];
                return [4 /*yield*/, services_1.cloudinaryService.deleteImage(result.image)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                res.status(200).json(result);
                return [3 /*break*/, 5];
            case 4:
                err_4 = _a.sent();
                return [2 /*return*/, res.status(500).send("Server Error")];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteDish = deleteDish;
var getDishByName = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dish, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, services_1.databaseService.getDish(req.params.name)];
            case 1:
                dish = _a.sent();
                res.status(200).json(dish);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                return [2 /*return*/, res.status(500).send("Server Error")];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getDishByName = getDishByName;
//# sourceMappingURL=dish.controller.js.map