<?php
$to         = "y.kostali@gmail.com";
$subject    = 'MyChoice Loyalty';
$reg_email       = $_POST['reg_email'] ;
$reg_name       = $_POST['reg_name'] ;
$reg_phone       = $_POST['reg_phone'] ;

$message ="
<!DOCTYPE html>
<html lang='en'>
<head>
<meta charset='utf-8' />
<title> Your subject</title>

   
</head>
<body>
<table width='600' border='0' cellspacing='0' cellpadding='0'>
  <tr>
    <td>Email</td>
    <td>" .  $reg_email . "</td>
  </tr>

  <tr>
    <td>Name</td>
    <td>" .  $reg_name . "</td>
  </tr>
  <tr>
    <td>Phone</td>
    <td>" .  $reg_phone . "</td>
  </tr>
</table>


</body>
</html>";
 
// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";

// More headers
//$headers .= 'From: <'.$email.'>' . "\r\n";
//$headers .= 'Cc: email@email.com' . "\r\n";

mail($to,$subject,$message,$headers); 
echo "Mail Sent."; 
     

?>