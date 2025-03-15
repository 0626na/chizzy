# Chizzy 프로젝트

네이버의 라이브 스트리밍 플랫폼인 치지직의 핵심기능인 **라이브 스트리밍** 기능과 **실시간 채팅** 기능을 구현한 간단한 방송 웹 어플리케이션입니다.
평소 실시간 처리 (라이브 스트리밍, 라이브 채팅) 기술에 관심이 많아서 작게라도 구현해보고자 시작하게 되었습니다.

## GitHub 커밋 메세지 작성 가이드

GitHub의 커밋 메세지는 `Conventional Commits` 규칙을 사용합니다. 규칙은 다음과 같습니다.

### 📌 기본 형식

```text
<type>(<scope>): <subject>
```

- **type**: 커밋 유형 (feat, fix 등)
- **scope**: 변경 범위 (선택 사항)
- **subject**: 짧고 명확한 설명

### 📌 주요 커밋 타입

| 타입     | 설명                                        |
| -------- | ------------------------------------------- |
| feat     | 새로운 기능 추가                            |
| fix      | 버그 수정                                   |
| docs     | 문서 변경 (README 수정 등)                  |
| style    | 코드 스타일 변경 (포맷팅, 세미콜론 추가 등) |
| refactor | 코드 리팩토링 (기능 변경 없이 구조 개선)    |
| perf     | 성능 개선                                   |
| test     | 테스트 코드 추가 또는 수정                  |
| chore    | 빌드, CI/CD 설정 변경 등 기타 작업          |
| revert   | 이전 커밋을 되돌림                          |

### 📌 예제

다음은 커밋 메세지 작성 방식 예제입니다.

```scss
// 볼륨 기능 추가
feat(player): add volume control;

// 채팅 기능부분 에러 수정
fix(chat): fix message duplication issue;

//설치가이드 수정
docs(readme): update installation guide;
```
