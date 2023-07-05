import sequelize from "./db";
import { DataTypes, Model } from "sequelize";

interface ITask {
    id: number | null;
    title: string;
    description: string;
    done: boolean;
    priority: number;
    deadline: Date | null;
    creation_date: Date | null;
    user_id: number;
}

class Task extends Model<ITask> { }

Task.init(
    {
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: DataTypes.TEXT,
            defaultValue: ""
        },
        done: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        priority: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        deadline: {
            type: DataTypes.DATE,
            defaultValue: null
        },
        creation_date: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        tableName: "task"
    }
);

export default Task;