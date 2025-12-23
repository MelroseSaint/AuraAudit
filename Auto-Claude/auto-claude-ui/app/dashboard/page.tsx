import { Suspense } from "react";
import DashboardShell from "@/components/DashboardShell";
import AuditStreamingList from "@/components/AuditStreamingList";
import ReputationScoreSkeleton from "@/components/skeletons/ReputationScoreSkeleton";

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Identity Health</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Suspense fallback={<ReputationScoreSkeleton />}>
            <AuditStreamingList />
          </Suspense>
        </div>
      </div>
    </DashboardShell>
  );
}
