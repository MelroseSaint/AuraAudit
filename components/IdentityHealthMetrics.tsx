'use client'
import { useIdentity } from '@/hooks/useIdentity'
import { Shield } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export default function IdentityHealthMetrics() {
  const { identity, reputationScore, isLoading, error } = useIdentity()

  if (isLoading) return <div className="text-muted-foreground">Loading metrics...</div>
  if (error) return <div className="text-destructive">Error loading metrics</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Reputation Score
        </CardTitle>
        <CardDescription>Your code health and security status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-4xl font-bold">{reputationScore}</span>
            <Badge variant={reputationScore >= 80 ? 'default' : reputationScore >= 60 ? 'secondary' : 'destructive'}>
              {reputationScore >= 80 ? 'Excellent' : reputationScore >= 60 ? 'Good' : 'Needs Attention'}
            </Badge>
          </div>
          <Progress value={reputationScore} className="h-3" />
        </div>
      </CardContent>
    </Card>
  )
}
