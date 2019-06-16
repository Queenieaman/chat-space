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
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.submit-btn__image').prop('disabled', false); //SENDを押した時のDisabledを削除
    })
  })

  var reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){ //今いるページのリンクが/groups/グループID/messagesのパスとマッチすれば以下を実行。
      var last_message_id = $('.message').last().data('id')  //dataメソッドで.messageにある:last最後のカスタムデータ属性を取得しlast_message_idに代入。
      var url = "api/messages"
      $.ajax({
          url: url,         //ルーティングで設定した通りのURLを指定
          type: 'get',      //ルーティングで設定した通りhttpメソッドをgetに指定
          dataType: 'json', //dataオプションでリクエストに値を含める
          data: { id: last_message_id }
      })
      .done(function(messages) {
        var insertHTML = ''; //追加するHTMLの入れ物を作る
        messages.forEach(function(message) {       //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          insertHTML = buildHTML(message); //メッセージが入ったHTMLを取得
          $('.messages').append(insertHTML) //メッセージを追加
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })    
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});
