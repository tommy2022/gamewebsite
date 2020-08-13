<?php
    session_start();
    require(dbconnect.php);
    if (!isset($_SESSION['join'])) {
        header('Location: index.php');
        exit();
    }
?>