const express = require('express')
const passport = require('passport')

const gOAuthRouter = express.Router()

gOAuthRouter.get('/google', 
    passport.authenticate('google', {
        scope: ['email']
    })
)
gOAuthRouter.get('/google/callback', 
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/auth/failure'
    })
)

module.exports = gOAuthRouter
