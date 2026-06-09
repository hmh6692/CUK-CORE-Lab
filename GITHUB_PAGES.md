# GitHub Pages 배포 메모

이 저장소는 GitHub Pages에서 바로 호스팅할 수 있도록 준비되어 있습니다.

## 1. 저장소 생성 및 업로드

1. GitHub에서 새 저장소를 만듭니다.
2. 이 폴더의 파일을 저장소에 업로드합니다.
3. 기본 브랜치는 `main`으로 둡니다.

## 2. GitHub Pages 설정

1. GitHub 저장소에서 `Settings > Pages`로 이동합니다.
2. `Build and deployment`의 `Source`를 `GitHub Actions`로 선택합니다.
3. `Actions` 탭에서 `Deploy to GitHub Pages` 워크플로가 성공했는지 확인합니다.

배포 워크플로는 `_site` 폴더를 임시로 만들고 공개에 필요한 파일만 업로드합니다. 그래서 `CV_2026_Sun-Kyeong_simple.docx`나 로컬 서버 로그는 배포물에 포함되지 않습니다.

## 3. 관리자 화면 주의사항

공개 사이트 자체는 GitHub Pages에서 정상 동작합니다. 다만 `/admin/` 편집 화면은 GitHub Pages만으로는 완전히 동작하지 않습니다.

현재 `/admin/`은 Netlify Identity + Git Gateway 방식으로 설정되어 있습니다. GitHub Pages에서 Decap CMS 관리자 화면까지 쓰려면 GitHub OAuth backend를 별도로 설정해야 합니다.

GitHub Pages에서도 관리자 화면을 쓰려면 `admin/config.yml`의 backend를 다음 형태로 바꿔야 합니다.

```yml
backend:
  name: github
  repo: OWNER/REPOSITORY
  branch: main
  base_url: https://YOUR-OAUTH-PROVIDER.example.com
```

여기서 `OWNER/REPOSITORY`는 실제 GitHub 저장소명이고, `base_url`은 Decap CMS용 GitHub OAuth provider 주소입니다. 비개발자 편집까지 가장 쉽게 운영하려면 공개 사이트는 GitHub Pages로 두더라도, 관리자 편집은 Netlify 또는 별도 OAuth provider 구성이 필요합니다.
