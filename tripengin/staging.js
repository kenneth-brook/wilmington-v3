function wipe() {
    display = [];
    //subCatagory = "all";
    //eventPoolOut = (Object.entries(eventPoolRaw))
    eventPoolString = JSON.stringify(eventPoolRaw);
    eventPool = JSON.parse([eventPoolString])
    document.getElementById("cards").innerHTML = "";
    document.getElementById("cards").className = "AtoZ";
    document.getElementById("cards").style.display = "none";
    document.getElementById("map").innerHTML = "";
    document.getElementById("map").style.display = "none";
    document.getElementById("alpha").style.display = "none";
    //document.getElementById("near").style.display = "none";
    document.getElementById("stayLink").style.display = "none";
    document.getElementById("playLink").style.display = "none";
    document.getElementById("dineLink").style.display = "none";
    document.getElementById("shopLink").style.display = "none";
    document.getElementById("home-menu").style.display = "none";
    document.getElementById("nearOff").style.display = "none";   
}

function subAll() {
    subCatagory = "all";
    matrix();
}

function viewAll() {
    date1 = "empty";
    date2 = "empty";
    //city = "all";
    //catagory = "all";
    subCatagory = "all";
    locationsEvents = "locations";
    matrix();
}

function eventKick() {
    catagory = "all";
    subCatagory = "all"
    locationsEvents = "events";
    date1 = "empty";
    date2 = "empty";
    matrix();
}

function itinMapSingle() {
    listMap = "map";
    mapOne = "on"
    matrix();
}

function stay() {
    locationsEvents = "locations";
    catagory = "Places to Stay";
    subCatagory = "all"
    date1 = "empty";
    date2 = "empty";
    matrix();
}

function play() {
    locationsEvents = "locations";
    catagory = "Things to Do";
    subCatagory = "all"
    date1 = "empty";
    date2 = "empty";
    matrix();
}

function dine() {
    locationsEvents = "locations";
    catagory = "Restaurants";
    subCatagory = "all"
    date1 = "empty";
    date2 = "empty";
    matrix();
}

function shop() {
    locationsEvents = "locations";
    catagory = "Shopping";
    subCatagory = "all"
    date1 = "empty";
    date2 = "empty";
    matrix();
}

function wilmington() {
    city = "Wilmington";
    matrix();
}

function carolina() {
    city = "Carolina Beach";
    matrix();
}

function kure() {
    city = "Kure Beach";
    matrix();
}

function wrightsville() {
    city = "Wrightsville Beach";
    matrix();
}

function map() {
    listMap = "map";
    matrix();
}

function list() {
    listMap = "list";
    matrix();
}

/* places to stay */

function bnb() {
    locationsEvents = "locations";
    subCatagory = "Bed & Breakfast";
    catagory = "Places to Stay";
    matrix();
}

function fsh() {
    locationsEvents = "locations";
    subCatagory = "Full-Service Hotels";
    catagory = "Places to Stay";
    matrix();
}

function lsl() {
    locationsEvents = "locations";
    subCatagory = "Limited Service Lodging";
    catagory = "Places to Stay";
    matrix();
}

function vr() {
    locationsEvents = "locations";
    subCatagory = "Vacation Rentals";
    catagory = "Places to Stay";
    matrix();
}

/* Restaurants */

function am() {
    locationsEvents = "locations";
    subCatagory = "American";
    catagory = "Restaurants";
    matrix();
}

function as() {
    locationsEvents = "locations";
    subCatagory = "Asian";
    catagory = "Restaurants";
    matrix();
}

function bbq() {
    locationsEvents = "locations";
    subCatagory = "Barbecue";
    catagory = "Restaurants";
    matrix();
}

function brew() {
    locationsEvents = "locations";
    subCatagory = "Breweries";
    catagory = "Restaurants";
    matrix();
}

function drinks() {
    locationsEvents = "locations";
    subCatagory = "Drinks/Cocktails";
    catagory = "Restaurants";
    matrix();
}

function fr() {
    locationsEvents = "locations";
    subCatagory = "French";
    catagory = "Restaurants";
    matrix();
}

function fresh() {
    locationsEvents = "locations";
    subCatagory = "Fresh Food Markets";
    catagory = "Restaurants";
    matrix();
}

function health() {
    locationsEvents = "locations";
    subCatagory = "Healthy/Veggie";
    catagory = "Restaurants";
    matrix();
}

function ind() {
    locationsEvents = "locations";
    subCatagory = "Indian";
    catagory = "Restaurants";
    matrix();
}

function iri() {
    locationsEvents = "locations";
    subCatagory = "Irish";
    catagory = "Restaurants";
    matrix();
}

function ita() {
    locationsEvents = "locations";
    subCatagory = "Italian";
    catagory = "Restaurants";
    matrix();
}

function la() {
    locationsEvents = "locations";
    subCatagory = "Latin American";
    catagory = "Restaurants";
    matrix();
}

function med() {
    locationsEvents = "locations";
    subCatagory = "Mediterranean";
    catagory = "Restaurants";
    matrix();
}

function mex() {
    locationsEvents = "locations";
    subCatagory = "Mexican";
    catagory = "Restaurants";
    matrix();
}

function pizza() {
    locationsEvents = "locations";
    subCatagory = "Pizza";
    catagory = "Restaurants";
    matrix();
}

function sea() {
    locationsEvents = "locations";
    subCatagory = "Seafood";
    catagory = "Restaurants";
    matrix();
}

function steak() {
    locationsEvents = "locations";
    subCatagory = "Steakhouse";
    catagory = "Restaurants";
    matrix();
}

function sweet() {
    locationsEvents = "locations";
    subCatagory = "Sweet Treats";
    catagory = "Restaurants";
    matrix();
}

function vari() {
    locationsEvents = "locations";
    subCatagory = "Variety";
    catagory = "Restaurants";
    matrix();
}

/* Shopping */

function ant() {
    locationsEvents = "locations";
    subCatagory = "Antiques";
    catagory = "Shopping";
    matrix();
}

function spec() {
    locationsEvents = "locations";
    subCatagory = "Specialty/Gifts";
    catagory = "Shopping";
    matrix();
}

function surf() {
    locationsEvents = "locations";
    subCatagory = "Surf Shops";
    catagory = "Shopping";
    matrix();
}

function vill() {
    locationsEvents = "locations";
    subCatagory = "Villages & Centers";
    catagory = "Shopping";
    matrix();
}

/* Things to Do */

function anc() {
    locationsEvents = "locations";
    subCatagory = "Arts and Culture";
    catagory = "Things to Do";
    matrix();
}

function bar() {
    locationsEvents = "locations";
    subCatagory = "Bars";
    catagory = "Things to Do";
    matrix();
}

function fish() {
    locationsEvents = "locations";
    subCatagory = "Fishing/Charters";
    catagory = "Things to Do";
    matrix();
}

function golf() {
    locationsEvents = "locations";
    subCatagory = "Golf";
    catagory = "Things to Do";
    matrix();
}

function hist() {
    locationsEvents = "locations";
    subCatagory = "History";
    catagory = "Things to Do";
    matrix();
}

function rec() {
    locationsEvents = "locations";
    subCatagory = "Lakes/Parks/Rec Area";
    catagory = "Things to Do";
    matrix();
}

function music() {
    locationsEvents = "locations";
    subCatagory = "Music and Nightlife";
    catagory = "Things to Do";
    matrix();
}

function nat() {
    locationsEvents = "locations";
    subCatagory = "Nature/Eco";
    catagory = "Things to Do";
    matrix();
}

function night() {
    locationsEvents = "locations";
    subCatagory = "Nightlife";
    catagory = "Things to Do";
    matrix();
}

function outfit() {
    locationsEvents = "locations";
    subCatagory = "Outfitters & Equipment Rental";
    catagory = "Things to Do";
    matrix();
}

function perf() {
    locationsEvents = "locations";
    subCatagory = "Performing Arts & Theater";
    catagory = "Things to Do";
    matrix();
}

function spas() {
    locationsEvents = "locations";
    subCatagory = "Spas & Wellness";
    catagory = "Things to Do";
    matrix();
}

function tour() {
    locationsEvents = "locations";
    subCatagory = "Tours & Cruises";
    catagory = "Things to Do";
    matrix();
}

function water() {
    locationsEvents = "locations";
    subCatagory = "Watersports";
    catagory = "Things to Do";
    matrix();
}