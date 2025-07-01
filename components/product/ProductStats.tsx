"use client";
import { Star, Users, Calendar, GitFork } from "lucide-react";
import { Product } from "@/lib/data";

export function ProductStats({ product }: { product: Product }) {
  return (
    <div className="min-h-[28px] flex items-center gap-4 text-xs text-slate-500 mb-2">
     
      <div className="flex items-center gap-1">
          <Star className="h-3 w-3" />
          {typeof product.stars === 'number' ? product.stars.toLocaleString() + " stars" : 'N/A'}
      </div>

      <div className="flex items-center gap-1">
        <Users className="h-3 w-3" />
        {typeof product.contributors === 'number' ? product.contributors.toLocaleString() : 'N/A'}
      </div>

      <div className="flex items-center gap-1">
        <GitFork className="h-3 w-3" />
        {typeof product.forks === 'number' ? product.forks.toLocaleString() : 'N/A'}
      </div>

      
      <div className="flex items-center gap-1">
        <Calendar className="h-3 w-3" />
        {product.growth ? `Growth: ${product.growth.growth_score}/10` : '2024'}
      </div>
      
    </div>
  );
} 