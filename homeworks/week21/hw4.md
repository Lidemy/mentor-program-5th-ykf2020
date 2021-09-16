## 為什麼我們需要 React？可以不用嗎？
可以不用，用 jQuery 或 vanilla js 也可以達到操作 DOM 的效果。
但是使用 React 可以為開發帶來許多好處：
1. 以 component 為單位，建立可以重複利用的元件：react 建立的 component 非常容易重複利用，且易於「組裝」在程式碼的不同位置
2. 省下許多操作 DOM 的心力：react 的 virtual DOM 技術，使操作 component 時，背後即在自動建立出相關聯的 virtual DOM tree，使用者不用再費心在操作所需部件的 DOM 
3. 專注在資料處理的單向思考：可以想像成，當頁面資料發生改變時，react 會自動偵測並根據資料的變化，來改動相關聯的 component，操作者不需要再同時想著資料發生變化時，要如何主動去用 DOM 操作相關部件的渲染。
4. 節省效能的 virtual DOM：在畫面重新渲染時，react 會自動比較新舊 virtual DOM 的差異，來最小化更動所需要新渲染的部分，如此比起直接操作 DOM ，會更加節省效能
5. 擴充性高：react 是一個 UI library 而不單單是前端框架，因此它延伸出相當多的應用，如基於 react 而延伸出的 Next.js，可以實現 server side rendering，提升 SEO 效果、React Native 可以寫 mobile app、搭配 Electron 可製作桌面版 app、React 360 可以做出 360 環景效果的 VR 網頁

## React 的思考模式跟以前的思考模式有什麼不一樣？
以往在必須親手操作 DOM 的思考模式中，必須一步一步思考當抓到所需資料、或資料有更動時，該如何再去操作 DOM 來改動相關的 UI， 是資料與 UI 混雜在一起思考如何互相影響的模式。
而 React 在製作 component 時便須將資料與 component 的互動關係連結完成，之後若相關資料有所更動，components 便會自動渲染，如此一來，可以在只關注資料如何變化的情況下，來思考程式如何設計。


## state 跟 props 的差別在哪裡？
State 是 component 本身自己可以維護的狀態，可以用 setState 的方式來進行修改
Props 是由上層傳下來的，本身並不屬於被傳到的 component。而使用上，有被傳下來才能取用，若 setState 沒有一起傳下來，則只能使用這個 prop 而無法修改


參考資料：
[Why You Should Use React.js For Web Development](https://www.freecodecamp.org/news/why-use-react-for-web-development/)
[[筆記] Why React?](https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-why-react-424f2abaf9a2)
[用 React 思考](https://zh-hant.reactjs.org/docs/thinking-in-react.html)
[React的prop與state](https://ithelp.ithome.com.tw/articles/10193775)
[React.js快速入門 — (5)Prop&State&Hook](https://medium.com/mess-up/react-js%E5%BF%AB%E9%80%9F%E5%85%A5%E9%96%80-5-prop-state-hook-19df211a246d)
