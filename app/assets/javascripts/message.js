$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var html = `<div class="message">
    <div class="message__upper-info">
    <p class="message__upper-info__talker">
      ${ message.name}
    </p>
    <p class="message__upper-info__date">
      ${ message.created_at}
    </p>
    </div>
    <p class="message__text">
    <p class="lower-message__content">
      ${ message.content}
    </p>
    </p>
    
    </div>`
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
      $('.messages').append(html)
      $('.input-box__text').val('')
    })
    .fail(function() {
      alert('error');
    })
    .always(function() {
      $(".submit-btn").removeAttr("disabled");
    });   
  });
});