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

  $type = "error";
  $id = 0;

  if ( isset($_POST["action"]) && $_POST["action"] == "editTestimonial" )
  {
    $id = intval($_SESSION["testimonial_id"]);
    $name = mysqli_real_escape_string($Q, $_POST["client_name"]);
    $testimonial_content = mysqli_real_escape_string($Q, $_POST["testimonial_content"]);

    $type = "error";

    if ( !empty(trim($name)) && !empty(trim($testimonial_content)) )
    {
      $update = $Q->query(" UPDATE `testimonials` SET `name`='$name', `content`='$testimonial_content' WHERE `id`='$id' ");

      if ( $update )
      {
        $path = "../../../assets/testimonials/$id/";
        $sql_path = "assets/testimonials/$id/";

        $avatar = upload("avatar",$path,"images");

        if ( $avatar )
        {
          $query = $Q->query("SELECT * FROM `testimonials` WHERE `id`='$id' ");

          if ($query->num_rows > 0){
            $fetch = $query->fetch_assoc();
            if (!empty(trim($fetch["avatar"]))){
              $old_file = "../../../".$fetch["avatar"];
              delete_file($old_file);
            }
          }

          $cover_path = $sql_path.$avatar;
          $update_cover = $Q->query("UPDATE `testimonials` SET `avatar`='$cover_path' WHERE `id`='$id' ");
        }

        $type = "success";
        $text = __("update_success",true);
      }else{
        $type = "error";
        $text = mysqli_error($Q);
        $id = 0;
      }
    }else{
      $text = __("missing_inputs",true);
    }

    $response = [
      "type" => $type,
      "text" => $text,
      "id" => $id
    ];

    $json_response = json_encode($response);
    echo $json_response;
  }

?>
