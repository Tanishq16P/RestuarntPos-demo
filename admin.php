<?php
session_start();


if (!isset($_SESSION['username']) || $_SESSION['role'] !== 'admin') {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
    <h2>Welcome Admin <?php echo $_SESSION['username']; ?></h2>
    <p>This is the admin dashboard.</p>
    <button onclick="location.href='logout.php'">Logout</button>
</div>
</body>
</html>
