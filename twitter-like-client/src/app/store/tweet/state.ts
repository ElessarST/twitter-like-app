import { Tweet } from '../../models'

export interface ITweetState {
  tweet: Tweet
  isLoading: boolean
}

export const initialTweetState: ITweetState = {
  tweet: null,
  isLoading: false,
}
