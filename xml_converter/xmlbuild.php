<!DOCTYPE html>
<html>

<head>

</head>

<body>
    <h1>XML Build</h1>
    <?php  

$servername = "wilmington.365dtm.com";
$user = "wilmington";
$pass = "10262022";
$dbname = "wilmington_mobile_db";

$mysqli = new mysqli($servername, $user, $pass, $dbname);
/* check connection */
if ($mysqli->connect_errno) {
   echo "Connect failed ".$mysqli->connect_error;
   exit();
}



$query = "SELECT * FROM listings";
$booksArray = array();
if ($result = $mysqli->query($query)) {
    /* fetch associative array */
    while ($row = $result->fetch_assoc()) {
       array_push($booksArray, $row);
    }
  
    if(count($booksArray)){
         createXMLfile($booksArray);
     }
    /* free result set */
    $result->free();
}
/* close connection */
$mysqli->close();
var_dump ($booksArray);
function createXMLfile($booksArray){

$filePath = 'xmlcompress.xml';
$dom     = new DOMDocument('1.0', 'utf-8'); 
$root      = $dom->createElement('listings'); 

for($i=0; $i<count($booksArray); $i++){
    $listingid = $booksArray[$i]['listingid'];
    $region = $booksArray[$i]['region'];
    $company = $booksArray[$i]['company'];
    $address1 = $booksArray[$i]['address1'];
    $city = $booksArray[$i]['city'];
    $state = $booksArray[$i]['st'];
    $zip = $booksArray[$i]['zip'];
    $phone = $booksArray[$i]['phone'];
    $email = $booksArray[$i]['email'];
    $website = $booksArray[$i]['website'];
    $descr = $booksArray[$i]['descr'];
    $description = str_replace('&', ' and ', stripslashes($descr));
    $latitude = $booksArray[$i]['latitude'];
    $longitude = $booksArray[$i]['longitude'];
    $listingmedia = $booksArray[$i]['listingmedia'];
    $categoryname = $booksArray[$i]['categoryname'];
    $subcategoryname = $booksArray[$i]['subcategoryname'];




    $listing = $dom->createElement('listing');

    $listingidin = $dom->createElement('listingid', $listingid);
    $listing->appendChild($listingidin);

    $regionin = $dom->createElement('region', $region);
    $listing->appendChild($regionin);

    $companyin = $dom->createElement('company', $company);
    $listing->appendChild($companyin);

    $address1in = $dom->createElement('address1', $address1);
    $listing->appendChild($address1in);

    $cityin = $dom->createElement('city', $city);
    $listing->appendChild($cityin);

    $statein = $dom->createElement('state', $state);
    $listing->appendChild($statein);

    $zipin = $dom->createElement('zip', $zip);
    $listing->appendChild($zipin);

    $phonein = $dom->createElement('phone', $phone);
    $listing->appendChild($phonein);

    $emailin = $dom->createElement('email', $email);
    $listing->appendChild($emailin);

    $websitein = $dom->createElement('website', $website);
    $listing->appendChild($websitein);

    $descriptionin = $dom->createElement('description', $description);
    $listing->appendChild($descriptionin);

    $latitudein = $dom->createElement('latitude', $latitude);
    $listing->appendChild($latitudein);

    $longitudein = $dom->createElement('longitude', $longitude);
    $listing->appendChild($longitudein);

    $listingmediain = $dom->createElement('listingmedia', $listingmedia);
    $listing->appendChild($listingmediain);

    $categorynamein = $dom->createElement('categoryname', $categoryname);
    $listing->appendChild($categorynamein);

    $subcategorynamein = $dom->createElement('subcategoryname', $subcategoryname);
    $listing->appendChild($subcategorynamein);



    $root->appendChild($listing);
}

    $dom->appendChild($root); 
    $dom->save($filePath);

}

createXMLfile()

?>

</body>

</html>