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


  var testimonials_btn_right = $(".testimonials-container .top .right");
  var testimonials_btn_left = $(".testimonials-container .top .left");
  $('.testimonials-container .wrapper').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: $(testimonials_btn_left),
    nextArrow: $(testimonials_btn_right)
  });

});
