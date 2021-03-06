const thinky = require('./../utils/thinky')

const type = thinky.type
// const r = thinky.r

const nameRegex = /^[\w-]+$/

const types = {
  group: 'group',
  private: 'private',
  general: 'general',
}

const validateChatType = () => {
  if (this.type === types.group) {
    return this.idGroup
  }
  if (this.type === type.private) {
    return this.idUser1 && this.idUser2 &&
      this.idUser1 !== this.idUser2
  }
  if (this.type === types.general) {
    return true // check that there is no duplicates
  }
  return false
}

const Chat = thinky.createModel('Chat', {
  id: type.string(),
  name: type.string().min(1).regex(nameRegex),
  type: type.string().enum(Object.values(types)),
  idUser1: type.string().optional(), // for private chat
  idUser2: type.string().optional(), // for private chat
  idGroup: type.string().optional(), // for group chat
})

Chat.pre('save', validateChatType)
Chat.pre('validate', validateChatType)

// TODO: add custom getters for differents kind of Chat

module.exports = Chat
