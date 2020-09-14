$(document).ready(function(){

  $(".menuToggler").click(function(e){
    e.preventDefault();
    $(".fixed-menu").toggleClass("active");
  });

  $(".scrollTo").click(function(e){
    e.preventDefault();
    var id = $(this).attr("id");
    var elem = $("."+id);

    if (elem.length > 0) {

      var offset = $(elem).offset(); // Contains .top and .left

      $('html, body').animate({
          scrollTop: offset.top,
          scrollLeft: offset.left
      },function(){
        if ( $(".fixed-menu").hasClass("active") )
        {
          $(".fixed-menu").removeClass("active");
        }
      });
    }
  });

  // Open snapchat box
  $(".open-snap").click(function(e){
    e.preventDefault();
    $(".snap-box").addClass("active");
  });

  // Close snapchat box
  $(".snap-box .close").click(function(e){
    e.preventDefault();
    $(".snap-box").removeClass("active");
  });
});
