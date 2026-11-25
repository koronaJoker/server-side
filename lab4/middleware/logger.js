export default function logger(req,res,next) {
    if (req.url.startsWith("/css/")) {
        return next()
    }

    console.log(`${req.method} | ${req.originalUrl} | ${new Date().toLocaleString()}`)
    next()
}