$(function(){

  //検索結果に
  var usersList = $('#user-search-result');

  //名前があった場合の表示
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    usersList.append(html);
  }
//エラーメッセージ用の表示
  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">${ msg }</div>`
    usersList.append(html);
  }

//ユーザーの削除をする際の表示
  function appendMemberList(name,id){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    return html
  }

  $('#user-search-field').on('keyup', function(e){ //キーを離した
    e.preventDefault();
    var input = $('#user-search-field').val();
    $.ajax({
      url: ('/users'),
      type: "GET",
      data: { name: input},
      dataType: 'json',
      // processDate: false, //formDateで送っているので書く必要がある
      // contentsType: false //ajaxに適した形で再成形してくれるようにしてくれるので、「formDateで送る際は」つける必要がある。
    })
    .done(function(users){ 
      $('#user-search-result').empty();
      if (users.length !== 0){ 
        users.forEach(function(user){ //全ユーザーの表示
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーが見つかりません") //ユーザーがいない場合
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました')
  })
});

  $('#user-search-result').on('click', '.user-search-add', function(){ //追加ボタンの機能
    var name = $('.user-search-add').data('user-name');
    var id = $('.user-search-add').data('user-id');
    var html = appendMemberList(name, id);
    $(this).parent().remove(); //クリックした子要素と親要素を削除
    $('#chat-group-users').append(html);
  })

  $('#chat-group-users').on('click', '.user-search-remove', function(){ //削除ボタンの機能
    $(this).parent().remove(); //クリックした子要素と親要素を削除
  })
});
