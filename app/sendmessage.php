<?php

$sendto  = ''; //Адреса, куда будут приходить письма

$name  = $_POST['name'];

// Формирование заголовка письма

$subject  = '[Новая заявка - LP]';

if ($_POST['email']){
	$headers  = "From: ".$_POST['email']." \r\n";
    $headers .= "Reply-To: ". strip_tags($_POST['email']) . "\r\n";
} else {
	$headers  = "From: ".$name." \r\n";
    $headers .= "Reply-To: ". strip_tags($name) . "\r\n";
}

$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";

// Формирование тела письма

$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Новая заявка - LP</h2>\r\n";
$msg .= "<p><strong>Имя:</strong> ".$name."</p>\r\n";

if ($_POST['email']){
    $msg .= "<p><strong>Email:</strong> ".$_POST['email']."</p>\r\n";
}

if ($_POST['phone']){
    $msg .= "<p><strong>Телефон:</strong> ".$_POST['phone']."</p>\r\n";
}

$msg .= "</body></html>";

// отправка сообщения

if(@mail($sendto, $subject, $msg, $headers)) {
	echo "true";
} else {
	echo "false";
}

?>