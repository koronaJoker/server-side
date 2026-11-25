export default function isAdmin(req,res,next) {

    if (req.session.role !== 'admin') {
        return res.status(403).render("403")
    }

    next()
}