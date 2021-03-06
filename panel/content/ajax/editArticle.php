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

  if ( isset($_POST["action"]) && $_POST["action"] == "editArticle" && isset($_SESSION["article_id"]) )
  {

    $title = mysqli_real_escape_string($Q, $_POST["title"]);
    $date = time();
    $id = intval($_SESSION["article_id"]);
    $type = "error";

    $query = $Q->query("SELECT * FROM `articles` WHERE `id`='$id' ");
    $fetch = $query->fetch_assoc();

    if ( !empty(trim($title)) )
    {
      $path = "../../../assets/articles/$id/";
      $file = upload("file",$path,"images");

      $update = $Q->query("UPDATE `articles` SET `title`='$title',`time`='$date' WHERE `id`='$id' ");

      if ( $update )
      {
        if ( $file )
        {
          $old_file = $fetch["cover"];
          delete_file("../../../".$old_file);

          $sql_path = "assets/articles/$id/".$file;
          $update = $Q->query("UPDATE `articles` SET `cover`='$sql_path' WHERE `id`='$id' ");
        }

        unset($_SESSION["article_id"]);
        $type = "success";
        $text = __("update_success",true);
      }else{
        $text = mysqli_error($Q);
      }
    }else{
      $text = __("missing_inputs",true);
    }
  }

  $response = [
    "type" => $type,
    "text" => $text
  ];

  $json_response = json_encode($response);
  echo $json_response;

?>
