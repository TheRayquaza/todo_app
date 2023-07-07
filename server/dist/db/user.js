"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("./db"));
class User extends sequelize_1.Model {
}
User.init({
    id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, primaryKey: true, allowNull: false, autoIncrement: true },
    username: { type: sequelize_1.DataTypes.STRING(255), allowNull: false, unique: true },
    email: { type: sequelize_1.DataTypes.STRING(255), allowNull: false, unique: false },
    password_hash: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    last_connection: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW },
    creation_date: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: db_1.default,
    timestamps: false,
    tableName: "user",
});
exports.default = User;
//# sourceMappingURL=user.js.map