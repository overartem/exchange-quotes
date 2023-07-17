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
  $stmt = $conn->prepare('INSERT INTO quotations(quota_id, quota_value) VALUES (?, ?)');

  if ($stmt === false) {
    throw new Exception("Request execution error: " . $conn->error);
  }

  $count = 0;

  if (isset($data->calculations) && isset($data->batchsize)) {
    $calculations = $data->calculations;
    $batchSize = $data->batchsize;

    foreach ($calculations as $item) {
      $value1 = $item->id;
      $value2 = $item->value;

      $stmt->bind_param('ii', $value1, $value2);
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
