---
title: "F1Soft AI 홈페이지 소스 안내"
date: 2026-10-27
tags:
  - f1soft
  - website
  - sites
---

# F1Soft AI 홈페이지 소스 안내

Linear의 제품 중심 구성·어두운 배경·절제된 정보 위계를 참고한 독자적인 한국어 제품 소개 페이지다. HTML/CSS/JavaScript 정적 사이트이며 빌드 의존성이 없다.

- F1-AgentBot의 현재 이름은 F1-AIAgent다. Chrome 확장형 업무 이해·시스템 안내·승인형 자동화 에이전트로 정의했다.
- AIOps·AIAgent·AIBI: 사용자 제공 [AI 운영·분석 데모](https://stellar-crepe-e1d6d1.netlify.app)의 브라우저 캡처.
- MLStudio: 사용자 제공 [삼정 Data Studio](https://samjung-manufacturing-lab.pyhu26.chatgpt.site/)의 실제 합성 데이터 분석 화면.
- 원본의 고객명·앱명을 바꾸거나 화면 속 수치를 성과 자료로 재사용하지 않았다.
- 기존 웹앱 내부 챗봇 패널은 실제 Chrome 확장판이 아니다. 사이트에서 이 차이를 표기했다.
- Chrome 확장 자동화, 제품 간 공통 운영 연계, RAG 통합은 기획 범위다. 홈페이지는 실제 학습·배포·업무 작업을 실행하지 않는다.
- 캡처는 이미지 파일로 로컬 제공한다. 소스 사이트의 로그인 정보·쿠키·토큰은 소스나 배포 산출물에 포함하지 않는다.
- Pretendard v1.3.9를 로컬로 제공하며 `dist/assets/Pretendard-LICENSE.txt`에 SIL OFL 원문을 포함했다.

## 로컬 실행

절대 경로의 `server.mjs`를 Node로 실행하고 출력된 Local 주소를 연다. `validate.mjs`는 파일 참조·화면 자산·배포 메타데이터·비밀정보 포함 여부를 검사한다.

## Netlify 배포

빌드 의존성이 없는 정적 사이트다. `netlify.toml`에서 정적 검증 명령과 배포 폴더 `dist`를 지정한다.

- 저장소: https://github.com/FormationLabs/f1soft-aiplatform-homepage
- 운영 사이트: https://f1soft-ai-solutions.netlify.app
- 운영 브랜치: `main`
- 빌드 환경: Node.js 22
- 검증 명령: `node validate.mjs`
- 배포 폴더: `dist`

`main` 브랜치에 push하면 GitHub webhook을 통해 Netlify가 검증 후 자동 배포한다. 검증이 실패하면 기존 운영 배포가 유지된다. Netlify는 저장소 전용 읽기 전용 deploy key로 소스를 가져온다.

수정 후 다음과 같이 배포한다.

```sh
node validate.mjs
git add .
git commit -m "Update homepage"
git push origin main
```

진행 상태와 로그는 https://app.netlify.com/projects/f1soft-ai-solutions/deploys 에서 확인한다. GitHub webhook과 deploy key는 저장소 설정에서 관리한다.

Netlify 로컬 프로젝트 연결 정보는 `.netlify/`에 저장되며 Git에서 제외한다. 개인 인증 토큰이나 webhook 주소는 소스에 저장하지 않는다. Sites의 기존 사이트와 접근 설정은 별도로 유지된다.

## 구성

- `dist/`: 배포할 정적 파일
- `.openai/hosting.json`: 사이트 식별자와 정적 파일 경로
- `server.mjs`: 로컬 미리보기 서버
- `validate.mjs`: 정적 점검
- `design/`: 화면 출처, 제품 역할과 검증 기록
