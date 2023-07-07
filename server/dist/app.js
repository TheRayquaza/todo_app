"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: ".env" });
const db_1 = __importDefault(require("./db/db"));
const main_1 = __importDefault(require("./routes/main"));
if (process.env.LOG !== "true")
    console.log = (...args) => { };
const app = (0, express_1.default)();
db_1.default.authenticate()
    .then(() => console.log("Connection to db has been established successfully"))
    .catch((err) => console.error("Unable to connect to the database:", err));
db_1.default.sync({ force: process.env.RELOAD_DB === "true" });
// Main route
app.use(main_1.default);
app.listen(process.env.PORT, () => console.log(`Server is now running on port ${process.env.PORT}!`));
exports.default = app;
//# sourceMappingURL=app.js.map