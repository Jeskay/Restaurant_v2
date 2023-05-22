"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.cloudinaryService = exports.databaseService = void 0;
var auth_1 = require("./auth");
var cloudinary_1 = require("./cloudinary");
var database_1 = require("./database");
var databaseService = new database_1.DatabaseService();
exports.databaseService = databaseService;
var cloudinaryService = new cloudinary_1.CloudinaryService();
exports.cloudinaryService = cloudinaryService;
var authService = new auth_1.AuthenticationService();
exports.authService = authService;
//# sourceMappingURL=index.js.map