import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Course = sequelize.define('Course', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
         allowNull: false,
    },
    credits: {
        type: DataTypes.INTEGER, 
        validate: {
            min:1,
            max:12
        },
        allowNull: false
    },
    semester: {
        type: DataTypes.INTEGER,
        validate: {
            min:1,
            max: 8
        },
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

})

export default Course