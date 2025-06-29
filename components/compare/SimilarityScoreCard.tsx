export default function SimilarityScoreCard({ similarity }: { similarity: number }) {
  const similarityColor =
    similarity >= 8 ? "text-green-600" : similarity >= 6 ? "text-yellow-600" : "text-red-600";
  const similarityBg =
    similarity >= 8 ? "bg-green-500" : similarity >= 6 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="text-center">
      <div className={`text-5xl font-bold ${similarityColor} mb-2`}>
        {Number.isInteger(similarity) ? similarity : similarity.toFixed(1)}
      </div>
      <div className="text-2xl font-medium text-slate-600 dark:text-slate-400 mb-4">out of 10</div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mb-4">
        <div
          className={`${similarityBg} h-3 rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${(similarity / 10) * 100}%` }}
        ></div>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400">Match with your product concept</p>
    </div>
  );
} 