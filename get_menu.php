<?php
header("Content-Type: application/json");

// DB connection
$host = "localhost";
$user = "root";   // default in XAMPP
$pass = "";       // default is empty
$dbname = "menu_system";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "DB connection failed"]));
}

$sql = "SELECT category, name, price FROM menu_items";
$result = $conn->query($sql);

$menu = [];

while ($row = $result->fetch_assoc()) {
    $menu[$row['category']][] = [
        "name" => $row['name'],
        "price" => $row['price']
    ];
}

echo json_encode($menu, JSON_PRETTY_PRINT);
$conn->close();
?>
