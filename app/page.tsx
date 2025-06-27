"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  X,
  ExternalLink,
  TrendingUp,
  Sparkles,
  Target,
  ArrowRight,
  Star,
  Users,
  Calendar,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { type Product, transformGitHubToProduct, type GitHubRepository } from "@/lib/data"
import { Header } from "@/components/header"
import { useProductContext } from '@/components/context/ProductContext'
import { ProductList } from '@/components/product/ProductList'

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
  } = useProductContext();

  const router = useRouter();
  const [productName, setProductName] = useState(lastProductName);
  const [description, setDescription] = useState(lastDescription);
  const [currentFeature, setCurrentFeature] = useState("")
  const [isSearched, setIsSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)
  const [growthStats, setGrowthStats] = useState<Record<string, any>>({});

  const totalPages = Math.ceil(products.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentResults = products.slice(startIndex, endIndex)

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

  const currentResultsWithGrowth = productsWithGrowth.slice(startIndex, endIndex);

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

  /* const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (productName.trim() && userFeatures.length > 0) {
      setIsLoading(true)
      setLastProductName(productName)
      setLastDescription(description)
      try {
        const response = await fetch("/api/github-search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description,
            features: userFeatures,
          }),
        })
        const data = await response.json()
        if (data.repositories && Array.isArray(data.repositories)) {
          const transformedProducts = data.repositories
            .map((repo: GitHubRepository) => transformGitHubToProduct(repo, userFeatures))
            .sort((a: Product, b: Product) => b.similarity - a.similarity)
          setProducts(transformedProducts)
          setUserFeatures(userFeatures)
          setIsSearched(true)
          setCurrentPage(1)
        } else {
          setProducts([])
          setIsSearched(false)
        }
      } catch (error) {
        setProducts([])
        setIsSearched(false)
      } finally {
        setIsLoading(false)
      }
    }
  } */

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (productName.trim() && userFeatures.length > 0) {
        setIsLoading(true);
        setLastProductName(productName);
        setLastDescription(description);
        try {
          // 1️⃣ Call GitHub API first
          const githubResponse = await fetch("/api/github-search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              features: userFeatures,
              description: description
            }),
          });
          const githubData = await githubResponse.json();
    
          console.log("githubData: API RESPONSE :- " + JSON.stringify(githubData));


          // 2️⃣ If you got repos, call OpenAI scoring API
          if (githubData.repositories && Array.isArray(githubData.repositories) && githubData.repositories.length > 0) {
            const openAIResponse = await fetch("/api/cohere-score", {
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
    
            const scoredData = await openAIResponse.json();
    
            console.log("scoredData: API RESPONSE :- " + JSON.stringify(scoredData)); 

            // 3️⃣ Transform with your helper — use ai_similarity, not random!
            const transformedProducts = scoredData.results
              .map((repo: GitHubRepository) => transformGitHubToProduct(repo, userFeatures, repo.ai_similarity))
              .sort((a: Product, b: Product) => b.similarity - a.similarity);
    
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
    


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addFeature()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Productive AI - Product Analysis
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 dark:from-slate-100 dark:via-indigo-100 dark:to-slate-100 bg-clip-text text-transparent mb-6">
              Discover Similar Products
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Find competing products, analyze feature overlap, and get insights to build better products
            </p>
          </div>

          {/* Main Form Card */}
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
                        onChange={handleProductNameChange}
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
                        onChange={handleDescriptionChange}
                        rows={4}
                        className="text-base resize-none"
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
                          onChange={(e) => setCurrentFeature(e.target.value)}
                          onKeyPress={handleKeyPress}
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

                    {userFeatures.length > 0 && (
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Features ({userFeatures.length})</Label>
                        <div className="flex flex-wrap gap-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700">
                          {userFeatures.map((feature) => (
                            <Badge
                              key={feature}
                              className="flex items-center gap-2 px-3 py-2 text-sm bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-200 dark:hover:bg-indigo-900/70"
                            >
                              {feature}
                              <button
                                type="button"
                                onClick={() => removeFeature(feature)}
                                className="hover:bg-indigo-200 dark:hover:bg-indigo-800 rounded-full p-0.5 transition-colors"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
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
                products={productsWithGrowth}
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
        </div>
      </div>
    </div>
  )
}
