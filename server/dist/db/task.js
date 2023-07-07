"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const sequelize_1 = require("sequelize");
class Task extends sequelize_1.Model {
}
Task.init({
    title: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        defaultValue: ""
    },
    done: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    priority: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    deadline: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: null
    },
    creation_date: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: new Date()
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: db_1.default,
    timestamps: false,
    tableName: "task"
});
exports.default = Task;
//# sourceMappingURL=task.js.map