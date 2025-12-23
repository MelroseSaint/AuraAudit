'use client'
import { Shield, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

type AuditResult = {
  id: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  title: string
  description: string
  category: string
  status: 'pending' | 'reviewing' | 'resolved'
  timestamp: number
}

export default function AuditStreamingList() {
  const audits: AuditResult[] = []
  const isLoading = false
  const error = null

  if (isLoading) {
    return <div className="text-muted-foreground">Loading audits...</div>
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-destructive">
        <AlertTriangle className="h-4 w-4" />
        <span>Failed to load audits</span>
      </div>
    )
  }

  const severityStats = audits.reduce(
    (acc, audit) => {
      acc[audit.severity]++
      return acc
    },
    { critical: 0, high: 0, medium: 0, low: 0 }
  )

  const overallScore = Math.max(
    0,
    Math.min(100, 100 - (severityStats.critical * 25) - (severityStats.high * 10) - (severityStats.medium * 5) - (severityStats.low * 2))
  )

  return (
    <div className="space-y-6">
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
              <span className="text-4xl font-bold">{overallScore}</span>
              <Badge variant={overallScore >= 80 ? 'default' : overallScore >= 60 ? 'secondary' : 'destructive'}>
                {overallScore >= 80 ? 'Excellent' : overallScore >= 60 ? 'Good' : 'Needs Attention'}
              </Badge>
            </div>
            <Progress value={overallScore} className="h-3" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span>Critical: {severityStats.critical}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-orange-500" />
              <span>High: {severityStats.high}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <span>Medium: {severityStats.medium}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Low: {severityStats.low}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Audits</CardTitle>
          <CardDescription>Latest code analysis results</CardDescription>
        </CardHeader>
        <CardContent>
          {audits.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle2 className="mx-auto h-12 w-12 mb-4 text-muted-foreground/50" />
              <p>No recent audits</p>
              <p className="text-sm">Run your first audit to see results here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {audits.map((audit) => (
                <div
                  key={audit.id}
                  className="flex items-start gap-4 rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors"
                >
                  <div
                    className={`mt-0.5 h-2 w-2 rounded-full ${
                      audit.severity === 'critical'
                        ? 'bg-red-500'
                        : audit.severity === 'high'
                        ? 'bg-orange-500'
                        : audit.severity === 'medium'
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium truncate">{audit.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {audit.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{audit.description}</p>
                  </div>
                  <Badge
                    variant={
                      audit.status === 'resolved'
                        ? 'default'
                        : audit.status === 'reviewing'
                        ? 'secondary'
                        : 'outline'
                    }
                    className="shrink-0"
                  >
                    {audit.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
