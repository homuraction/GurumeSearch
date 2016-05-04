# GurumeSearch

## 機能

以下の機能の実装を予定しています

1. 周辺の登録済み飲食店の一覧を取得・表示する
2. 飲食店の詳細情報を表示する
3. 飲食店までの地図を表示する

## 実装済みの機能

1及び2を実装しました

## 動作環境

以下のOS環境での動作を確認します

- OS X El Capitan Version 10.11.4 以降
- Arch Linux

以下のソフトウェア環境での動作を確認します

- Gem 2.4.5.1以降
- Ruby 2.2.3以降
- Bundler 1.10.6以降

## アプリケーションの起動方法と利用方法

以下のコマンドをターミナルもしくは端末から入力してください

```sh
$ git clone https://github.com/madotuki/GurumeSearch.git # プロジェクトの取得

$ cd GurumeSearch

$ bundle install

$ GURUNAVI_API_KEY=<ぐるなびAPIに登録後送信されたAPIキーを入力する> bundle exec rails s -p <PORT番号> -b <IP番号> # localhostで起動する場合は-bオプション及びIP番号を消してください
```

以上でアプリケーションが起動するので`http://<IP番号>:<PORT番号>`にアクセスすると
アプリケーションにアクセスすることができます(localhostで起動した方は`http://localhost:<PORT番号>`でアクセスしてください)
