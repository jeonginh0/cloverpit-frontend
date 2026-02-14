export interface Player {
  id: string
  pubgName: string
  discordName: string
  pubgId?: string
  stats: PlayerStats
  score: number
  createdAt: string
  updatedAt: string
}

export interface PlayerStats {
  kills: number
  deaths: number
  kd: number
  averageDamage: number
  totalMatches: number
  wins: number
  top10: number
  
  // 경쟁전 통계
  rankedMatches: number
  rankedKd: number
  rankedAvgDamage: number
  rankedWins: number
  
  // 일반전 통계
  normalMatches: number
  normalKd: number
  normalAvgDamage: number
  
  // 모드별
  soloMatches: number
  duoMatches: number
  squadMatches: number
  
  // 무기 통계
  weaponStats?: Record<string, WeaponStat>
}

export interface WeaponStat {
  kills: number
  damage: number
  uses: number
}

export interface Match {
  id: string
  playerId: string
  playerName: string
  gameMode: string // solo, duo, squad
  matchType: string // ranked, normal
  kills: number
  deaths: number
  damage: number
  placement: number
  timeSurvived: number
  participants?: string[] // 참가자 닉네임 목록
  weaponKills?: Record<string, number> // 무기별 킬 수
  createdAt: string
}

export interface Application {
  id: string
  pubgName: string
  discordName: string
  age: number
  introduction: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

export interface ClanStats {
  totalMembers: number
  avgKD: number
  avgDamage: number
  totalMatches: number
}
