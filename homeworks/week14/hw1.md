## Hw1 ##
[流程圖連結](https://imgur.com/5i1OltK)

這次作業我先將大致的流程圖畫出來，礙於基礎知識不足，許多需考量的功能我的理解都還不太清楚該如何應用，就沒有畫在圖中，僅加在下面做為補充。

### 未來還需要深入了解的基礎知識：

系統開設需求的估算、Cache 的讀寫機制、資料分區的計算、hash用到的演算法之差異

### 欲增加的應用

Master DB - Slave DB：透過 Master DB 來對 Slave DB 分配讀取寫入的工作比重，或進行讀寫的責任分割，可增進讀寫效率

Key Generation Service：短網址所需的 params 字串，由 KGS 另外生成多組並先存在 KGS DB 備用，當有需求產生時，直接從這裡拿去用。如此可避免每次要在 main server 生成 param 再進 main DB 中過慢存取過慢的情形。KGS 可以先生成多組，以便使用時直接取用。

Redis：速度很快的 key-value database，可以作為在 Cache 中快速查找資料的機制，使用 Redis 可以降低每次都到 main DB 中 query 的壓力 