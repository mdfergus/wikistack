const express = require('express')
const {Page, User} = require('../models')
const _ = require('lodash')


const router = express.Router()

router.get('/', async (req, res) => {
  const pages = await Page.findAll()
  console.log(pages)
  res.render('index', {
    pages
  })
})
router.post('/', async (req, res) => {
  const {title, content, name, email} = req.body

  const user = await User.findOrCreate({
    where: {
      name,
      email
    }
  })
  console.log(user)


  await Page.beforeValidate((page) => {
    page.slug = _.kebabCase(title)
    //page.setAuthor(user[0].dataValues.id)
    page.authorId = user[0].dataValues.id
  })
  await Page.create({
    title,
    content
  })

  res.redirect(`/wiki/${_.kebabCase(title)}`)
})


router.get('/add', (req, res) => {
  res.render('addPage')
})
router.get('/:slugID', async (req, res) => {
  let page = await Page.findAll({
    where: {
      slug: req.params.slugID
    }
  })
  page = page[0].dataValues
  res.render('wikipage', {
    page
  })
})



module.exports = router
