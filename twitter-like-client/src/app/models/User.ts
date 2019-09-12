export type User = {
  _id: string
  email: string
  photoUrl: string
  name: string
  username: string
  bio: string
  followers: User[]
  following: User[]
}
