<?php

function send_email($name, $email, $recipient, $message, $time){

GLOBAL $mail,$Q;

try {
    //Server settings
    $mail->IsSMTP(); // enable SMTP
    $mail->SMTPDebug = 0; // debugging: 1 = errors and messages, 2 = messages only
    $mail->SMTPAuth = true; // authentication enabled
    $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
    $mail->Host = 'gotstyle.us';
    $mail->Port = 465; // 465 or 587
    $mail->Username = 'info@@rowadschool.com';
    $mail->Password = '0xLZNF~rb($_';

    //Recipients
    $mail->setFrom('info@@rowadschool.com');
    $mail->addAddress($recipient);

    //Content
    $mail->CharSet = 'UTF-8';
    $mail->isHTML(true); // Set email format to HTML
    $mail->Subject = 'مدارس رواد النجاح - تسجيل جديد';
    $mail->Body    = '
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html style="background:#FFF;padding:20px;box-sizing:border-box;">

    <head>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1" name="viewport">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="telephone=no" name="format-detection">
        <title></title>
        <!--[if (mso 16)]>
        <style type="text/css">
        a {text-decoration: none;}
        </style>
        <![endif]-->
        <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
        <!--[if !mso]><!-- -->
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet">
        <!--<![endif]-->
    </head>

    <body style="background:#f9f9f9;">
      <h1 style="display:block;line-height:50px;text-align:center;color:#555;"> يوجد تسجيل جديد </h1>
      <p style="color:#f9f9f9;font-size:14px;text-align:center;padding:20px 0px;"> '.$time.' </p>

      <div style="display:block;width:90%;margin:0px auto;border:1px #f1f1f1 solid;padding:10px;color:#333;">
      '.$name.'
      </div>

      <div style="display:block;width:90%;margin:0px auto;border:1px #f1f1f1 solid;border-top:0;padding:10px;color:#333;">
      '.$email.'
      </div>

      <div style="display:block;width:90%;margin:0px auto;border:1px #f1f1f1 solid;border-top:0;padding:10px;color:#333;">
      '.$message.'
      </div>

    </body>

    </html>
    ';

    $mail->send();
    $mail->ClearAddresses();
    return TRUE;
  } catch (Exception $e) {
    return $mail->ErrorInfo;
  }
}
?>
