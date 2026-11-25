
import User  from "../models/User.js"
import bcrypt from "bcrypt"

export function showRegister(req,res) {
    res.render("auth/register", {errors: []})
}

export function showLogin(req,res) {
    res.render("auth/login", {errors: []})
}

export async function register (req, res, next) {
    try {
        const {username, email, password} = req.body

        const existingUser = await User.findOne({
            where: {email}
        })

        if (existingUser) {
            return res.status(409).render("auth/register", {
                errors: ["Email уже существует"]
            } )
        }

        const passwordHash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS))

        const user = await User.create({
            username,
            email,
            password: passwordHash

        })

        req.session.userId = user.id;
        req.session.role = user.role;

        res.redirect("/profile");
    }

    catch (error) {
        next(error)
    }
}

export async function login(req,res,next) {
    try {
        const {email, password} = req.body

        const user = await User.findOne({where: {email}})

        if (!user) {
            return res.status(401).render("auth/login",{
                    errors: ["Неверный адрес почты или пароль"]
                })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).render("auth/login", {
                errors: ["Неверный адрес почты или пароль"]
            })
        }

        req.session.regenerate(async (error) => {
            if (error) return next(error)

            req.session.userId = user.id
            req.session.role = user.role

            user.lastLogin = new Date()
            await user.save()

            req.session.save((error) => {
                if (error) return next(error)

                res.redirect("/profile")
            })
        })

    }

    catch (error) {
        next(error)
    }
}

export function logout (req, res, next) {
    req.session.destroy((error) => {
        if (error) return next(error)

        res.clearCookie("connect.sid")
        res.redirect("/login")
    })
    
}

export async function showProfile(req, res) {
    try {
    const user = await User.findByPk(req.session.userId, {
        attributes: {
            exclude : ["password"]
        }
    })

    res.render("profile", {user})
    }

    catch (error) {
        next(error)
    }
   
}