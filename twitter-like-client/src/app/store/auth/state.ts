import { User } from '../../models/User'

export interface IAuthState {
  currentUser: User
  isFetchingCurrentUser: boolean
}

export const initialAuthState: IAuthState = {
  currentUser: null,
  isFetchingCurrentUser: false,
}
