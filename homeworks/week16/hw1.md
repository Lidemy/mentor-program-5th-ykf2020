## hw1 ##

依序輸出 1, 3, 5, 2, 4，步驟如下所述

---



Step 1. 程式碼讀入
| Stack  | WebAPi |
| ------ | ------ |
|        |        |
|        |        |
| main() |        |

| Task queue: |      |      |
| ----------- | ---- | ---- |

Step 2. console.log(1) 進入 stack
| Stack          | WebAPi |
| -------------- | ------ |
|                |        |
| console.log(1) |        |
| main()         |        |

| Task queue: |      |      |
| ----------- | ---- | ---- |

Step 3. console.log(1) 執行後離開 stack （**印出 1**）
| Stack  | WebAPi |
| ------ | ------ |
|        |        |
|        |        |
| main() |        |

| Task queue: |      |      |
| ----------- | ---- | ---- |

Step 4. setTimeout(() => console.log(2), 0 ) 進入 stack
(***為方便表示，此處以 cb2 取代 () => console.log(4)***)
| Stack          | WebAPi |
| -------------- | ------ |
|                |        |
| setTimeout(cb) |        |
| main()         |        |

| Task queue: |      |      |
| ----------- | ---- | ---- |

Step 5. () => console.log(2) 交給 webAPI 的 timer 處理
| Stack | WebAPi |
| ----- | ------ |
|       |        |
|       |        |
| main()  | Timer(cb) 

| Task queue: |      |      |
| ----------- | ---- | ---- |

Step 6. 0毫秒後，timer 結束，() => console.log(2) 進入 task queue，等待 Stack 清空即進入 Stack
| Stack  | WebAPi |
| ------ | ------ |
|        |        |
|        |        |
| main() |        |

| Task queue: | cb   |      |
| ----------- | ---- | ---- |

Step 7. console.log(3) 進入 stack
| Stack          | WebAPi |
| -------------- | ------ |
|                |        |
| console.log(3) |        |
| main()         |        |

| Task queue: | cb   |      |
| ----------- | ---- | ---- |

Step 8. console.log(3) 執行後離開 stack （**印出 3**）
| Stack  | WebAPi |
| ------ | ------ |
|        |        |
|        |        |
| main() |        |

| Task queue: | cb   |      |
| ----------- | ---- | ---- |

Step 9. setTimeout( () => console.log(4), 0 ) 進入 stack
(***為方便表示，此處以 cb 取代 () => console.log(2)***)
| Stack           | WebAPi |
| --------------- | ------ |
|                 |        |
| setTimeout(cb2) |        |
| main()          |        |

| Task queue: | cb   |      |
| ----------- | ---- | ---- |

Step 10. () => console.log(4) 交給 webAPI 的 timer 處理
| Stack  | WebAPi     |
| ------ | ---------- |
|        |            |
|        |            |
| main() | Timer(cb2) |

| Task queue: | cb   |      |
| ----------- | ---- | ---- |

Step 11. 0毫秒後，timer 結束，() => console.log(4) 進入 task queue，等待 Stack 清空即進入 Stack
| Stack  | WebAPi |
| ------ | ------ |
|        |        |
|        |        |
| main() |        |

| Task queue: | cb   | cb2  |
| ----------- | ---- | ---- |

Step 12. console.log(5) 進入 stack
| Stack          | WebAPi |
| -------------- | ------ |
|                |        |
| console.log(5) |        |
| main()         |        |

| Task queue: | cb   | cb2  |
| ----------- | ---- | ---- |
Step 13. console.log(5) 執行後離開 stack （**印出 5**）
| Stack  | WebAPi |
| ------ | ------ |
|        |        |
|        |        |
| main() |        |

| Task queue: | cb   | cb2  |
| ----------- | ---- | ---- |

Step 14. 程式碼都跑完了，main() 執行完畢
| Stack | WebAPi |
| ----- | ------ |
|       |        |
|       |        |
|       |        |

| Task queue: | cb   | cb2  |
| ----------- | ---- | ---- |


Step 15. stack 空掉，queue 的第一位可進入 stack
| Stack | WebAPi |
| ----- | ------ |
|       |        |
|       |        |
| cb    |        |

| Task queue: | cb2  |      |
| ----------- | ---- | ---- |

Step 16. cb 執行後離開 queue （**印出2**）
| Stack | WebAPi |
| ----- | ------ |
|       |        |
|       |        |
|       |        |

| Task queue: | cb2  |      |
| ----------- | ---- | ---- |

Step 17. stack 空掉，queue 的第一位可進入 stack
| Stack | WebAPi |
| ----- | ------ |
|       |        |
|       |        |
| cb2   |        |

| Task queue: |      |      |
| ----------- | ---- | ---- |

Step 16. cb2 執行後離開 queue （**印出4**）
| Stack | WebAPi |
| ----- | ------ |
|       |        |
|       |        |
|       |        |

| Task queue: |      |      |
| ----------- | ---- | ---- |