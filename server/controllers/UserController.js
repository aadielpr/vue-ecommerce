const User = require('../models/user')
const comparePassword = require('../helpers/bcrypt').comparePassword
const generateToken = require('../helpers/jwt').generateToken



class UserController {
    static create (req, res, next) {
        User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        })
        .then(created => {
            res.status(200).json(created)
        })
        .catch(next)
    }
    static signIn (req, res, next) {
        const { email, password } = req.body
        User.findOne({ email })
        .then(user => {
            if (!user) {
                throw {
                    status: 404,
                    message: "username / password wrong"
                }
            }
            else {
                if (comparePassword(password, user.password)) {
                    const payload = {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                    const token = generateToken(payload)
                    res.status(201).json({token, username: user.username, id: user._id})
                }
                else {
                    throw {
                        status: 404,
                        message: "username / password wrong"
                    }
                }
            }
        })
        .catch(next)
    }
    static checkToken (req, res, next) {
        console.log(req.headers.token)
        const a = verify(req.headers.token)
        console.log(a)
        // if(verify(req.headers.token)) {
        //     console.log("mantap")
        // }
        // else {
        //     console.log("jelek")
        // }
        res.status(200).json('Testing')
    }

}

module.exports = UserController