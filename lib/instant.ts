import { init } from '@instantdb/react'

const instant = init({
  appId: process.env.NEXT_PUBLIC_INSTANTDB_APP_ID!,
})

export const db = instant
export const auth = instant.auth
