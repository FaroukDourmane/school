<?php

function send_email($gender, $firstname,$father,$grandfather,$family,$id_number,$stage,$phone,$country,$time){

GLOBAL $mail,$Q;

try {
    //Server settings
    $mail->IsSMTP(); // enable SMTP
    $mail->SMTPDebug = 0; // debugging: 1 = errors and messages, 2 = messages only
    $mail->SMTPAuth = true; // authentication enabled
    $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
    $mail->Host = 'rowadschool.com';
    $mail->Port = 465; // 465 or 587
    $mail->Username = 'info@rowadschool.com';
    $mail->Password = '0xLZNF~rb($_';

    //Recipients
    $mail->setFrom('info@rowadschool.com');
    $mail->addAddress("rowadalngah@gmail.com");

    //Content
    $mail->CharSet = 'UTF-8';
    $mail->isHTML(true); // Set email format to HTML
    $mail->Subject = 'مدارس رواد النجاح - تسجيل جديد';
    $mail->Body = '
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html>
    <head>
    <!-- If you delete this meta tag, the ground will open and swallow you. -->
    <meta name="viewport" content="width=device-width" />

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>تسجيل جديد</title>

    <link rel="stylesheet" type="text/css" href="stylesheets/email.css" >

    </head>

    <body bgcolor="#FFFFFF" topmargin="0" leftmargin="0" marginheight="0" marginwidth="0">

    <!-- HEADER -->
    <table class="head-wrap" bgcolor="#f1f1f1">
    	<tr>
    		<td class="header container">
    			<!-- /content -->
    			<div class="content">
    				<table bgcolor="#f1f1f1" >
    					<tr>
    						<td style="text-align:center;"><img src="https://rowadschool.com/assets/img/logo-black.png" /></td>
    					</tr>
    				</table>
    			</div><!-- /content -->
    		</td>
    		<td></td>
    	</tr>
    </table><!-- /HEADER -->

    <!-- BODY -->
    <table class="body-wrap" bgcolor="">
    	<tr>
    		<td></td>
    		<td class="container" align="" bgcolor="#FFFFFF">

    			<!-- content -->
    			<div class="content" dir="rtl">
    				<table>
    					<tr>
    						<td>
    							<h1>مدارس رواد النجاح - تسجيل جديد</h1>
    							<p class="lead">
    								<small>تم التسجيل بتاريخ : </small>
    								<b>'.$time.'</b>
    							</p>
    						</td>
    					</tr>
    				</table>
    			</div><!-- /content -->

    			<!-- content -->
    			<div class="content" dir="rtl">

    				<table bgcolor="">
    					<tr>
    						<td width="20%">النوع</td>
    						<td>
    							<h4>'.$gender.'</h4>
    						</td>
    					</tr>

    					<tr>
    						<td width="20%">الإسم</td>
    						<td>
    							<h4>'.$firstname.'</h4>
    						</td>
    					</tr>

    					<tr>
    						<td width="20%">الأب</td>
    						<td>
    							<h4>'.$father.'</h4>
    						</td>
    					</tr>

    					<tr>
    						<td width="20%">الجد</td>
    						<td>
    							<h4>'.$grandfather.'</h4>
    						</td>
    					</tr>

    					<tr>
    						<td width="20%">العائلة</td>
    						<td>
    							<h4>'.$family.'</h4>
    						</td>
    					</tr>
    				</table>

    				<hr />

    				<table bgcolor="">
    					<tr>
    						<td width="20%">رقم السجل المدني</td>
    						<td>
    							<h4>'.$id_number.'</h4>
    						</td>
    					</tr>

    					<tr>
    						<td width="20%">المرحلة</td>
    						<td>
    							<h4>'.$stage.'</h4>
    						</td>
    					</tr>

    					<tr>
    						<td width="20%">الجنسية</td>
    						<td>
    							<h4>'.$country.'</h4>
    						</td>
    					</tr>

    					<tr>
    						<td width="20%">رقم الهاتف</td>
    						<td>
    							<h4>'.$phone.'</h4>
    						</td>
    					</tr>

    				</table>
    			</div><!-- /content -->

    		</td>
    		<td></td>
    	</tr>
    </table><!-- /BODY -->

    <!-- HEADER -->
    <table class="head-wrap" bgcolor="#f1f1f1">
    	<tr>
    		<td class="header container">
    			<!-- /content -->
    			<div class="content">
    				<table bgcolor="#f1f1f1" >
    					<tr>
    						<td style="text-align:center;"> <small>لمشاهدة باقي التفاصيل يجب الدخول إلى لوحة التحكم</small> </td>
    					</tr>
    				</table>
    			</div><!-- /content -->
    		</td>
    		<td></td>
    	</tr>
    </table><!-- /HEADER -->

    </body>
    </html>';

    $mail->send();
    $mail->ClearAddresses();
    return TRUE;
  } catch (Exception $e) {
    return $mail->ErrorInfo;
  }
}
?>
