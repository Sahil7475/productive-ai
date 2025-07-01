"use client";
import { Star, Users, Calendar } from "lucide-react";
import { Product } from "@/lib/data";

export function ProductStats({ product }: { product: Product }) {
  return (
    <div className="min-h-[28px] flex items-center gap-4 text-xs text-slate-500 mb-2">
      {product.stars ? (
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3" />
          {product.stars.toLocaleString()}
        </div>
      ) : <div className="w-8" />}
      <div className="flex items-center gap-1">
        <Users className="h-3 w-3" />
        {typeof product.contributors === 'number'
          ? `${product.contributors.toLocaleString()} contributors`
          : (product.forks ? `${product.forks.toLocaleString()} forks` : 'N/A')}
      </div>
      
    </div>
  );
} 