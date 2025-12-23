import { Suspense } from 'react'

export default function ReputationScoreSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-48 bg-slate-800 rounded-lg animate-pulse" />
      <div className="h-32 bg-slate-800 rounded-lg animate-pulse" />
      <div className="h-32 bg-slate-800 rounded-lg animate-pulse" />
    </div>
  )
}
