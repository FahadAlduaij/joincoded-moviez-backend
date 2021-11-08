exports.checkAdminUser = (req, res, next) => {
    if (!req.user.isAdmin) return next({ status: 401, message: "Not admin user" })
    next()
}