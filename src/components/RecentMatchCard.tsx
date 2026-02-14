'use client'

import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Trophy, Skull, Activity } from 'lucide-react'

interface Match {
  _id: string
  playerName: string
  kills: number
  damage: number
  placement: number
  createdAt: string
  gameMode?: string
  matchType?: string
}

interface RecentMatchCardProps {
  match: Match
}

export default function RecentMatchCard({ match }: RecentMatchCardProps) {
  const placementColor = match.placement <= 10 ? 'text-yellow-600' : 'text-gray-600'

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass-card"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h4 className="font-bold text-lg text-gray-800">{match.playerName}</h4>
            <span className="text-xs text-gray-500">
              {format(new Date(match.createdAt), 'MM월 dd일 HH:mm', { locale: ko })}
            </span>
            {match.matchType && (
              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                match.matchType === 'ranked' 
                  ? 'bg-red-100 text-red-700' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {match.matchType === 'ranked' ? '경쟁전' : '일반전'}
              </span>
            )}
            {match.gameMode && (
              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                match.gameMode === 'solo' 
                  ? 'bg-purple-100 text-purple-700' 
                  : match.gameMode === 'duo'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-orange-100 text-orange-700'
              }`}>
                {match.gameMode === 'solo' ? 'Solo' : match.gameMode === 'duo' ? 'Duo' : 'Squad'}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Trophy className={`w-4 h-4 ${placementColor}`} />
              <span className="text-sm text-gray-600">
                #{match.placement}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Skull className="w-4 h-4 text-red-500" />
              <span className="text-sm text-gray-600">
                {match.kills} Kills
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">
                {match.damage.toFixed(0)} DMG
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className={`text-2xl font-bold ${placementColor}`}>
            #{match.placement}
          </div>
          <div className="text-xs text-gray-500">순위</div>
        </div>
      </div>
    </motion.div>
  )
}
