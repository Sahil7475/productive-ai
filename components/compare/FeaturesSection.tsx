import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Zap } from "lucide-react";

export default function FeaturesSection({ features }: { features: any }) {
  return (
    <div className="space-y-8">
      {/* Overlapping Features */}
      <Card className="border-0 shadow-xl bg-white dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-green-600">
            <div className="h-8 w-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            Overlapping Features
            <Badge variant="secondary" className="ml-auto">
              {features.overlapping.length}
            </Badge>
          </CardTitle>
          <CardDescription>Features that both products share - your competitive advantages</CardDescription>
        </CardHeader>
        <CardContent>
          {features.overlapping.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.overlapping.map((feature: string) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                >
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="font-medium text-green-800 dark:text-green-200">{feature}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 italic text-center py-8">No overlapping features found</p>
          )}
        </CardContent>
      </Card>
      {/* Missing Features */}
      <Card className="border-0 shadow-xl bg-white dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-red-600">
            <div className="h-8 w-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <XCircle className="h-4 w-4 text-red-600" />
            </div>
            Missing Features
            <Badge variant="secondary" className="ml-auto">
              {features.missing.length}
            </Badge>
          </CardTitle>
          <CardDescription>
            Features your product lacks that this product has
          </CardDescription>
        </CardHeader>
        <CardContent>
          {features.missing.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.missing.map((feature: string) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
                >
                  <XCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                  <span className="font-medium text-red-800 dark:text-red-200">{feature}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 italic text-center py-8">No missing features identified</p>
          )}
        </CardContent>
      </Card>
      {/* Extra Features */}
      <Card className="border-0 shadow-xl bg-white dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-yellow-600">
            <div className="h-8 w-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <Zap className="h-4 w-4 text-yellow-600" />
            </div>
            Extra Features
            <Badge variant="secondary" className="ml-auto">
              {features.extra.length}
            </Badge>
          </CardTitle>
          <CardDescription>
            Features your product has that this product lacks - your unique selling points
          </CardDescription>
        </CardHeader>
        <CardContent>
          {features.extra.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.extra.map((feature: string) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
                >
                  <Zap className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                  <span className="font-medium text-yellow-800 dark:text-yellow-200">{feature}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 italic text-center py-8">No extra features identified</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 