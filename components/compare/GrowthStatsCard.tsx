import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function GrowthStatsCard({ growth }: { growth: any }) {
  if (!growth) return null;
  return (
    <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 mt-6">
      <CardHeader className="pb-2 flex flex-row items-center gap-3">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <TrendingUp className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <CardTitle className="text-lg font-bold text-green-700 dark:text-green-300 mb-0">
            Growth Stats
          </CardTitle>
          <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
            Last 6 months activity
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 pt-2 text-sm text-slate-700 dark:text-slate-300">
        <div className="flex justify-between">
          <span>Commits:</span>
          <b>{growth.commits_last_month}</b>
        </div>
        <div className="flex justify-between">
          <span>New Contributors:</span>
          <b>{growth.new_contributors_last_month}</b>
        </div>
        <div className="flex justify-between">
          <span>Closed Issues:</span>
          <b>{growth.issues_closed_last_month}</b>
        </div>
        <div className="flex justify-between">
          <span>Stars Gained:</span>
          <b>{growth.stars_gained_last_month}</b>
        </div>
       
      </CardContent>
    </Card>
  );
} 