## Redux middleware 是什麼？
middleware 可以在 action 進到 reducer 之前，讓我們可以介入來做一些事的時間點
透過 middleware，可以發送非同步的請求，再將請求結果再派發 action 進入 reducer 處理

## CSR 跟 SSR 差在哪邊？為什麼我們需要 SSR？
CSR 像是我們之前練習在寫的 React 網頁，所有的 DOM 都是掛在 ```index.html``` 中的 ```id=root``` ```div``` 上，但實際上這個檔案中並沒有任何東西，我們所看到的所有元件都是利用 React 以動態的方式 mount 上這一塊 ```div``` 而顯示出來的，這個過程就稱為 rendering，CSR(Client Side Rendering) 就是根據使用者點擊時的不同動作、而來動態決定要在這一個頁面上 render 出什麼樣的畫面。

SSR 像是我們之前練習寫的由後端伺服器接受到使用者的 request 後，根據 request 的不同，而選擇 response 回什麼樣的資料及網頁畫面，故其 render 畫面的決定是來自後端，也就是 server side。

google 是根據爬到的網頁內容，來給予 SEO 的綜合評分，當今天我們的頁面是 CSR 時，由於爬到網頁，送出 request 時並不會請求其中的 JS 檔案，因此原本預計要被 mount 上去的組件都沒有執行到，故相當於得到一個空白的 index.html 畫面。如此一來，被判定為空白網頁的 SEO 的成效將會非常低落。
因此我們需要 SSR，當收到 request 時即可 response 回相對應的網頁資料，以表示這並不是一個空白的網頁。

## React 提供了哪些原生的方法讓你實作 SSR？
・可將組件用 ```ReactDOM/server``` 提供的 ```renderToString``` 轉成字串
・使用 ```renderToString``` 時，網頁會是單純的字串，為了能讓網頁中的 event listener 順利作動，要使用 ``` ReactDOM.hydrate() ``` 這個方法來取代原本的 ```ReactDOM.render()```，使 client side 在這個情況下依然能使用到 JS 檔案。

## 承上，除了原生的方法，有哪些現成的框架或是工具提供了 SSR 的解決方案？至少寫出兩種
Next.js
Razzle

參考資料
[[Redux] middleware 筆記](https://pjchender.dev/react/redux-middleware/)
[React SSR | 從零開始實作 SSR — 基礎篇](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/server-side-rendering-ssr-in-reactjs-part1-d2a11890abfc)
[React | 用實作了解 Server-Side Rendering 的運作原理](https://medium.com/starbugs/react-%E7%94%A8%E5%AF%A6%E4%BD%9C%E4%BA%86%E8%A7%A3-server-side-rendering-%E7%9A%84%E9%81%8B%E4%BD%9C%E5%8E%9F%E7%90%86-c6133d9fb30d)
[4图看懂React SSR中的hydrate](https://segmentfault.com/a/1190000038336185)
