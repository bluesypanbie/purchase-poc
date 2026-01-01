# 아키파이 매입 서비스 POC

기타/베이스 이펙터 페달 매입 서비스 POC 프로젝트입니다.

---

## 프로젝트 개요

- AI 기반 실시간 시세 조회로 예상 매입가 산출
- 사용자가 매입 신청서 작성 및 제출
- 신청번호로 신청 내역 조회

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프론트엔드 | Framer + 코드 컴포넌트 |
| 백엔드 | Supabase (`akify-purchase`) |
| AI API | 실시간 웹 검색 기능 AI (검토 중) |
| 자동화 | Make |
| 이미지 저장소 | Google Drive (Make 경유) |
| 주소 검색 | 다음(카카오) 주소 API |

---

## 폴더 구조

```
purchase-poc/
├── docs/                    # 기획 문서
├── reference/
│   ├── figma/              # Figma에서 복사한 디자인 코드
│   └── framer/             # Framer 코드 컴포넌트 (기존 + 신규)
├── .claude/                # Claude Code 세션 컨텍스트
└── README.md
```

---

## 주요 문서

- [기획 문서](docs/아키파이%20매입%20서비스%20POC%20기획.md)
- [Framer 컴포넌트 가이드](reference/framer/README.md)
- [Figma 레퍼런스 가이드](reference/figma/README.md)

---

## Supabase 설정 완료 항목

- [x] `purchase_requests` 테이블 (신청 데이터)
- [x] `settings` 테이블 (계수 조정용)
- [ ] Edge Functions (AI API 호출)

---

## 개발 현황

`.claude/status.md` 참고