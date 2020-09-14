<?php
  require_once(__DIR__."/../config/config.php");
  deny_self(basename(__FILE__));
?>
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
    <link rel="stylesheet" href="assets/css/main.css?v=10">
    <title> مدارس رواد النجاح الأهلية </title>
  </head>

  <body>
    <!-- Snapchat box -->
    <div class="snap-box">
      <img src="assets/svg/snapchat_white.svg" />
      <span>قم بإضافتنا على سنابشات</span>
      <h2>Rowd_alnjah</h2>
      <a href="#" class="close">إغلاق</a>
    </div>

    <!-- Fixed menu -->
    <div class="fixed-menu">
      <ul>
        <li> <a href="index.php">
          <img src="assets/svg/yellow-chevron.svg" />
          الرئيسية
        </a> </li>
        <li> <a href="#" class="scrollTo" id="contactContainer">
          <img src="assets/svg/yellow-chevron.svg" />
          إتصل بنا</a> </li>
        <li> <a href="#" class="scrollTo" id="vision-section">
          <img src="assets/svg/yellow-chevron.svg" />
          رؤيتنا</a> </li>
        <li> <a href="form.php#signupWrapper">
          <img src="assets/svg/yellow-chevron.svg" />
          بوابة التسجيل</a> </li>
      </ul>
    </div>
    <!-- END Fixed menu -->

    <!-- Header container -->
    <div class="header-container">
      <div class="top">
        <ul>
          <li class="small"> <img class="mini-logo" src="assets/img/logo-black.png" /></li>
          <li class="small"> <a href="#" class="menuToggler"> <img src="assets/svg/menu_toggle.svg" /> </a> </li>
          <li> <a href="index.php">الرئيسية</a> </li>
          <li> <a href="#" class="scrollTo" id="contactContainer">إتصل بنا</a> </li>
          <li> <a href="#" class="scrollTo" id="vision-section">رؤيتنا</a> </li>
          <li> <a href="form.php#signupWrapper">بوابة التسجيل</a> </li>
        </ul>

        <div class="number">
          ٠٥٩٨٥٠١٥١٥
          <img src="assets/svg/phone.svg" />
        </div>
      </div>

      <div class="content">
        <img src="assets/img/logo.png" class="logo" />
        <h1>مدارس رواد النجاح ترحب بكم</h1>
        <a href="form.php#signupWrapper" class="btn main">بوابة التسجيل</a>
      </div>
    </div>
    <!-- END Header container -->
