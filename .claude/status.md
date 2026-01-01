# 개발 현황

마지막 업데이트: 2026-01-01

---

## 완료된 작업

- [x] 기획 문서 작성 및 정리
- [x] Supabase 프로젝트 생성 (`akify-purchase`)
- [x] `purchase_requests` 테이블 생성 (신청 데이터 저장)
- [x] `settings` 테이블 생성 (계수 조정용)
- [x] GitHub 레포 생성 및 연결

---

## 진행 중

- [ ] AI 매입가 산출 컴포넌트 개발
  - Figma UI 디자인 → Framer 코드 컴포넌트 변환 예정

---

## 대기 중

- [ ] 신청폼 컴포넌트 개발
- [ ] 신청 조회 페이지 개발
- [ ] Edge Functions 설정 (AI API 호출용)
- [ ] Make 시나리오 구성 (이미지 업로드 → Google Drive)

---

## Supabase 테이블 구조

### purchase_requests

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID | PK |
| request_number | VARCHAR(10) | 신청번호 (AF-XXXXXX) |
| product_description | TEXT | 매물 설명 |
| has_original_box | BOOLEAN | 순정 박스 유무 |
| estimated_price | INTEGER | AI 산출 예상가 |
| ai_response | JSONB | AI 응답 원본 |
| applicant_name | VARCHAR(50) | 신청자 성함 |
| phone_number | VARCHAR(20) | 휴대전화번호 |
| address | TEXT | 반송 주소 |
| address_detail | VARCHAR(100) | 상세 주소 |
| bank_name | VARCHAR(20) | 은행명 |
| account_number | VARCHAR(30) | 계좌번호 |
| account_holder | VARCHAR(20) | 예금주명 |
| memo | TEXT | 자유 기재란 |
| image_urls | TEXT[] | 이미지 URL 배열 |
| agreed_terms | BOOLEAN | 이용약관 동의 |
| agreed_not_overseas | BOOLEAN | 해외직구 아님 동의 |
| status | VARCHAR(20) | 상태 (pending 등) |
| created_at | TIMESTAMP | 생성일시 |
| updated_at | TIMESTAMP | 수정일시 |

### settings

| key | value | description |
|-----|-------|-------------|
| domestic_weight | 0.7 | 국내 시세 비중 |
| global_weight | 0.3 | 해외 시세 비중 |
| margin_rate | 0.7 | 마진율 (70% 지불) |
| condition_mint | 1.0 | 신품 |
| condition_excellent | 0.9 | 매우 양호 |
| condition_good | 0.8 | 양호 |
| condition_fair | 0.7 | 보통 |
| condition_poor | 0.5 | 하자 및 고장 |
| with_box | 1.05 | 박스 있음 |
| without_box | 1.0 | 박스 없음 |

---

## 다음 세션에서 할 일

1. Figma에서 AI 매입가 산출 UI 코드 받기
2. Framer 코드 컴포넌트로 변환
3. Supabase 연동 테스트