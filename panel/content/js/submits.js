$(document).ready(function(){

  // When submitting a form
  $(document).on("click","button[type='submit']",function(e){

    e.preventDefault();

    var actions = {
      "changeEmail": "ajax/login.php",
      "changePasswrod": "ajax/login.php",
      "changeContact": "ajax/contact.php",
      "generalAbout": "ajax/about.php",
      "addSocial": "ajax/addSocial.php",
      "uploadCatalog": "ajax/uploadCatalog.php",
      "addCategory": "ajax/addCategory.php",
      "editCategory": "ajax/editCategory.php",
      "addProduct": "ajax/addProduct.php",
      "editProduct": "ajax/editProduct.php",
      "addMedia": "ajax/addMedia.php",
      "addAdmin": "ajax/addAdmin.php",
      "editAdmin": "ajax/editAdmin.php",
    };

    var action = $(this).attr("id");
    var key = $("input[name='hiddenKey']").val();
    data = { action: action, key: key };

    if ( action in actions )
    {

      // Add admin
      if ( data.action == "addAdmin" || data.action == "editAdmin" )
      {
        var email = $(".adminEmail").val();
        var password = $(".adminPassword").val();

        var articles = $("input[name='articles']").prop("checked");
        var customer_profiles = $("input[name='customer_profiles']").prop("checked");
        var videos = $("input[name='videos']").prop("checked");
        var photos = $("input[name='photos']").prop("checked");
        var see_requests = $("input[name='see_requests']").prop("checked");
        var edit_requests = $("input[name='edit_requests']").prop("checked");
        var remove_requests = $("input[name='remove_requests']").prop("checked");

        data.email = email;
        data.password = password;

        data.articles = articles;
        data.customer_profiles = customer_profiles;
        data.videos = videos;
        data.photos = photos;
        data.see_requests = see_requests;
        data.edit_requests = edit_requests;
        data.remove_requests = remove_requests;
      }

      // CHANGE EMAIL
      if ( data.action == "changeEmail" )
      {
        var panel_email = $(".panel_email").val();
        var panel_password = $(".panel_password").val();
        data.panel_email = panel_email;
        data.panel_password = panel_password;
      }

      // EDIT CATEGORY
      if ( data.action == "editCategory" )
      {
        var name_en = $(".name_en").val();
        var name_ar = $(".name_ar").val();
        var name_tr = $(".name_tr").val();
        var name_fr = $(".name_fr").val();

        data.name_en = name_en;
        data.name_ar = name_ar;
        data.name_tr = name_tr;
        data.name_fr = name_fr;
      }

      // EDIT CATEGORY
      if ( data.action == "addMedia" )
      {
        var source = $(".source").val();
        data.source = source;
      }

      if ( data.action == "addCategory" )
      {
        var name_en = $(".name_en").val();
        var name_ar = $(".name_ar").val();
        var name_tr = $(".name_tr").val();
        var name_fr = $(".name_fr").val();

        data.name_en = name_en;
        data.name_ar = name_ar;
        data.name_tr = name_tr;
        data.name_fr = name_fr;
      }

      // CHANGE PASSWORD
      if ( data.action == "changePasswrod" )
      {
        var old_pass = $(".oldPass").val();
        var new_pass = $(".newPass").val();
        var confirm_pass = $(".confirmPass").val();

        data.old_pass = old_pass;
        data.new_pass = new_pass;
        data.confirm_pass = confirm_pass;
      }

      if ( data.action == "changeContact")
      {
        var email = $('.contactEmail').val();
        var phone = $('.contactPhone').val();
        var cellphone = $('.contactCellphone').val();
        var address = $('.contactAddress').val();

        data.email = email;
        data.phone = phone;
        data.cellphone = cellphone;
        data.address = address;
      }

      if ( data.action == "generalAbout" )
      {

        var about = $('.summernote').summernote('code');
        //var about = $(".generalAbout").val();
        data.about = about;
      }

      if ( data.action == "addSocial" )
      {
        var socialName = $(".socialName").val();
        var socialIcon = $(".socialIcon").val();
        var socialLink = $(".socialLink").val();

        data.name = socialName;
        data.icon = socialIcon;
        data.link = socialLink;
      }

      $(".ajaxContainer").addClass("loading");
      $(".loadingContainer").addClass("active");

      $.post(actions[action],data)
      .done(function(response){

        response = $.parseJSON(response);
        $(".ajaxContainer").removeClass("loading");
        $(".loadingContainer").removeClass("active");
        pushNotification(response.text,response.type);

        if (response.type == "success") {
          $(".emptyInput").val("");
        }
      });
    }
  });

  // When Deleting Item
  $(document).on("click",".deleteItem",function(){

    var actions = {
      "deleteSocial": "ajax/delete.php",
      "deleteArticle": "ajax/delete.php",
      "deleteCategory": "ajax/delete.php",
      "deleteProduct": "ajax/delete.php",
      "deleteMedia": "ajax/delete.php",
      "deleteAdmin": "ajax/deleteAdmin.php",
      "deleteTestimonial": "ajax/deleteTestimonial.php",
    };

    var action = $(this).attr("id");
    var key = $("input[name='hiddenKey']").val();
    data = { action: action, key: key };

    if ( action in actions )
    {
      // DELETE SOCIAL MEDIA
      //if ( data.action == "deleteSocial" ) {  }

      var id = $(this).attr("data-id");
      data.id = id;

      $(".ajaxContainer").addClass("loading");
      $(".loadingContainer").addClass("active");

      $.post(actions[action],data)
      .done(function(response){
        response = $.parseJSON(response);
        $(".ajaxContainer").removeClass("loading");
        $(".loadingContainer").removeClass("active");
        pushNotification(response.text,response.type);

        if (response.type == "success") {
          $(".deletable."+id).remove();
        }
      });
    }
  });

  // Add Testimonial
  $(document).on("click",".addTestimonial",function(e){
    e.preventDefault();
    $(".ajaxContainer").addClass("loading");
    $(".loadingContainer").addClass("active");

    var avatar = $('input[name="avatar"]').prop('files')[0];
    var client_name = $(".client_name").val();
    var testimonial_content = $(".testimonial_content").val();


    var form_data = new FormData();

    form_data.append('avatar', avatar);
    form_data.append('client_name', client_name);
    form_data.append('testimonial_content', testimonial_content);
    form_data.append('action', "addTestimonial");

    $.ajax({
        url: 'ajax/addTestimonial.php',
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(response){
          response = $.parseJSON(response);
          pushNotification(response.text,response.type);

          if ( response.type == "success" ) {
            location.hash = "#testimonials";
            var pages = {
              "#testimonials": "pages/testimonials.php",
            }
            initialize_page(pages);

            $(".ajaxContainer").removeClass("loading");
            $(".loadingContainer").removeClass("active");
          }else{
            $(".ajaxContainer").removeClass("loading");
            $(".loadingContainer").removeClass("active");
          }
        }
     });

  });

  //edit Testimonial
  $(document).on("click",".editTestimonial",function(e){

    e.preventDefault();
    $(".ajaxContainer").addClass("loading");
    $(".loadingContainer").addClass("active");

    var avatar = $('input[name="avatar"]').prop('files')[0];
    var client_name = $(".client_name").val();
    var testimonial_content = $(".testimonial_content").val();


    var form_data = new FormData();

    form_data.append('avatar', avatar);
    form_data.append('client_name', client_name);
    form_data.append('testimonial_content', testimonial_content);
    form_data.append('action', "editTestimonial");

    $.ajax({
        url: 'ajax/editTestimonial.php',
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(response){
          response = $.parseJSON(response);
          pushNotification(response.text,response.type);

          if ( response.type == "success" ) {
            location.hash = "#testimonials";
            var pages = {
              "#testimonials": "pages/testimonials.php",
            }
            initialize_page(pages);

            $(".ajaxContainer").removeClass("loading");
            $(".loadingContainer").removeClass("active");
          }else{
            $(".ajaxContainer").removeClass("loading");
            $(".loadingContainer").removeClass("active");
          }
        }
     });

  });


  // ADD PICTURES TO HEADER SLIDESHOW
  $(document).on("click",".addSlideshow",function(e){

    e.preventDefault();
    $(".ajaxContainer").addClass("loading");
    $(".loadingContainer").addClass("active");

    var gallery_files = $('input[name="galleryFiles[]"]').prop('files')[0];
    var gallery_files_count = $('input[name="galleryFiles[]"]').prop('files').length;

    var gallery_array = [];

    if ( gallery_files_count > 0 )
    {

      for (var i = 0; i < gallery_files_count; i++) {
        gallery_file = $('input[name="galleryFiles[]"]').prop('files')[i];
        var data = new FormData();
        data.append('gallery', gallery_file);
        data.append('action', "upload_slideshow");

        $.ajax({
            url: 'ajax/addSlideshow.php',
            dataType: 'text',  // what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            data: data,
            type: 'post',
            success: function(result){
              result = $.parseJSON(result);

              if (result.type == "success")
              {
                $("body .img-flex").append('<div class="img-preview '+result.id+'" style="display:inline-block;padding:20px 0px;"><a href="#" id="'+result.id+'" class="deleteGallery"> <i class="mdi mdi-delete"></i> </a><img style="width:100px;" src="../../'+result.text+'" /></div>');
              }else{
                pushNotification(result.text,result.type);
              }
            }
         });

      }
    }

    $(".ajaxContainer").removeClass("loading");
    $(".loadingContainer").removeClass("active");
  });

  // DELETE PRODUCT IMAGE
  $(document).on("click",".deleteGallery",function(e){
      e.preventDefault();
      $(".ajaxContainer").addClass("loading");
      $(".loadingContainer").addClass("active");
      var id = $(this).attr("id");

      $.post("ajax/deleteGallery.php",{action: "deleteGallery", id: id})
      .done(function(response){

        response = $.parseJSON(response);
        $(".ajaxContainer").removeClass("loading");
        $(".loadingContainer").removeClass("active");

        if ( response.type == "success" )
        {
          $(".img-preview."+id).remove();
        }

        pushNotification(response.text,response.type);
      });
    });

  // EDIT PRODUCT
  $(document).on("click",".editProduct",function(e){

    e.preventDefault();
    $(".ajaxContainer").addClass("loading");
    $(".loadingContainer").addClass("active");

    var category = $(".selectCategory :selected").val();
    var name = $(".productName").val();
    var description = $(".productDescription").val();

    var price_tl = $(".price_tl").val();
    var price_usd = $(".price_usd").val();
    var productWeight = $(".productWeight").val();

    var cover_file = $('input[name="coverFile"]').prop('files')[0];
    var gallery_files = $('input[name="galleryFiles[]"]').prop('files')[0];
    var gallery_files_count = $('input[name="galleryFiles[]"]').prop('files').length;

    var gallery_array = [];

    var form_data = new FormData();

    form_data.append('category', category);
    form_data.append('name', name);
    form_data.append('description', description);
    form_data.append('price_tl', price_tl);
    form_data.append('price_usd', price_usd);
    form_data.append('productWeight', productWeight);
    form_data.append('cover', cover_file);
    form_data.append('action', "editProduct");

    $.ajax({
        url: 'ajax/editProduct.php',
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(response){
          response = $.parseJSON(response);

          if ( response.type == "success" )
          {

            if ( gallery_files_count > 0 )
            {

              for (var i = 0; i < gallery_files_count; i++) {
                gallery_file = $('input[name="galleryFiles[]"]').prop('files')[i];
                var data = new FormData();
                data.append('gallery', gallery_file);
                data.append('action', "upload_gallery");
                data.append('id', response.id);

                $.ajax({
                    url: 'ajax/editProduct.php',
                    dataType: 'text',  // what to expect back from the PHP script, if anything
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: data,
                    type: 'post',
                    success: function(result){
                      result = $.parseJSON(result);

                      if (result.type == "success")
                      {
                        $("body .img-flex").append('<div class="img-preview '+result.id+'" style="display:inline-block;padding:20px 0px;"><a href="#" id="'+result.id+'" class="deleteImage"> <i class="mdi mdi-delete"></i> </a><img style="width:100px;" src="../../'+result.text+'" /></div>');
                      }else{
                        pushNotification(result.text,result.type);
                      }
                    }
                 });

              }
            }
          }

          pushNotification(response.text,response.type);

          if ( response.type == "success" ) {
            location.hash = "#editProduct";
            var pages = {
              "#editProduct": "pages/editProduct.php",
            }
            initialize_page(pages);

            $(".ajaxContainer").removeClass("loading");
            $(".loadingContainer").removeClass("active");
          }else{
            $(".ajaxContainer").removeClass("loading");
            $(".loadingContainer").removeClass("active");
          }
        }
     });

  });

  // DELETE PRODUCT IMAGE
  $(document).on("click",".deleteImage",function(e){
    e.preventDefault();
    $(".ajaxContainer").addClass("loading");
    $(".loadingContainer").addClass("active");
    var id = $(this).attr("id");

    $.post("ajax/deleteImage.php",{action: "deleteImage", id: id})
    .done(function(response){

      response = $.parseJSON(response);
      $(".ajaxContainer").removeClass("loading");
      $(".loadingContainer").removeClass("active");

      if ( response.type == "success" )
      {
        $(".img-preview."+id).remove();
      }

      pushNotification(response.text,response.type);
    });
  });

  // UPLOAD CATALOG
  $(document).on("click",".uploadCatalog",function(e){

    e.preventDefault();

    var file_data = $('input[name="catalog"]').prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    $.ajax({
        url: 'ajax/uploadCatalog.php',
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(response){
          response = $.parseJSON(response);
          $(".ajaxContainer").removeClass("loading");
          $(".loadingContainer").removeClass("active");
          pushNotification(response.text,response.type);
        }
     });
  });


  // INSERT NEW ARTICLE
  $(document).on("click",".insertArticle",function(e){

    e.preventDefault();

    var title = $(".articleTitle").val();
    var file_data = $('input[name="coverFile"]').prop('files')[0];

    var form_data = new FormData();
    form_data.append('file', file_data);
    form_data.append('title', title);
    form_data.append('action', "insertArticle");

    $.ajax({
        url: 'ajax/newArticle.php',
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(response){
          response = $.parseJSON(response);

          pushNotification(response.text,response.type);

          if ( response.type == "success" )
          {
            location.hash = "#articles";
            var pages = {
              "#articles": "pages/articles.php",
            }
            initialize_page(pages);

          }else{
            $(".ajaxContainer").removeClass("loading");
            $(".loadingContainer").removeClass("active");
          }


        }
     });
  });


  // EDIT ARTICLE
  $(document).on("click",".editArticle",function(e){

    e.preventDefault();

    var title = $(".articleTitle").val();
    var file_data = $('input[name="coverFile"]').prop('files')[0];

    var form_data = new FormData();
    form_data.append('file', file_data);

    form_data.append('title', title);
    form_data.append('action', "editArticle");


    $.ajax({
        url: 'ajax/editArticle.php',
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(response){
          response = $.parseJSON(response);

          if ( response.type == "success" )
          {
            location.hash = "#articles";
            var pages = {
              "#articles": "pages/articles.php",
            }
            initialize_page(pages);

          }else{
            $(".ajaxContainer").removeClass("loading");
            $(".loadingContainer").removeClass("active");
          }

          pushNotification(response.text,response.type);
        }
     });
  });
});
