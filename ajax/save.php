<?php
  require_once("../config/config.php");

  //echo var_dump($_POST);
  //exit;
  if ( isset($_POST["action"]) && $_POST["action"] == "saveStudent" )
  {

    $gender = intval($_POST["gender"]);
    $firstname = mysqli_real_escape_string($Q,$_POST["firstname"]);
    $father = mysqli_real_escape_string($Q,$_POST["father"]);
    $grandfather = mysqli_real_escape_string($Q,$_POST["grandfather"]);
    $family = mysqli_real_escape_string($Q,$_POST["family"]);
    $id_number = mysqli_real_escape_string($Q,$_POST["id_number"]);
    $stage = intval($_POST["stage"]);
    $phone = mysqli_real_escape_string($Q,$_POST["phone"]);
    $country = mysqli_real_escape_string($Q,$_POST["country"]);
    $time = time();

    if ( $stage !== 0 )
    {
      if ($stage == 1){
        $class = mysqli_real_escape_string($Q,$_POST["class-primary"]);
      }else{
        $class = mysqli_real_escape_string($Q,$_POST["class"]);
      }
    }else{
      $class = "";
    }

    $insert = $Q->query("INSERT INTO `users`
    (`gender`,`firstname`,`father`,`grandfather`,`family`,`id_number`,`stage`,`time`,`phone`,`country`,`class`)
    VALUES
    ('$gender','$firstname','$father','$grandfather','$family','$id_number','$stage','$time','$phone','$country','$class') ");

    if ( $insert )
    {
      $last_id = $Q->insert_id;
      $path = "../assets/files/$last_id/";
      $residence = upload("residence",$path);

      if ( $stage == 0 )
      {
        $family_certificate = upload("family_certificate",$path);
        $sql_family_certeficate = "assets/files/$last_id/$family_certificate";

        if ($family_certificate )
        {
          $update = $Q->query("UPDATE `users` SET `family_certificate`='$sql_family_certeficate' WHERE `id`='$last_id' ");
          $type = "success";
          $text = "";
        }else{
          $delete = $Q->query("DELETE FROM `users` WHERE `id`='$last_id' ");
          $type = "error";
          $text = "الرجاء التأكد من إختيار شهادة الميلاد";
        }
      }

      if ($residence )
      {
        $sql_residence = "assets/files/$last_id/$residence";

        $update = $Q->query("UPDATE `users` SET `residence`='$sql_residence' WHERE `id`='$last_id' ");
        $type = "success";
        $text = "";
      }else{
        $delete = $Q->query("DELETE FROM `users` WHERE `id`='$last_id' ");
        $type = "error";
        $text = "الرجاء التأكد من إختيار الهوية الوطنية";
      }
    }else{
      $type = "error";
      $text = mysqli_error($Q);
    }


    $response = [
      "type" => $type,
      "text" => $text
    ];

    $json_response = json_encode($response);
    echo $json_response;
  }else{
    echo "nothing received";
  }
?>
