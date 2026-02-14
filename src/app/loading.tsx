import LoadingSkeleton from '@/components/LoadingSkeleton'

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="space-y-8">
        <LoadingSkeleton className="h-32" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LoadingSkeleton className="h-64" />
          <LoadingSkeleton className="h-64" />
          <LoadingSkeleton className="h-64" />
        </div>
      </div>
    </div>
  )
}
