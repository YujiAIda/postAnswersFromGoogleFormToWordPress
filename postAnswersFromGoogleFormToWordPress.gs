// WordPressのルートパス + '/wp-json/wp/v2/posts'
var URI = 'TYPE-YOUR-URI-HERE';

// 投稿ユーザ名
var POST_USER_NAME = 'TYPE-YOUR-USERNAME-HERE';

// Application Password
var APP_PASS = 'TYPE-YOUR-APP-PASS-HERE';

//フォームの回答をWordPressに投稿するメインの関数。
function onSubmit(e) {
  FormApp.getActiveForm();
  Logger.log(e);

  const articleTitle = processFormAnswer(e)[0];
  const articleContent = processFormAnswer(e)[1];

    // リクエストヘッダ  
  const headers = {
    'Authorization': 'Basic '+ Utilities.base64Encode(POST_USER_NAME + ':' + APP_PASS)
  };

  // Payload(投稿内容)
  const payload  = {
    'title'   : articleTitle ,                // 題名
    'content' : articleContent ,              // 本文 
    'status'  : 'draft'                       // 下書き(=draft)状態で投稿
  }

  // Option
  const options = {
    'method' : 'POST',    
    'headers': headers,  
    'payload': payload,
    'muteHttpExceptions': true
  };

  const response = UrlFetchApp.fetch(URI,options);
}

// フォーム回答を処理し、記事タイトルと記事本文を配列で返す関数。
// 記事タイプによって処理を変える
function processFormAnswer(formAnswerData){
  const itemResponses = formAnswerData.response.getItemResponses();
  const formAnswers = []
  const formAnswerNumber = 13;
  const output = []

  // 配列formAnswersに回答を格納していく。
  // 0:記事タイプ,1:投稿者Twitter,2:大会名,3:開催日,4:開催場所,5:参加人数,6:Top8選手情報,7:WebページURL,8:配信先URL,9:公式Twitter URL,10:自由記述欄タイトル,11:自由記述欄本文,12:サムネ画像
  for (let i=0; i<formAnswerNumber; i++){
    if(itemResponses[i]){
      formAnswers[i] = itemResponses[i].getResponse();
    }else{
      formAnswers[i] = "";
    };
  } 
  // Top8選手情報は配列として格納する
  formAnswers[6] = formAnswers[6].split(",");

  if (formAnswers[0]="オフ大会結果"){
    output[0] = formAnswers[2] + " 【オフ大会結果】";
    
    output[1] = `
      <h2>大会概要</h2>
      <p>${formAnswers[3]}に${formAnswers[4]}にて開催されたオフライン大会です。</p>
      <h2>参加人数</h2>
      <p>${formAnswers[5]}</p>
      <h2>結果</h2>
      <figure class="wp-block-table"><table><tbody><tr><td>優勝</td><td>${formAnswers[6][0]}</td></tr><tr><td>2</td><td>${formAnswers[6][1]}</td></tr><tr><td>3</td><td>${formAnswers[6][2]}</td></tr><tr><td>4</td><td>${formAnswers[6][3]}</td></tr><tr><td>5</td><td>${formAnswers[6][4]}</td></tr><tr><td>5</td><td>${formAnswers[6][5]}</td></tr><tr><td>7</td><td>${formAnswers[6][6]}</td></tr><tr><td>7</td><td>${formAnswers[6][7]}</td></tr></tbody></table></figure>
      <p><a href="${formAnswers[7]}" data-type="URL">大会ページ</a></p>
      <h2>配信先</h2>
      <p><a href="${formAnswers[8]}" data-type="URL">${formAnswers[8]}</a></p>
      <h2>外部リンク</h2>
      <p><a href="${formAnswers[7]}" data-type="URL">大会ページ</a></p>
      <p><a href="${formAnswers[9]}" data-type="URL">公式Twitter</a></p>
      <h2>${formAnswers[10]}</h2>
      <p>${formAnswers[11]}</p>
    `;
    
  }
  return output;
}
