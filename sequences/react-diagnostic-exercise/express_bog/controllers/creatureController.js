const Creature = require('../models/Creature.js')

const creatureController = {
    index: async (req, res) => {
        try {
            const creatures = await Creature.find({})
            res.json(creatures)
        } catch (err) {
            console.log(err)
        }
    },
    show: async (req, res) => {
        try {
            const creatureId = req.params.id
            const creature = await Creature.findById(creatureId)
            res.json(creature)
        } catch (err) {
            console.log(err)
            res.json(err)
        }
    },
    create: async (req, res) => {
        try {
          const newCreature = req.body
          const savedCreature = await Creature.create(newCreature)
          res.json(savedCreature)
        } catch (err) {
          console.log(err)
          res.status(500).json(err)
        }
    },
    update: async (req, res) => {
        try {
          const creatureId = req.params.id
          const updatedCreature = req.body
          const savedCreature = await Creature.findByIdAndUpdate(creatureId, updatedCreature, {new: true})
          res.json(savedCreature)
        } catch (err) {
          console.log(err)
          res.status(500).json(err)
        }
    },
    delete: async (req, res) => {
        console.log('DELETE')
        try {
          const creatureId = req.params.id
          const deletedCreature = await Creature.findByIdAndRemove(creatureId)
          res.json(deletedCreature)
        } catch (err) {
          console.log(err)
          res.status(500).json(err)
        }
    }
}

module.exports = creatureController