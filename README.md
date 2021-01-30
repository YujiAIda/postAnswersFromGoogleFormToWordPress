# postAnswersFromGoogleFormToWordPress

所定のアウトラインに従ってGoogleFormの回答をHTML化し、WordPressに下書きとして投稿する。  
Webサイト運用にて、アウトラインの定まったページを量産する際に効率化できる。  
サイト運営メンバー以外が寄稿する際に、GoogleFormを用いることで寄稿ハードルを下げ、コンテンツを増やす狙いがある。  

Google Form:  
https://docs.google.com/forms/d/e/1FAIpQLScgj4b3C_eN4w7c_npYWOrJc4UPwsDwYnFh0MP-NaxxG0wJDg/viewform  
Webサイト:  
https://smazeirelease.com  

## GoogleForm連携
今回このFormと連携されている  
https://docs.google.com/forms/d/e/1FAIpQLScgj4b3C_eN4w7c_npYWOrJc4UPwsDwYnFh0MP-NaxxG0wJDg/viewform?usp=sf_link  
Form作成時にオプションからスクリプトエディタを開き、スクリプトを記入する。  
トリガーをフォーム送信時に設定し、アプリ認証を通せば使用できる。

## 今後の展望
1. 下書きを公開するフローの簡略化  
  新規記事のプレビューをDiscord上に送信し、リアクション（👍,👎）で公開ステータスを編集できるようにする  
  WordPressを開かなくていいので楽。  

2. サムネイルの投稿と設定  
  GoogleFormのメディアアップロードを使う場合、記事作成時に画像をドライブから削除したい。  
  GoogleDriveのリンクを送ってもらう場合、公開設定を入力されたURLなどから確認する必要がある。  
  ↓これでいけそう
  https://colabmix.co.jp/tech-blog/wordpress-restapi-post-image-content/  
  と思ったが、以下のエラーが出るので詰んでいる (2021-01-31現在)
  {“code”:”rest_upload_sideload_error”,”message”:”Sorry, this file type is not permitted for security reasons.”,”data”:{“status”:500}}  
  
