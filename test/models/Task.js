const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Task = sequelize.define("Task", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50)
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
{
    tableName: "tasks",
    timestamps: false
})

module.exports = Task