## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
加密可視為一對一雙向的換算方式，可以透過解密，將密文推回明文。
雜湊是多對一單向的，即便取得雜湊演算法，經過雜湊後的密文仍非常難推算回原文。舉例來說 ```11 % 10 = 1```、```11 % 10 = 1```、```31 % 10 = 1``` ⋯⋯
即便我們取得密碼：```1```及演算法：```x % 10 = 密碼```，我們仍無法確定明碼 x 究竟是 11、21、31 ⋯⋯，因此透過更複雜的雜湊演算法搭配此一多對一的特性搭配，攻擊者很難推出正確的明碼為何。

為什麼密碼要雜湊過後才存入資料庫：
避免資料庫中資料被盜走後，因存明碼而讓使用者個資暴露於危險之中，駭客只能拿到密碼雜湊後的雜湊值。

## `include`、`require`、`include_once`、`require_once` 的差別
include 及 include_once 在匯入另一個 php 檔案時，若沒有成功引入，僅會出現警告提示，但仍繼續執行。然而 require 及 require_once 若沒成功引入則會出現錯誤，無法繼續執行。

include 及 include_once 之間的差別是 include_once 可以避免重複引入相同的程式碼
reuqire 及 require_once 關係亦同

## 請說明 SQL Injection 的攻擊原理以及防範方法
利用 SQL query statement 要引入變數時利用字串拼接的特性，將惡意字串拼接入 statement 中，使其產生非原程式碼預計的效果，以用來取出資料庫之中其他資料，或取得權限等等。

防範方法：
・設計資料庫時限制相關操作的權限，如 DROP TABLE 操作須提供更高階的權限才可使用
・限制使用者輸入的字元格式其長度
・利用 prepared statement：資料庫伺服器不會把設參數的地方當作SQL指令的一部分來處理，而是先在資料庫編譯完後，再將參數套用並執行。


##  請說明 XSS 的攻擊原理以及防範方法
網站被植入惡意 javascript 程式碼，導致執行了網站設計者預期之外的動作。如在使用者的輸入框輸入 ```<script> alert(1) </script>```，當網站需要顯示出此一由訊息時，就會執行 ```alert(1)``` 這個動作。

防範方法：
・使用跳脫字元 escape，在輸出資料時將資料中的特殊字串進行處理，轉譯為純文字而非程式碼
・透過設立 Content Security Policy，明確規範哪些內容僅能從哪些來源被載入
・透過 2FA 機制，即使使用者的帳號密碼被透過 XSS 的手段竊走，仍無法被駭客登入

## 請說明 CSRF 的攻擊原理以及防範方法
CSRF 全名為 Cross Site Request Forgery，跨站請求偽造。
在不同的 domain 底下，偽造出本人發出的 request，透過 cookie 本身會把關聯的網域的資訊一起經由 request 給帶過去的特性，將 request 偽裝成是使用者自己發出的。

防範方法：
・Client 端：每次使用完網站就登出，避免 cookie 中仍保留登入資訊
・Server 端：設法加上只有真正的使用者會知道的資訊。
1. 在 server 的 session 存一筆 csrf token，並且在給使用者的 form 中用 hidden input 的方式帶上這個 csrf token，如此一來攻擊者製造的假 request 因為沒有這個 csrf token，就會被 server 給拒絕。
2. 透過 cookie 中存一組隨機的 token 並將此 token 亦生成於使用者的 form 中，當 server 接受到 request 時，檢查此 cookie 中的 token 是否與 form 中的 token 相符即可。因偽造者即便有可能在 form 中製造一個 token，他也沒有辦法在 cookie 中把此 token 放在正確的 domain 之下。
3. 瀏覽器本身的防禦機制，設定 SameSite cookie 來管理 cross site request 時 cookie 是否可以一併被帶上，即可簡單解決此一問題。
