import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

console.log(process.env.GITHUB_ID)
const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
  ],
  // pages: {
  //   signIn: '/auth/signin',
  // }
  // database: process.env.DATABASE_URL,
}

export default (req, res) => NextAuth(req, res, options)
