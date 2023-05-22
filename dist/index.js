"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var auth_1 = __importDefault(require("./routes/auth"));
var dish_1 = __importDefault(require("./routes/dish"));
var category_1 = __importDefault(require("./routes/category"));
var portion_1 = __importDefault(require("./routes/portion"));
var app = (0, express_1.default)();
app.use((0, express_fileupload_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(auth_1.default);
app.use(dish_1.default);
app.use(category_1.default);
app.use(portion_1.default);
app.listen(3030, function () {
    console.log('server started at http://localhost:3030');
});
//# sourceMappingURL=index.js.map