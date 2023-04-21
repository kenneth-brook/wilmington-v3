<!DOCTYPE html>
<html>

<head>

</head>

<body>
    <h1>XML Test</h1>
    <?php  

    
$url = 'http://cs.simpleviewinc.com/feeds/listings.cfm?pagestart=1&apikey=ECB2A7C5-5056-A36A-1C4477A6EED8BB7B';
$sxml = simplexml_load_file($url);


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

$sweep = "DELETE FROM listings";

if ($conn_sweep->query($sweep) === TRUE) {
  echo "Table Swept <br>";
} else {
  echo "Error: " . $sweep . "<br>" . $conn_sweep->error;
}

$conn_sweep->close();




$listings = [];
$listingmedia = [];
    foreach($sxml->listings->listing as $type){
    $id = $type->listingid;
    $region = $type->region;
    $comp = $type->company;
    $company = addslashes($comp);
    $add = $type->address1;
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
    //foreach($type->listingmedia->media->mediafile as $list) {
        //$listingmedia[] = $list;
    //};
    $listingmedia = $type->listingmedia->media->mediafile[0];
    $categoryname = $type->categoryname;
    $subcategoryname = $type->subcategoryname;

    // Create connection
$conn = new mysqli($servername, $user, $pass, $dbname);
// Check connection
if ($conn->connect_error) {
  echo "Connection failed: " . $conn->connect_error;
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO listings (
    listingid,
    region,
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
    categoryname,
    subcategoryname
    )
VALUES (
    '$id',
    '$region',
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
    '$categoryname',
    '$subcategoryname'
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