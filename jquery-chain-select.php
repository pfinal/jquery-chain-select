<?php

//接收一个pid参数，查询该pid下级数据，数据库表结构如下

/*

id   pid   name

12    0    北京
13    0    广东省

22    12   北京市

30    22   朝阳区
31    22   昌平区

41    13    广州市
42    13    深圳市

52    41     番禺区
53    41     天河区

54    42     福田区
55    42     罗湖区

 */


$data = array();

//pid为0时，返回第一个下拉框数据
$data[0] = array(array("id" => "12", "name" => "北京"), array("id" => "13", "name" => "广东省"));

$data[12] = array(array("id" => "22", "name" => "北京市"));
$data[22] = array(array("id" => "30", "name" => "朝阳区"), array("id" => "31", "name" => "昌平区"));
$data[13] = array(array("id" => "41", "name" => "广州市"), array("id" => "42", "name" => "深圳市"));
$data[41] = array(array("id" => "52", "name" => "番禺区"), array("id" => "53", "name" => "天河区"));
$data[42] = array(array("id" => "54", "name" => "福田区"), array("id" => "55", "name" => "罗湖区"));

$pid = isset($_GET['pid']) ? $_GET['pid'] : 0;

$response = isset($data[$pid]) ? $data[$pid] : array();

//json格式输出
//[{"id":"12","name":"北京"},{"id":"13","name":"广东省"}]

echo json_encode($response, JSON_UNESCAPED_UNICODE);
