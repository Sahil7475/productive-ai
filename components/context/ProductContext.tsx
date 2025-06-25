"use client";
import React, { createContext, useContext, useState } from 'react';
import type { Product, GitHubRepository } from '@/lib/data';

interface ProductContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  currentCompareProduct: Product | null;
  setCurrentCompareProduct: (product: Product | null) => void;
  userFeatures: string[];
  setUserFeatures: (features: string[]) => void;
  lastProductName: string;
  setLastProductName: (name: string) => void;
  lastDescription: string;
  setLastDescription: (desc: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentCompareProduct, setCurrentCompareProduct] = useState<Product | null>(null);
  const [userFeatures, setUserFeatures] = useState<string[]>([]);
  const [lastProductName, setLastProductName] = useState<string>("");
  const [lastDescription, setLastDescription] = useState<string>("");

  return (
    <ProductContext.Provider value={{ products, setProducts, currentCompareProduct, setCurrentCompareProduct, userFeatures, setUserFeatures, lastProductName, setLastProductName, lastDescription, setLastDescription }}>
      {children}
    </ProductContext.Provider>
  );
};

export function useProductContext() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProductContext must be used within a ProductProvider');
  return ctx;
} 