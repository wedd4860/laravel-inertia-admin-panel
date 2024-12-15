# Laravel Inertia Admin Panel

## 📋 프로젝트 개요
React와 Laravel 11을 기반으로 구축된 Inertia.js 스택의 관리자 대시보드 애플리케이션입니다.  
Typesense 연동과 API 데이터 파일화를 통해 성능을 최적화했으며, 다중 데이터베이스 환경에서 안정적인 운영을 지원합니다.  
옵저버 패턴을 통해 감사 로그 시스템을 구현했으며, Laravel Debugbar로 디버깅을 효율화했습니다.

---

## ⚙️ 기술 스택
- **언어**: PHP 8.2  
- **프레임워크**: Laravel 11  
- **프론트엔드**: React + Inertia.js  
- **운영체제**: Ubuntu + Nginx  
- **데이터베이스**: MSSQL, MySQL 4.x, MySQL 8.x  
- **검색 엔진**: Typesense  
- **디버깅 도구**: Laravel Debugbar  

---

## 🛠 주요 기능

### 1️⃣ Inertia.js 기반 SPA 환경
- React와 Laravel의 통합으로 단일 페이지 애플리케이션 구축.  
- Inertia.js를 활용한 데이터 교환 간소화.  

### 2️⃣ API 데이터 파일화
- 데이터 파일화를 통해 대량 데이터의 조회 속도 극대화.  
- 1년치 데이터를 1초 이내로 조회 가능.  

### 3️⃣ Typesense 연동
- AI 기반 검색 기능을 제공하며, 유사어 및 근접도 검색 지원.  

### 4️⃣ 감사 로그 시스템
- 옵저버 패턴으로 사용자 행동 및 데이터 변경 사항을 기록.  
- 주요 이벤트의 추적 가능성을 향상.  

### 5️⃣ 다중 데이터베이스 연동
- MSSQL, MySQL 4.x, MySQL 8.x 데이터베이스와의 연동을 지원.  
- 데이터 호환성과 통합 문제를 해결하며 안정적인 운영 가능.  

---

## 📂 주요 폴더 구조
```plaintext
/project-root
├── /app
│   ├── /Http
│   │   ├── /Controllers  # HTTP 요청 및 응답 처리
│   │   ├── /Requests     # 데이터 검증 규칙 정의
│   │   ├── /Resources    # 반환 데이터 포맷 정의
│   ├── /Logging        # 감사 로그용 옵저버 패턴 구현
│   ├── /Services         # 외부 API 및 Typesense 서비스 처리
│   ├── /Repositories     # Repository 패턴 구현
├── /config
├── /routes
├── /resources
│   ├── /js               # React 프론트엔드 코드
│   ├── /views            # Inertia.js 템플릿
└── /README.md            # 프로젝트 설명
