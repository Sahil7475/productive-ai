import { ProductList } from '@/components/product/ProductList';

export default function SimilarProductsSection({
  isSearched,
  products,
  productName,
  currentPage,
  itemsPerPage,
  goToPage,
  nextPage,
  prevPage,
  totalPages,
  startIndex,
  endIndex,
}: any) {
  return (
    <>
      {/* Results Section */}
      {isSearched && products.length === 0 && (
        <div className="text-center text-lg text-slate-500 dark:text-slate-400 py-12">
          No similar products found. Try different features or keywords.
        </div>
      )}
      {isSearched && products.length > 0 && (
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Similar Products Found</h2>
            <p className="text-slate-600 dark:text-slate-400">
              {products.length} products similar to "{productName}" based on feature analysis
            </p>
          </div>
          <ProductList
            products={products}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            goToPage={goToPage}
            nextPage={nextPage}
            prevPage={prevPage}
            totalPages={totalPages}
            startIndex={startIndex}
            endIndex={endIndex}
          />
        </div>
      )}
    </>
  );
} 