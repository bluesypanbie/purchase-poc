# Framer 코드 컴포넌트 레퍼런스

이 폴더는 기존 아키파이 Framer 프로젝트에서 사용 중인 코드 컴포넌트를 그대로 복사한 것입니다.

매입 서비스 POC 개발 시 재사용하거나 참고할 수 있는 컴포넌트들입니다.

---

## 폴더 구조

```
reference/framer/
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── AddressModal.tsx    # 다음 주소 검색 모달
│   ├── Consent.tsx         # 동의 체크박스
│   ├── Field.tsx           # 폼 필드 래퍼 (라벨 + 필수 표시)
│   ├── NativeSelect.tsx    # 네이티브 셀렉트 박스
│   ├── OneStopForm.tsx     # 원스톱 서비스 신청 폼 (전체 예시)
│   ├── PhoneInput.tsx      # 전화번호 입력
│   ├── Segmented.tsx       # 세그먼티드 탭바 (토글 선택)
│   └── TextInput.tsx       # 텍스트 입력
├── hooks/
│   └── useDaumPostcode.ts  # 다음 주소 API 연동 훅
├── icon/
│   ├── IconCalendar.tsx
│   └── IconChevronDown.tsx
├── utils/
│   ├── injectGlobalStyles.ts  # 글로벌 스타일 주입
│   ├── phone.ts               # 전화번호 유효성 검사/정규화
│   └── regions.ts             # 지역 목록 데이터
├── FramerComponentExample.tsx  # Framer 컴포넌트 작성 예시
└── FramerOverrideExample.tsx   # Framer Override 작성 예시
```

---

## 매입 서비스 POC에서 재사용 가능한 컴포넌트

| 컴포넌트 | 용도 |
|----------|------|
| `Field` | 폼 필드 래퍼 (라벨, 필수 표시, 설명) |
| `TextInput` | 텍스트 입력 |
| `PhoneInput` | 전화번호 입력 |
| `Segmented` | 토글 선택 (박스 유무 등) |
| `NativeSelect` | 셀렉트 박스 (은행 선택 등) |
| `AddressModal` | 다음 주소 검색 |
| `Consent` | 동의 체크박스 |

---

## 스타일 특징

- 다크 테마 (`#0a0a0a` 배경, 흰색 텍스트)
- Pretendard 폰트 사용
- Inline styles (CSS-in-JS)
- `data-layer` 속성으로 요소 식별

---

## 참고

- 이 폴더의 파일들은 Framer 프로젝트에서 직접 복사한 것으로, 로컬에서 직접 실행되지 않습니다.
- 실제 사용 시 Framer 에디터에 붙여넣거나, 필요한 부분만 수정해서 사용합니다.
- **새로 생성한 컴포넌트도 이 폴더에 추가합니다.** (Framer 프로젝트와 동일한 구조 유지)