## 什麼是 Ajax？
Ajax，全名是「Asynchronous JavaScript and XML」
重點是 Asynchronous（非同步）的概念。
javascript 一般來說是 synchronous（同步）執行的，也就是根據程式碼一行一行由下而上執行，因此我們若像一個服務發出 request，需等到接收傳回的 response 才會繼續執行接下來的程式碼。
然而網路服務未必能即時取得 response，甚至有可能因錯誤而無法取得預期的 response，此即代表整個 javascript 程式卡在這一個階段，而無法執行接續的其他程式碼，造成整支程式非常不穩定或執行過慢。
而 Asynchronous（非同步）的方式，簡單來說是執行完就不管它了，程式繼續往下執行。而我們透過根據回傳的可能結果去設定相對應的處理方式，當回傳結果回來時，再執行預計的對應方式即可，此即為非同步，可避免因等待 response 而造成整支程式卡住的情況發生。

## 用 Ajax 與我們用表單送出資料的差別在哪？
使用表單送出資料一定會換頁，無法達到流暢的網頁使用體驗。

## JSONP 是什麼？
全名叫做：JSON with Padding。
網頁中有些標籤不會受到同源政策的影響。如 ```<img>```  可以跨網域存取圖片。而 ```<script>``` 也是一樣。
因此我們透過在 script 中將 src 設定為欲發送 request 的 API 之 url 位址， 藉此來發送request。 
並在 script 的內容中內透過使用 Server 所提供的 callback function，來使用傳回來的  response 。
這個方法可以避免受到同源政策的影響，然而缺點是要帶的參數僅能透過網址傳送。

## 要如何存取跨網域的 API？
1. JSONP
2. 跨來源資源共用（CORS）：server 端在 response header 加上```Access-Control-Allow-Origin:*``` ，接收回覆的瀏覽器端收到這個訊息即可通過驗證

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
之前是使用 node.js，因回傳的資料不需透過瀏覽器處理，而不會受到同源政策的限制。
