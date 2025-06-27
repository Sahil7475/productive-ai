"use client"

import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle,
  XCircle,
  Star,
  Users,
  Calendar,
  TrendingUp,
  Zap,
  Target,
  Code,
  FileText,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { useProductContext } from '@/components/context/ProductContext'

interface ComparePageProps {
  params: Promise<{
    id: string
  }>
}

export default function ComparePage({ params }: ComparePageProps) {
  const { currentCompareProduct } = useProductContext();

  if (!currentCompareProduct) {
    notFound();
  }
  const product = currentCompareProduct;

  const similarityColor =
    product.similarity >= 8 ? "text-green-600" : product.similarity >= 6 ? "text-yellow-600" : "text-red-600"
  const similarityBg =
    product.similarity >= 8 ? "bg-green-500" : product.similarity >= 6 ? "bg-yellow-500" : "bg-red-500"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-6 hover:bg-indigo-50 dark:hover:bg-indigo-950">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Search
              </Button>
            </Link>
            {/* Product Header */}
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm mb-8">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="relative">
                    <Image
                      src={product.logo || "/placeholder.svg"}
                      alt={`${product.name} logo`}
                      width={80}
                      height={80}
                      className="rounded-2xl shadow-lg"
                    />
                    <div className="absolute -top-2 -right-2 h-6 w-6 bg-green-500 rounded-full border-3 border-white dark:border-slate-900"></div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 dark:from-slate-100 dark:via-indigo-100 dark:to-slate-100 bg-clip-text text-transparent mb-2">
                        {product.name}
                      </h1>
                      <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      {product.stars && (
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">{product.stars.toLocaleString()} stars</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-indigo-500" />
                        <span className="font-medium">
                          {typeof product.contributors === 'number' ? `${product.contributors.toLocaleString()} contributors` : 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-500" />
                        <span className="font-medium">2024</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="font-medium">Growing</span>
                      </div>
                    </div>
                    {/* Topics */}
                    {product.topics && product.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {product.topics.map((topic: string) => (
                          <Badge
                            key={topic}
                            variant="outline"
                            className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Similarity Score Card */}
            <Card className="border-0 shadow-xl bg-white dark:bg-slate-900">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Target className="h-4 w-4 text-white" />
                  </div>
                  Similarity Score
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className={`text-5xl font-bold ${similarityColor} mb-2`}>{product.similarity.toFixed(1)}</div>
                  <div className="text-2xl font-medium text-slate-600 dark:text-slate-400 mb-4">out of 10</div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mb-4">
                    <div
                      className={`${similarityBg} h-3 rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${(product.similarity / 10) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Match with your product concept</p>
                </div>
                <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <Button
                    onClick={() => window.open(product.github, "_blank")}
                    className="w-full bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View on GitHub
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                  {/* <Button variant="outline" className="w-full">
                    <Zap className="h-4 w-4 mr-2" />
                    Add to Watchlist
                  </Button> */}
                </div>
              </CardContent>
            </Card>
            {/* Features Analysis */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overlapping Features */}
              <Card className="border-0 shadow-xl bg-white dark:bg-slate-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-green-600">
                    <div className="h-8 w-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    Overlapping Features
                    <Badge variant="secondary" className="ml-auto">
                      {product.features.overlapping.length}
                    </Badge>
                  </CardTitle>
                  <CardDescription>Features that both products share - your competitive advantages</CardDescription>
                </CardHeader>
                <CardContent>
                  {product.features.overlapping.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.features.overlapping.map((feature: string) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                        >
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="font-medium text-green-800 dark:text-green-200">{feature}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 italic text-center py-8">No overlapping features found</p>
                  )}
                </CardContent>
              </Card>
              {/* Missing Features */}
              <Card className="border-0 shadow-xl bg-white dark:bg-slate-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-red-600">
                    <div className="h-8 w-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                      <XCircle className="h-4 w-4 text-red-600" />
                    </div>
                    Missing Features
                    <Badge variant="secondary" className="ml-auto">
                      {product.features.missing.length}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Features your product has that this product lacks - your unique selling points
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {product.features.missing.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.features.missing.map((feature: string) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
                        >
                          <XCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                          <span className="font-medium text-red-800 dark:text-red-200">{feature}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 italic text-center py-8">No missing features identified</p>
                  )}
                </CardContent>
              </Card>
              {/* Analysis Summary */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    Competitive Analysis Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {product.features.overlapping.length}
                      </div>
                      <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Shared Features</div>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
                      <div className="text-2xl font-bold text-red-600 mb-1">{product.features.missing.length}</div>
                      <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Your Advantages</div>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
                      <div className={`text-2xl font-bold ${similarityColor} mb-1`}>
                        {product.similarity.toFixed(1)}/10
                      </div>
                      <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Overall Match</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Code Matches */}
              {product.code_matches && product.code_matches.length > 0 && (
                <Card className="border-0 shadow-xl bg-white dark:bg-slate-900">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-blue-600">
                      <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <Code className="h-4 w-4 text-blue-600" />
                      </div>
                      Code Matches
                      <Badge variant="secondary" className="ml-auto">
                        {product.code_matches.length}
                      </Badge>
                    </CardTitle>
                    <CardDescription>Files that contain code related to your features</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {product.code_matches.map((match: any, index: number) => (
                        <div
                          key={index}
                          className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-blue-500" />
                              <span className="font-medium text-slate-900 dark:text-slate-100">
                                {match.file_name}
                              </span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(match.file_url, "_blank")}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </div>
                          {match.snippet && (
                            <div className="bg-slate-100 dark:bg-slate-700 rounded p-3 text-sm font-mono text-slate-700 dark:text-slate-300 max-h-32 overflow-y-auto">
                              {match.snippet.length > 200 
                                ? `${match.snippet.substring(0, 200)}...` 
                                : match.snippet
                              }
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}