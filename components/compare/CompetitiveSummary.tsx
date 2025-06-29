import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function CompetitiveSummary({ features, similarity }: { features: any, similarity: number }) {
  const similarityColor =
    similarity >= 8 ? "text-green-600" : similarity >= 6 ? "text-yellow-600" : "text-red-600";
  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          Competitive Analysis Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {features.overlapping.length}
            </div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Shared Features</div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">{features.extra.length}</div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Your Advantages</div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
          <div className="text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">{features.missing.length}</div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Your Disadvantages</div>
            </div>
          </div>
     
        </div>
      </CardContent>
    </Card>
  );
} 