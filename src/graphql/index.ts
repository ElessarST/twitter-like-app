import { usersList } from '../tmpdata'

export const resolvers = {
  Query: {
    users: () => usersList,
    currentUser: (parent, args, context) => context.user,
  },
}
