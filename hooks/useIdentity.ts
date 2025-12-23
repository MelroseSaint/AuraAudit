import { useQuery } from '@instantdb/react'
import { db } from '@/lib/instant'

export function useIdentity() {
  const { data, isLoading, error } = useQuery({
    identities: {
      $: { where: { userId: db.auth.userId() } },
    },
  })
  
  const identity = data?.identities?.[0]
  const reputationScore = identity?.score ?? 0
  
  return { identity, reputationScore, isLoading, error }
}
