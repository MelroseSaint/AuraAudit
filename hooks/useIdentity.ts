export function useIdentity() {
  const identity = { name: 'Demo User', title: 'Developer', score: 85 }
  const reputationScore = 85
  const isLoading = false
  const error = null

  return { identity, reputationScore, isLoading, error }
}
