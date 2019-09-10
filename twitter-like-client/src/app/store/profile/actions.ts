import { createAction, props } from '@ngrx/store'
import { Tweet, User } from '../../models'

export enum ProfileActionType {
  GetUser = '[Profile] Get User',
  GetUserSuccess = '[Profile] Get User Success',
  GetUserError = '[Profile] Get User Error',
  GetTweets = '[Profile] Get Tweets',
  GetTweetsSuccess = '[Profile] Get Tweets Success',
  GetTweetsError = '[Profile] Get Tweets Error',
  UpdateUser = '[Profile] Update User',
  AddReply = '[Profile] Add Reply',
  AddRetweet = '[Profile] Add Retweet',
  UpdateTweet = '[Profile] Update Tweet',
}

export const getUser = createAction(ProfileActionType.GetUser, props<{ username: string }>())
export const getUserSuccess = createAction(
  ProfileActionType.GetUserSuccess,
  props<{ user: User }>(),
)
export const getUserError = createAction(ProfileActionType.GetUserError, props<{}>())
export const getTweets = createAction(ProfileActionType.GetTweets, props<{ username: string }>())
export const getTweetsSuccess = createAction(
  ProfileActionType.GetTweetsSuccess,
  props<{ tweets: Tweet[] }>(),
)
export const getTweetsError = createAction(ProfileActionType.GetTweetsError, props<{}>())
export const addReply = createAction(
  ProfileActionType.AddReply,
  props<{ tweet: Tweet; reply: Tweet }>(),
)
export const addRetweet = createAction(
  ProfileActionType.AddRetweet,
  props<{ tweet: Tweet; retweet: Tweet }>(),
)
export const updateTweet = createAction(ProfileActionType.UpdateTweet, props<{ tweet: Tweet }>())
