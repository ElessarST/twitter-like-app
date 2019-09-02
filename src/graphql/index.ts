import { IDBUser } from '../database/IDBUser'
import { usersList } from '../tmpdata'

export const resolvers = {
  Query: {
    users: () => usersList,
    currentUser: (parent, args, context) => context.user,
  },
  User: {
    friends(user: IDBUser, args, context) {
      if (context.user._id === user._id) {
        return user.friends.map(u => usersList.find(l => l._id === u))
      }
      return []
    },
  },
}
