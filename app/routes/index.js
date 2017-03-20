const files = [
  'test',
  'chats',
  'users',
  'groups'
]

const routes = files
    .map(file => `${__dirname}/${file}`)
    .map(require)

module.exports = {
  routes: routes.map(route => route.routes),
  methods: routes.map(route => route.methods)
}
