const thinky = require('./../utils/thinky')
const User = require('./users')
const Group = require('./group')

const type = thinky.type
// const r = thinky.r

const nameRegex = /^[\w-]+$/

const types = {
  group: 'group',
  private: 'private',
  general: 'general', // TODO: general => public?
}

const validateChatType = () => {
  if (this.type === types.group) {
    return this.metadata.idGroup
  }
  if (this.type === type.private) {
    return this.metadata.idUser1 && this.metadata.idUser2 &&
      this.metadata.idUser1 !== this.metadata.idUser2
  }
  if (this.type === types.group) {
    return true // check that there is no duplicates
  }
  return false
}

const Chat = thinky.createModel('Chat', {
  id: type.string(),
  name: type.string().min(1).regex(nameRegex),
  type: type.string().enum(Object.values(types)),
  metadata: type.object().schema({
    idUser1: type.string().optional(),
    idUser2: type.string().optional(),
    idGroup: type.string().optional(),
  })
})

// TODO: many to many general chat to users

Chat.belongsTo(User, 'user', 'idUser1', 'id')
Chat.belongsTo(User, 'user', 'idUser2', 'id')
Chat.belongsTo(Group, 'group', 'idGroup', 'id')

Chat.pre('save', validateChatType)
Chat.pre('validate', validateChatType)

module.exports = Chat
