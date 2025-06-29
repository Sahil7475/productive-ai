"use client"

import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Target,
} from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { useProductContext } from '@/components/context/ProductContext'
import CompareHeader from '@/components/compare/CompareHeader'
import SimilarityScoreCard from '@/components/compare/SimilarityScoreCard'
import GrowthStatsCard from '@/components/compare/GrowthStatsCard'
import FeaturesSection from '@/components/compare/FeaturesSection'
import CompetitiveSummary from '@/components/compare/CompetitiveSummary'
import CodeMatchesSection from '@/components/compare/CodeMatchesSection'

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
                <CompareHeader product={product} />
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:row-span-2">
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
                  <SimilarityScoreCard similarity={product.similarity} />
                  <Button
                    onClick={() => window.open(product.github, "_blank")}
                    className="w-full bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View on GitHub
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
              {/* Growth Stats Card */}
              <GrowthStatsCard growth={product.growth} />
            </div>
            {/* Features Analysis */}
            <div className="lg:col-span-2 space-y-8">
              <FeaturesSection features={product.features} />
              <CompetitiveSummary features={product.features} similarity={product.similarity} />
              <CodeMatchesSection code_matches={product.code_matches || []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}