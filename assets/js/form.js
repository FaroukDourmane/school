$(document).ready(function(){
  $('select').niceSelect();

  $(".registerForm").submit(function(e){
    e.preventDefault();
    $(".form-container .wrapper").addClass("loading");
    $(".loadingContainer").addClass("active");

    var form = $(this);

    $.ajax({
    url: 'ajax/save.php',
    type: 'POST',
    data: new FormData($(form)[0]),
    processData: false,
    contentType: false,
    success: function(response) {
      alert(response);
      response = $.parseJSON(response);

      if ( response.type == "error" )
      {
        $(".form-container .wrapper").removeClass("loading");
        $(".loadingContainer").removeClass("active");

        Swal.fire({
          icon: 'error',
          title: 'حدث خطأ',
          text: response.text,
        });
      }else if( response.type == "success" ){
        let timerInterval
        Swal.fire({
          title: 'تم تسجيلك بنجاح',
          icon: 'success',
          html: 'سيتم تحويلك إلى الصفحة الرئيسية',
          timer: 5000,
          timerProgressBar: true,
          onBeforeOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
              const content = Swal.getContent()
              if (content) {
                const b = content.querySelector('b')
                if (b) {
                  b.textContent = Swal.getTimerLeft()
                }
              }
            }, 100)
          },
          onClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            window.location.href = "index.php";
          }
        });
      }
    }
  });
});

});
