const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
//env file: "my-own-special-jwt-secret"

const AuthService = {
    getUserWithUserName(db,user_name){
        return db('thingful_users')
            .where({user_name})
            .first()
    },
    comparePasswords(password,hash) {
        return bcrypt.compare(password,hash)
    },
    parseBasicToken(token) {
        return Buffer.from(token,'base64')
            .toString().split(':')
    },
    createJwt(subject,payload) {
        return jwt.sign(payload, config.JWT_SECRET,{
            subject,
            algorithm: 'HS256'
        }) 
    }
}
module.exports=AuthService