const User = require('./user')
const Group = require('./group')
const Chat = require('./chat')

const r = require('./../utils/thinky').r

User.hasAndBelongsToMany(Group, 'groups', 'id', 'id')

Group.hasAndBelongsToMany(User, 'users', 'id', 'id')

Chat.hasAndBelongsToMany(User, 'users', 'id', 'id') // for group and public chat
Chat.belongsTo(User, 'user', 'private.idUser1', 'id')
// Chat.belongsTo(User, 'user', 'private.idUser2', 'id')
Chat.belongsTo(Group, 'group', 'idGroup', 'id')

module.exports = { Chat, User, Group }

/* eslint-disable max-params */
module.exports.reqSingleArg = async (model, field, value) => model.filter(r.row(field).eq(value)).run()
module.exports.reqDoubleArg = async (model, field, value, field2, value2) => model.filter(r.row(field).eq(value).and(r.row(field2).eq(value2))).run()
module.exports.reqFreeArg = async (model, json) => model.filter(json).run()
