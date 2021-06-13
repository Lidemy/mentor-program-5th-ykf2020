## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
長度：VARCHAR 與 TEXT 都可儲存 65535 bytes 的資料。但由於 VARCHAR 需要 3bytes 來儲存長度及結尾的資訊，故實際可用長度為 65532 bytes，TEXT 則沒有這個問題。

預設值：VARCHAR 可設預設上限，知道資料範圍時優先使用。TEXT 不設預設值，不知長度的資料再使用較佳。

查詢速度：VARCHAR較快，TEXT較慢。

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？
・Cookie 為小型文字檔案，瀏覽器辨認使用者身份而儲存在 Client 端的資料，維護使用者與伺服器溝通的狀態，例如購物網站，將購物車的商品資訊儲存於 Cookie 中，或是登入網站時，勾選記住帳號密碼、自動登入等。

・Server 要設置 client 的 cookie 時，會在 response 中帶上一個 Set-cookie 的 header 給 client，client 端的瀏覽器收到這個 set-cookie header 後便會在瀏覽器端照指示設定 cookie。

・瀏覽器在發送 request 時會把 cookie 帶在 request header 中給 server。

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？
1. 目前有帶特殊符號的留言無法新增，如 「I don't like that」，會影響程式碼判斷斷句。
2. 密碼是未加密的，以明碼的方式儲存在資料庫。
3. 輸入未做處理，可由 input 的區域竄改 SQL
