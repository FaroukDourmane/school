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
$active_articles = $Q->query("SELECT * FROM `articles` WHERE `status`='1' ");
$hidden_articles = $Q->query("SELECT * FROM `articles` WHERE `status`='0' ");
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


        <!-- Article's statistics -->
            <div class="row page-title-header">
              <div class="col-12">
                <h1 style="text-align: <?php __('align'); ?>"> <?php __("blog"); ?> </h1>
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
                            <h3 class="mb-0 font-weight-semibold"><?php echo $articles_q->num_rows; ?></h3>
                            <h5 class="mb-0 font-weight-medium text-primary">عدد المقالات</h5>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- END article's statistics -->

  <!-- <div class="row">
    <div class="col-md-8">
      <div class="row">

        <div class="col-md-12 grid-margin">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h4 class="card-title mb-0"><?php __("latest_registered_companies"); ?></h4>
                <a id="getAjaxPage" href="#companies" ><small><?php __("all_companies"); ?></small></a>
              </div>
              <div class="table-responsive">
                <table class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th><?php __("company_name"); ?></th>
                      <th><?php __("category"); ?></th>
                      <th><?php __("registration_date"); ?></th>
                    </tr>
                  </thead>
                  <tbody>
                  <?php
                  $lang_suffix = __("lang_suffix", true);

                    if ( $latest_companies->num_rows > 0 ) {
                      while ( $company = $latest_companies->fetch_assoc() ) {
                  ?>
                    <tr>
                      <td> <a target="_blank" href="../../company.php?id=<?php echo $company["id"]; ?>"> <?php echo $company["name"]; ?> </a> </td>
                      <td><?php echo category($company["category"], "name_$lang_suffix"); ?></td>
                      <td><?php __("since"); echo " ".date_difference($company["added_date"]); ?></td>
                    </tr>
                  <?php }} ?>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->


<input type="hidden" name="hiddenKey" value="<?php echo $_SESSION["_TOKEN"]; ?>" />
