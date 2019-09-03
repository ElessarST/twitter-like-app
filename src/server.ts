import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import { graphqlLogin, login, signUp } from './auth'
import { resolvers } from './graphql'
import { typeDefs } from './graphql/schema'

dotenv.config()

const app = express()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/graphql', graphqlLogin)

app.post('/login', [...login])
app.post('/signUp', signUp)

const apolloServer: ApolloServer = new ApolloServer({
  context: ({ req }) => {
    const user = req.user
    if (!user) {
      throw new Error('AUTH_REQUIRED_CODE')
    }
    return { user }
  },
  resolvers,
  typeDefs,
})

apolloServer.applyMiddleware({ app })

app.listen(3000, () => console.log('app listening on port 3000!'))
