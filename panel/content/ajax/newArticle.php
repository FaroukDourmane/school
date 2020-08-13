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

    $response = [
      "type" => $type,
      "text" => $text
    ];

    $json_response = json_encode($response);
    echo $json_response;
    exit;
  }
  // END : CHECK ADMIN AUTH
  // #################################################
  // #################################################

  if ( isset($_POST["action"]) && $_POST["action"] == "insertArticle" )
  {

    $title_ar = mysqli_real_escape_string($Q, $_POST["title"]);
    $title_en = mysqli_real_escape_string($Q, $_POST["title_en"]);
    $title_fr = mysqli_real_escape_string($Q, $_POST["title_fr"]);

    $content_ar = mysqli_real_escape_string($Q, $_POST["content"]);
    $contentEN = mysqli_real_escape_string($Q, $_POST["contentEN"]);
    $contentFR = mysqli_real_escape_string($Q, $_POST["contentFR"]);

    $keywords = mysqli_real_escape_string($Q, $_POST["keywords"]);
    $date = time();

    $type = "error";

    if ( !empty(trim($title)) && !empty(trim($content)) )
    {
      $insert = $Q->query("INSERT INTO `articles` (`title_ar`,`title_en`,`title_fr`,`keywords`,`content_ar`,`content_en`,`content_fr`,`date`) VALUES ('$title_ar','$title_en','$title_fr','$keywords','$content_ar','$contentEN','$contentFR','$date') ");

      if ( $insert )
      {
        $last_id = $Q->insert_id;
        $path = "../../../assets/articles/$last_id/";
        $file = upload("file",$path,"images");

        if ( $file )
        {
          $sql_path = "assets/articles/$last_id/".$file;
          $update = $Q->query("UPDATE `articles` SET `cover`='$sql_path' WHERE `id`='$last_id' ");

          if ( $update ) {
            $type = "success";
            $text = __("update_success",true);
          }else{
            delete_file("../../../".$sql_path);
            $text = __("update_error",true);
          }
        }else{
          $delete = $Q->query("DELETE FROM `articles` WHERE `id`='$last_id' ");
          $text = __("upload_error",true);
        }
      }
    }else{
      $text = __("missing_inputs",true);
    }
  }

  /*
  $path = "../../../assets/files/";
  $file = upload("file",$path,"pdf");
  $type = "error";

  if ( $file )
  {
    $old_file = $fetch["catalog"];
    $sql_path = "assets/files/".$file;
    $update = $Q->query("UPDATE `general` SET `catalog`='$sql_path' ");

    if ( $update ) {
      $old_file_src = "../../../".$old_file;
      delete_file($old_file_src);

      $type = "success";
      $text = __("update_success",true);
    }else{
      delete_file("../../../".$sql_path);
      $text = __("update_error",true);
    }
  }else{
    $text = __("upload_error",true);
  }
  */

  $response = [
    "type" => $type,
    "text" => $text
  ];

  $json_response = json_encode($response);
  echo $json_response;

?>
