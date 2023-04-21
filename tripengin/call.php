<?php 

try {
    // Try Connect to the DB with new MySqli object - Params {hostname, userid, password, dbname}
    $mysqli = new mysqli("wilmington.365dtm.com", "wilmington", "10262022", "wilmington_mobile_db");

    
    $statement = $mysqli->prepare("select * from listings WHERE categoryname IN ('Places to Stay','Things to Do','Restaurants','Shopping','Sports') ORDER BY company ASC;");


    $statement->execute(); // Execute the statement.
    $result = $statement->get_result(); // Binds the last executed statement as a result.

    $stack = array();
    //echo json_encode(($result->fetch_array())); // Parse to JSON and print.
    while ($resultPass = mysqli_fetch_assoc($result)) {
        array_push($stack, $resultPass);
        
    }
} catch (mysqli_sql_exception $e) { // Failed to connect? Lets see the exception details..
    echo "MySQLi Error Code: " . $e->getCode() . "<br />";
    echo "Exception Msg: " . $e->getMessage();
    exit(); // exit and close connection.
}

$mysqli->close(); // finally, close the connection




try {
    // Try Connect to the DB with new MySqli object - Params {hostname, userid, password, dbname}
    $mysqli = new mysqli("wilmington.365dtm.com", "wilmington", "10262022", "wilmington_mobile_db");

    
    $statement = $mysqli->prepare("select * from events ORDER BY datea ASC;");


    $statement->execute(); // Execute the statement.
    $result = $statement->get_result(); // Binds the last executed statement as a result.

    $xml = array();
    //echo json_encode(($result->fetch_array())); // Parse to JSON and print.
    while ($resultPass = mysqli_fetch_assoc($result)) {
        array_push($xml, $resultPass);
        
    }
} catch (mysqli_sql_exception $e) { // Failed to connect? Lets see the exception details..
    echo "MySQLi Error Code: " . $e->getCode() . "<br />";
    echo "Exception Msg: " . $e->getMessage();
    exit(); // exit and close connection.
}

$mysqli->close(); // finally, close the connection

?>

<script>
const pool = <?php echo json_encode(($stack)); ?>;
const ePool = <?php echo json_encode(($xml)); ?>;
</script>