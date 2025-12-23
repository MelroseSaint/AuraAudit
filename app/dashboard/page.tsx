import { Suspense } from 'react'
import DashboardShell from '@/components/DashboardShell'
import AuditStreamingList from '@/components/AuditStreamingList'
import ReputationScoreSkeleton from '@/components/skeletons/ReputationScoreSkeleton'

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Identity Health</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Suspense fallback={<ReputationScoreSkeleton />}>
              <AuditStreamingList />
            </Suspense>
          </div>
          
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-accent transition-colors text-sm">
                  Run New Audit
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-accent transition-colors text-sm">
                  View All Reports
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-accent transition-colors text-sm">
                  Configure Rules
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="font-semibold mb-4">Activity</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-2 shrink-0" />
                  <div>
                    <p className="font-medium">Audit completed</p>
                    <p className="text-muted-foreground text-xs">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <div>
                    <p className="font-medium">New rule added</p>
                    <p className="text-muted-foreground text-xs">Yesterday</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
