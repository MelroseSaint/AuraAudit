import { i } from '@instantdb/react'

export function useIdentity() {
  const { isLoading, error, data } = i.useQuery({
    identities: {
      where: {
        id: i.auth.userId(),
      },
    },
  })

  const identity = data?.identities?.[0]
  const reputationScore = identity?.score ?? 0

  return { identity, reputationScore, isLoading, error }
}
