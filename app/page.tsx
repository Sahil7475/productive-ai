"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { type Product, transformGitHubToProduct, type GitHubRepository } from "@/lib/data"
import { Header } from "@/components/layout/Header"
import { useProductContext } from '@/components/context/ProductContext'
import HeroSection from '@/components/home/HeroSection'
import ProductFormCard from '@/components/home/ProductFormCard'
import SimilarProductsSection from '@/components/home/SimilarProductsSection'
import Footer from "@/components/layout/Footer"

export default function HomePage() {
  const {
    products,
    setProducts,
    currentCompareProduct,
    setCurrentCompareProduct,
    userFeatures,
    setUserFeatures,
    lastProductName,
    setLastProductName,
    lastDescription,
    setLastDescription,
    currentPage,
    setCurrentPage,
  } = useProductContext();

  const router = useRouter();
  const [productName, setProductName] = useState(lastProductName);
  const [description, setDescription] = useState(lastDescription);
  const [currentFeature, setCurrentFeature] = useState("")
  const [isSearched, setIsSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [itemsPerPage] = useState(12)
  const [growthStats, setGrowthStats] = useState<Record<string, any>>({});

  const totalPages = Math.ceil(products.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  useEffect(() => {
    setCurrentCompareProduct(null)
    if (products.length > 0) setIsSearched(true)
  }, [])

  // Fetch growth stats for current page when products or currentPage changes
  useEffect(() => {
    if (products.length === 0) return;
    const pageProducts = products.slice(startIndex, endIndex);
    const repos = pageProducts.map((p) => ({ owner: p.owner, repo_name: p.name }));
    fetch("/api/github-search/growth-stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repos }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          setGrowthStats((prev) => {
            const newStats = { ...prev };
            data.results.forEach((r: any) => {
              newStats[`${r.owner}/${r.repo_name}`] = r.growth;
            });
            return newStats;
          });
        }
      });
  }, [products, currentPage, startIndex, endIndex]);

  // Merge growth stats into products for display
  const productsWithGrowth = products.map((p) => {
    const key = `${p.owner}/${p.name}`;
    return growthStats[key] ? { ...p, growth: growthStats[key] } : p;
  });

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1)
    }
  }

  const addFeature = () => {
    if (currentFeature.trim() && !userFeatures.includes(currentFeature.trim())) {
      setUserFeatures([...userFeatures, currentFeature.trim()]);
      setCurrentFeature("");
    }
  }

  const removeFeature = (featureToRemove: string) => {
    setUserFeatures(userFeatures.filter((feature) => feature !== featureToRemove));
  }

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
    setLastProductName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    setLastDescription(e.target.value);
  };


    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (productName.trim() && userFeatures.length > 0) {
        setIsLoading(true);
        setLastProductName(productName);
        setLastDescription(description);
        try {
          
          const githubResponse = await fetch("/api/github-search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              features: userFeatures,
              description: description
            }),
          });


          const githubData = await githubResponse.json();
    
           if (githubData.repositories && Array.isArray(githubData.repositories) && githubData.repositories.length > 0) {
            const aiSimilarityScoreResponse = await fetch("/api/cohere-score", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userInput: {
                  description: description,
                  features: userFeatures,
                },
                repositories: githubData.repositories,
              }),
            });
    
            const scoredData = await aiSimilarityScoreResponse.json();
      
            const transformedProducts = scoredData.results
              .map((repo: GitHubRepository) => transformGitHubToProduct(repo, userFeatures, repo.ai_similarity))
              .sort((a: Product, b: Product) => {
                const aFeatureMatches = a.features.overlapping.length;
                const bFeatureMatches = b.features.overlapping.length;
                
                if (aFeatureMatches !== bFeatureMatches) {
                  return bFeatureMatches - aFeatureMatches;
                }
                
                return b.similarity - a.similarity;
              });
    
            setProducts(transformedProducts);
            setUserFeatures(userFeatures);
            setIsSearched(true);
            setCurrentPage(1);
          } else {
            setProducts([]);
            setIsSearched(false);
          }
        } catch (error) {
          console.error(error);
          setProducts([]);
          setIsSearched(false);
        } finally {
          setIsLoading(false);
        }
      }
    };
    


  const handleFeatureKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addFeature();
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      <Header />
    
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto relative">
          <HeroSection />
          <ProductFormCard
            productName={productName}
            setProductName={setProductName}
            description={description}
            setDescription={setDescription}
            currentFeature={currentFeature}
            setCurrentFeature={setCurrentFeature}
            userFeatures={userFeatures}
            addFeature={addFeature}
            removeFeature={removeFeature}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            handleFeatureKeyDown={handleFeatureKeyDown}
          />
          <SimilarProductsSection
            isSearched={isSearched}
            products={productsWithGrowth}
            productName={productName}
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
      </div>

      <Footer />

    </div>
  )
}
