$(document).ready(function() {
    let limit = 140;
  
    $("#tweet-text").keyup(function () {
  
      let charactersRemaining = limit - $(this).val().length;
  
      $(".counter").text(charactersRemaining);
  
      if (charactersRemaining < 0) {
        $(".counter").addClass("counter-overlimit");
      } else {
        $(".counter").removeClass("counter-overlimit");
      }
  
    });
  
  });