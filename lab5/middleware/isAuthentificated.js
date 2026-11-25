export default function isAuthentificated(req,res,next) {
    if (!req.session.userId) {
        return res.redirect("/login")
    }

    next()
}