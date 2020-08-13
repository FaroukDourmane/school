$(document).ready(function(){

  $(".menuToggler").click(function(e){
    e.preventDefault();
    $(".fixed-menu").toggleClass("active");
  });

});
