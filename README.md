# gomdolbook-front 
goomdolbook은 사용자의 독서 활동 관리를 돕기 위해 만들어졌습니다. 주요 기능으로는 도서 검색, 개인 서재 및 사용자 정의 컬렉션으로 책 정리, 독서 진행 상황 기록, 독서 통계 확인 등이 있습니다.
[Gitbook 바로가기](https://sgs-organization-3.gitbook.io/gomdolbook-frontend/)

## 주요 기능

### 📚 책 검색
- ISBN, 제목, 저자명으로 책을 검색할 수 있습니다.
- 검색 결과에서는 책 표지, 제목, 저자, 출판사, 설명을 확인할 수 있습니다.   

### 📖 내 서재
- 읽고 있는 책, 읽을 책, 다 읽은 책 등 독서 상태에 따라 책을 분류하고 관리할 수 있습니다.
- 각 책의 독서 상태("읽는 중", "읽을 예정", "읽기 완료")를 쉽게 변경하고 저장할 수 있습니다.   

### 🗂️ 내 컬렉션
- 사용자가 직접 컬렉션을 만들어 책을 자유롭게 그룹화할 수 있습니다.
- 각 컬렉션에는 최대 4개의 책 표지 미리보기가 표시되어 내용을 쉽게 파악할 수 있습니다.
- 컬렉션에 책을 추가하거나 제거하는 기능을 제공합니다.   

### 📝 독서 기록
- "읽는 중" 또는 "읽기 완료" 상태의 책에 대해 상세한 독서 기록을 남길 수 있습니다.
- 독서 기록은 다음 세 가지 항목으로 나누어 작성할 수 있습니다:
  - 이 책은 무엇에 관한 책인가
  - 내용 해석하기
  - 비평하기
- 별점을 통해 책을 평가할 수 있습니다.
- TinyMCE 기반의 WYSIWYG 편집기를 제공하며, 자동 저장 기능으로 작성 중인 내용이 유실되는 것을 방지합니다.
  
### 📊 독서 통계 (Analytics)
- 독서를 완료한 책들을 달력 형태로 보여주어, 언제 어떤 책을 다 읽었는지 한눈에 확인할 수 있습니다.
- 달력에는 해당 날짜에 완료한 책의 제목, 표지, 평점이 표시됩니다.   

### 🔑 사용자 인증
- Keycloak을 통한 사용자 인증 시스템을 갖추고 있습니다.
- GitHub, Kakao, Google 계정을 이용한 소셜 로그인을 지원합니다.   
### 📱 UI/UX
- 반응형 디자인: 모바일, 태블릿 등 다양한 기기에서 최적화된 화면을 제공합니다.
- 토스트 및 모달: 작업 결과(성공/실패)를 알려주는 토스트 메시지와 로그인, 책 상세 정보, 확인창 등 다양한 상황에 맞는 모달창을 제공하여 사용자 편의성을 높입니다.
- 스켈레톤 로더: 데이터 로딩 중에는 스켈레톤 UI를 표시하여 사용자가 지루함을 느끼지 않도록 합니다.

## 기술 스택
- Core: React, TypeScript, Vite
- State Management: React Query (TanStack Query)
- Styling: Styled Components, Framer Motion (애니메이션)
- Routing: React Router
- HTTP Client: Axios
- Authentication: Keycloak
- Rich Text Editor: TinyMCE
- Testing: Vitest, Testing Library, MSW (Mock Service Worker)
- Linting/Formatting: ESLint, Prettier
- Deployment: Vercel
