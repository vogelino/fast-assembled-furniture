import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import Button from './Button'

export default function LoginLink () {
  const [session, loading] = useSession()

  if (loading) return 'Loading...'
  return (
    <>
      {!session && <Button onClick={signIn}>Sign in</Button>}
      {session && (
        <Button onClick={signOut}>Logout →</Button>
      )}
    </>
  )
}
