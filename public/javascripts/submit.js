$(document).ready(function() {
  $("#email-form").on('submit', function(e) {
    e.preventDefault();
    var form = $(this);
    var userData = form.serialize();

    // Check if null
    if ($("#email").val() === '') return;

    // POST
    $.ajax({
      url: '/users',
      type: 'POST',
      data: userData
    }).success(function(){
      form.hide();
      $("#confirm").removeClass('hide');

      // Enable conversion tracking for fb ad
      $("#fb_pixel").addClass("fb_conversion");
    });

  });
});
