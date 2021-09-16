## hw4

依序印出：
2,
2,
undefined

---

1. obj.inner 為一個物件，當它呼叫```console.log(this.value)``` 時，此時的 this 指的是 obj.inner 這個物件，故 this.value 則是這個物件中的 value，值為 2，***印出 2***。

2. 因 obj2 與 obj.inner 指向同一個物件，當它呼叫```console.log(this.value)``` 時，此時的 this 也是指 obj.inner 這個物件，故 this.value 則是這個物件中的 value，值為 2，***印出 2***。

3. this 與怎麼呼叫有關。直接呼叫```hello()```相當於直接呼叫```function() {
      console.log(this) }```，此時 this 並不指向任何東西，故***印出 undefined***

