import * as bcrypt from 'bcrypt'
import * as Express from 'express'
import * as jwt from 'jsonwebtoken'
import passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'
import { usersList } from './tmpdata'

// generate a jwt token for testing purposes
console.log(jwt.sign(usersList[0], 'secret'))

const params = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
}

const strategy = new Strategy(params, (payload, done) => {
  const user = usersList.find(u => u._id === payload._id) || null

  return done(null, user)
})

passport.use(
  new LocalStrategy(
    {
      passwordField: 'password',
      usernameField: 'email',
    },
    (email, password, done) => {
      console.log(usersList)
      const user =
        usersList.find(
          u => u.email === email && bcrypt.compareSync(password, u.password)
        ) || null
      if (!user) {
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
    const token = jwt.sign(req.user, 'secret')
    return res.json({ token })
  },
]

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
