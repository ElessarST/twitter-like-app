import * as yup from 'yup'

export const CreateTweetSchema = yup.object().shape({
  text: yup
    .string()
    .required()
    .test('max-tweet-len', 'Tweet text length can be larger than 256', val => val.length <= 256),
  photos: yup.array().of(yup.string()),
  retweetFrom: yup.string(),
  replyTo: yup.string(),
})
