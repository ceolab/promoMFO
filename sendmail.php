<?php
/**
 * Created by JetBrains PhpStorm.
 * User: evgenius
 * Date: 8/21/13
 * Time: 12:04 AM
 * To change this template use File | Settings | File Templates.
 */

$template = file_get_contents("mailTemplates/mail.php");

foreach($_POST as $key => $val)
{
    $template = str_replace("%".$key."%", $val, $template);
}
$headers = sprintf("Content-type:text/html; charset = utf-8 \r\nFrom:no-reply@sitemfo.ru");
if(mail("mail@sitemfo.ru", "Заявка на разработку", $template, $headers))
    setcookie("sendmail", "ok");
else
    setcookie("sendmail", "fail");

header("location: /development.html");

?>