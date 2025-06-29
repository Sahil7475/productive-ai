"use client";
import { Product } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, ExternalLink } from "lucide-react";
import { useProductContext } from "@/components/context/ProductContext";
import { ProductStats } from "./ProductStats";
import { ProductFeatures } from "./ProductFeatures";

export function ProductCard({ product, index, startIndex }: { product: Product, index: number, startIndex: number }) {
  const { setCurrentCompareProduct } = useProductContext();
  return (
    <div className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white dark:bg-slate-900 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
      <div className="p-6 flex flex-col flex-1 justify-between">
        {/* Header Section */}
        <div className="flex items-start gap-3 mb-2">
          <div className="relative">
            <Image
              src={product.logo || "/placeholder.svg"}
              alt={`${product.name} logo`}
              width={48}
              height={48}
              className="rounded-xl shadow-md bg-white"
            />
            <div className={`absolute -top-1 -right-1 h-4 w-4 rounded-full border-2 border-white dark:border-slate-900
  ${product.archived ? 'bg-yellow-400' : 'bg-green-500'}`}></div>
          
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {product.name}
            </h3>
            {product.owner && (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                by {product.owner}
              </p>
            )}
            <div className="flex items-center gap-2 mt-1">
              <Badge className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0">
              {Number.isInteger(product.similarity)
  ? product.similarity
  : product.similarity.toFixed(1)}
/10 match
              </Badge>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <TrendingUp className="h-3 w-3" />#{startIndex + index + 1}
              </div>
            </div>
          </div>
        </div>
        {/* Description Section */}
        <div className="min-h-[48px] mb-2 flex items-center">
          {product.description ? (
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 w-full">
              {product.description}
            </p>
          ) : (
            <div className="w-full h-5" />
          )}
        </div>
        {/* Topics Section */}
        <div className="min-h-[32px] mb-2 flex items-center">
          {product.topics && product.topics.length > 0 ? (
            <div className="flex flex-wrap gap-1 w-full">
              {product.topics.slice(0, 3).map((topic) => (
                <Badge
                  key={topic}
                  variant="outline"
                  className="text-xs bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                >
                  {topic}
                </Badge>
              ))}
              {product.topics.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{product.topics.length - 3} more
                </Badge>
              )}
            </div>
          ) : (
            <div className="w-full h-5" />
          )}
        </div>
        {/* Stats Section */}
        <ProductStats product={product} />
        {/* Matching Features Section */}
        <ProductFeatures product={product} />
        {/* Button Section */}
        <div className="flex gap-2 pt-2 mt-auto">
          <Link
            href={`/compare/${encodeURIComponent(product.id)}`}
            className="flex-1"
            onClick={() => setCurrentCompareProduct(product)}
          >
            <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0">
              Compare
            </Button>
          </Link>
          <Button
            variant="outline"
            size="icon"
            onClick={() => window.open(product.github, "_blank")}
            className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
} 