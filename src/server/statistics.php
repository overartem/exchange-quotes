<?php
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
require './db_config.php';

function getQuotations($currentPage, $conn, $itemsPerPage)
{
    $offset = ($currentPage - 1) * $itemsPerPage;

    $query = "SELECT id, average, deviation, `mode`, `maxvalue`, `minvalue`, missing_quotes, `start_date`, calculate_time FROM quotations ORDER BY id DESC LIMIT :limit OFFSET :offset";
    $stmt = $conn->prepare($query);
    $stmt->bindValue(':limit', $itemsPerPage, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getTotalPages($conn, $itemsPerPage)
{
    $countQuery = "SELECT COUNT(*) as total FROM quotations";
    $countResult = $conn->query($countQuery);
    $totalCount = $countResult->fetchColumn();

    return ceil($totalCount / $itemsPerPage);
}

try {
    $itemsPerPage = 500;

    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

    $currentPage = isset($_GET['page']) ? (int)$_GET['page'] : 1;

    $totalPages = getTotalPages($conn, $itemsPerPage);

    if ($currentPage > $totalPages) {
        throw new Exception("Invalid pag");
    }

    $quotations = getQuotations($currentPage, $conn, $itemsPerPage);

    $conn = null;

    $output = [
        'quotations' => $quotations,
        'totalPages' => $totalPages
    ];

    http_response_code(200);
    echo json_encode($output, JSON_THROW_ON_ERROR);
} catch (PDOException $e) {
    throw new Exception("Error: " . $e->getMessage());
}
