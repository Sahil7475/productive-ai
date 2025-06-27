"use client";
import { Product } from "@/lib/data";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Users, Calendar, TrendingUp, Github, ExternalLink, Zap, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductStats } from "./ProductStats";
import { ProductFeatures } from "./ProductFeatures";

export function CompareProductDetails({ product }: { product: Product }) {
  const similarityColor =
    product.similarity >= 8 ? "text-green-600" : product.similarity >= 6 ? "text-yellow-600" : "text-red-600";
  const similarityBg =
    product.similarity >= 8 ? "bg-green-500" : product.similarity >= 6 ? "bg-yellow-500" : "bg-red-500";

  return (
    <>
      {/* Product Header */}
      <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm mb-8">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="relative">
              <Image
                src={product.logo || "/placeholder.svg"}
                alt={`${product.name} logo`}
                width={80}
                height={80}
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -top-2 -right-2 h-6 w-6 bg-green-500 rounded-full border-3 border-white dark:border-slate-900"></div>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 dark:from-slate-100 dark:via-indigo-100 dark:to-slate-100 bg-clip-text text-transparent mb-2">
                  {product.name}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  {product.description}
                </p>
              </div>
              <ProductStats product={product} />
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Similarity Score Card */}
      <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 mb-8">
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-5xl font-bold ${similarityColor} mb-2`}>{product.similarity.toFixed(1)}</div>
            <div className="text-2xl font-medium text-slate-600 dark:text-slate-400 mb-4">out of 10</div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mb-4">
              <div
                className={`${similarityBg} h-3 rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${(product.similarity / 10) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Match with your product concept</p>
          </div>
        </CardContent>
      </Card>
      {/* Features Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Overlapping Features */}
        <Card className="border-0 shadow-xl bg-white dark:bg-slate-900">
          <CardContent>
            <ProductFeatures product={product} />
          </CardContent>
        </Card>
        {/* Missing Features */}
        <Card className="border-0 shadow-xl bg-white dark:bg-slate-900">
          <CardContent>
            <div className="min-h-[44px] pt-1 border-t border-slate-100 dark:border-slate-800 mt-2 mb-3 flex flex-col justify-center">
              <p className="text-xs text-slate-500 mb-1 mt-1">Missing features:</p>
              <div className="flex flex-wrap gap-1">
                {product.features.missing.length > 0 ? (
                  product.features.missing.slice(0, 2).map((feature) => (
                    <Badge
                      key={feature}
                      className="text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    >
                      {feature}
                    </Badge>
                  ))
                ) : (
                  <div className="w-12 h-5" />
                )}
                {product.features.missing.length > 2 && (
                  <Badge className="text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                    +{product.features.missing.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Competitive Analysis Summary */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50">
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {product.features.overlapping.length}
                </div>
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Shared Features</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-red-600 mb-1">{product.features.missing.length}</div>
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Your Advantages</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
                <div className={`text-2xl font-bold ${similarityColor} mb-1`}>
                  {product.similarity.toFixed(1)}/10
                </div>
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Overall Match</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
} 