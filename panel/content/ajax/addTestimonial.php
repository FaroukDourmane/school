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

  if ( isset($_POST["action"]) && $_POST["action"] == "addTestimonial" )
  {
    $name = mysqli_real_escape_string($Q, $_POST["client_name"]);
    $testimonial_content = mysqli_real_escape_string($Q, $_POST["testimonial_content"]);

    $type = "error";

    if ( !empty(trim($name)) && !empty(trim($testimonial_content)) )
    {
      $insert = $Q->query(" INSERT INTO `testimonials`
      (`name`, `content`)
        VALUES
      ('$name', '$testimonial_content')
      ");

      if ( $insert )
      {
        $last_id = $Q->insert_id;
        $path = "../../../assets/testimonials/$last_id/";
        $sql_path = "assets/testimonials/$last_id/";

        $avatar = upload("avatar",$path,"images");

        if ( $avatar )
        {
          $cover_path = $sql_path.$avatar;
          $update_cover = $Q->query("UPDATE `testimonials` SET `avatar`='$cover_path' WHERE `id`='$last_id' ");
        }

        $type = "success";
        $text = __("update_success",true);
        $id = $last_id;
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
