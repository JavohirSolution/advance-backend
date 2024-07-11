"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)({}));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'static')));
app.use((0, cookie_parser_1.default)());
app.use((0, express_fileupload_1.default)({}));
dotenv_1.default.config();
// Routes
const user_route_1 = __importDefault(require("./routes/user.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const post_route_1 = __importDefault(require("./routes/post.route"));
// Use Routes
app.use("/api/auth", auth_route_1.default);
app.use("/api/user", user_route_1.default);
app.use("/api/post", post_route_1.default);
app.use(error_middleware_1.default);
const PORT = process.env.PORT || 8000;
(0, db_1.default)();
app.listen(PORT, () => console.log(`[server]: Server is running on port ${PORT}`));
