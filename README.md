# CloverPit Frontend

한국 배틀그라운드(PUBG) 클랜 전용 웹 애플리케이션 - 프론트엔드

## 🎯 프로젝트 개요

CloverPit은 PUBG 클랜원들의 전적을 관리하고 랭킹을 시각화하는 현대적인 웹 애플리케이션입니다.

## 🛠 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 📁 프로젝트 구조

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── about/             # 클랜 소개 페이지
│   │   ├── admin/             # 관리자 페이지
│   │   ├── apply/             # 가입 신청 페이지
│   │   ├── player/[id]/       # 플레이어 상세 페이지
│   │   ├── ranking/           # 랭킹 페이지
│   │   ├── error.tsx          # 에러 페이지
│   │   ├── not-found.tsx      # 404 페이지
│   │   ├── loading.tsx        # 로딩 페이지
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   ├── page.tsx           # 메인 페이지
│   │   └── globals.css        # 글로벌 스타일
│   ├── components/            # 재사용 가능한 컴포넌트
│   │   ├── layout/           
│   │   │   ├── Header.tsx    # 헤더
│   │   │   └── Footer.tsx    # 푸터
│   │   ├── LoadingSkeleton.tsx
│   │   ├── RankCard.tsx
│   │   ├── RecentMatchCard.tsx
│   │   ├── StatsCard.tsx
│   │   └── Providers.tsx      # React Query Provider
│   ├── lib/
│   │   └── api.ts            # API 클라이언트
│   ├── store/
│   │   └── authStore.ts      # Zustand 인증 스토어
│   └── types/
│       └── index.ts          # TypeScript 타입 정의
├── public/                    # 정적 파일
├── .env.example              # 환경 변수 예시
├── next.config.js            # Next.js 설정
├── tailwind.config.ts        # Tailwind 설정
├── tsconfig.json             # TypeScript 설정
└── package.json
```

## 🎨 디자인 특징

### 현대적 UI/UX
- **Light Purple** 기본 테마
- **Glassmorphism** 효과 (backdrop-blur + 투명도)
- **Gradient Accent** 컬러
- 부드러운 **Hover & Scale** 애니메이션
- **Framer Motion** 페이지 전환
- 완전 **반응형** 디자인 (모바일 최적화)

### 컴포넌트 스타일
```css
/* 글래스모피즘 카드 */
.glass-card {
  @apply bg-white/10 backdrop-blur-xl border border-white/20 
         rounded-2xl p-6 shadow-xl hover:shadow-2xl 
         transition-all duration-300;
}

/* 그라디언트 버튼 */
.gradient-button {
  @apply bg-gradient-to-r from-purple-600 to-purple-400 
         hover:from-purple-700 hover:to-purple-500 
         text-white font-semibold py-3 px-6 rounded-xl 
         shadow-lg hover:shadow-xl transform hover:scale-105 
         transition-all duration-300;
}
```

## 🚀 시작하기

### 1. 패키지 설치
```bash
cd frontend
npm install
```

### 2. 환경 변수 설정
```bash
cp .env.example .env.local
```

`.env.local` 파일을 열어 백엔드 API URL을 설정하세요:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어주세요.

### 4. 프로덕션 빌드
```bash
npm run build
npm start
```

## 📄 주요 페이지

### 1. 메인 페이지 (`/`)
- 클랜 통계 요약 (총 클랜원, 평균 K/D, 평균 데미지, 총 플레이)
- TOP 5 랭킹 카드
- 최근 전적 미리보기

### 2. 클랜 소개 (`/about`)
- 클랜 개요 및 비전
- 클랜 가치관
- 활동 내용
- 가입 조건
- 목표

### 3. 랭킹 페이지 (`/ranking`)
- 전체 클랜원 랭킹
- 정렬 기능 (종합 점수, K/D, 평균 데미지, 플레이 수)
- 오름차순/내림차순 토글
- 그리드 레이아웃 (반응형)

### 4. 플레이어 상세 (`/player/[id]`)
- 플레이어 통계 카드
- 최근 전적 그래프 (Recharts)
- 상세 전적 테이블
- 게임별 킬, 데미지, 순위, 생존 시간

### 5. 가입 신청 (`/apply`)
- PUBG 닉네임 입력
- Discord 닉네임 입력
- 나이 (만 18세 이상)
- 자기소개
- 제출 완료 UI

### 6. 관리자 페이지 (`/admin`)
- JWT 기반 로그인
- 클랜원 추가/삭제
- 전적 수동 갱신 버튼
- 가입 신청 목록 확인
- 클랜원 관리 테이블

## 🔐 인증 시스템

### Zustand 기반 상태 관리
```typescript
// authStore.ts
interface AuthState {
  isAuthenticated: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
}
```

### JWT 토큰 관리
- LocalStorage에 토큰 저장
- Axios Interceptor로 자동 헤더 추가
- 새로고침 시 상태 유지 (persist)

## 📊 데이터 페칭

### React Query 설정
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
})
```

### API 클라이언트
```typescript
// lib/api.ts
export const api = {
  getClanStats: () => axios.get('/stats/clan'),
  getTopRankings: (limit: number) => axios.get(`/players/rankings?limit=${limit}`),
  getRankings: (sortBy, sortOrder) => axios.get('/players/rankings'),
  getPlayerDetail: (id) => axios.get(`/players/${id}`),
  submitApplication: (data) => axios.post('/applications', data),
  // ... 더 많은 API
}
```

## 🎯 랭킹 계산 공식

백엔드에서 처리되는 공식:
```
score = (KD × 0.5) + (averageDamage / 100 × 0.3) + (log(totalMatches) × 0.2)
```

## 📱 반응형 디자인

### 브레이크포인트
- **Mobile**: < 768px
- **Tablet**: 768px ~ 1024px
- **Desktop**: > 1024px

### 모바일 최적화
- 햄버거 메뉴 (모바일)
- 카드 기반 레이아웃
- 터치 제스처 지원
- 스크롤 최적화

## 🚀 Vercel 배포

### 1. Vercel CLI 설치
```bash
npm i -g vercel
```

### 2. 로그인
```bash
vercel login
```

### 3. 배포
```bash
cd frontend
vercel
```

### 4. 프로덕션 배포
```bash
vercel --prod
```

### 환경 변수 설정
Vercel 대시보드에서 환경 변수를 설정하세요:
- `NEXT_PUBLIC_API_URL`: 백엔드 API URL

## 🔧 환경 변수

### 필수 환경 변수
```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
```

## 📦 주요 의존성

```json
{
  "next": "14.1.0",
  "react": "^18.2.0",
  "framer-motion": "^11.0.3",
  "zustand": "^4.5.0",
  "@tanstack/react-query": "^5.17.19",
  "recharts": "^2.10.4",
  "axios": "^1.6.5",
  "lucide-react": "^0.323.0",
  "tailwindcss": "^3.4.1"
}
```

## 🎨 커스터마이징

### 색상 변경
`tailwind.config.ts`에서 primary 색상을 수정하세요:
```typescript
colors: {
  primary: {
    500: '#a855f7', // 원하는 색상으로 변경
    600: '#9333ea',
  },
}
```

### 폰트 변경
`app/layout.tsx`에서 폰트를 변경하세요:
```typescript
import { Inter, Roboto } from 'next/font/google'

const roboto = Roboto({ 
  subsets: ['latin'],
  weight: ['400', '700'],
})
```

## 🔍 SEO 최적화

### 메타데이터 설정
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: 'CloverPit - PUBG 클랜 관리',
  description: '한국 배틀그라운드 클랜 전용 전적 관리 시스템',
  keywords: 'PUBG, 배틀그라운드, 클랜, 전적, 랭킹',
}
```

## 🐛 트러블슈팅

### Hydration 에러
- `'use client'` 디렉티브 확인
- localStorage 사용 시 `typeof window !== 'undefined'` 체크

### API 연결 실패
- `.env.local` 파일 확인
- 백엔드 서버 실행 상태 확인
- CORS 설정 확인

## 📈 성능 최적화

- **Image Optimization**: Next.js Image 컴포넌트 사용
- **Code Splitting**: 동적 import 활용
- **React Query**: 효율적인 캐싱
- **Lazy Loading**: 컴포넌트 지연 로드

## 🤝 기여 가이드

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

MIT License

## 👨‍💻 개발자

CloverPit Development Team

## 📞 문의

프로젝트 관련 문의: [Discord 링크]

---

**⚠️ 주의사항**
- 프로덕션 환경에서는 반드시 환경 변수를 안전하게 관리하세요
- API 키는 절대 클라이언트 코드에 노출하지 마세요
- CORS 설정을 프로덕션 도메인에 맞게 조정하세요
