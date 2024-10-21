# Chair_friend

휠체어 이용자들을 위한 전동휠체어 및 음식점을 안내해주는 간단한 지도 웹입니다. api자료부족으로 전동휠체어 충전파트 부분만 설계되어 있습니다.

## 프로젝트 설명

- 네이버 지도 와 로그인 api를 사용하였습니다.
- 공공데이터 api를 사용하여 위도와 경도 상세위치를 가져옵니다.

## 설치 및 설정

- cd naver-map-app
- npm install
- npm start
순으로 명령어를 실행시킵니다.

### 필수 사항

- 참고자료에 있는 api키들을 가져옵니다.
- .env파일을 생성합니다.
- 가져온 키들을 REACT_APP_NAVER_CLIENT_ID, REACT_APP_NAVER_MAP_CLIENT_ID, REACT_APP_CHAIR_API_KEY, REACT_APP_IP_API_KEY

### 설치 방법

1. 버전관리에서 코드를 클론해온다.
2. 필수 사항이행후 명령어를 실행시킨다


### 참고 자료

[https://developer.android.com/develop/sensors-and-location/location/transitions?hl=ko](https://www.ncloud.com/product/applicationService/maps)
[https://www.data.go.kr/](https://www.data.go.kr/data/15034533/standard.do)
https://developers.naver.com/products/login/api/api.md

### 화면 구성

|로그인 로그아웃|홈|
|:---:|:---:|
|<video src="https://github.com/user-attachments/assets/2acd26b2-af9c-412a-9d25-df51e355cf00" width="400"/>|<video src="https://github.com/user-attachments/assets/ad070fbf-1f92-4c13-b0bc-c9aba6fb9c13" width="400"/>|

|충전소|
|:---:|
|<video src="https://github.com/user-attachments/assets/450930bd-d467-4051-bd84-f22085c1ef84" width="400"/>|
