<?php
// 获取到城区的id
$aid = $_GET['aid'];
include('./mysql.php');
$sql = "SELECT * FROM `town` WHERE `area_id`='$aid'";
// 执行sql
$res = mysqli_query($link,$sql);
// 解析结果
$arr = [];
while($row = mysqli_fetch_assoc($res)){
  array_push($arr,$row);
}

echo json_encode($arr);