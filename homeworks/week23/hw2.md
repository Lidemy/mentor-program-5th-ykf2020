## 為什麼我們需要 Redux？
Redux 可以作為取代 state 的資料管理工具，將 state 由 Redux 集中管理，當 component 需要資料時，直接向 Redux 取用即可，如此可避免當專案越來越複雜時， state 需要一層一層往下傳的狀況、也可以達到顯示畫面的 component 與資料管理達到分離的效果

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？
Redux 讓開發者可以建立一個唯一的資料管理容器，用來集中式的管理資料，
其中由以下這些部件組成：
1. state：用來儲存資料
2. reducer：是一個 pure function，負責將給定的 state 根據給定的 action 做變化而得到新的 state
3. action：是一個物件，其中描述了事件的 type，以及可能傳入的參數名稱，當被傳給 reducer 時，會使 reducer 根據相對應的 type 對 state 執行資料變化
4. store：負責整合所有的 reducers，成為唯一的資料取用點

## 該怎麼把 React 跟 Redux 串起來？
使用 react-redux 套件，可以得到一個 Provider component，在 index.js 中用 Provider 將整支 App 包起來，可以使 App 中所有 component 皆可取得 Redux 中的資料。
在 compoent 中若需使用 Redux 中的資料，需要 ```import { useSelector, useDispatch} from 'react-redux '```
可以用 useSelector 將資料從 store 中取出，如：
```
const todos = useSelector((store) => store.todoState.todos)
// 透過 useSelector 從 Provider 中可以取得的 store 中再取出需要的 todoState.todos
```
可以用 useDispatch 來操作相對應的 reducer 中所看得懂的 action 來修改資料，如：
```
const dispatch = useDispatch()
const handleDeleteTodo = (payload) => {
    dispatch(deleteTodo(payload))
}
// deleteTodo 為 todoReducer 中有定義的可以用來刪除 todo 的 action，故用 dispatch 執行它即可做出這個動作
```


參考資料：
[[Redux] Redex 核心概念筆記](https://note.pcwu.net/2017/03/04/redux-intro/)
[Day12 | React 的快樂小夥伴 - Redux 資料管理篇](https://ithelp.ithome.com.tw/articles/10219962)
