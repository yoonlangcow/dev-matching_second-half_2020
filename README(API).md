## API 정보

1. 고양이 검색 API
[GET] http://172.17.6.45:8500/v1/cat?q=고양이 이름
Response ( applicaion/json )
[
    {
        name : "이름",
        thumbnail : "http://thumbnail.jpg",
        description : "설명"
    }
]

2. 고양이 추천어 API
[GET] http://172.17.6.45:8500/v1/kind/cats?q=키워드

Response ( applicaion/json )
[
    "Munchiken",
    ...
]