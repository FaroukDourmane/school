<?php require_once("templates/header.php"); ?>

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
            منذ 1404 هـ 1984 م ومدارس الشمس تساهم في بناء أجيال داعمة في نهضة الوطن
            تُعتبر مدارس الشمس الأهلية من أعرق المدارس في مدينة الرياض حيثُ تأسست عام 1404 هـ مواكبةً للتطور العلمي الذي يسمو بأهدافه التربوية ليصنع أجيالاً سلاحها العلم لمواجهة المُستقبل بعقل نافذ وبصيرةٍ ثاقبة. تميزت المدارس في تقديم تعليم ذو جودة عالية باستخدام أحدث وسائل وتقنيات التعليم المنبعثة من رسالتها في بناء مجتمع معرفي يعتز بقيمه وماضية ، مشغوف بتعلم مهارات وعلوم العصر ، وداعما في رقي وتقدم المجتمع
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
      <div class="articles-wrapper">
        <h5>مقالات</h5>
        <div class="wrapper">
          <?php for ($i=0; $i < 6; $i++) { ?>
            <div class="item" style="background-image:url('assets/img/graduate.png');">
              <p>زيارة إلى متحف صقر الجزيرة للطيران</p>
              <a href="#"></a>
              <span>قراءة</span>
            </div>
          <?php } ?>
        </div>
      </div>
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
        <form class="" action="" method="post">
          <input type="text" name="" value="" placeholder="السجل المدني" />
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
