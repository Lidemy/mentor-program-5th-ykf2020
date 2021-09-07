## 請列出 React 內建的所有 hook，並大概講解功能是什麼
**useState**：回傳一個 state 的值，以及更新 state 的 callback function。在第一次 render 時，回傳的 state 的值會跟第一個參數一樣
**useEffect**：顧名思義為副作用，可定義當畫面 render 時，要同時產生的動作，也就是副作用，並可透過 dependency array 的設定來控制要哪些 state 是要保持監控有無需要 re-render 的
**useContext**：可以由 React.createContext 建立一個 context object，並透過 <Context.Provider> 這個 component 從最上層的父組件向所有子組件進行傳遞，當子組建要取用 context object 中的值時，即可使用 useContext 將值取出
**useLayoutEffect**：與 useEffect 大同小異，差別在它會在瀏覽器 paint 出畫面前就產生動作（副作用）
**useCallback**：相當於把一個 function 給記憶住，只有當 dependency 有所改變時，才會重新定義這個 function，如此可避免不必要的重複 render 這個 function 導致浪費效能
**useMemo**：將一個值給記憶住，只有當 dependency 有所改變時，才會重新計算這個值，如此可避免不必要的重複 render 導致重複計算這個值 進而浪費效能
**useRef**：會回傳一個 mutable 的ref object，初始傳入的參數會被存在 ```.current``` 之中，回傳的 object 在 component 的生命週期中將保持不變，而重要的是 ```.current``` 中的參數發生改變時，不會觸發 re-render 
**useReducer**：可視為 useState 的替代方案，在 Redux 中很常使用。會回傳一個 dispatch 方法，透過這個 dispatch 方法可以使用更複雜的邏輯來改變 state 
**useImperativeHandle**：常與 forwardRef 同時使用，可讓使用 ref 時能向父 component 暴露自定義的 instance 值
**useDebugValue**：可以用來在 devTool 中，為自訂的 hook 提供標籤

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點
### Mointing 階段
**contructor**：在 mounting 階段最先被初始化的部分，為一個 JavaScript class 類別，可在此處為初始化 this.state、為 event handler 綁定 instance
**static getDerivedStateFromProps(props, state)**：透過 props 取得外層傳入的最新值，透過比對元件自身的 state 決定是否要更新子元件中的 state 狀態
**render**：透過 render 方法可以在瀏覽器上渲染出我們需要的 DOM
**componentDidMount**： 確定東西都已經 mount 上去之後才做的事情，可在此建立監聽事件或網路請求
### Updating 階段
**static getDerivedStateFromProps(props, state)**：同上
**shouldComponentUpdate(nextProps, nextState)**：發生在 render 之前，可透過比對新舊 state，props 的變化來決定是否 render，回傳 false 則不會 re-render
**render**：同上
**getSnapshotBeforeUpdate(prevProps, prevState)**：在 render 之後、DOM 更新之前，通常可以用來在 DOM 改變之前先從其中抓取一些資訊，此外當使用了這個方法時，會回傳一個值作為參數傳遞給 componentDidUpdate()
**componentDidUpdate(prevProps, prevState, snapshot)**：DOM 確實更新後所要做的動作，依據官方解釋，在這邊也非常適合做網路請求，跟 componentDidMount 的差異在，使用 componentDidUpdate 可以做新舊 state 的比對來判定是否執行，以免影響效能

### Unmounting 階段
**componentWillUnmount**：在一個 component 被 unmount 和 destroy 後馬上被呼叫，可以在這裡做一些清除的行為






## 請問 class component 與 function component 的差別是什麼？
1. class component 在撰寫上較為物件導向，其中包含了繼承的概念，若需要調用 state，也必須另外訂一一個 state 物件。
2. class component 具有生命週期，可以針對某些情境決定是否渲染；function component 可以用 useEffect 達到類似效果，但不像 class component 有根據明確使用生命週期來命名的 function 可供使用
3. class component 需要實作render方法
4. function component 使用時不用宣告 this
5. class component每次都可以拿到最新的this.props，因為this隨時都在變化、function component的 props 會一直是原本傳進來的那個，而不會跟著更新，因此對於需要用閉包的概念來來理解以避免 function call 的誤用




## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？
controlled component 可以讓 React 直接控制、管理表單狀態，此時 form 的內容永遠與 state 同步，state 成為單一資料來源 (Single Source of Truth) 以利於資料維護驗證等後續操作
uncontrolled component 則是讓 form 元素依然沿用 html 原生的 state，react 僅利用類似 DOM 的的方式來另外取得其中的值

何時需使用 controlled component：需要對 form 進行資料檢查、格式驗證，或需取得 form 的 state 來連動修改其他的 component 時
何時需使用 uncontrolled component：跟飛 react 的程式碼整合時、form 的行為簡單，不需要取用 form state 時、處理特殊的 form element時，如 file input 



***參考資料***
[Class-based Component 生命週期方法(續)](https://ithelp.ithome.com.tw/articles/10242491)
[React Hooks教学教程 | 案例详解 - useImperativeHandle](https://www.youtube.com/watch?v=cczb6v1LcRA)
[React Hooks教学教程 | 案例详解 - useDebugValue & 自定义Hook](https://www.youtube.com/watch?v=IH8oLqS12Ck)
[Hooks API 參考](https://zh-hant.reactjs.org/docs/hooks-reference.html#usestate)
[I Want To Know React - 初探 Form & Controlled component](https://ithelp.ithome.com.tw/articles/10249496)
[I Want To Know React - Controlled component 語法](https://ithelp.ithome.com.tw/articles/10250041)
[I Want To Know React - Uncontrolled component](https://ithelp.ithome.com.tw/articles/10250448?sc=rss.iron)
[Uncontrolled Component](https://zh-hant.reactjs.org/docs/uncontrolled-components.html)
[React Class-based vs Functional Component](https://linyencheng.github.io/2020/02/02/react-component-class-based-vs-functional/)
[【Day 8】Class component && Functional component](https://ithelp.ithome.com.tw/articles/10214751)
[從實際案例看 class 與 function component 的差異](https://blog.techbridge.cc/2020/06/13/class-function-component-and-useeffect/)

