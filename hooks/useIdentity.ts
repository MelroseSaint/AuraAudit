import { i } from '@instantdb/react'
import { db } from '@/lib/instant'

export function useIdentity() {
  const { isLoading, error, data } = i.query.identities.getAll({
    where: { userId: db.auth.userId() },
  })
  
  const identity = data?.[0]
  const reputationScore = identity?.score ?? 0
  
  return { identity, reputationScore, isLoading, error }
}
