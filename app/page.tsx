"use client"

import type React from "react"
import { useState } from "react"
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
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { searchProducts, type Product } from "@/lib/data"
import { Header } from "@/components/header"

export default function HomePage() {
  const [productName, setProductName] = useState("")
  const [description, setDescription] = useState("")
  const [features, setFeatures] = useState<string[]>([])
  const [currentFeature, setCurrentFeature] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [isSearched, setIsSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const addFeature = () => {
    if (currentFeature.trim() && !features.includes(currentFeature.trim())) {
      setFeatures([...features, currentFeature.trim()])
      setCurrentFeature("")
    }
  }

  const removeFeature = (featureToRemove: string) => {
    setFeatures(features.filter((feature) => feature !== featureToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (productName.trim() && features.length > 0) {
      setIsLoading(true)
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const searchResults = searchProducts(features)
      setResults(searchResults)
      setIsSearched(true)
      setIsLoading(false)
    }
  }

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
                        onChange={(e) => setProductName(e.target.value)}
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
                        onChange={(e) => setDescription(e.target.value)}
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

                    {features.length > 0 && (
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Features ({features.length})</Label>
                        <div className="flex flex-wrap gap-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700">
                          {features.map((feature) => (
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
                  disabled={!productName.trim() || features.length === 0 || isLoading}
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
          {isSearched && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Similar Products Found</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  {results.length} products similar to "{productName}" based on feature analysis
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((product, index) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white dark:bg-slate-900 hover:-translate-y-1 overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Image
                                src={product.logo || "/placeholder.svg"}
                                alt={`${product.name} logo`}
                                width={48}
                                height={48}
                                className="rounded-xl shadow-md"
                              />
                              <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {product.name}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0">
                                  {product.similarity.toFixed(1)}/10 match
                                </Badge>
                                <div className="flex items-center gap-1 text-xs text-slate-500">
                                  <TrendingUp className="h-3 w-3" />#{index + 1}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              4.{Math.floor(Math.random() * 9) + 1}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {Math.floor(Math.random() * 50) + 10}k
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              2024
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Link href={`/compare/${product.id}`} className="flex-1">
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
