const path = require('path')
const helmet = require('helmet')
const express = require('express')
// const passport = require('passport')
// const cookieSession = require('cookie-session')

const app = express()

const recipeRouter = require('./routes/recipes.route')
// const { authRouter, isLoggedIn } = require('./routes/auth')

// app.use(cookieSession({
//     name: 'session',
//     maxAge: 24 * 60 * 60 * 60 * 1000,
//     keys: [process.env.COOKIE_SECRET]
// }))

// const regenerate = callback => {
// 	callback()
// }

// const save = callback => {
// 	callback()
// }

// app.use((req, res, next) => {
// 	req.session.regenerate = regenerate
// 	req.session.save = save
// 	next()
// })

app.use(helmet())

// app.use(passport.initialize())
// app.use(passport.session())

app.use(express.json())

// app.use('/auth', authRouter)
// app.use('/recipes', isLoggedIn, recipeRouter)
app.use('/recipes', recipeRouter)
app.use('/', (req, res) => {
	res.redirect('/recipes')
})

// app.use('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'view', 'index.html'))
// })

app.use((error, req, res, next) => {
	if (!error.status) {
		error.status = 500
	}
	res.status(error.status).json({
		message: 'Error',
		error: error.message
	})
})

module.exports = app