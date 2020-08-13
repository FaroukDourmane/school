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

$products_q = $Q->query("SELECT * FROM `products` ORDER BY `id` ");
$active_products = $Q->query("SELECT * FROM `products` WHERE `status`='1' ");
$hidden_products = $Q->query("SELECT * FROM `products` WHERE `status`='0' ");

$articles_q = $Q->query("SELECT * FROM `articles` ORDER BY `id` ");
$active_articles = $Q->query("SELECT * FROM `articles` WHERE `status`='1' ");
$hidden_articles = $Q->query("SELECT * FROM `articles` WHERE `status`='0' ");

$categories_q = $Q->query("SELECT * FROM `categories` ORDER BY `id` ");
?>
    <!-- Product's statistics -->
        <div class="row page-title-header">
          <div class="col-12">
            <h1 style="text-align: <?php __('align'); ?>"> <?php __("products"); ?> </h1>
          </div>

          <div class="col-md-12">
            <div class="page-header-toolbar">
              <div class="sort-wrapper">
                <button type="button" class="btn btn-primary toolbar-item"><?php __("add_product"); ?></button>
              </div>
            </div>
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
                        <h3 class="mb-0 font-weight-semibold"><?php echo $products_q->num_rows; ?></h3>
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
                  <div class="col-lg-4 col-md-6">
                    <div class="d-flex">
                      <div class="wrapper">
                        <h3 class="mb-0 font-weight-semibold"><?php echo $active_products->num_rows; ?></h3>
                        <h5 class="mb-0 font-weight-medium text-primary"><?php __("active_products"); ?></h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 mt-md-0 mt-4">
                    <div class="d-flex">
                      <div class="wrapper">
                        <h3 class="mb-0 font-weight-semibold"><?php echo $hidden_products->num_rows; ?></h3>
                        <h5 class="mb-0 font-weight-medium text-primary"><?php __("hidden_products"); ?></h5>
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
              <div class="d-flex justify-content-between card-head">
                <h4 class="card-title mb-0"> <input type="search" name="" value="" placeholder="<?php __("product_name"); ?>" /> </h4>
                <select class="" name="">
                  <option value=""> <?php __("all_categories"); ?> </option>
                  <?php if ($categories_q->num_rows > 0) { ?>
                    <?php while ( $category = $categories_q->fetch_assoc() ) { ?>
                      <option value="<?php echo $category["id"]; ?>"><?php echo $category["name_$lang_suffix"]; ?></option>
                    <?php } ?>
                  <?php } ?>
                </select>

                <select class="" name="">
                  <option value=""> <?php __("all_products"); ?> (<?php echo $products_q->num_rows; ?>) </option>
                  <option value=""> <?php __("active_products"); ?> (<?php echo $active_products->num_rows; ?>) </option>
                  <option value=""> <?php __("hidden_products"); ?> (<?php echo $hidden_products->num_rows; ?>) </option>
                </select>
              </div>
              <div class="table-responsive">
                <table class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th><?php __("product_name"); ?></th>
                      <th><?php __("category"); ?></th>
                      <th><?php __("added_date"); ?></th>
                    </tr>
                  </thead>
                  <tbody>
                  <?php
                  $lang_suffix = __("lang_suffix", true);

                    if ( $products_q->num_rows > 0 ) {
                      while ( $product = $products_q->fetch_assoc() ) {
                  ?>
                    <tr>
                      <td> <a target="_blank" href="../../product.php?id=<?php echo $product["id"]; ?>"> <?php echo $product["name"]; ?> </a> </td>
                      <td><?php echo category($product["category"], "name_$lang_suffix"); ?></td>
                      <td><?php __("since"); echo " ".date_difference($product["added_date"]); ?></td>
                    </tr>
                  <?php }}else{ ?>
                    <span class="no-items">There are no products</span>
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
