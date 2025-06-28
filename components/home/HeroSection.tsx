import LogoCircle from '@/components/common/LogoCircle';
import { Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative">
      {/* Logo in Hero Section, top right */}
      <div className="absolute top-0 right-0 z-10">
        <LogoCircle />
      </div>
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
    </div>
  );
} 