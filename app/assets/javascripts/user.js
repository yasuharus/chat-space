$(function() {
  var list = $("#user-search-result");
  
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${ user.name }>追加</div>
                </div>`
    list.append(html)
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    list.append(html)
  }


  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault();
    var input = $(this).val();
 
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
    
    .done(function(users) {
      if (users.length !== 0 && input.length !== 0) {
        list.empty();
        users.forEach(function(user){
          appendUser(user);  
        });
      } else if (input.length == 0) { 
          list.empty()
      } else {
        
        list.empty();
        appendErrMsgToHTML("一致するユーザーが見つかりません") 
      }      
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    })
    
  });
});