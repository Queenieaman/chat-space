$(function(){
  // HTMLの表示の設定
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img class="message-text__image" src= ${ message.image }>` : "";
    var html = `<div class="message" data-id="${message.id}">
                  <div class="upper-info">
                    <p class="upper-info__user">
                      ${message.user_name}
                    </p>
                    <p class="upper-info__date">
                      ${message.date}
                    </p>
                  </div>
                  <div  class="lower-info">
                    <p class="lower-info__text">
                      ${content}
                    </p>
                    ${img}  
                  </div>
                </div>`
  return html;
  }
  $('#new_message').on('submit', function(e){
    // ここでフォームのsubmitイベントを中止。
    e.preventDefault(); 
    var message = new FormData(this); // formdataオブジェクトとして、フォームに入力した値を取得
    // 以下のコードでformdataの中身を確認できる（らしい）
    // for(item of formdata) console.log(item);
    var url = (window.location.href);  // ajaxでリクエストを送る際のパス取得
    $.ajax({  
      url: url,  // リクエストのパス
      type: 'POST', // HTTPメソッド
      data: message,  // リクエストと一緒に送るdata
      dataType: 'json',  //JSON形式でリクエスト送る
      processData: false, // 「リクエストに含まれているdataの型はこれですといった記述（リクエストヘッダにあるらしい）」を変更しない宣言(デフォルト必須)
      contentType: false // リクエストに含まれているdataの実際の型を変更しないための記述（デフォルトで必須）
    })
    .done(function(data){
      var html = buildHTML(data); //非同期でメッセージを追加した
      $('.messages').append(html); //実際に追加
      $('.messages').removeAttr('disable') //SENDを押した際の一時停止（Disable）を削除
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight}, 'normal'); //スクロールを自動化
      $('.new_message')[0].reset(); //テキストフィールドを空に
      window.location.reload();
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.submit-btn__image').prop('disabled', false); //SENDを押した時のDisabledを削除
    })
  })
})
