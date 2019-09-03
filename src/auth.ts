import * as bcrypt from 'bcrypt'
import * as Express from 'express'
import * as jwt from 'jsonwebtoken'
import passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'
import { UserService } from './services'

const params = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
}

const strategy = new Strategy(params, async (payload, done) => {
  const { _id } = payload
  const user = await UserService.findById(_id)
  return done(null, user)
})

passport.use(
  new LocalStrategy(
    {
      passwordField: 'password',
      usernameField: 'email',
    },
    async (email, password, done) => {
      const user = await UserService.findByEmail(email)
      const isPasswordCorrect = bcrypt.compareSync(password, user.password)

      if (!user || !isPasswordCorrect) {
        return done(null, false, { message: 'Incorrect email or password.' })
      }
      return done(null, user)
    }
  )
)

passport.use(strategy)

passport.initialize()

export const login = [
  passport.authenticate('local', { session: false }),
  (req: Express.Request, res: Express.Response) => {
    // @ts-ignore
    const token = jwt.sign(req.user.toJSON(), 'secret')
    return res.json({ token })
  },
]

export async function signUp(req: Express.Request, res: Express.Response, next) {
  const { username, email } = req.body
  const existedUser = await UserService.findByEmailOrUsername(email, username)
  if (existedUser) return { message: 'User already exists' }
  const user = await UserService.createUser(req.body)
  const token = jwt.sign({ _id: user._id }, 'secret')
  return res.json({ token })
}

export const graphqlLogin = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (user) {
      req.user = user
    }
    next()
  })(req, res, next)
}

export default passport
