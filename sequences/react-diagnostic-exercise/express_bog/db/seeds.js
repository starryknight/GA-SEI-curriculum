const Creature = require('../models/Creature.js')
  
// using Promises
Creature.deleteMany().then(() => {
    const luke = new Creature({name: 'Luke', description: 'Jedi'})
    return luke.save()
  }).then(() => {
    const darth = new Creature({name: 'Darth Vader', description: 'Father of Luke'})
    return darth.save()
  })