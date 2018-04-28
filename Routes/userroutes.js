const express = require('express')
const {Page, User} = require('../models')

const router = express.Router()

router.get('/', async (req, res) => {
  const users = await User.findAll()
  res.render('userList', {
    users
  })

  res.render('userList', {})
})
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  const pages = await Page.findAll({
    where: {
      authorId: req.params.id
    }
  })
  res.render('userPages', {
    user,
    pages
  })
})
router.post('/', (req, res) => {
  res.send('post to create users')
})
router.put('/:id', (req, res) => {
  res.send('put users/id page')
})
router.delete('/:id', (req, res) => {
  res.send('remote users/id page')
})



module.exports = router
