<?php
//PHP Mailer test
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__.'/../assets/mailer/src/Exception.php';
require_once __DIR__.'/../assets/mailer/src/PHPMailer.php';
require_once __DIR__.'/../assets/mailer/src/SMTP.php';

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions

?>
