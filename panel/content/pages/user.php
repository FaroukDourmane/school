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


if ( !isset($_REQUEST["id"]) && !isset($_SESSION["user_id"]) )
{
  $text = "لم يتم إيجاد  البيانات";
  $type = "error";

  throwMessage($text, $type);
  redirect("../content/#products");
  exit;
}

$id = ( isset($_REQUEST["id"]) ) ? intval($_REQUEST["id"]) : intval($_SESSION["user_id"]);
$query = $Q->query("SELECT * FROM `users` WHERE `id`='$id' ");

if ( $query->num_rows <= 0 ) {
  $text = "لم يتم إيجاد  البيانات";
  $type = "error";

  throwMessage($text, $type);
  redirect("../content/#products");
  exit;
}

$_SESSION["user_id"] = $id;
$fetch = $query->fetch_assoc();

$stage = [
  0 => "الروضة",
  1 => "الابتدائي",
  2 => "المتوسط",
  3 => "الثانوي"
];
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
                  <a href="#products" id="getAjaxPage" class="btn btn-secondary"> <?php __("back"); ?> <i class="mdi mdi-arrow-left"></i> </a>
                </div>
              </div>

              <form class="forms-sample text-right">

                <div class="row mb-5">
                  <div class="col-12">
                    <a class="btn btn-secondary"> <?php echo date("d/m/Y", $fetch["time"]); ?> </a>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="1234" class="col-sm-3 col-form-label">رقم السجل المدني</label>
                  <div class="col-sm-9 text-right">
                    <b><?php echo $fetch["id_number"]; ?></b>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="1234" class="col-sm-3 col-form-label">المرحلة</label>
                  <div class="col-sm-9 text-right">
                    <b><?php echo $stage[$fetch["stage"]]; ?></b>
                  </div>
                </div>

              <?php if ( $fetch["stage"] !== 0 ) { ?>
                <div class="form-group row">
                  <label for="1234" class="col-sm-3 col-form-label">الصف</label>
                  <div class="col-sm-9 text-right">
                    <b><?php echo $fetch["class"]; ?></b>
                  </div>
                </div>
              <?php } ?>

                <div class="form-group row">
                  <label for="1234" class="col-sm-3 col-form-label">الجنسية</label>
                  <div class="col-sm-9 text-right">
                    <b><?php echo $fetch["country"]; ?></b>
                  </div>
                </div>

                <hr />

                <div class="form-group row">
                  <label for="1" class="col-sm-3 col-form-label">الإسم</label>
                  <div class="col-sm-9 text-right">
                    <b><?php echo $fetch["firstname"]; ?></b>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="12" class="col-sm-3 col-form-label">الأب</label>
                  <div class="col-sm-9 text-right">
                    <b><?php echo $fetch["father"]; ?></b>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="1234" class="col-sm-3 col-form-label">الجد</label>
                  <div class="col-sm-9 text-right">
                    <b><?php echo $fetch["grandfather"]; ?></b>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="1234" class="col-sm-3 col-form-label">العائلة</label>
                  <div class="col-sm-9 text-right">
                    <b><?php echo $fetch["family"]; ?></b>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="1234" class="col-sm-3 col-form-label"></label>
                  <div class="col-sm-9 text-right">
                    <b><?php echo ($fetch["gender"] == 0) ? "ولد" : "بنت"; ?></b>
                  </div>
                </div>

                <hr />

                <div class="form-group row">
                  <label for="1234" class="col-sm-3 col-form-label">الجنسية</label>
                  <div class="col-sm-9 text-right">
                    <b><?php echo $fetch["family"]; ?></b>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="1234" class="col-sm-3 col-form-label">رقم الهاتف</label>
                  <div class="col-sm-9 text-right">
                    <b><?php echo $fetch["phone"]; ?></b>
                  </div>
                </div>

                <hr />

                <div class="form-group row">
                  <label for="1234" class="col-sm-3 col-form-label">الهوية الوطنية/كرت العائلة</label>
                  <div class="col-sm-9 text-right">
                    <b> <a href="../../<?php echo $fetch["residence"]; ?>" target="_blank">رؤية الملف</a> </b>
                  </div>
                </div>

                <?php if ( $fetch["stage"] == 0 && !empty(trim($fetch["family_certificate"])) ) { ?>
                  <div class="form-group row">
                    <label for="1234" class="col-sm-3 col-form-label">شهادة الميلاد</label>
                    <div class="col-sm-9 text-right">
                      <b> <a href="../../<?php echo $fetch["family_certificate"]; ?>" target="_blank">رؤية الملف</a> </b>
                    </div>
                  </div>
                <?php } ?>

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
