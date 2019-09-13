import { createAction, props } from '@ngrx/store'
import { Tweet, User } from '../../models'

export enum ProfileActionType {
  GetProfile = '[Profile] Get Profile',
  GetProfileSuccess = '[Profile] Get Profile Success',
  GetProfileError = '[Profile] Get Profile Error',
  GetTweets = '[Profile] Get Tweets',
  GetTweetsSuccess = '[Profile] Get Tweets Success',
  GetTweetsError = '[Profile] Get Tweets Error',
  UpdateProfile = '[Profile] Update Profile',
  AddReply = '[Profile] Add Reply',
  AddRetweet = '[Profile] Add Retweet',
  UpdateTweet = '[Profile] Update Tweet',
  LoadMore = '[Profile] Load More',
  LoadMoreSuccess = '[Profile] Load More Success',
  LoadMoreError = '[Profile] Load More Error',
}

export const getProfile = createAction(ProfileActionType.GetProfile, props<{ username: string }>())
export const getProfileSuccess = createAction(
  ProfileActionType.GetProfileSuccess,
  props<{ user: User }>()
)
export const getProfileError = createAction(ProfileActionType.GetProfileError)
export const getTweets = createAction(ProfileActionType.GetTweets, props<{ username: string }>())
export const getTweetsSuccess = createAction(
  ProfileActionType.GetTweetsSuccess,
  props<{ tweets: Tweet[] }>()
)
export const getTweetsError = createAction(ProfileActionType.GetTweetsError)
export const addReply = createAction(
  ProfileActionType.AddReply,
  props<{ tweet: Tweet; reply: Tweet }>()
)
export const addRetweet = createAction(
  ProfileActionType.AddRetweet,
  props<{ tweet: Tweet; retweet: Tweet }>()
)
export const updateTweet = createAction(ProfileActionType.UpdateTweet, props<{ tweet: Tweet }>())
export const updateProfile = createAction(ProfileActionType.UpdateProfile, props<{ user: User }>())
export const loadMore = createAction(ProfileActionType.LoadMore, props<{ username: string }>())
export const loadMoreError = createAction(ProfileActionType.LoadMoreSuccess)
export const loadMoreSuccess = createAction(
  ProfileActionType.LoadMoreError,
  props<{ tweets: Tweet[] }>()
)
