export default function LoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`glass-card animate-pulse ${className}`}>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  )
}
