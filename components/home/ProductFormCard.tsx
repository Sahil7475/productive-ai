import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight, Plus, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ProductFormCard({
  productName,
  setProductName,
  description,
  setDescription,
  currentFeature,
  setCurrentFeature,
  userFeatures,
  addFeature,
  removeFeature,
  handleSubmit,
  isLoading,
  handleFeatureKeyDown,
}: any) {
  return (
    <Card className="mb-12 border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Target className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl">Analyze Your Product</CardTitle>
            <CardDescription className="text-base">
              Enter your product details to discover similar products and competitive insights
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="productName" className="text-base font-medium">
                  Product Name
                </Label>
                <Input
                  id="productName"
                  placeholder="e.g., TimeTrackPro"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                  className="h-12 text-base"
                  required
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="description" className="text-base font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of your product and its main purpose..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="h-24 text-base"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="features" className="text-base font-medium">
                  Add Features
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="features"
                    placeholder="e.g., calendar, chat, time tracking"
                    value={currentFeature}
                    onChange={e => setCurrentFeature(e.target.value)}
                    onKeyDown={handleFeatureKeyDown}
                    className="h-12 text-base"
                  />
                  <Button
                    type="button"
                    onClick={addFeature}
                    size="icon"
                    className="h-12 w-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-base font-medium">Features ({userFeatures.length})</Label>
                <div className="flex flex-wrap gap-2 min-h-[48px] items-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2">
                  {userFeatures.length > 0 ? (
                    userFeatures.map((feature: string) => (
                      <Badge
                        key={feature}
                        className="text-base px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 flex items-center gap-2"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(feature)}
                          className="ml-1 text-slate-400 hover:text-red-500"
                          aria-label={`Remove ${feature}`}
                        >
                          ×
                        </button>
                      </Badge>
                    ))
                  ) : (
                    <span className="text-slate-400 text-sm">No features added yet</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={!productName.trim() || userFeatures.length === 0 || isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="h-5 w-5 mr-3" />
                Find Similar Products
                <ArrowRight className="h-5 w-5 ml-3" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 