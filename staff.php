<?php
session_start();


if (!isset($_SESSION['username']) || $_SESSION['role'] !== 'staff') {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Staff Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
    <h2>Welcome Staff <?php echo $_SESSION['username']; ?></h2>
    <p>This is the staff dashboard.</p>
    <button onclick="location.href='logout.php'">Logout</button>
</div>
</body>
</html>
