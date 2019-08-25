module.exports = (req, res, next) => {
    const email = req.decode.email.split('@')
    if(email[1] == 'admin.com') {
        next()
    }
    else {
        throw {
            status: 401,
            message: 'Unauthorized user'
        }
    }
}