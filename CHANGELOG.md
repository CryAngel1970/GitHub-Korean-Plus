# 변경 기록

## 0.1.3 - 2026-09-21

- 최근 GitHub 설정 화면에서 설명문만 영어로 남던 원인 수정
- 과도한 `ActionListItem-descriptionWrap` 전역 무시 규칙 해제
- NBSP/줄바꿈/제로폭 문자/스마트 따옴표를 정규화한 뒤 사전 조회
- 토론/프로젝트 설명문 번역 보강
- 웹훅/코드 검토 제한/기여 활동 설명문 번역 안정화
- 프로젝트 없음/끌어오기 요청 검색 결과 없음 화면 번역 보강
- 링크로 쪼개지는 `pull requests`, `new discussion`, `webhook guide` UI 조각 보강
- 초보자 기본 용어 `저장소 / 분기 / 끌어오기 요청` 유지

## 0.1.2 - 2026-09-21

- GitHub 설정 > 이슈/토론 설명과 권한 드롭다운 신규 문구 번역
- Discussions 첫 게시물 기본 제목/Markdown 템플릿 한국어화
- 기본 Discussions 템플릿만 판별해 번역하고 사용자 작성 Markdown은 보호
- accessibility 기본 레이블/설명 번역
- Actions 정책 분석(Policy insights) 화면 보강
- Copilot 클라우드 에이전트 설정/정책/유효성 검사 도구 설명 보강
- 웹훅 설명, 코드 검토 제한 설명 보강
- 기여 활동/토론 안내/프로젝트 없음/끌어오기 요청 검색 빈 화면 보강
- 링크와 컴포넌트 때문에 분리된 혼합 한·영 문장의 문맥 번역 처리
- `저장소 / 분기 / 끌어오기 요청` 초보자 용어 기본값 유지

## 0.1.0 - 2026-09-19

- Manifest V3 신규 프로젝트 생성
- GitHub 한국어 대형 페이지별 사전 계승
- GitHub UI Translator 한국어 사전 1,588개 보강
- GitHub / Gist / Skills / Education / Status 지원
- 외부 통신, 광고, 스폰서 배너, 알림 권한 제거
- Chrome API 권한을 `storage` 하나로 최소화
- Turbo 전환 대응
- MutationObserver 변경 영역 idle 배치 처리
- 재사용 DOM 노드 재번역 처리
- 초보자 친화 용어를 기본값으로 변경 (저장소/분기/끌어오기 요청/별표/꼬리표)
- 개발자 용어 모드는 선택 사항이며 기본 OFF
- 한국어 조사 자동 보정
- 성능 로그 옵션
