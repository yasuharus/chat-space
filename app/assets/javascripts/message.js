$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var html = `<div class="message" data-id="${message.id}" >
    <div class="message__upper-info">
    <p class="message__upper-info__talker">
      ${ message.user_name}
    </p>
    <p class="message__upper-info__date">
      ${ message.created_at}
    </p>
    </div>
    <p class="message__text"></p>`

    if (message.content != null){
      html += `<p class="lower-message__content">${ message.content }</p>`
    }

    if (message.image != null) {
      html += `<img src ="${ message.image }" , class: 'lower-message__image'>`
    }   
    return html;
  }

  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    
    var formData = new FormData(this);
    var url = $(this).attr("action")
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.input-box__text').val('');
      $('.input-box__image__file').val('');
      $('.messages').animate({scrollTop: $(".messages")[0].scrollHeight});
     
    })
    
    .fail(function() {
      alert('error');
    })
    .always(function() {
      $(".submit-btn").removeAttr("disabled");
    });   
  });

  var reloadMessages = function() {
    last_message_id = $(".message:last").data("id");
    group_id = $(".main-header__left-box").data("groupid");
    if (location.pathname.match(/\/groups\/\d+\/messages/)) {
    $.ajax({
      url:`/groups/${group_id}/api/messages`,
      type: 'GET',
      dataType: "json",
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length > 0) {
        messages.forEach(function(message) {
          var html = buildHTML(message);
          $('.messages').append(html);
          $('.messages').animate({scrollTop: $(".messages")[0].scrollHeight});
        }); 
      }
    })
    .fail(function() {
      alert('error');
    });
  };
 }
  $(window).on('load', function() {
    var url = location.href
    group_id = $(".main-header__left-box").data("groupid");
       setInterval(reloadMessages, 5000);

  });  
});