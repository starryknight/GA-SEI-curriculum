const express = require('express')
const router = express.Router()

const creatureController = require('../controllers/creatureController')

router.get('/', creatureController.index)
router.post('/', creatureController.create)
router.get('/:id', creatureController.show)
router.put('/:id', creatureController.update)
router.delete('/:id', creatureController.delete)

module.exports = router