import Link from 'next/link'
import { Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="glass-card text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
            <Search className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">페이지를 찾을 수 없습니다</h2>
        <p className="text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <Link href="/">
          <button className="gradient-button">
            홈으로 돌아가기
          </button>
        </Link>
      </div>
    </div>
  )
}
