## hw3

依序輸出
undefined
5
6
20
1
10
100

---
Step 1. 初始化 global execution context 以及 global variable object，設變數 a 為 undefined、 fn 為 function、global 的 scope chain 為 global variable object、fn 的 [[Scope]] 相當於 global 的 scope chain
```
global EC: {
    VO: {
        a: undefined,
        fn: function
    },
    scopeChain: [globalEC.VO]
},
fn.[[Scope]] = [global.VO]
```
Step 2. 執行第 1 行， a 賦值為 1
```
global EC: {
    VO: {
        a: 1,
        fn: function
    },
    scopeChain: [globalEC.VO]
},
fn.[[Scope]] = [global.VO]
```
Step 3. 執行第 16 行，進入 function fn 時先初始化其 execution context 及 activation object，設變數 a 為 undefined、 fn2 為 function、fn2 的 [[Scope]] 相當於 fn 的 scope chain
```
fn EC: {
    AO: {
        a: undefined,
        fn2: function
    },
    scopeChain: [fn.AO, global.VO]
}

global EC: {
    VO: {
        a: 1,
        fn: function
    },
    scopeChain: [globalEC.VO]
},

fn2.[[Scope]] = [fn.AO, global.VO]
fn.[[Scope]] = [global.VO]
```
Step 4. 執行第 3 行，由於此時 fn 內 a 為 undefined，故**印出 undefined**
```
fn EC: {
    AO: {
        a: undefined,
        fn2: function
    },
    scopeChain: [fn.AO, global.VO]
}

global EC: {
    VO: {
        a: 1,
        fn: function
    },
    scopeChain: [globalEC.VO]
},

fn2.[[Scope]] = [fn.AO, global.VO]
fn.[[Scope]] = [global.VO]
```
Step 5. 執行第 4 行，fn 內的 a 賦值為 5
```
fn EC: {
    AO: {
        a: 5,
        fn2: function
    },
    scopeChain: [fn.AO, global.VO]
}

global EC: {
    VO: {
        a: 1,
        fn: function
    },
    scopeChain: [globalEC.VO]
},

fn2.[[Scope]] = [fn.AO, global.VO]
fn.[[Scope]] = [global.VO]
```
Step 6. 執行第 5 行，**印出 fn 內的 a 為 5**
```
fn EC: {
    AO: {
        a: 5,
        fn2: function
    },
    scopeChain: [fn.AO, global.VO]
}

global EC: {
    VO: {
        a: 1,
        fn: function
    },
    scopeChain: [globalEC.VO]
},

fn2.[[Scope]] = [fn.AO, global.VO]
fn.[[Scope]] = [global.VO]
```
Step 7. 執行第 6 行，fn 內的 a 賦值為 6
```
fn EC: {
    AO: {
        a: 6,
        fn2: function
    },
    scopeChain: [fn.AO, global.VO]
}

global EC: {
    VO: {
        a: 1,
        fn: function
    },
    scopeChain: [globalEC.VO]
},

fn2.[[Scope]] = [fn.AO, global.VO]
fn.[[Scope]] = [global.VO]
```
Step 8. 執行第 7 行，設變數 a，因已有設定，故視為無意義
```
fn EC: {
    AO: {
        a: 6,
        fn2: function
    },
    scopeChain: [fn.AO, global.VO]
}

global EC: {
    VO: {
        a: 1,
        fn: function
    },
    scopeChain: [globalEC.VO]
},

fn2.[[Scope]] = [fn.AO, global.VO]
fn.[[Scope]] = [global.VO]
```
Step 9.  執行第 8 行，進入 function fn2 時先初始化其 execution context、activation object 及 scope chain
```
fn2 EC: {
    AO: {
        
    },
    scopeChain: [fn2.AO, fn.AO, global.VO]
},

fn EC: {
    AO: {
        a: 6,
        fn2: function
    },
    scopeChain: [fn.AO, global.VO]
},

global EC: {
    VO: {
        a: 1,
        fn: function
    },
    scopeChain: [globalEC.VO]
},

fn2.[[Scope]] = [fn.AO, global.VO]
fn.[[Scope]] = [global.VO]
```
Step 9.  執行第 11 行，由於 fn2 中沒有變數 a，故由其scope chain 往上一層 fn AO 中取用其 a 為 6，**印出 6**
```
fn2 EC: {
    AO: {
        
    },
    scopeChain: [fn2.AO, fn.AO, global.VO]
},

fn EC: {
    AO: {
        a: 6,
        fn2: function
    },
    scopeChain: [fn.AO, global.VO]
},

global EC: {
    VO: {
        a: 1,
        fn: function
    },
    scopeChain: [globalEC.VO]
},

fn2.[[Scope]] = [fn.AO, global.VO]
fn.[[Scope]] = [global.VO]
```
Step 10.  執行第 12 行，由於 fn2 中沒有變數 a，故由其scope chain 往上一層 fn AO 中，將其 a 賦值為 20
```
fn2 EC: {
    AO: {
        
    },
    scopeChain: [fn2.AO, fn.AO, global.VO]
},

fn EC: {
    AO: {
        a: 20,
        fn2: function
    },
    scopeChain: [fn.AO, global.VO]
},

global EC: {
    VO: {
        a: 1,
        fn: function
    },
    scopeChain: [globalEC.VO]
},

fn2.[[Scope]] = [fn.AO, global.VO]
fn.[[Scope]] = [global.VO]
```
Step 11.  執行第 13 行，由於 fn2 中沒有變數 b，故由其scope chain 往上一層 fn AO 中找，這一層也沒有，故再由其scope chain 往上一層 glonal VO 中找，由於這一層也沒有找到 b，故直接在 global VO 中設定一變數 b 並賦值為 100
```
fn2 EC: {
    AO: {
        
    },
    scopeChain: [fn2.AO, fn.AO, global.VO]
},

fn EC: {
    AO: {
        a: 20,
        fn2: function
    },
    scopeChain: [fn.AO, global.VO]
},

global EC: {
    VO: {
        a: 1,
        fn: function,
        b:100
    },
    scopeChain: [globalEC.VO]
},

fn2.[[Scope]] = [fn.AO, global.VO]
fn.[[Scope]] = [global.VO]
```
Step 12.  離開 fn2， fn2 EC 消失
```
fn EC: {
    AO: {
        a: 20,
        fn2: function
    },
    scopeChain: [fn.AO, global.VO]
},

global EC: {
    VO: {
        a: 1,
        fn: function,
        b:100
    },
    scopeChain: [globalEC.VO]
},

fn.[[Scope]] = [global.VO]
```
Step 13.  執行第 9 行，**印出 fn 中的 a 為 20**
```
fn EC: {
    AO: {
        a: 20,
        fn2: function
    },
    scopeChain: [fn.AO, global.VO]
},

global EC: {
    VO: {
        a: 1,
        fn: function,
        b:100
    },
    scopeChain: [globalEC.VO]
},

fn.[[Scope]] = [global.VO]
```
Step 14.  離開 fn， fn EC 消失
```
global EC: {
    VO: {
        a: 1,
        fn: function,
        b:100
    },
    scopeChain: [globalEC.VO]
}

```
Step 15.  執行第 17 行，**印出 global 中的 a 為 1**
```
global EC: {
    VO: {
        a: 1,
        fn: function,
        b:100
    },
    scopeChain: [globalEC.VO]
}

```
Step 16.  執行第 18 行，global 中的 a 賦值為 10
```
global EC: {
    VO: {
        a: 10,
        fn: function,
        b:100
    },
    scopeChain: [globalEC.VO]
}

```
Step 17.  執行第 19 行，**印出 global 中的 a 為 10**
```
global EC: {
    VO: {
        a: 10,
        fn: function,
        b:100
    },
    scopeChain: [globalEC.VO]
}

```
Step 18.  執行第 19 行，**印出 global 中的 b 為 100**
```
global EC: {
    VO: {
        a: 10,
        fn: function,
        b:100
    },
    scopeChain: [globalEC.VO]
}

```