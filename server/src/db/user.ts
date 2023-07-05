import { DataTypes, Model } from "sequelize";
import sequelize from "./db";

interface IUser {
    id: number | null;
    username: string;
    email: string;
    password_hash: string;
    last_connection: Date;
    creation_date : Date;
}

class User extends Model<IUser>{}

User.init(
    {
        id: {type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, allowNull: false, autoIncrement: true},
        username: {type: DataTypes.STRING(255), allowNull: false, unique: true},
        email: {type: DataTypes.STRING(255), allowNull: false, unique: false},
        password_hash: {type: DataTypes.STRING(255), allowNull: false},
        last_connection: {type: DataTypes.DATE, allowNull: false, defaultValue : DataTypes.NOW},
        creation_date : {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW},
    },
    {
        sequelize,
        timestamps : false,
        tableName: "user",
    }
);

export default User;