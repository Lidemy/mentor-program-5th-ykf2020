## Webpack 是做什麼用的？可以不用它嗎？
Webpack 可以視為模組打包工具，可以實踐模組化的開發方式，將不同的靜態資源視作模組打包成優化的程式碼，而隨著功能不斷加強，已經變成了前端開發集大成的自動化工具。

在 ES6 出現之前，NodeJS 中的 require / module.exports 方法並不為瀏覽器所使用，此時需要使用 webpack 來進行打包，以轉換成瀏覽器可以理解的程式碼，而 ES6 出現後，儘管有 import / export 方法，仍會遇到瀏覽器相容性的問題。同時，若是由 npm install 而來的開發時使用的套件，也不便於整組安裝於瀏覽器執行環境中，此時 webpack 即可彈性地打包使用的部分供瀏覽器運行時使用。

而隨著前端開發不斷發展，出現許多工作、資源需要進行管理，如 SCSS、SASS、圖片檔案壓縮、minify、uglify、hash、動態產生 html 等等許多工作，此時 webpack 做到了能整合執行這些工作，並能自動監視檔案更動的特性。使用 webpack 相當於能同時使用多項工具，因此成為目前相當重要的前端開發自動化工具。

可以不用他嗎？可以，但若專案規模大，此時資源、套件等數量將會很龐大，若不使用的話，僅為了管理各種工具的使用，可能會造成開發效率下降。

## gulp 跟 webpack 有什麼不一樣？
gulp 主要的設計理念為自動化管理工作流程的工具，例如 babel、scss、壓縮、重新整理、minify、uglify 等動作，皆可經由 gulp 的設定來自動化完成，節省手動一一執行的時間。

webpack 主要是模組打包工具，由於瀏覽器有相容性問題，若透過 webpack 將不同套件進行打包，再轉譯為優化的程式碼，可將各種資源打包成執行相容性較佳的呈現方式。

隨著工具的發展，gulp 及 webpack 雖目標不同，但均能達到彼此的部分功能，由於 webpack 提供了許多資源的 loader ，其對於自動化管理的層面也有相當好的表現。
gulp 4.0 更新後已宣布不再繼續更新了，未來 gulp 的使用量應會漸漸消失，而目前大型專案皆以 webpack 為主流。

## CSS Selector 權重的計算方式為何？
簡單來說：
``` !important > inline style > ID > Class/psuedo-class / attribute > Element > universal selector ```

詳細計算方式：
ID、Class/Attibute、Element 分別為三種等級的權重，可以定義為 a、b、c ，並可以根據每一組 Selector 中出現的條件來分別對應不同的等級加上一分，若兩組 Selector 指到同一個元素，此時需比較權重來判斷誰具有權力進行修改，則根據兩組 Selector 出現的最高等級比較分數、若出現的最高等級分數相同，再比較次一等級。

舉例來說：
1. ``` ul > li ``` 分數為 0-2-0 （兩個 class）
2. ``` div ``` 分數為 0-0-1 （一個 element）
3. ``` li.myclass ``` 分數為 0-1-1 （一個 class、一個 element）
4. ``` input[type]:not(.class) ``` 分數為 0-2-1 （兩個 class/attibute 一個 element）
4. ``` #myDiv li.class a[href] ``` 分數為 1-2-2 （一個 ID、兩個 class/attribute 兩個 element）

此時若 1. 2. 指到相同元素，則由 1. 勝出；若 1. 3. 指到相同元素，則由 3. 勝出；若 1. 4. 比較，則由 4. 勝出
而若是等級、分數皆同，則比較 Selector 被寫出來的順序

在此一比較的三個例外為 
1. universal selector：視為比 element 還小，不列入權重比較
2. inline-style：視為比 ID 還大，可看作 1-0-0-0
3. !important：視為比 inline-style 還大，可看作 1-0-0-0-0
