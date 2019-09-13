import * as bcrypt from 'bcrypt'

export const usersList = [
  {
    _id: '1',
    avatarURL: '',
    email: 'aydar.farrakhov@akvelon.com',
    name: 'Aydar Farrakhov',
    friends: ['2'],
    password: bcrypt.hashSync('password', 10),
  },
  {
    _id: '2',
    avatarURL: '',
    email: 'aydar2.farrakhov@akvelon.com',
    name: 'Aydar2 Farrakhov2',
    friends: ['1'],
  },
]
