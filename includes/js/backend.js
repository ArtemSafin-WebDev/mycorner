$("form").submit(function(e){
  let form = $(this);
  var error = false;
  $.each($("input", this), function(){
    var type = $(this).attr("data-type");
    if (type == "text") {
      if ($.trim($(this).val()) == "" || $.trim($(this).val()).length < 3) {
        $(this).addClass("error");
        error = true;
      }
    } else if (type == "phone") {
      if (/^[\+]7 ?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test($(this).val()) == false) {
        $(this).addClass("error");
        error = true;
      }
    } else if (type == "email") {
      if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($(this).val()) == false) {
        $(this).addClass("error");
        error = true;
      }
    }
  });
  if (!error) {
    var fields = $(this).serialize();
    var typeForm = $(this).find('input:checked').attr('data-typeForm');

    $.ajax({
      url:'/local/ajax/send.php',
      data: {
        typeForm: typeForm,
        fields: fields,
      },
      type: 'POST',
      cache: false,
      success: function(){
        form.addClass("ok");
        if (form.closest(".feedback").length == 0) {
          setTimeout(function(){
            form.removeClass("ok");
            $("input[type=\"text\"], input[type=\"phone\"], textarea", form).val("");
            $("form").removeClass("ok");
          }, 2000);
        }
      }
    });
  }
  e.preventDefault();
});
