## 什麼是反向代理（Reverse proxy）？
反向代理是指以一個代理伺服器來接受 request，透過代理伺服器來安排將此 request 轉給哪一台或多台後端伺服器來處理，當處理完成需要回傳 response 時，也是透過此一代理伺服器，來將 response 回傳給 client

使用反向代理的好處：
1. 向客戶端隱藏伺服器真實 IP
2. 可以做到 load balancing，代理伺服器根據不同伺服器的負載狀況來分派工作
3. 代理伺服器先對 request 進行防護，以提升主要伺服器的安全性
4. 可以透過代理伺服器，根據靜態內容或動態內容如串流服務等分開送往不同伺服器處理，藉以提升處理速度

## 什麼是 ORM？
ORM 全名為 Object-Relational Mapping，概念為將資料庫的內容映射為物件，讓程式開發人員可以用操作物件的方式對資料庫進行操作，而不直接使用SQL語法來操作。

使用 ORM 優點：
1. 不論哪一套資料庫系統或版本，若使用 ORM 的話，在操作的語法上都非常接近，此一特色降低了不同資料庫之間轉換的成本
2. 原始的 SQL 語法較為冗長且語句重複性高，用 ORM 來寫的話，在基本 CRUD 操作上可以提升不少效率
3. 原生即防止 SQL injection


使用 ORM 缺點：
1. 在需要許多關聯及部分選取的複雜查詢上，ORM 未必會比較好寫
2. 效能較差

## 什麼是 N+1 problem？
出現在 ORM 中，當做關聯性查詢時，會出現的效能問題
舉例而言，若有一 ```Cars``` 資料表，另外有一 ```Wheels``` 資料表 ，而 ```Car -> Wheel```，是做一對多的關聯。今天當我們想遍歷所有的``` Car ``` 以找出所有 ```Car``` 使用的 ```Wheel``` 時，ORM 在背後下的 Query 如下：

```
SELECT * FROM Cars;
```
先找出了所有 ```Car```

```
SELECT * FROM Wheel WHERE CarId = 1
SELECT * FROM Wheel WHERE CarId = 2
SELECT * FROM Wheel WHERE CarId = 3
SELECT * FROM Wheel WHERE CarId = 4
SELECT * FROM Wheel WHERE CarId = 5
...
.....
......
```
再依照每一個```Car```的 Id，到 ```Wheels``` 表中去遍歷搜尋，此時所下的 query 次數為 1 次（找出所有```Car```）加上 N 次(根據 N 個```CarId```去遍歷搜尋 ```Wheels```表)，故為 N+1 problem

此為 ORM 設計上不可避免的問題，是造成效能低落的一大原因
