## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
一、<select>
``` 
<select name="??" size="??">
 <option value="??" selected>?????
 <option value="??">?????
</secect> 
```
是用來製作下拉選單的標籤，在裡面包裹 option 標籤來指定選單中每一個選項選中的值

二、<br>
產生斷行效果，使用單個也不需要加 "/" 符號 

三、<code>
產生程式碼的文字區塊

## 請問什麼是盒模型（box modal）
HTML中的各個元素可以被視為一個盒子，此盒子的總共寬高，由內往外依序由這些屬性所加總起來—— width & height、border、padding、margin。
可以針對上述屬性，來調整此盒子在畫面中所佔的大小。

・Margin -負責調整 元素與元素 之間的邊界間距，屬於元素外部的邊界調整。
・Padding-負責調整 元素內所有內容與元素自身 的邊界間距，屬於元素內部的邊界調整。
・Border-元素最外層的邊界，常見的元素外框設定就是此設定。

調整屬性 box-sizing: border-box;
可以使 width 與 height 為加總後的值，故調整 border、padding、margin 的參數時，皆不會影響到加總後的 width 與 height。




## 請問 display: inline, block 跟 inline-block 的差別是什麼？
・inline：
與其他元素一同出現在同一行中，寬高與上下 margin 皆無法調整。預設為 inline 的 tag 有—— <span>、<a> 等等。
・block：
每個 block 會佔據一整行，並且可以套用各種寬高、margin、padding 的調整。預設為 block 的 tag 有—— <div>、<h1>、<p> 等等。
・inline-block：
簡單來說是可以與其他元素一起出現在同一行並排的 block 元素，以 inline 的方式呈現，卻具有 block 的屬性，寬高、margin、padding等皆可調整。
預設為 inline-block 的 tag 有—— <button>、<input>、<select> 等等。



## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
・static：是預設的定位，無法調整 top、left、bottom 與 right 等參數。
・relative：預設位置與 static 相同，然而可以調整 top、left、bottom 與 right 等參數，是以其預設位置為參考點做相對的調整，並且因調整後元素實際位置仍為原預設位置，故調整後不會推擠別的物件。
・absolute：以其上層之非 static 的物件作為定位基準，以其座位相對位置移動的參考點，若上層無非 static 的物件，則會以 body 做為定為基準。使用 absolute 的物件會脫離排版流，不與其他物件一起排序。
・fixed：以瀏覽器視窗 (viewport) 作為定位，固定在瀏覽器的固定位置上，不因捲軸捲動而位移。常為 navbar、廣告視窗所使用。