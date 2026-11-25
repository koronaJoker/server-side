import Teacher from "./Teacher.js";
import Course from "./Course.js";

Teacher.hasMany(Course, {
    foreignKey: "teacherId"
})

Course.belongsTo(Teacher, {
    foreignKey: "teacherId"
})

export {Course, Teacher}