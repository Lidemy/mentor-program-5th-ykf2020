## hw2 ##

依序輸出
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5

---

由於此程式碼中的 for 迴圈是以 var 來設定 i 變數，可視為設定一個全域變數 i，故可將程式碼理解為：

```
var i
for(i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

Step 1. 程式碼讀入

| Stack  | 瀏覽器 |
| ------ | ------ |
|        |        |
|        |        |
| main() |        |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   |      |
| ---- | ---- |

Step 2. 進入 for 迴圈

| Stack  | 瀏覽器 |
| ------ | ------ |
|        |        |
| for()  |        |
| main() |        |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   |      |
| ---- | ---- |

Step 3. i = 0，第 0 圈。```console.log('i: ' + i)``` 進入 stack

| Stack                  | 瀏覽器 |
| ---------------------- | ------ |
| console.log('i: ' + i) |        |
| for()                  |        |
| main()                 |        |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 0    |
| ---- | ---- |

Step 4. i = 0，第 0 圈。```console.log('i: ' + i)``` 離開 stack，印出 ``i: 0``

| Stack  | 瀏覽器 |
| ------ | ------ |
|        |        |
| for()  |        |
| main() |        |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 0    |
| ---- | ---- |

Step 5. i = 0，第 0 圈。```setTimeout(() => {
    console.log(i)
  }, i * 1000)``` 進入 stack
  (***為方便表示，此處以 cb 取代 () => console.log(i)***)

| Stack          | 瀏覽器 |
| -------------- | ------ |
| setTimeout(cb) |        |
| for()          |        |
| main()         |        |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 0    |
| ---- | ---- |

Step 6. i = 0，第 0 圈。```setTimeout(() => {
    console.log(i)
  }, i * 1000)``` 離開 stack，``() => console.log(i)`` 交給瀏覽器的 timer 處理，並設 timer 為 i * 1000 毫秒，在第 0 圈中相當於 0 毫秒
  (***為方便表示，此處以 cb 取代 () => console.log(i)***)

| Stack  | 瀏覽器    |
| ------ | --------- |
|        |           |
| for()  |           |
| main() | Timer(cb) |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 0    |
| ---- | ---- |

Step 7. i = 1，第 1 圈。```console.log('i: ' + i)``` 進入 stack

| Stack                  | 瀏覽器    |
| ---------------------- | --------- |
| console.log('i: ' + i) |           |
| for()                  |           |
| main()                 | Timer(cb) |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 1    |
| ---- | ---- |

Step 8. i = 1，第 1 圈。```console.log('i: ' + i)``` 離開 stack，印出 ``i: 1``

| Stack  | 瀏覽器    |
| ------ | --------- |
|        |           |
| for()  |           |
| main() | Timer(cb) |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 1    |
| ---- | ---- |

Step 9. i = 1，第 1 圈。```setTimeout(() => {
    console.log(i)
  }, i * 1000)``` 進入 stack
  (***為方便表示，此處以 cb 取代 () => console.log(i)***)

| Stack          | 瀏覽器    |
| -------------- | --------- |
| setTimeout(cb) |           |
| for()          |           |
| main()         | Timer(cb) |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 1    |
| ---- | ---- |

Step 10. i = 1，第 1 圈。```setTimeout(() => {
    console.log(i)
  }, i * 1000)``` 離開 stack，`` () => console.log(i)`` 交給瀏覽器的 timer 處理，並設 timer 為 i * 1000 毫秒，在第 1 圈中相當於 1000 毫秒
  (***為方便表示，此處以 cb 取代 () => console.log(i)***)

| Stack  | 瀏覽器    |
| ------ | --------- |
|        |           |
| for()  | Timer(cb) |
| main() | Timer(cb) |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 1    |
| ---- | ---- |

Step 11. i = 2，第 2 圈。```console.log('i: ' + i)``` 進入 stack

| Stack                  | 瀏覽器    |
| ---------------------- | --------- |
| console.log('i: ' + i) |           |
| for()                  | Timer(cb) |
| main()                 | Timer(cb) |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 2    |
| ---- | ---- |

Step 12. i = 2，第 2 圈。```console.log('i: ' + i)``` 離開 stack，印出 ``i: 2``

| Stack  | 瀏覽器    |
| ------ | --------- |
|        |           |
| for()  | Timer(cb) |
| main() | Timer(cb) |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 2    |
| ---- | ---- |

Step 13. i = 2，第 2 圈。```setTimeout(() => {
    console.log(i)
  }, i * 1000)``` 進入 stack
  (***為方便表示，此處以 cb 取代 () => console.log(i)***)

| Stack          | 瀏覽器    |
| -------------- | --------- |
| setTimeout(cb) |           |
| for()          | Timer(cb) |
| main()         | Timer(cb) |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 2    |
| ---- | ---- |

Step 14. i = 2，第 2 圈。```setTimeout(() => {
    console.log(i)
  }, i * 1000)``` 離開 stack，``() => console.log(i)`` 交給瀏覽器的 timer 處理，並設 timer 為 i * 1000 毫秒，在第 1 圈中相當於 2000 毫秒
  (***為方便表示，此處以 cb 取代 () => console.log(i)***)

| Stack  | 瀏覽器    |
| ------ | --------- |
|        | Timer(cb) |
| for()  | Timer(cb) |
| main() | Timer(cb) |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 2    |
| ---- | ---- |

Step 15. i = 3，第 3 圈。```console.log('i: ' + i)``` 進入 stack

| Stack                  | 瀏覽器    |
| ---------------------- | --------- |
| console.log('i: ' + i) | Timer(cb) |
| for()                  | Timer(cb) |
| main()                 | Timer(cb) |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 3    |
| ---- | ---- |

Step 16. i = 3，第 3 圈。```console.log('i: ' + i)``` 離開 stack，印出 ``i: 3``

| Stack  | 瀏覽器    |
| ------ | --------- |
|        | Timer(cb) |
| for()  | Timer(cb) |
| main() | Timer(cb) |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 3    |
| ---- | ---- |

Step 17. i = 3，第 3 圈。```setTimeout(() => {
    console.log(i)
  }, i * 1000)``` 進入 stack
  (***為方便表示，此處以 cb 取代 () => console.log(i)***)

| Stack          | 瀏覽器    |
| -------------- | --------- |
| setTimeout(cb) | Timer(cb) |
| for()          | Timer(cb) |
| main()         | Timer(cb) |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 3    |
| ---- | ---- |

Step 18. i = 3，第 3 圈。```setTimeout(() => {
    console.log(i)
  }, i * 1000)``` 離開 stack，``() => console.log(i)`` 交給瀏覽器的 timer 處理，並設 timer 為 i * 1000 毫秒，在第 1 圈中相當於 3000 毫秒
  (***為方便表示，此處以 cb 取代 () => console.log(i)***)

| Stack  | 瀏覽器    |
| ------ | --------- |
|        | Timer(cb) |
|        | Timer(cb) |
| for()  | Timer(cb) |
| main() | Timer(cb) |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 3    |
| ---- | ---- |

Step 19. i = 4，第 4 圈。```console.log('i: ' + i)``` 進入 stack

| Stack                  | 瀏覽器    |
| ---------------------- | --------- |
|                        | Timer(cb) |
| console.log('i: ' + i) | Timer(cb) |
| for()                  | Timer(cb) |
| main()                 | Timer(cb) |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 4    |
| ---- | ---- |

Step 20. i = 4，第 4 圈。```console.log('i: ' + i)``` 離開 stack，印出 ``i: 4``

| Stack  | 瀏覽器    |
| ------ | --------- |
|        | Timer(cb) |
|        | Timer(cb) |
| for()  | Timer(cb) |
| main() | Timer(cb) |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 4    |
| ---- | ---- |

Step 21. i = 4，第 4 圈。```setTimeout(() => {
    console.log(i)
  }, i * 1000)``` 進入 stack
  (***為方便表示，此處以 cb 取代 () => console.log(i)***)

| Stack          | 瀏覽器    |
| -------------- | --------- |
|                | Timer(cb) |
| setTimeout(cb) | Timer(cb) |
| for()          | Timer(cb) |
| main()         | Timer(cb) |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 4    |
| ---- | ---- |

Step 22. i = 4，第 4 圈。```setTimeout(() => {
    console.log(i)
  }, i * 1000)``` 離開 stack，``() => console.log(i)`` 交給瀏覽器的 timer 處理，並設 timer 為 i * 1000 毫秒，在第 1 圈中相當於 4000 毫秒
  (***為方便表示，此處以 cb 取代 () => console.log(i)***)

| Stack  | 瀏覽器    |
| ------ | --------- |
|        | Timer(cb) |
|        | Timer(cb) |
|        | Timer(cb) |
| for()  | Timer(cb) |
| main() | Timer(cb) |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 4    |
| ---- | ---- |

Step 23. i = 5，因已不符合 i<5 ，離開 for 迴圈

| Stack  | 瀏覽器    |
| ------ | --------- |
|        | Timer(cb) |
|        | Timer(cb) |
|        | Timer(cb) |
|        | Timer(cb) |
| main() | Timer(cb) |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 5    |
| ---- | ---- |

Step 24. 主要程式碼執行完畢

| Stack | 瀏覽器    |
| ----- | --------- |
|       | Timer(cb) |
|       | Timer(cb) |
|       | Timer(cb) |
|       | Timer(cb) |
|       | Timer(cb) |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 5    |
| ---- | ---- |

Step 25. 0 毫秒的 timer 到期，cb 放入 task queue

| Stack | 瀏覽器    |
| ----- | --------- |
|       | Timer(cb) |
|       | Timer(cb) |
|       | Timer(cb) |
|       | Timer(cb) |
|       |           |

| Task queue: | cb   |      |
| ----------- | ---- | ---- |

| i:   | 5    |
| ---- | ---- |

Step 26. 由於 stack 為空，queue 中 cb 進入 stack

| Stack | 瀏覽器    |
| ----- | --------- |
|       | Timer(cb) |
|       | Timer(cb) |
|       | Timer(cb) |
|       | Timer(cb) |
| cb    |           |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 5    |
| ---- | ---- |

Step 27. 執行 cb: ``() => console.log(i)``，cb 離開。此時 i 值為 5，故***印出 5***

| Stack | 瀏覽器    |
| ----- | --------- |
|       | Timer(cb) |
|       | Timer(cb) |
|       | Timer(cb) |
|       | Timer(cb) |
|       |           |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 5    |
| ---- | ---- |

Step 28. 1000 毫秒的 timer 到期，cb 放入 task queue

| Stack | 瀏覽器    |
| ----- | --------- |
|       | Timer(cb) |
|       | Timer(cb) |
|       | Timer(cb) |
|       |           |
|       |           |

| Task queue: | cb   |      |
| ----------- | ---- | ---- |

| i:   | 5    |
| ---- | ---- |

Step 29. 由於 stack 為空，queue 中 cb 進入 stack

| Stack | 瀏覽器    |
| ----- | --------- |
|       | Timer(cb) |
|       | Timer(cb) |
|       | Timer(cb) |
|       |           |
| cb    |           |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 5    |
| ---- | ---- |

Step 30. 執行 cb: ``() => console.log(i)``，cb 離開。此時 i 值為 5，故***印出 5***

| Stack | 瀏覽器    |
| ----- | --------- |
|       | Timer(cb) |
|       | Timer(cb) |
|       | Timer(cb) |
|       |           |
|       |           |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 5    |
| ---- | ---- |

Step 31. 2000 毫秒的 timer 到期，cb 放入 task queue

| Stack | 瀏覽器    |
| ----- | --------- |
|       | Timer(cb) |
|       | Timer(cb) |
|       |           |
|       |           |
|       |           |

| Task queue: | cb   |      |
| ----------- | ---- | ---- |

| i:   | 5    |
| ---- | ---- |

Step 32. 由於 stack 為空，queue 中 cb 進入 stack

| Stack | 瀏覽器    |
| ----- | --------- |
|       | Timer(cb) |
|       | Timer(cb) |
|       |           |
|       |           |
| cb    |           |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 5    |
| ---- | ---- |

Step 33. 執行 cb: ``() => console.log(i)``，cb 離開。此時 i 值為 5，故***印出 5***

| Stack | 瀏覽器    |
| ----- | --------- |
|       | Timer(cb) |
|       | Timer(cb) |
|       |           |
|       |           |
|       |           |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 5    |
| ---- | ---- |

Step 34. 3000 毫秒的 timer 到期，cb 放入 task queue

| Stack | 瀏覽器    |
| ----- | --------- |
|       | Timer(cb) |
|       |           |
|       |           |
|       |           |
|       |           |

| Task queue: | cb   |      |
| ----------- | ---- | ---- |

| i:   | 5    |
| ---- | ---- |

Step 35. 由於 stack 為空，queue 中 cb 進入 stack

| Stack | 瀏覽器    |
| ----- | --------- |
|       | Timer(cb) |
|       |           |
|       |           |
|       |           |
| cb    |           |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 5    |
| ---- | ---- |

Step 36. 執行 cb: ``() => console.log(i)``，cb 離開。此時 i 值為 5，故***印出 5***

| Stack | 瀏覽器    |
| ----- | --------- |
|       | Timer(cb) |
|       |           |
|       |           |
|       |           |
|       |           |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 5    |
| ---- | ---- |

Step 37. 4000 毫秒的 timer 到期，cb 放入 task queue

| Stack | 瀏覽器 |
| ----- | ------ |
|       |        |
|       |        |
|       |        |
|       |        |
|       |        |

| Task queue: | cb   |      |
| ----------- | ---- | ---- |

| i:   | 5    |
| ---- | ---- |

Step 38. 由於 stack 為空，queue 中 cb 進入 stack

| Stack | 瀏覽器 |
| ----- | ------ |
|       |        |
|       |        |
|       |        |
|       |        |
| cb    |        |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 5    |
| ---- | ---- |

Step 39. 執行 cb: ``() => console.log(i)``，cb 離開。此時 i 值為 5，故***印出 5***

| Stack | 瀏覽器 |
| ----- | ------ |
|       |        |
|       |        |
|       |        |
|       |        |
|       |        |

| Task queue: |      |      |
| ----------- | ---- | ---- |

| i:   | 5    |
| ---- | ---- |

（此處為方便解釋，假設 stack 都清空了 0 毫秒的 timer 才到期，但若實際情況是 0 毫秒的 timer 先到期的話，其釋放之 cb 仍會進入 queue 中等待 stack 清空。故不影響結果） 