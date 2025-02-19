<?php
// Database configuration
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "products";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get parameters
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
$name = isset($_GET['name']) ? $conn->real_escape_string($_GET['name']) : '';

// Build query
$sql = "SELECT * FROM products WHERE ";
$conditions = [];
if($id > 0) {
    $conditions[] = "id = $id";
}
if(!empty($name)) {
    $conditions[] = "name LIKE '%$name%'";
}

if(empty($conditions)) {
    echo json_encode(['error' => 'Please provide search criteria']);
    exit;
}

$sql .= implode(' OR ', $conditions);
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode([
        'id' => $row['id'],
        'name' => $row['name'],
        'price' => $row['price'],
        'description' => $row['description'],
        'image' => $row['image_url']
    ]);
} else {
    echo json_encode(['error' => 'Product not found']);
}

$conn->close();
?>