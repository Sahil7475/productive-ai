import Image from "next/image";
import { Star, Users, Calendar, TrendingUp, GitFork } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CompareHeader({ product }: { product: any }) {
  return (
    <div className="flex flex-col md:flex-row items-start gap-6">
      <div className="relative">
        <Image
          src={product.logo || "/placeholder.svg"}
          alt={`${product.name} logo`}
          width={80}
          height={80}
          className="rounded-2xl shadow-lg"
        />
        <div className={`absolute -top-2 -right-2 h-6 w-6 rounded-full border-3 border-white dark:border-slate-900 ${product.archived ? 'bg-yellow-400' : 'bg-green-500'}`}></div>
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
          
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-medium"> {product.stars ? product.stars.toLocaleString() : '0'} stars</span>
              
               </div>
        
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-indigo-500" />
            <span className="font-medium">
              {typeof product.contributors === 'number' ? `${product.contributors.toLocaleString()} contributors` : 'N/A'}
            </span>
          </div>
          <div className="flex items-center gap-2">
        <GitFork className="h-4 w-4" />
        {product.forks ? product.forks.toLocaleString() : '0'}
      </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-500" />
            <span className="font-medium">
              {product.createdAt ? new Date(product.createdAt).getFullYear() : "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="font-medium">
              {product.growth && product.growth.growth_score > 5 ? "Growing" : "Stable"}
            </span>
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
  );
} 