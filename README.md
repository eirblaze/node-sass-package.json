# node-sass-package.json

コンパイル＆autoprefixer（ソースマップあり）  
`$ yarn sass`  
  
自動高速コンパイル（ソースマップあり）  
`$ yarn sass-w`   
  
自動コンパイル＆自動autoprefixer（ソースマップあり）  
`$ yarn sass-n`  
  
圧縮コンパイル＆autoprefixer（ソースマップなし）  
`$ yarn sass-r`  
  
## 参考  
### [sass/node-sass](https://github.com/sass/node-sass/)  
### [postcss.org](https://postcss.org)
### [postcss/postcss](https://github.com/postcss/postcss)  
### [postcss/postcss-cli](https://github.com/postcss/postcss-cli)
### [超絶・超速のNODE-SASSでSASSコンパイルのすすめ](https://its-office.jp/blog/sass/2018/05/12/node-sass.html)
> autoprefixerでブラウザの対象バージョン確認する方法は以下の通りです。  
> `$ npx autoprefixer --info`
### [1分でできるnode-sassとautoprefixerを使用したSCSSコンパイル方法](https://iwb.jp/node-sass-autoprefixer-scss-compile/)  
>  package.jsonのファイルのあるディレクトリに`cd`で移動して、`yarn install`でnode-sassなどをインストール  
### [npm-scriptsで簡単・高速・シンプルに Sass / Scss コンパイル！](http://chinpui.net/?p=744)
> NPMを初期化する  
> `$ npm init`
### [npm-scriptsの練習メモ sassのコンパイルと圧縮をやってみる](https://qiita.com/miminari/items/50d8695c59ebf71b2307)
> `$ npm install --save node-sass`  
> `--save`と書くと、package.jsonにdependenciesとして以下のように追加される。こうしておくと後で便利。  
> package.jsonを次のプロジェクトのディレクトリにコピペ（node_modules以下は除く）して  
> `$ npm install`  
> すると、必要なパッケージがインストールされて使えます。  
### [npmでミニマムに始めるSass](https://qiita.com/masamichiueta/items/0074f002d8f1663577a2)
> おまけ  
> nodeを使えばローカルサーバーも簡単に立ち上げられます。  
> local-web-serverを使用します。  
> `$ npm install -D local-web-server`  
> `$ ws`  
### [node-sassでSassファイルをコンパイルする](https://qiita.com/setouchi/items/2f7ae68764abe74934fb)
> よく使うコマンド  
> ファイルを更新したら自動コンパイルする場合は-wか--watchを付ける  
> `node-sass test.scss test.css -w`  
>  
> --output-styleでコンパイル結果を調整できます。デフォルトはnestedになっていますが、出力結果のCSSを整形して出力するならexpandedを指定します。  
> `node-sass test.scss test.css --output-style expanded`  
>  
> 本番公開時に圧縮コンパイルする場合はcompressedを指定します。  
> node-sass test.scss test.css --output-style compressed  
>  
> 小技  
> catで流すこともできます  
> `cat test.scss | node-sass > out.css`  
>  
> デフォルトはインデントのスペース数は2ですがこれは変更できます  
> `node-sass test.scss test.css --output-style expanded --indent-width 4`  
>  
> インデントをタブにしたい時はタブにできます  
> `node-sass test.scss test.css --output-style expanded --indent-type tab`  
>  
> その他いろんなオプションがあります（日本語訳しておきました）  
```
-w、--watch                ディレクトリやファイルを監視。更新したら自動コンパイル。
-r、--recursive            ディレクトリやファイルを再帰的に監視する
-o、--output               出力ディレクトリ
-x、--omit-source-map-url  出力からソースマップのURLコメントを省略する
-i、--indented-syntax      stdinのデータをsassコードとして扱う(対scss)
-q、--quiet                エラー以外のログ出力を抑止する
-v、--version              バージョン情報を表示します。
--output-style            CSS出力スタイル (nested | expanded | compact | compressed)  
--indent-type             出力CSSのインデントタイプ (space | tab)
--undent-width            インデント幅。スペースまたはタブの数（最大値：10）
--linefeed               ラインフィードスタイル (cr | crlf | lf | lfcr)
--source-comments         出力にデバッグ情報を含める
--source-map              ソースマップを出力する
--source-map-contents     マップにインクルードした内容を埋め込む
--source-map-embed        データURIとしてsourceMappingUrlを埋め込む
--source-map-root         基本パスはそのままsource-mapに出力されます
--include-path            インポートされたファイルを探すパス
--follow                  symlinkedディレクトリに従う
--precision               10進数で許可される精度の量
--importer                カスタムインポーターを含む.jsファイルへのパス
--functions               カスタム関数を含む.jsファイルへのパス
--help                    ヘルプの表示
```
