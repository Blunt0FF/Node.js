import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define('User', {
    //Если хотите добавить какое то поле в таблицу, необходимо описать желаемое поле в данном объекте
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //Например, хотим добавить поле username, надо описать его тип, может ли он быть null и тд
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Users',
    timestamps: false
})

export default User