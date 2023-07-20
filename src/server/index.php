<?php
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');

require './db_config.php';

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
  die("Database connection failed: " . $conn->connect_error);
}

try {
  $data = json_decode(file_get_contents('php://input'));
  $conn->begin_transaction();
  $stmt = $conn->prepare('INSERT INTO quotations(average, deviation, `mode`, `maxvalue`, `minvalue`, missing_quotes, `start_date`, calculate_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');

  if ($stmt === false) {
    throw new Exception("Request execution error: " . $conn->error);
  }

  $count = 0;

  if (isset($data->calculations) && isset($data->batchsize)) {
    $calculations = $data->calculations;
    $batchSize = $data->batchsize;

    foreach ($data->calculations as $calculations) {
      $value1 = $calculations->average;
      $value2 = $calculations->deviation;
      $value3 = $calculations->modes->total;
      $value4 = $calculations->maxValue;
      $value5 = $calculations->minValue;
      $value6 = $calculations->missingQuotes;
      $value7 = $calculations->startTime;
      $value8 = $calculations->calculateTime;

      $stmt->bind_param('ddsddiii', $value1, $value2, $value3, $value4, $value5, $value6, $value7, $value8);
      $stmt->execute();

      $count++;

      if ($count % $batchSize === 0) {
        $conn->commit();
      }
    }
  } else {
    echo 'Data not found.';
  }

  $stmt->close();
} catch (Exception $e) {
  $conn->rollback();
  die("Request execution error: " . $e->getMessage());
}

$conn->close();

$response = [
  'status' => 'success',
  'message' => 'The data has been successfully received and processed.',
];

http_response_code(200);
echo json_encode($response);
