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


if ( !isset($_REQUEST["id"]) && !isset($_SESSION["testimonial_id"]) )
{
  $text = "لم يتم إيجاد أي نتيجة";
  $type = "error";

  throwMessage($text, $type);
  redirect("../content/#testimonials");
  exit;
}

$id = ( isset($_REQUEST["id"]) ) ? intval($_REQUEST["id"]) : intval($_SESSION["testimonial_id"]);
$query = $Q->query("SELECT * FROM `testimonials` WHERE `id`='$id' ");

if ( $query->num_rows <= 0 ) {
  $text = "لم يتم إيجاد الشهادة";
  $type = "error";

  throwMessage($text, $type);
  redirect("../content/#testimonials");
  exit;
}

$_SESSION["testimonial_id"] = $id;
$fetch = $query->fetch_assoc();
?>

<div class="content-wrapper">
  <div class="row">

    <!-- FORM -->
    <div class="col-12 d-flex align-items-stretch grid-margin">
      <div class="row flex-grow">
        <!-- Email change -->
        <div class="col-12 stretch-card">

          <div class="card">
            <div class="card-body">

              <div class="row mb-5">
                <div class="col-12">
                  <a href="#testimonials" id="getAjaxPage" class="btn btn-secondary"> <?php __("back"); ?> <i class="mdi mdi-arrow-left"></i> </a>
                </div>
              </div>

              <form class="forms-sample">
                <!-- Title -->
                <div class="form-group row">
                  <label for="1" class="col-sm-3 col-form-label"><?php __("client_name"); ?></label>
                  <div class="col-sm-9">
                    <input dir="ltr" type="text" class="form-control emptyInput client_name" id="1" value="<?php echo $fetch["name"]; ?>" />
                  </div>
                </div>

                <div class="form-group row">
                  <label for="1" class="col-sm-3 col-form-label"><?php __("avatar"); ?></label>
                  <div class="col-sm-7">
                    <div class="input-group mb-3">
                      <div class="custom-file">
                        <input type="file" class="custom-file-input" name="avatar" />
                        <label class="custom-file-label" for="inputGroupFile01"><?php __("choose_file"); ?></label>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-2">
                    <?php if (!empty(trim($fetch["avatar"]))) { ?><img src="<?php echo "../../".$fetch["avatar"]; ?>" alt=""><?php } ?>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="12" class="col-sm-3 col-form-label"><?php __("content"); ?></label>
                  <div class="col-sm-9">
                    <textarea name="name" class="form-control testimonial_content" style="width: 100%;" rows="5"><?php echo $fetch["content"]; ?></textarea>
                  </div>
                </div>

                <button type="submit" class="editTestimonial btn btn-success mr-2"><?php __("edit"); ?></button>
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
