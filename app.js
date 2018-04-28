const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const routes = require('./Routes')
const pageRoutes = require('./Routes/pageroutes')
const userRoutes = require('./Routes/userroutes')
const ejs = require('ejs')
const {db, User, Page} = require('./models')

const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(routes)
app.use('/wiki', pageRoutes)
app.use('/users', userRoutes)

db.authenticate().then(() => {
  console.log('connection to the database');
})

const init = async function() {
  await User.sync()
  await Page.sync()

  app.listen(3000, () => {
    console.log('listening on port 3000')
  })
}

init()
