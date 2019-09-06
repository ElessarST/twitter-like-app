import * as yup from 'yup'
import { UserService } from '../services'

export const SignUpSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
    .test(
      'unique-email',
      'User with this email already exists',
      async value => !(await UserService.findByEmail(value)),
    ),
  password: yup.string().required(),
  username: yup
    .string()
    .required()
    .test(
      'unique-username',
      'User with this username already exists',
      async value => !(await UserService.findByUsername(value)),
    ),
})
