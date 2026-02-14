import LoadingSkeleton from '@/components/LoadingSkeleton'

export default function RankingLoading() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-8">
        <LoadingSkeleton className="h-16" />
      </div>
      <div className="glass-card mb-8">
        <LoadingSkeleton className="h-12" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <LoadingSkeleton key={i} className="h-64" />
        ))}
      </div>
    </div>
  )
}
