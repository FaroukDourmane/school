<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  <!--===============================================================================================-->
     <link rel="icon" type="image/png" href="assets/img/ico.png"/>
  <!--===============================================================================================-->
  <!--===============================================================================================-->
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;700&display=swap" rel="stylesheet">
  <!--===============================================================================================-->
    <meta charset="utf-8">
    <link rel="stylesheet" href="assets/css/main.css">
    <title> مدارس رواد النجاح الأهلية </title>
  </head>

  <body>
    <!-- Header container -->
    <div class="header-container">
      <div class="top">
        <ul>
          <li> <a href="#"> <img src="assets/svg/menu_toggle.svg" /> </a> </li>
          <li> <a href="#">الرئيسية</a> </li>
          <li> <a href="#">إتصل بنا</a> </li>
          <li> <a href="#">من نحن</a> </li>
          <li> <a href="#">بوابة التسجيل</a> </li>
        </ul>

        <div class="number">
          ٠٥٩٨٥٠١٥١٥
          <img src="assets/svg/phone.svg" />
        </div>
      </div>

      <div class="content">
        <img src="assets/img/logo.png" class="logo" />
        <h1>مدارس رواد النجاح ترحب بكم</h1>
        <a href="#" class="btn main">بوابة التسجيل</a>
      </div>
    </div>
    <!-- END Header container -->

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
            <div class="item"></div>
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

    <!-- Footer container -->
    <div class="footer-container">
      <div class="wrapper">
        <div class="item">
          <h5>تواصل معنا</h5>
          <label>
            <span>عبر البريد الإلكتروني</span>
            <b>RowadAlngah@gmail.com</b>
          </label>

          <label>
            <span>مكتب القبول و التسجيل</span>
            <b>٠٥٩٨٥٠١٥١٥</b>
          </label>
        </div>

        <div class="item">
          <h5>التواصل الإجتماعي</h5>
          <ul>
            <li> <a href="#"> <img src="assets/svg/twitter.svg" /> Rowad_alnjah </a> </li>
            <li> <a href="#"> <img src="assets/svg/instagram.svg" /> alrowad_100 </a> </li>
            <li> <a href="#"> <img src="assets/svg/whatsapp.svg" /> ٠٥٥٢٥١٠٠٠٣ </a> </li>
            <li> <a href="#"> <img src="assets/svg/snapchat.svg" /> Rowd_alnjah </a> </li>
          </ul>
        </div>

        <div class="item">
          <h5>قم بزيارتنا</h5>
          <label>
            <span>العنوان</span>
            <b>المملكة العربية السعودية - مدينة حفر الباطن</b>
          </label>
          <a href="https://goo.gl/maps/6uZC28cD2Ko89V9T8" target="_blank" class="maps-btn"> <img src="assets/svg/google-maps.svg" /> خرائط جوجل </a>
        </div>

        <div class="item">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.3693710434322!2d45.930717184922514!3d28.40810938250683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fd740699c8f739b%3A0x1091ae299d77da24!2z2YXYr9in2LHYsyDYsdmI2KfYryDYp9mE2YbYrNin2K0g2KfZhNij2YfZhNmK2Kk!5e0!3m2!1sar!2ssa!4v1597217430636!5m2!1sar!2ssa" width="290" height="250" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
        </div>
      </div>

      <div class="copyrights">
        <ul>
          <li> <a href="#">الرئيسية</a> </li>
          <li> <a href="#">إتصل بنا</a> </li>
          <li> <a href="#">من نحن</a> </li>
          <li> <a href="#">بوابة التسجيل</a> </li>
        </ul>

        <p>كل الحقوق محفوظة  لمدارس رواد النجاح</p>
      </div>
    </div>
    <!-- END Footer container -->
  </body>

  <footer>
    <script type="text/javascript" src="assets/js/jquery.min.js"></script>
    <script type="text/javascript" src="assets/js/main.js"></script>
  </footer>
</html>
