import { AuthenticationService } from "./auth";
import { CloudinaryService } from "./cloudinary";
import { DatabaseService } from "./database";

const databaseService = new DatabaseService();
const cloudinaryService = new CloudinaryService();
const authService = new AuthenticationService();

export {databaseService, cloudinaryService, authService};