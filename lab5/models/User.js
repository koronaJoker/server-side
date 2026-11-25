import {DataTypes} from "sequelize"
import sequelize from "../config/database.js"


const User = sequelize.define('User', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },

    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role : {
        type: DataTypes.ENUM("user", "admin"),
        allowNull: false,
        defaultValue: "user"
    },
    lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
        }
    }, {
        tableName: "users",
        timestamps: true

})


export default User