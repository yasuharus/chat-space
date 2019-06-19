$(document).on("turbolinks:load", function() {
  var list = $("#user-search-result");
  
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${ user.name }">追加</div>
                </div>`
    list.append(html)
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    list.append(html)
  }

  function appendChatMember(memberId, memberName ) {
    var member = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'">
                    <input name='group[user_ids][]' type='hidden' value= "${ memberId } class="member"   >
                    <p class='chat-group-user__name'>${ memberName }</p>
                    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                  </div>`

  $("#chat-group-users").append(member) 
   };
 
  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault();
    var input = $(this).val();
    var group_users = []; 
    
    $(".member").each(function() {
      group_users.push($(this).attr("value"));
    });
        
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input,
              group_users: group_users
             },
      dataType: "json",
      cache: false
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

  $(document).on("click",".user-search-add ", function() {
    var memberId = $(this).attr("data-user-id");
    var memberName = $(this).attr("data-user-name")
   
     appendChatMember(memberId, memberName)
    $(this).parent().remove(); 
  })

  $(document).on("click",".user-search-remove", function () {
    $(this).parent().remove(); 
  }) 
});