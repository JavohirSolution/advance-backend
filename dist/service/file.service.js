"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class FileService {
    save(file) {
        try {
            const filename = (0, uuid_1.v4)() + ".jpg";
            const currentDir = __dirname;
            const staticDir = path_1.default.join(currentDir, "..", "static");
            const filePath = path_1.default.join(staticDir, filename);
            if (!fs_1.default.existsSync(staticDir)) {
                fs_1.default.mkdirSync(staticDir, { recursive: true });
            }
            file.mv(filePath, (err) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
            });
            return filename;
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = new FileService();
