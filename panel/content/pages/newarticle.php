<?php
require_once(__DIR__."/../../../config/config.php");
require_once(__DIR__."/../../config/sessions.php");
require_once(__DIR__."/../../config/".panel_lang_file());

// #################################################
// #################################################
// CHECK ADMIN AUTH
if ( !admin_logged() )
{
  $text = __("not_authorized",true);
  $type = "error";

  throwMessage($text, $type);
  redirect("../login.php");
  exit;
}
// END : CHECK ADMIN AUTH
// #################################################
// #################################################
?>

<!-- include libraries(jQuery, bootstrap) -->
<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.16/dist/summernote.min.css" rel="stylesheet">

<div class="content-wrapper">
  <div class="row">


    <!-- FORM -->
    <div class="col-12 ">
      <div class="row">

        <!-- Email change -->
        <div class="col-12">

          <div class="card">
            <div class="col-12 pt-2">
              <a href="#articles" id="getAjaxPage" class="btn btn-secondary"> <?php __("back"); ?> </a>
            </div>

            <div class="card-body">
              <h4 class="card-title"><?php __("new_ad"); ?></h4>
              <form class="forms-sample">
                <!-- Title -->
                <div class="form-group row">
                  <label for="exampleInputEmail2" class="col-sm-3 col-form-label"><?php __("title"); ?></label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control articleTitle" id="exampleInputEmail2" placeholder="<?php __("enter_title"); ?>">
                  </div>
                </div>

                <!-- Cover picture -->
                <div class="form-group row">
                  <label for="exampleInputEmail2" class="col-sm-3 col-form-label"><?php __("cover_picture"); ?></label>
                  &nbsp;&nbsp;&nbsp;
                  <div class="custom-file col-sm-4">
                    <input type="file" class="custom-file-input" name="coverFile" id="inputGroupFile01">
                    <label class="custom-file-label" for="inputGroupFile01"><?php __("choose_file"); ?></label>
                  </div>
                </div>

                <button type="submit" class="btn btn-success insertArticle mr-2"><?php __("add"); ?></button>
              </form>
            </div>
          </div>
        </div>
        <!-- END Email change -->
      </div>
    </div>
    <!-- END FORM -->
  </div>
</div>
<!-- content-wrapper ends -->
<!-- partial:../../partials/_footer.html -->

<input type="hidden" name="hiddenKey" value="<?php echo $_SESSION["_TOKEN"]; ?>" />
