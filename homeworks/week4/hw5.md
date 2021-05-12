## 請以自己的話解釋 API 是什麼

API 像是資料庫的販賣機，當 client 根據特定的販賣機(endpoint)選擇想要的飲料（path），再投入符合條件的硬幣（Parameter 及 Authentication），這台販賣機就會根據 client 的要求，回傳指定的飲料（特定格式的資料）給 clinet 以供使用

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

上課教的：101 200 204 301 302 404 500 503


418：I'm a teapot => 伺服器表示它是一個茶壺，所以拒絕煮咖啡，是愚人節玩笑，沒有實質功用

401：Unauthorized => 使用者沒有認證，所以遭到拒絕

206：Partial Content => 伺服器已經處理部分的 GET request 了，下載工具常會利用此回應實現斷點續傳的功能 

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

# Restaurant API
---
Restaurant API 是提供用戶獲取並使用我們平台有配合的各大餐廳之相關資料的 Web API。用戶在取得權限後，可以透過 Reataurant API 取用、新增、刪除、平台上現有的餐廳資料。
### Base URL
``` https://restaurants.com ```
### Description

| 說明         | Method | Authentication | Path            | Parameter |
| ------------ | ------ | -------------- | --------------- | --------- |
| 取得餐廳     | Get    | 不需           | /restaurant     | limit     |
| 取得單一餐廳 | Get    | 不需           | /restaurant/:id |           |
| 新增餐廳     | Post   | 需要           | /restaurant     | name      |
| 更新餐廳資料 | Patch  | 需要           | /restaurant/:id | name      |
| 刪除餐廳資料 | Delete | 需要           | /restaurant/:id |           |

### Optional Query Parameters
| 參數  | Type      | Description                       |
| ----- | --------- | --------------------------------- |
| limit | ```int``` | 限制回傳資料數量，預設 5，上限 99 |
| name  | ```str``` | 針對此名字新增餐廳或更改餐廳名稱  |

### Example Request
```
curl 
-X POST 'https://restaurants.com/restaurant'
```
### Example Response
```
[
  {
    "id": "1",
    "name": "和心 - 云.泰.缅口味小吃",
    "phone": "02 8926 7579",
    "address": "1樓, No. 54之2號竹林路225巷永和區新北市234"
  },
  {
    "id": "2",
    "name": "72度C舒肥健康餐/水煮餐 永和保平店",
    "phone": "0986 997 079",
    "address": "234新北市永和區保平路9號"
  },
  {
    "id": "3",
    "name": "我家好牛 大安門巿",
    "phone": "02 2705 9861",
    "address": "106台北市大安區大安路二段124號"
  },
  {
    "id": "4",
    "name": "小川拉麵",
    "phone": "02 2703 7713",
    "address": "106台北市大安區復興南路二段190號"
  },
  {
    "id": "5",
    "name": "真劍拉麵",
    "phone": "0987123456",
    "address": "106台北市大安區師大路126巷1號"
  }
]
```



