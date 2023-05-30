<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "todo_list";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch todos from the database
    $sql = "SELECT * FROM data";
    $result = $conn->query($sql);

    $todos = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $todos[] = $row;
        }
    }

    echo json_encode($todos);
}
 elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
   
    $data = json_decode(file_get_contents('php://input'), true);
    $todo = $data['todo'];

    $sql = "INSERT INTO data (todo) VALUES ('$todo')";
    $conn->query($sql);
    $sql = "SELECT * FROM data";
    $result = $conn->query($sql);

    $todos = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $todos[] = $row;
        }
    }

    // echo json_encode({$todos);
    echo json_encode(array('message' => 'Todo added successfully',$todos));
}
elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Delete a todo from the database
    $id = $_GET['id'];

    $sql = "DELETE FROM data WHERE id=$id";
    $conn->query($sql);

    echo json_encode(array('message' => 'Todo deleted successfully'));
}

$conn->close();
?>
