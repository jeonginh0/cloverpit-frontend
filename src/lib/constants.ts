// API 응답 타입 상수
export const API_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
} as const

// 정렬 옵션
export const SORT_OPTIONS = {
  SCORE: 'score',
  KD: 'kd',
  AVERAGE_DAMAGE: 'averageDamage',
  TOTAL_MATCHES: 'totalMatches',
} as const

// 정렬 순서
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
} as const

// 애플리케이션 상태
export const APPLICATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const

// 페이지 크기
export const PAGE_SIZES = {
  SMALL: 5,
  MEDIUM: 10,
  LARGE: 20,
} as const

// 랭크 색상 매핑
export const RANK_COLORS = {
  1: {
    gradient: 'from-yellow-400 to-yellow-600',
    text: 'text-yellow-600',
    bg: 'bg-yellow-500',
  },
  2: {
    gradient: 'from-gray-300 to-gray-500',
    text: 'text-gray-600',
    bg: 'bg-gray-500',
  },
  3: {
    gradient: 'from-orange-400 to-orange-600',
    text: 'text-orange-600',
    bg: 'bg-orange-500',
  },
} as const

// 네비게이션 아이템
export const NAV_ITEMS = [
  { href: '/', label: '홈' },
  { href: '/about', label: '클랜 소개' },
  { href: '/ranking', label: '랭킹' },
  { href: '/apply', label: '가입 신청' },
  { href: '/admin', label: '관리자' },
] as const

// 통계 카드 색상
export const STATS_COLORS = {
  PURPLE: 'purple',
  BLUE: 'blue',
  GREEN: 'green',
  ORANGE: 'orange',
} as const

// 에러 메시지
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 오류가 발생했습니다.',
  AUTH_FAILED: '인증에 실패했습니다.',
  NOT_FOUND: '요청한 데이터를 찾을 수 없습니다.',
  INTERNAL_ERROR: '서버 오류가 발생했습니다.',
  INVALID_INPUT: '입력 값이 올바르지 않습니다.',
} as const

// 성공 메시지
export const SUCCESS_MESSAGES = {
  APPLICATION_SUBMITTED: '가입 신청이 완료되었습니다!',
  PLAYER_ADDED: '클랜원이 추가되었습니다.',
  PLAYER_DELETED: '클랜원이 삭제되었습니다.',
  STATS_REFRESHED: '전적이 갱신되었습니다.',
} as const

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth-token',
  AUTH_STORAGE: 'auth-storage',
} as const

// 타임아웃 (ms)
export const TIMEOUTS = {
  API_REQUEST: 30000,
  DEBOUNCE: 300,
  ANIMATION: 500,
} as const

// 쿼리 키
export const QUERY_KEYS = {
  CLAN_STATS: 'clan-stats',
  TOP_RANKINGS: 'top-rankings',
  RANKINGS: 'rankings',
  PLAYER: 'player',
  PLAYER_MATCHES: 'player-matches',
  RECENT_MATCHES: 'recent-matches',
  APPLICATIONS: 'applications',
  ADMIN_PLAYERS: 'admin-players',
} as const
