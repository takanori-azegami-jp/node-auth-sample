# react-auth-sample

react のログイン認証サンプル

## バックエンド環境構築

docker フォルダ配下で下記コマンドを実行

```bash
$ docker-compose up -d --build
```

## フロントエンド環境構築

```bash
$ npm create vite@latest
$ npm install react-router-dom
$ npm install react-hook-form
```

## プロジェクト実行

```bash
package.jsonファイルを編集
"dev": "vite",
↓
"start": "vite",
```

```bash
> npm start
```

## 参考サイト

- [Docker で Node.js+PostgreSQL の環境を構築する](https://qiita.com/basio/items/6e32d6badd2a002de72c)
- [takanori-azegami-jp/react-layout-sample](https://github.com/takanori-azegami-jp/react-layout-sample)
- [【React×Express】フルスタックで SPA の認証機能を実装してみた。](https://zenn.dev/masatotezuka/articles/9d9f9f9812f239)
