## 交作業流程

Step1 － Git Clone
---     
進入第五期的個人作業github，將此專案使用git clone建立到本地。  
```
$ git clone https://github.com/Lidemy/mentor-program-5th-ykf2020.git
```

Step 2 － Cd Into The homework Repository
--- 
使用 cd 指令，進入剛剛 clone 到本地的作業專案資料夾中
```
$ cd /users/documents/mentor-program-5th-ykf2020.git
```
Step 3 － Create A New Branch 
---
在此專案中建立一個新的 branch，並進入此 branch
```
$ git branch week1
$ git checkout week1
```
或者直接使用
```
$ git checkout -b week1
```

Step 4 － Git Add And Git Commit
---
修改完專案中資料後，進行 git add 及 git commit 
```
$ git add
$ git commit "finished hw1"
```
或者直接使用
```
$ git commit -am "finished hw1"
```
Step 5 － Git Push
--- 
將完成的作業推上 github
```
$ git push origin week1
```
Step 6 Pull Request
---
到 github 頁面上點選 ``click compare & pull request``

Step 7 Fill The Pull Request Form And Copy The PR Url 
--- 
填寫 pull request 的內容並複製本次 PR 的 url 

Step 8 Turn In The Homework
---
到學習系統的課程總覽，點選繳交作業，並貼上前面複製之 PR request