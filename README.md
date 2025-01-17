# ①課題番号-プロダクト名

じゃんけんアプリ 〜リッチVer.〜

## ②課題内容（どんな作品か）

ボタンを押して、PCとじゃんけんをするアプリです。
- スコア表示・記録が可能
- アニメーションやポップアップ画面による勝敗表示
- レスポンシブデザインに対応

## ③DEMO

https://tech-ryu.sakura.ne.jp/janken-app-rich/

## ④作ったアプリケーション用のIDまたはPasswordがある場合

- ID: なし
- PW: なし

## ⑤工夫した点・こだわった点

- 勝敗の結果をポップアップ画面のような形式で表示
  - 勝利/敗北時に、画面全体にエフェクト（画像）が表示されるようにした
  - エフェクトのキャンセル（スキップ）機能あり
- あいこの時は、そのまま結果画面で次の手を選択できる
- 勝利/敗北の回数、勝率、連勝回数を表示している 
  - 各スコアをブラウザ内に保存し、ページをリロードしても今までの通算スコアを見ることができる
- 背景画像、色合いなど工夫 
- レスポンシブデザインに対応
  - スコア表示を画面幅に合わせて縦表示に変更

## ⑥難しかった点・次回トライしたいこと(又は機能)

### 難しかった点
- 背景画像の設定のパラメーターが色々あり最適化が難しかった
  - レスポンシブデザインへの対応
- アニメーションのキャンセル処理
  - 連続でボタンを押すと、前のアニメーションや文字の書き換え処理が残ってしまう

### 次回トライしたいこと

- より操作や処理が複雑なゲームの実装
- 縦幅も最適化したい（現状だと解像度によっては大きすぎて縦がはみ出してしまう）
  
## ⑦質問・疑問・感想、シェアしたいこと等なんでも

- [質問]
- [感想]
  - デザインの工夫やアニメーションの追加で、アプリの面白さが増すことを実感
  - 一方でそこに時間が1番かかってしまうのも課題
- [参考記事]
