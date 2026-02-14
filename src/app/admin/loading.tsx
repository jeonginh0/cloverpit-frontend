export default function AdminLoading() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="glass-card">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  )
}
