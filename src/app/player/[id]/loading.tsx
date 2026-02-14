import LoadingSkeleton from '@/components/LoadingSkeleton'

export default function PlayerLoading() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <LoadingSkeleton className="h-96 mb-8" />
      <LoadingSkeleton className="h-80 mb-8" />
      <LoadingSkeleton className="h-96" />
    </div>
  )
}
