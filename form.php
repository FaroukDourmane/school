<?php require_once("templates/header.php"); ?>
<?php require_once("config/countries.php"); ?>
<link rel="stylesheet" href="assets/css/form.css">

<div class="form-container">
  <div class="wrapper">
    <h1> تسجيل طالب جديد </h1>

    <form class="" action="" method="post">
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

      <input type="text" name="" value="" placeholder="رقم الجوال" />

      <h5>معلومات الطالب</h5>
      <input type="text" name="" value="" placeholder="الإسم" />
      <input type="text" name="" value="" placeholder="الأب" />
      <input type="text" name="" value="" placeholder="الجد" />
      <input type="text" name="" value="" placeholder="العائلة" />

      <hr>

      <input type="text" name="" value="" placeholder="رقم السجل المدني" />
      <select class="" name="">
        <?php foreach ($countries as $key => $value) { ?>
          <option value="<?php echo $key; ?>" <?php echo ($key == "SA") ? "selected" : ""; ?>><?php echo $value; ?></option>
        <?php } ?>
      </select>
      <input type="text" name="" value="" placeholder="المرحلة" />

      <hr>

      <label class="file">
        <input type="file" name="" value="" />
        كارت العائلة أو الإقامة
        <img src="assets/svg/upload.svg" />
      </label>

      <label class="file">
        <input type="file" name="" value="" />
        شهادة العائلة
        <img src="assets/svg/upload.svg" />
      </label>

      <input type="submit" name="" value="إتمام التسجيل" />
    </form>
  </div>
</div>

<?php require_once("templates/footer.php"); ?>
