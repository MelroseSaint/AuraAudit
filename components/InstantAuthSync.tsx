'use client'
import { db } from '@/lib/instant'
import { useAuth } from '@clerk/nextjs'
import { useEffect } from 'react'

export default function InstantAuthSync() {
  const { getToken, isSignedIn } = useAuth()

  useEffect(() => {
    if (isSignedIn) {
      getToken({ template: 'instantdb' }).then((token) => {
        if (token) {
          db.auth.signInWithIdToken({
            clientName: 'clerk',
            idToken: token,
          })
        }
      })
    } else {
      db.auth.signOut()
    }
  }, [isSignedIn, getToken])

  return null
}
