"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const PORT = 5000;
const db_1 = require("./config/db");
const routes_1 = __importDefault(require("./modeules/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    return res.json({
        message: "welcome"
    });
});
db_1.pool.connect()
    .then(() => {
    console.log("Database connected");
})
    .catch((err) => {
    console.error("Database connection failed", err);
});
app.use("/api", routes_1.default);
app.listen(PORT, () => {
    console.log(`server connect to ${PORT}`);
});
//# sourceMappingURL=app.js.map