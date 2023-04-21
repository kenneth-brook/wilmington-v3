<!DOCTYPE html>
<html>

<head>

</head>

<body>
    <h1>XML Test</h1>
    <?php  


$url = 'http://cs.simpleviewinc.com/feeds/events.cfm?apikey=ECB2A7C5-5056-A36A-1C4477A6EED8BB7B';
$sxml = simplexml_load_file($url) or die("Error: Cannot create object");

$servername = "wilmington.365dtm.com";
$user = "wilmington";
$pass = "10262022";
$dbname = "wilmington_mobile_db";


// Create connection
$conn_sweep = new mysqli($servername, $user, $pass, $dbname);
// Check connection
if ($conn_sweep->connect_error) {
  die("Connection failed: " . $conn_sweep->connect_error);
}

$sweep = "DELETE FROM events";

if ($conn_sweep->query($sweep) === TRUE) {
  echo "Table Swept <br>";
} else {
  echo "Error: " . $sweep . "<br>" . $conn_sweep->error;
}

$conn_sweep->close();


//$listings = [];
//$listingmedia = [];
    foreach($sxml->events->event as $type){
    $idraw = $type->eventid;
    $id = $idraw + 10000;
    $company = $type->title;
    $add = $type->address;
    $address = addslashes($add);
    $city = $type->city;
    $state = $type->state;
    $zip = $type->zip;
    $phone = $type->phone;
    $email = $type->email;
    $website = $type->website;
    $descript = $type->description;
    $description = addslashes($descript);
    $latitude = $type->latitude;
    $longitude = $type->longitude;
    $listingmedia = $type->images->image->mediafile[0];
    $typeid = $type->eventtypeid;
    $recurrence = $type->recurrence;
    $loc = $type->location;
    $start = $type->startdate;
    $end = $type->enddate;
    $datep = [];
    foreach($type->eventdates as $i => $date) {
      $datep[] = $date->eventdate;
    }

    $datea = json_encode($datep);

    print_r($datea);

    // Create connection
$conn = new mysqli($servername, $user, $pass, $dbname);
// Check connection
if ($conn->connect_error) {
  echo "Connection failed: " . $conn->connect_error;
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO events (
    listingid,
    company,
    address1,
    city,
    st,
    zip,
    phone,
    email,
    website,
    descr,
    latitude,
    longitude,
    listingmedia,
    typeid,
    recurrence,
    loc,
    startd,
    endd,
    datea
    )
VALUES (
    '$id',
    '$company',
    '$address',
    '$city',
    '$state',
    '$zip',
    '$phone',
    '$email',
    '$website',
    '$description',
    '$latitude',
    '$longitude',
    '$listingmedia',
    '$typeid',
    '$recurrence',
    '$loc',
    '$start',
    '$end',
    '$datea'
    )";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully <br>";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();


}

?>

</body>

</html>