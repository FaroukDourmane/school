<?php require_once("templates/header.php"); ?>
<?php require_once("config/countries.php"); ?>
<link rel="stylesheet" href="assets/nice-select/css/nice-select.css">
<!-- <script src="assets/datepicker/css/bootstrap-datepicker.standalone.css"></script> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@9.17.1/dist/sweetalert2.min.css">
<link rel="stylesheet" href="assets/css/form.css?v=2">

<div class="form-container">
  <div class="wrapper" id="signupWrapper">
    <div class="loadingContainer"></div>

    <h1> تسجيل طالب جديد </h1>

    <form class="registerForm" action="" method="post" enctype="multipart/form-data">

      <input type="hidden" name="action" value="saveStudent" />
      <input type="hidden" name="TOKEN" value="<?php echo $_SESSION["_TOKEN"]; ?> " />

      <div class="gender-box">
        <label>
          <input type="radio" name="gender" value="0" checked />
          <span><img src="assets/svg/boy.svg" /> بنين</span>
        </label>

        <label>
          <input type="radio" name="gender" value="1" />
          <div class="active"></div>
          <span><img src="assets/svg/girl.svg" />  بنات</span>
        </label>
      </div>

      <input type="text" name="phone" value="" placeholder="رقم الجوال" required />

      <h5>معلومات الطالب</h5>
      <input type="text" name="firstname" value="" placeholder="الإسم" required />
      <input type="text" name="father" value="" placeholder="الأب" required />
      <input type="text" name="grandfather" value="" placeholder="الجد" required />
      <input type="text" name="family" value="" placeholder="العائلة" required />

      <hr>

      <input type="text" name="id_number" value="<?php echo (isset($_GET["id"])) ? $_GET["id"] : ""; ?>" placeholder="رقم السجل المدني" required />

      <select name="country">
        <?php foreach ($countries as $key => $value) { ?>
          <option value="<?php echo $value; ?>" <?php echo ($key == "SA") ? "selected" : ""; ?>><?php echo $value; ?></option>
        <?php } ?>
      </select>

      <select name="stage">
        <option value="0">روضة</option>
        <option value="1">ابتدائي</option>
        <option value="2">متوسط</option>
        <option value="3">ثانوي</option>
      </select>
</br>
      <select class="class-primary" name="class-primary">
        <option value="الأول">الصف الأول</option>
        <option value="الثاني">الصف الثاني</option>
        <option value="الثالث">الصف الثالث</option>
        <option value="الرابع">الصف الرابع</option>
        <option value="الخامس">الصف الخامس</option>
        <option value="السادس">الصف السادس</option>
      </select>
</br>
      <select class="class" name="class">
        <option value="الأول">الصف الأول</option>
        <option value="الثاني">الصف الثاني</option>
        <option value="الثالث">الصف الثالث</option>
      </select>
    </br>
</br>
      <hr>

      <label class="file">
        <input type="file" name="residence" value="" />
        الهوية الوطنية
        /
        كرت العائلة
        <img src="assets/svg/upload.svg" />
      </label>

      <label class="file active" id="kids">
        <input type="file" name="family_certificate" value="" />
        شهادة الميلاد
        <img src="assets/svg/upload.svg" />
      </label>

      <input type="submit" name="" value="إتمام التسجيل" />
    </form>
  </div>
</div>

<?php require_once("templates/footer.php"); ?>
<script src="assets/nice-select/js/jquery.nice-select.js"></script>
<!-- <script src="assets/datepicker/js/bootstrap-datepicker.js"></script> -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
<!-- Optional: include a polyfill for ES6 Promises for IE11 -->
<script src="https://cdn.jsdelivr.net/npm/promise-polyfill"></script>
<script src="assets/js/form.js?v=2"></script>
