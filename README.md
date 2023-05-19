# node-auth-sample

node.js でログイン認証サンプル

## 環境

- Windows10 Pro 22H2
- node：18.16.0

## PostgreSQL コンテナ構築

docker_postgresql フォルダ配下でコマンド実行

```bash
$ docker-compose up -d --build
```

## node 環境構築

1. パッケージインストール

```bash
# 初期化
$ npm init
# パッケージインストール
$ npm install express --save
$ npm install mustache-express --save
$ npm install passport --save
$ npm install passport-local --save
$ npm install bcrypt
$ npm install express-session --save
$ npm install connect-flash --save
$ npm install cookie-parser --save
$ npm install sequelize --save
$ npm install sequelize-cli --save
$ npm install pg pg-hstore --save
# sequelizeの初期化
$ npx sequelize-cli init
```

2. データベース接続情報の設定

- 「config」フォルダ内に「config.json」にデータベース接続情報を設定する

3. マイグレーションでデータベース環境構築

- 以下、例

```bash
# テービル追加のマイグレーション
$ x sequelize model:generate --name User --attributes name:string,email:string,password:string,rememberToken:string
# テービル追加
$ npx sequelize db:migrate
# 行追加のマイグレーション
$ npx sequelize seed:generate --name test-users
# 行追加
$ npx sequelize db:seed:all
```

4. node start

```bash
$ npm start
```

5. ブラウザで接続

- http://127.0.0.1:5000

6. ログインテスト

- http://127.0.0.1:5000/login

```bash
id: monaka@example.com
pass: password
```

## 参考サイト

- [コピペで OK！Express にログイン機能をつくる](https://blog.capilano-fw.com/?p=5655)
- [便利！Node.js に DB マイグレーション、Seed、モデルを用意する「Sequelize」](https://blog.capilano-fw.com/?p=5546)
- [入門！Express のインストールと基本のまとめ](https://blog.capilano-fw.com/?p=5485)
