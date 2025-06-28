import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CodeMatchesSection({ code_matches }: { code_matches: any[] }) {
  if (!code_matches || code_matches.length === 0) return null;
  return (
    <Card className="border-0 shadow-xl bg-white dark:bg-slate-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-blue-600">
          <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <Code className="h-4 w-4 text-blue-600" />
          </div>
          Code Matches
          <Badge variant="secondary" className="ml-auto">
            {code_matches.length}
          </Badge>
        </CardTitle>
        <CardDescription>Files that contain code related to your features</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {code_matches.map((match: any, index: number) => (
            <div
              key={index}
              className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {match.file_name}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(match.file_url, "_blank")}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View
                </Button>
              </div>
              {match.snippet && (
                <div className="bg-slate-100 dark:bg-slate-700 rounded p-3 text-sm font-mono text-slate-700 dark:text-slate-300 max-h-32 overflow-y-auto">
                  {match.snippet.length > 200 
                    ? `${match.snippet.substring(0, 200)}...` 
                    : match.snippet
                  }
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 