require('dotenv').config()

const OAuthConfig = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    COOKIE_KEY: process.env.COOKIE_SECRET
}

const OAUTH_OPTIONS = {
    callbackURL: '/auth/google/callback',
    clientID: OAuthConfig.CLIENT_ID,
    clientSecret: OAuthConfig.CLIENT_SECRET
}

function verifyCallback(accessToken, refreshToken, profile, done){
    console.log(`Profile:`, profile);

    done(null, profile)
}

module.exports = {
    OAUTH_OPTIONS,
    verifyCallback,
}
