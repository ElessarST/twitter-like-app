import { User } from '../../models'

export interface IAuthState {
  currentUser: User
  isFetchingCurrentUser: boolean
}

export const initialAuthState: IAuthState = {
  currentUser: null,
  isFetchingCurrentUser: false,
}
