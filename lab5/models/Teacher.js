import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Teacher = sequelize.define('Teacher', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
        },
    email: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: true,
        },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    academicDegree: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Teacher