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

$testimonials_q = $Q->query("SELECT * FROM `testimonials` ORDER BY `id` DESC ");
$default_avatar = "../../assets/svg/user.svg";
?>
<!--<link rel="stylesheet" type="text/css" href="../../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css">-->
<script src="https://kit.fontawesome.com/98e695973b.js" crossorigin="anonymous"></script>

    <!-- Product's statistics -->
        <div class="row page-title-header">
          <div class="col-12">
            <h1 style="text-align: <?php __('align'); ?>"> <?php __("testimonials"); ?> </h1>
          </div>
        </div>

        <?php showMessage(); ?>

        <!-- Page Title Header Ends-->
        <div class="row">
          <div class="col-md-3 grid-margin">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <div class="d-flex">
                      <div class="wrapper">
                        <h3 class="mb-0 font-weight-semibold"><?php echo $testimonials_q->num_rows; ?></h3>
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

                  <div class="col-lg-4 col-md-6 mt-md-0 mt-4">
                    <div class="d-flex">
                      <div class="wrapper">
                        <a href="#addTestimonial" id="getAjaxPage" class="btn btn-success">
                          <h3 class="mb-0 font-weight-semibold"><?php __("add"); ?></h3>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END Product's statistics -->

        <div class="row">
          <div class="col-md-8">
            <div class="row">

              <div class="col-md-12 grid-margin">
                <div class="card">
                  <div class="card-body">


                    <div class="table-responsive">
                      <table class="table table-striped table-hover">
                        <thead>
                          <tr>
                            <th><?php __("client_name"); ?></th>
                            <th><?php __("options"); ?></th>
                          </tr>
                        </thead>
                        <tbody>

                          <?php if ( $testimonials_q->num_rows > 0 ) { ?>
                            <?php
                              while ( $testimonial = $testimonials_q->fetch_assoc() ) {
                                $data_json = [ 'id' => $testimonial["id"] ];
                                $data_json = json_encode($data_json);
                            ?>
                              <tr class="deletable <?php echo $testimonial["id"]; ?>">
                                <td> <img src="<?php echo ( !empty(trim($testimonial["avatar"])) ) ? "../../".$testimonial["avatar"] : $default_avatar; ?>" class="mr-2 ml-2" /> <?php echo $testimonial["name"]; ?> </td>
                                <td>
                                  <a href="#" id="deleteTestimonial" data-id="<?php echo $testimonial["id"]; ?>" class="btn btn-danger deleteItem"> <i class="fas fa-trash-alt"></i> </a>
                                  <a href="#editTestimonial" id="getAjaxPage" data-json='<?php echo $data_json; ?>' class="btn btn-secondary"> <i class="fas fa-pen"></i> </a>
                                </td>
                              </tr>
                            <?php } ?>
                          <?php } ?>

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


<input type="hidden" name="hiddenKey" value="<?php echo $_SESSION["_TOKEN"]; ?>" />
