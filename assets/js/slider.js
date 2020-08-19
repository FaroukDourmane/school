$(document).ready(function(){

  var nextButton = $(".slide-wrapper .btn.right");
  var prevButton = $(".slide-wrapper .btn.left");

  $('.slide-wrapper .wrapper').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: $(prevButton),
    nextArrow: $(nextButton)
  });

});
