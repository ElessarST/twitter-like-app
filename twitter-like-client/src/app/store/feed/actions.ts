import { createAction, props } from '@ngrx/store'
import { Tweet } from '../../models'

export const getFeed = createAction('[Feed] Get Feed', props<{}>())
export const getFeedError = createAction('[Feed] Get Feed Error', props<{}>())
export const getFeedSuccess = createAction('[Feed] Get Feed Success', props<{ tweets: Tweet[] }>())
export const addTweet = createAction('[Feed] Add Tweet', props<{ tweet: Tweet }>())
