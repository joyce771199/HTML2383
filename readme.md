## Readme

### 快速開始
```
$ npm install
$ nodemon
```

### 如果過去未曾安裝過nodemon

```
$ npm i -g nodemon
```

MacOS需要輸入

```
$ sudo npm i -g nodemon --unsafe-perm
```

### 產生一個Express專案

```
$ express --view=ejs 專案名稱
```

進入專案資料夾
```
$ cd 專案名稱
```

安裝所需套件
```
$ npm install
```


# assets與views裡都是前端的js
# 一開始無法執行是因為必備套件環境尚未具備
# package.json有寫需要套件指令
# 終端機輸入 npm i 即會根據指令install套件並建立放入node_modules下
# 若前端需取用的檔案須放在assets資料夾下才可取到，其他資料夾為後端隔開的無法取用


# DB使用google的Firebase
# 建立專案以後使用建構=>Firestore Database
# 專案設定=>服務帳戶 裡可以產生金鑰 下載並放入專案資料夾