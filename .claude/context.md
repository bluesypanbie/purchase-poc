# Claude Code 컨텍스트

이 파일은 Claude Code가 새 세션에서 프로젝트를 빠르게 이해할 수 있도록 작성된 문서입니다.

---

## 프로젝트 요약

아키파이 매입 서비스 POC - 기타/베이스 이펙터 페달을 AI 기반으로 시세 조회하여 매입가를 산출하고, 사용자가 매입 신청을 할 수 있는 서비스.

---

## 핵심 파일

| 파일 | 설명 |
|------|------|
| `docs/아키파이 매입 서비스 POC 기획.md` | 전체 기획 문서 |
| `.claude/status.md` | 개발 현황 및 TODO |
| `reference/framer/` | Framer 코드 컴포넌트 (기존 + 신규) |
| `reference/figma/` | Figma에서 복사한 디자인 코드 |

---

## 기술 결정 사항

1. **프론트엔드**: Framer 코드 컴포넌트 (React TSX, Inline styles)
2. **백엔드**: Supabase (프로젝트명: `akify-purchase`)
3. **AI API**: 실시간 웹 검색 기능 AI (Perplexity, Gemini 등 검토 중)
4. **이미지 업로드**: Google Drive (Make 경유) - Supabase Storage 용량 제한으로 대체
5. **주소 검색**: 다음(카카오) 주소 API

---

## 작업 방식

1. Figma에서 UI 디자인 → `reference/figma/`에 코드 저장
2. 해당 코드 참고하여 `reference/framer/`에 Framer용 컴포넌트 작성
3. VSCode에서 작업 → Framer 에디터에서 교차 검증

---

## 주의 사항

- Framer 문법 특성상 VSCode에서 TS 에러가 발생할 수 있음 (Framer 에디터에서 최종 확인)
- 다크 테마 기반 (`#0a0a0a` 배경)
- Pretendard 폰트 사용