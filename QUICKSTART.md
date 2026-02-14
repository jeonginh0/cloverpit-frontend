# 프론트엔드 빠른 시작 가이드

## 🚀 설치 및 실행

### 1단계: 패키지 설치
```bash
cd frontend
npm install
```

### 2단계: 환경 변수 설정
```bash
cp .env.example .env.local
```

`.env.local` 파일을 열어 수정:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3단계: 개발 서버 실행
```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속

---

## 📦 프로덕션 빌드

```bash
npm run build
npm start
```

---

## 🌐 Vercel 배포

### 방법 1: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
```

### 방법 2: GitHub 연동
1. GitHub에 코드 푸시
2. Vercel 대시보드에서 프로젝트 Import
3. `frontend` 디렉토리를 Root Directory로 설정
4. 환경 변수 추가:
   - `NEXT_PUBLIC_API_URL`: 백엔드 API URL

---

## 🎨 커스터마이징

### 색상 변경
`tailwind.config.ts`:
```typescript
colors: {
  primary: {
    500: '#YOUR_COLOR', // 여기를 수정
  },
}
```

### 클랜 로고 변경
`components/layout/Header.tsx`:
```typescript
<div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg">
  <span className="text-white font-bold text-xl">C</span> {/* 여기를 수정 */}
</div>
```

---

## 🔧 트러블슈팅

### "Module not found" 에러
```bash
rm -rf node_modules package-lock.json
npm install
```

### Hydration 에러
- `'use client'` 디렉티브 확인
- `typeof window !== 'undefined'` 체크

### 빌드 에러
```bash
npm run build
# 에러 메시지를 확인하고 해당 파일 수정
```

---

## 📱 모바일 테스트

```bash
# 로컬 네트워크에서 접속
npm run dev -- -H 0.0.0.0
# 모바일에서 http://YOUR_IP:3000 접속
```

---

## ⚡ 성능 최적화 팁

1. **이미지 최적화**: Next.js Image 컴포넌트 사용
2. **Code Splitting**: 동적 import 사용
3. **React Query 캐싱**: staleTime 조정
4. **Bundle 분석**: `npm run build` 후 .next/analyze 확인

---

## 🐛 알려진 이슈

없음 (현재 안정 버전)

---

## 💡 개발 팁

- 컴포넌트 재사용 우선
- Tailwind 유틸리티 클래스 활용
- TypeScript strict 모드 유지
- React Query로 서버 상태 관리
- Zustand로 클라이언트 상태 관리
