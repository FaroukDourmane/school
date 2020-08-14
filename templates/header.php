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
    <link rel="stylesheet" href="assets/css/main.css">
    <title> مدارس رواد النجاح الأهلية </title>
  </head>

  <body>
    <!-- Fixed menu -->
    <div class="fixed-menu">
      <ul>
        <li class="close"> <a href="#" class="menuToggler"> <img src="assets/svg/menu_toggle.svg" /> إغلاق </a> </li>
        <li> <a href="#">الرئيسية</a> </li>
        <li> <a href="#">إتصل بنا</a> </li>
        <li> <a href="#">من نحن</a> </li>
        <li> <a href="#">بوابة التسجيل</a> </li>
      </ul>
    </div>
    <!-- END Fixed menu -->

    <!-- Header container -->
    <div class="header-container">
      <div class="top">
        <ul>
          <li class="small"> <a href="#" class="menuToggler"> <img src="assets/svg/menu_toggle.svg" /> </a> </li>
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