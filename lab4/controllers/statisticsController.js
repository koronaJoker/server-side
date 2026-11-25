import {fn, col} from "sequelize"
import {Course, Teacher} from "../models/index.js"

export default async function index(req,res,next) {
    try {
        // 1. Количество учителей и курсов
        const teachersCount = await Teacher.count()
        const coursesCount = await Course.count()


        // 2. Количество курсов в каждом семестре
        const coursesBySemester = await Course.findAll({
            attributes: [
                "semester",
                [fn("COUNT", col("id")), "courseCount"]
            ],
            group: ["semester"],
            order: [["semester", "ASC"]],
            raw: true //возвращает обычные обьекты а не Sequelize модели
        })

        // 3. Количество курсов у каждого преподавателя
        const coursesByTeacher = await Course.findAll({
            attributes: ["teacherId", [fn("COUNT" , col("id")), "courseCount"]
            ],
            group: ["teacherId"],
            raw: true
        })

        // 4. Все преподаватели

        const teachers = await Teacher.findAll({
            attributes: ["id", "name"],
            order: [["name", "ASC"]],
            raw: true
        })

        const teacherCourseMap = {}
        for (const item of coursesByTeacher){
            teacherCourseMap[item.teacherId] = Number(item.courseCount)
        }

        const teacherStatistics = teachers.map(teacher => ({
            id: teacher.id,
            name: teacher.name,
            courseCount: teacherCourseMap[teacher.id] || 0,
            raw: true
        }))  
        
        const topTeacher = teacherStatistics.reduce((max, teacher) => 
            !max || teacher.courseCount > max.courseCount ? teacher : max, null)
        

        res.render("statistics/index", {
            teachersCount, 
            coursesCount,
            coursesBySemester,
            teacherStatistics,
            topTeacher
        })
    }
    catch (error) {
        next(error)
    }
}