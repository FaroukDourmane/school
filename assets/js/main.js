$(document).ready(function(){

  $(".menuToggler").click(function(e){
    e.preventDefault();
    $(".fixed-menu").toggleClass("active");
  });

  $(".readArticle").click(function(e){
    e.preventDefault();
    var bg = $(this).attr("data-bg");
    var content = $(this).attr("data-content");
    var title = $(this).attr("data-title");

    Swal.fire({
      title: title,
      html: content,
      width: 600,
      padding: '3em',
      imageUrl: bg,
      imageWidth: 300,
      imageHeight: 300,
      confirmButtonText: 'إغلاق',
      background: '#fff',
      backdrop: `
        rgba(0,0,123,0.4)
        left top
        no-repeat
      `
    })
  });

});
