import * as yup from 'yup'
import { get } from 'lodash'
import { UserService } from '../index'

async function checkUser(getUser) {
  const { context } = this.options
  const userId = get(context, 'userId')
  const user = await getUser()
  if (user && (!userId || user._id.toString() !== userId.toString())) {
    return false
  }
  return true
}

const ProfileSchemaField = {
  username: yup
    .string()
    .required()
    .test('unique-username', 'User with this username already exists', async function(value) {
      return checkUser.call(this, () => UserService.findByUsername(value))
    }),
  bio: yup.string(),
  name: yup.string().required(),
  photoUrl: yup.string(),
}

const SignUpSchemaFields = {
  ...ProfileSchemaField,
  email: yup
    .string()
    .email()
    .required()
    .test('unique-email', 'User with this email already exists', async function(value) {
      return checkUser.call(this, () => UserService.findByEmail(value))
    }),
}

export const SignUpSchema = yup.object().shape(SignUpSchemaFields)
export const ProfileSchema = yup.object().shape(ProfileSchemaField)
