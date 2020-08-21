<?php
require_once(__DIR__."/../../../config/config.php");
require_once(__DIR__."/../../config/sessions.php");
require_once(__DIR__."/../../config/".panel_lang_file());

//$query = $Q->query("SELECT * FROM `general` ");
//$fetch = $query->fetch_assoc();

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

$registered_q = $Q->query("SELECT * FROM `users` ORDER BY `id` ");
$kids_registered_q = $Q->query("SELECT * FROM `users` WHERE `stage`='0' ");
$primary_registered_q = $Q->query("SELECT * FROM `users` WHERE `stage`='1' ");
$moyen_registered_q = $Q->query("SELECT * FROM `users` WHERE `stage`='2' ");
$highschool_registered_q = $Q->query("SELECT * FROM `users` WHERE `stage`='3' ");


$articles_q = $Q->query("SELECT * FROM `articles` ORDER BY `id` ");
?>
    <!-- Product's statistics -->
        <div class="row page-title-header">
          <div class="col-12">
            <h1 style="text-align: <?php __('align'); ?>"> <?php __("registered"); ?> </h1>
          </div>
        </div>
        <!-- Page Title Header Ends-->
        <div class="row">
          <div class="col-md-3 grid-margin">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <div class="d-flex">
                      <div class="wrapper">
                        <h3 class="mb-0 font-weight-semibold"><?php echo $registered_q->num_rows; ?></h3>
                        <h5 class="mb-0 font-weight-medium text-primary"><?php __("total"); ?></h5>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div class="col-md-9 grid-margin">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-lg-3 col-md-6">
                    <div class="d-flex">
                      <div class="wrapper">
                        <h3 class="mb-0 font-weight-semibold"><?php echo $kids_registered_q->num_rows; ?></h3>
                        <h5 class="mb-0 font-weight-medium text-primary">روضة</h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-6 mt-md-0 mt-4">
                    <div class="d-flex">
                      <div class="wrapper">
                        <h3 class="mb-0 font-weight-semibold"><?php echo $primary_registered_q->num_rows; ?></h3>
                        <h5 class="mb-0 font-weight-medium text-primary">ابتدائي</h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-6 mt-md-0 mt-4">
                    <div class="d-flex">
                      <div class="wrapper">
                        <h3 class="mb-0 font-weight-semibold"><?php echo $moyen_registered_q->num_rows; ?></h3>
                        <h5 class="mb-0 font-weight-medium text-primary">متوسط</h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-6 mt-md-0 mt-4">
                    <div class="d-flex">
                      <div class="wrapper">
                        <h3 class="mb-0 font-weight-semibold"><?php echo $highschool_registered_q->num_rows; ?></h3>
                        <h5 class="mb-0 font-weight-medium text-primary">ثانوي</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END Product's statistics -->

<input type="hidden" name="hiddenKey" value="<?php echo $_SESSION["_TOKEN"]; ?>" />
