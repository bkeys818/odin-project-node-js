import createError from 'http-errors'
import express, { ErrorRequestHandler } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import { contentSecurityPolicy } from 'helmet'
import rateLimit from 'express-rate-limit'
import logger from 'morgan'
import mongoose from 'mongoose'

import indexRouter from './routes/index'
import usersRouter from './routes/users'
import catalogRouter from './routes/catalog'

const app = express()

app.use(
    contentSecurityPolicy({
        directives: {
            'script-src': ["'self'", 'code.jquery.com', 'cdn.jsdelivr.net'],
        },
    }),
)
app.use(rateLimit({ windowMs: 1 * 60 * 1000, max: 20 }))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

if (process.env.NODE_ENV == 'dev') app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(compression())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/catalog', catalogRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
} satisfies ErrorRequestHandler)

module.exports = app

mongoose.set('strictQuery', false)
const mongoDB = process.env.MONGO_DB_CONNECTION_STRING!

main().catch(console.error)
async function main() {
    await mongoose.connect(mongoDB)
    console.log('connected')
}
