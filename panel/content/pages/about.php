<?php
require_once(__DIR__."/../../../config/config.php");
require_once(__DIR__."/../../config/sessions.php");
require_once(__DIR__."/../../config/".panel_lang_file());

$query = $Q->query("SELECT * FROM `general` ");
$fetch = $query->fetch_assoc();

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
              <div class="col-10 d-flex align-items-stretch grid-margin">
                <div class="row flex-grow">
                  <!-- Who we are -->
                  <div class="col-12 stretch-card">
                    <div class="card">
                      <div class="card-body">

                        <!-- Who we are -->
                        <h4 class="card-title"><?php __("who_we_are"); ?></h4>
                        <form class="forms-sample">
                          <div class="form-group row">
                            <div class="col-sm-9">
                              <textarea type="text" class="summernote form-control generalAbout"> <?php echo $fetch["about"]; ?> </textarea>
                            </div>
                          </div>

                          <button type="submit" id="generalAbout" class="btn btn-success mr-2"><?php __("update_informations"); ?></button>
                          <input type="reset" class="btn btn-light" value="<?php __("reset"); ?>" />
                        </form>
                      </div>
                    </div>
                  </div>
                  <!-- END Who we are -->
                </div>
              </div>
              <!-- END FORM -->
            </div>
          </div>
          <!-- content-wrapper ends -->
          <!-- partial:../../partials/_footer.html -->

          <script type="text/javascript">
            $(function() {
              $('.summernote').summernote({
                height: 400,
              });

              /* $('form').on('submit', function (e) {
                e.preventDefault();
                alert($('.summernote').summernote('code'));
              }); */
            });
          </script>

<input type="hidden" name="hiddenKey" value="<?php echo $_SESSION["_TOKEN"]; ?>" />
