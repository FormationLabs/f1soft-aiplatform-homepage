---
title: "F1Soft AI 홈페이지 디자인 및 화면 출처"
date: 2026-10-27
tags:
  - design
  - product-planning
  - screenshots
---

# F1Soft AI 홈페이지 디자인 및 화면 출처

## 1. 디자인 결정

- 주 벤치마크는 [Linear](https://linear.app/)다. 독자적인 레이아웃·한국어 문구·아이콘을 사용하고, 어두운 바탕과 큰 제목, 제품 화면 중심 설명, 얇은 경계선, 작은 상태 표기를 참고했다.
- 별도 UI 프레임워크·외부 스크립트·분석 추적 코드 없이 정적 HTML/CSS/JavaScript로 제작했다.
- 네 제품의 미리보기 탭, 세 제품의 화면 갤러리, 원본 이미지 확대, 키보드 탭 이동, 모바일 메뉴, FAQ 펼치기, 상담 메일 링크를 제공한다.
- 모바일 캡처는 CSS로 표시 영역을 조정한다. 원본은 그대로 보관하며 확대 기능으로 전체 화면을 볼 수 있다.

## 2. 화면 출처

사용자가 지정한 사이트의 실제 브라우저 화면을 2026-10-27에 캡처했다. 소스 사이트의 데이터는 전시·프로토타입 예시로 다루며 실제 운영 성과로 주장하지 않는다.

| 자산 | 출처·화면 | 사용 위치 |
| --- | --- | --- |
| aiagent-context.jpg | [수율 현황](https://stellar-crepe-e1d6d1.netlify.app/report/yield)의 현재 화면 맥락을 전달하는 웹앱 내부 대화 패널 | AIAgent 미리보기·설명 |
| aiops-comparison.jpg | [재학습 상세](https://stellar-crepe-e1d6d1.netlify.app/mlops/retrain/TRAIN-1008-002)의 운영·후보 버전 비교 | AIOps 미리보기·갤러리 |
| aiops-retraining.jpg | [재학습 목록](https://stellar-crepe-e1d6d1.netlify.app/mlops/retrain) | AIOps 갤러리 |
| aibi-yield.jpg | [수율 현황](https://stellar-crepe-e1d6d1.netlify.app/report/yield) | AIBI 미리보기·갤러리 |
| aibi-dashboard.jpg | [LLM 수율 대시보드](https://stellar-crepe-e1d6d1.netlify.app/llm/dashboards/d-0001) | AIBI 갤러리 |
| mlstudio-data.jpg | [삼정 Data Studio](https://samjung-manufacturing-lab.pyhu26.chatgpt.site/) 합성 데이터 탐색 | MLStudio 갤러리 |
| mlstudio-results.jpg | 같은 프로토타입에서 전처리 적용 후 합성 데이터 3종 모델을 계산한 비교·예측 결과 | MLStudio 미리보기·갤러리 |
| mlstudio-models.jpg | 같은 프로토타입의 모델 선택·학습 설정 | 보조 캡처 보관 |

## 3. 관찰과 기획을 구분한 기능 정의

- AIAgent 관찰: 대화 패널, 현재 화면 맥락, 근거 링크, 분석 화면 연결.
- AIAgent 기획: Chrome 확장형으로 대상 시스템을 이해·안내하고, 허용된 절차를 익혀 반복 업무를 준비·실행하되 중요한 변경은 승인받는다.
- 화면·절차를 ‘학습’한다는 것은 허용된 화면·문서·사용자 안내를 업무 지식으로 구성하는 뜻이며, 비밀번호 수집 또는 모델의 자동 무단 재학습을 뜻하지 않는다.
- AIOps 관찰: 재학습 작업·진행·후보/운영 모델 비교·승인 대기.
- AIOps 기획: 제품군 공통 모델·RAG 운영, MLStudio 연계와 배포·복구 체계.
- AIBI 관찰: 수율 지표·추이·공정 비교·LLM 대시보드.
- MLStudio 관찰: 합성 데이터의 탐색·전처리·모델 선택·실제 계산·평가·예측 시뮬레이션. 상용 제품 전체 구현을 의미하지 않는다.

## 4. 하지 않은 작업

운영 모델 배포·재학습 작업 생성·승인, 원본 데이터 삭제, 비공개 소스코드 수집, 확장 프로그램 설치·개발, 실제 고객 시스템 자동화, 운영 데이터 변경은 하지 않았다. 원본 웹앱의 질의와 합성 데이터 실습만 사용했다.

## 5. 검증 기록

정적 점검과 브라우저 검증 결과는 배포 완료 후 별도로 기록한다. 확장 프로그램·제품 통합의 동작 검증은 이번 홈페이지 범위에 포함하지 않는다.

### 5.1 확인 결과

- 정적 파일·자산 11개 참조, HTML ID 59개, 문서 내 연결·ARIA 대상·이미지 형식·글꼴 형식·호스팅 메타데이터 검사 통과.
- JavaScript 구문 검사 통과. 사이트 자체의 브라우저 오류 로그 없음.
- 제품 미리보기 4개 전환, AIOps·AIBI·MLStudio 갤러리 전환 확인.
- 이미지 확대 열기·닫기, 닫은 후 원래 버튼으로 포커스 복귀 확인.
- FAQ 펼치기 확인. 390px에서 모바일 메뉴 열기·닫기·연결 구조 이동 확인.
- 실제 CSS 기준 320×800, 390×844, 1440×900, 1920×1080에서 문서 가로 넘침 없음.
- 390px 첫 화면 및 연결 구조를 시각 확인. 데스크톱 첫 화면과 실제 자산 로딩 확인.
- 일부 캡처 요청이 브라우저에서 지연되어 재확인했으며, 최종 반응형 수치는 DOM의 실제 CSS 크기를 기준으로 기록했다.
- 실제 확장 프로그램·모델 배포·현장 자동화, 실제 문의 메일 전송은 검증 범위 밖이다.