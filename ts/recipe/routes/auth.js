const express = require('express')
const passport = require('passport')
const { Strategy } = require('passport-google-oauth20')

require('dotenv').config()

const gOAuthRouter = require('./auth/googleAuth.route')
const gOAuthController = require('./auth/googleAuth.controller')

const authRouter = express.Router()

passport.use(new Strategy(gOAuthController.OAUTH_OPTIONS, gOAuthController.verifyCallback))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

function isLoggedIn(req, res, next){

    console.log('Logged In', req.user);

    const loggedIn = req.isAuthenticated() && req.user

    console.log(req.isAuthenticated());
    
    console.log(loggedIn);
    if(!loggedIn){
        return res.status(401).json({
            error: 'You have to log in to access recipes'
        })
    }

    console.log('logged out')

    next()
}

authRouter.use(gOAuthRouter)

authRouter.get('/logout', (req, res) => {
    req.logout(err => {
        if(err){
            return console.error(err);
        }

        res.redirect('/')
    })
})

authRouter.get('/failure', (req, res) => {
    res.send("Could not log in")
})

module.exports = {
    authRouter,
    isLoggedIn
}