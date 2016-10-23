<?php
/*
 * @Author: Niels Bekkers
 *
 * @Description: API service that handle request-methods with data(JSON) and push it to mysql-database
 *               Test it with httpRequester, add json data to 'content to send' and use POST/DELETE method
 */
 
// Haal de HTTP methode op, het urlpad en de request(JSON)
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'),true);
$toegelaten = null;
 
// Verbind met de mysql database
$link = mysqli_connect('localhost', 'root', 'root', 'testAPI');
mysqli_set_charset($link,'utf8');
 
// Tabel en sleutel filteren uit het urlpad
$table = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
$key = array_shift($request)+0;
 
// zorg voor duidelijke input, verwijder overtollige tekens/data
$columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($input));
$values = array_map(function ($value) use ($link) {
  if ($value===null) return null;
  return mysqli_real_escape_string($link,(string)$value);
},array_values($input));
 
// bouw het SET gedeelte op voor het SQL commando
$set = '';
for ($i=0;$i<count($columns);$i++) {
  $set.=($i>0?',':'').'`'.$columns[$i].'`=';
  $set.=($values[$i]===null?'NULL':'"'.$values[$i].'"');
}
 
// Maak de SQL-string naargelang de HTTP-methode
switch ($method) {
  case 'GET':
    $toegelaten = "GET is niet toegelaten in deze service!"; break;
  case 'PUT':
    $toegelaten = "PUT is niet toegelaten in deze service!"; break;
  case 'POST':
    $sql = "insert into `$table` set $set"; break;
    /*$sql = "insert into categories (id) values ('5')"; break;*/
  case 'DELETE':
    /*$sql = "delete `$table` where id=$set"; break;*/
    $sql = "delete from categories where name='test'"; break;
}
 
// Voer SQL commando uit indien toegelaten!
if ($toegelaten == null){

  $result = mysqli_query($link,$sql);

  // Genereer foutmelding indien SQL commando foutief is
  if (!$result) {
    http_response_code(404);
    die(mysqli_error());
  }
 
  // Toon resultaat in browser (visueel testen)
  if ($method == 'GET') {
    if (!$key) echo '[';
      for ($i=0;$i<mysqli_num_rows($result);$i++) {
      echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
      }}
  /*if (!$key) echo ']';
    } elseif ($method == 'POST') {
      echo mysqli_insert_id($link);
    } else {
      echo mysqli_affected_rows($link);
    }*/
 
  // Sluit de SQL verbinding
  mysqli_close($link);
}
else{
  echo $toegelaten;
}
