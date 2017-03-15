import Users from '../../app/models/users'

export const credentials = {
  correct: {
    login: 'test',
    email: 'test@example.com',
    password: 'test1234',
  },
  wrong: {
    login: 'nopenope',
    email: 'nope@email.hey',
    password: 'thefuck_man',
  },
  invalid: {
    login: '',
    email: 'foo.bar',
    password: '5chars',
  },
}

export async function setupUsers() {
  const correctUser = new Users(credentials.correct)
  await correctUser.saveAll()
}

export async function deleteUsers() {
  const users = await Users.run()
  for (const user of users) {
    user.delete()
  }
}
