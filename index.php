<?php
  require_once("templates/header.php");
  $articles_q = $Q->query("SELECT * FROM `articles` ORDER BY `id` DESC LIMIT 6");
  $general_q = $Q->query("SELECT * FROM `general` LIMIT 1");
  $general = $general_q->fetch_assoc();
?>

    <!-- Introduction container -->
    <div class="introduction-container">
      <div class="side">
        <div class="intro">
          <div class="social">
            <a href="#"> <img src="assets/svg/snapchat.svg" /> </a>
            <a href="#"> <img src="assets/svg/instagram.svg" /> </a>
            <a href="#"> <img src="assets/svg/twitter.svg" /> </a>
            <a href="#"> <img src="assets/svg/whatsapp.svg" /> </a>
          </div>
          <p>
            <?php echo $general["about"]; ?>
          </p>
        </div>
      </div>
      <div class="side flex">
        <div class="item" style="background-image:url('assets/img/black_class.png')">
          <p>تسعى المدارس لتطوير نظام الجودة الشامل للحفاظ على مخرجات الخدمات التعليمية المتميزة</p>
        </div>
        <div class="item" style="background-image:url('assets/img/graduate.png')">
          <p>الإستثمار الفعال والمستمر في تطوير بيئة تعليمية مثالية وتطبيق تقنيات التعليم الحديثة</p>
        </div>
      </div>
    </div>
    <!-- END Introduction container -->

    <!-- articles container -->
    <div class="article-container">
      <?php if ($articles_q->num_rows > 0) { ?>
        <div class="articles-wrapper">
          <h5>مقالات</h5>
          <div class="wrapper">
            <?php while ($article = $articles_q->fetch_assoc()) { ?>
              <div class="item" style="background-image:url('<?php echo $article['cover']; ?>');">
                <p><?php echo $article["title"]; ?></p>
                <a href="#"></a>
                <span>قراءة</span>
              </div>
            <?php } ?>
          </div>
        </div>
      <?php } ?>

      <div class="text">
        <h1>رؤيتنا</h1>
        <p>
        مساهمة في بناء مجتمع معرفي يعتز
        بقيمه وماضية ، مشغوف بتعلم مهارات
        وعلوم العصر ، وداعما في رقي وتقدم
        المجتمع
        </p>
      </div>
    </div>
    <!-- END articles container -->

    <!-- Signup container -->
    <div class="signup-container">
      <div class="side register">
        <h1>بوابة التسجيل</h1>
        <p>سواء كنت طالب أو من أولياء التلاميد , أصبح الآن بإمكانك التسجيل عن طريق موقعنا الإلكتروني و بسهولة تامة </p>
        <form class="" action="form.php#signupWrapper" method="GET">
          <input type="text" name="id" value="" placeholder="السجل المدني" />
          <input type="submit" name="" value="التسجيل" />
        </form>
      </div>
      <div class="side whatsapp">
        <h5>إدا كانت لديكم أي إستفسارات لا تردد في التواصل معنا</h5>
        <ul>
          <li> <b>مكتب القبول والتسجيل:</b> ٠٥٩٨٥٠١٥١٥ </li>
          <li> <b>واتساب:</b> ٠٥٥٢٥١٠٠٠٣ </li>
        </ul>

        <a href="#" class="btn-green"> واتساب <img src="assets/svg/whatsapp-white.svg" /> </a>
      </div>
    </div>
    <!-- END Signup container -->

<?php require_once("templates/footer.php"); ?>
