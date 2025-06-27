"use client";
import { Product } from "@/lib/data";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo } from "react";

interface ProductListProps {
  products: Product[];
  currentPage: number;
  itemsPerPage: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  totalPages: number;
  startIndex: number;
  endIndex: number;
}

export function ProductList({ products, currentPage, itemsPerPage, goToPage, nextPage, prevPage, totalPages, startIndex, endIndex }: ProductListProps) {
  const currentResults = useMemo(() => products.slice(startIndex, endIndex), [products, startIndex, endIndex]);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentResults.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} startIndex={startIndex} />
        ))}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            variant="outline"
            onClick={prevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  onClick={() => goToPage(pageNum)}
                  className="w-10 h-10 p-0"
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          <Button
            variant="outline"
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
      {/* Results Summary */}
      {totalPages > 1 && (
        <div className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4">
          Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length} results
        </div>
      )}
    </>
  );
} 