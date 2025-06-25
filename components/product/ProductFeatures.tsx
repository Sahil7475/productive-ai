"use client";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/data";

export function ProductFeatures({ product }: { product: Product }) {
  return (
    <div className="min-h-[44px] pt-1 border-t border-slate-100 dark:border-slate-800 mt-2 mb-3 flex flex-col justify-center">
      <p className="text-xs text-slate-500 mb-1 mt-1">Matching features:</p>
      <div className="flex flex-wrap gap-1">
        {product.features.overlapping.length > 0 ? (
          product.features.overlapping.slice(0, 2).map((feature) => (
            <Badge
              key={feature}
              className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
            >
              {feature}
            </Badge>
          ))
        ) : (
          <div className="w-12 h-5" />
        )}
        {product.features.overlapping.length > 2 && (
          <Badge className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
            +{product.features.overlapping.length - 2} more
          </Badge>
        )}
      </div>
    </div>
  );
} 