const thinky = require('./../utils/thinky')

const type = thinky.type
// const r = thinky.r

const Group = thinky.createModel('Group', {
  id: type.string(),
  creationDate: type.date().default(Date.now),
  iconUrl: type.string().optional(),
  metadata: type.object().optional(),
})

module.exports = Group
