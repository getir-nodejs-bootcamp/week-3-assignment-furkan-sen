require('dotenv').config()
require('./config/db')
const express = require('express')
const app = express()
const ejs = require('ejs')
const layouts = require('express-ejs-layouts')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
const homeRouter = require('./routers/homeRouter')
const userRouter = require('./routers/userRouter')
const categoryRouter = require('./routers/categoryRouter')
const postRouter = require('./routers/postRouter')
const userApiRouter = require('./routers/api-routers/api-userRouter')
const categoryApiRouter = require('./routers/api-routers/api-categoryRouter')
const postApiRouter = require('./routers/api-routers/api-postRouter')
const commentRouter = require('./routers/commentRouter')
const homeLogin = require('./middlewares/home-login')
const auth = require('./middlewares/auth')
const tokenCheck = require('./middlewares/token-check')

// ejs konfigurasyonu
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// express middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// ejs middleware - layout kullanımı
app.use(layouts)

// session konfigurasyonu
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  }
))

// connect-flash konfigurasyonu 
app.use(flash())
app.use((req,resp,next) => {
  resp.locals.crudErrors = req.flash('crudErrors')
  resp.locals.successes = req.flash('successes')
  resp.locals.auth = req.flash('auth')
  resp.locals.reqBody = req.flash('reqBody')
  next()
})

// mvc routes
app.use('/', homeLogin, homeRouter)
app.use('/user', userRouter)
app.use('/categories', auth, categoryRouter)
app.use('/posts', auth, postRouter)
app.use('/comments', auth, commentRouter)

// api routes
app.use('/service/user', userApiRouter)
app.use('/service/categories', tokenCheck, categoryApiRouter)
app.use('/service/posts', tokenCheck, postApiRouter)

app.listen(process.env.SERVER_PORT, () => console.log('server walked'))