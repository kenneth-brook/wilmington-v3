<!DOCTYPE html>

<html lang="en-US">

<?php include "tripengin/call.php"; ?>

<script>
const locationPool = pool;
let eventPoolRaw = [];
let eventPoolString = [];
let eventPool = [];

let cordSet = [];


let searchInput = "";

let locationsEvents = "locations";
let city = "all";
let catagory = "all";
let subCatagory = "all";
let listMap = "list";
let itemSingle = [];
let mapOne = "off";

let display = [];

let date1 = "empty"
let date2 = "empty"

navigator.geolocation.getCurrentPosition(function(position) {
    cordSet = [position.coords.longitude, position.coords.latitude];
    console.log(cordSet);
});
</script>


<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <title>Wilmington NC - Town Tripping</title>
    <link rel="apple-touch-icon" href="images/favicon.png" sizes="180x180" />
    <link rel="icon" href="images/favicon.png" sizes="180x180" type="image/png" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="theme-color" content="#005BA8" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css"
        type="text/css" />
    <link rel="stylesheet" href="css/style.css" type="text/css" />
    <script src="js/jquery.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="tripengin/function.js"></script>
    <script type="text/javascript" src="tripengin/coordGrab.js"></script>
    <script type="text/javascript" src="tripengin/staging.js"></script>
    <script type="text/javascript" src="tripengin/matrix.js"></script>
    <script type="text/javascript" src="tripengin/capBlock.js"></script>
    <script type="text/javascript" src="tripengin/mapSpawn.js"></script>
    <script type="text/javascript" src="tripengin/singleCard.js"></script>
    <script type="text/javascript" src="tripengin/eventCard.js"></script>
    <script type="text/javascript" src="tripengin/render.js"></script>
    <script type="text/javascript" src="tripengin/comMenu.js"></script>
    <script type="text/javascript" src="tripengin/eventScrub.js"></script>
    <script type="text/javascript" src="tripengin/dateList.js"></script>
    <script type="text/javascript" src="tripengin/itinerary.js"></script>
    <script type="text/javascript" src="tripengin/keySearch.js"></script>
    <script type="text/javascript" src="tripengin/datePick.js"></script>

    <script type="text/javascript" src="tripengin/follow.js"></script>

    <!--
    <script type="text/javascript" src="tripengin/renderSwitch.js"></script>
    
    
    
    <script type="text/javascript" src="tripdriver/event.js"></script>
    -->

    <script src='https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.js'></script>
    <link href='https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css' rel='stylesheet' />
    <!--<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.js">
    </script>
    <link rel="stylesheet"
        href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.css"
        type="text/css">-->

</head>



<body class="page-home" id="body-toggle">
    <div class="root">
        <header class="header clearfix">
            <div class="header-wrapper fixed">
                <div class="header-bar">
                    <div class="header-top">
                        <div class="logo"><a href="home.php">Wilmington NC</a></div>

                        <button id="popupTrigger" class="navigation-button"><span>menu</span></button>
                        <a href="#" onclick="itineraryPost()" class="itinerary-button"><span>view itinerary</span></a>

                        <div id="popup" class="popup header-menu">
                            <!--<button class="popup-close">Close</button>-->
                            <ul class="menu">
                                <li class="poplink"><a href="home.php">Home</a></li>
                                <li class="poplink"><a href="#" onclick="stay()">Stay</a></li>
                                <li class="poplink"><a href="#" onclick="play()">Play</a></li>
                                <li class="poplink"><a href="#" onclick="dine()">Dine</a></li>
                                <li class="poplink"><a href="#" onclick="shop()">Shop</a></li>
                                <li class="poplink"><a href="#" onclick="eventKick()">Events</a></li>
                                <li class="poplink"><a href="#" onclick="map()">Maps</a></li>
                                <li class="poplink"><a href="#" onclick="follow()">Follow Us</a></li>
                                <li class="poplink"><a href="https://365publicationsonline.com/WilmingtonVG/"
                                        target="_blank">Visitors Guide</a></li>
                                <li class="poplink"><a href="https://www.wilmingtonandbeaches.com/"
                                        target="_blank">Website</a></li>
                                <!--<li class="poplink"><a href="#">About</a></li>-->
                            </ul>
                        </div>
                    </div>
                    <div class="header-bottom">
                        <div id="popHome">
                            <ul style="margin-top: -9px">
                                <li>Carolina<br> Beach</li>
                                <li>Kure<br> Beach</li>
                                <li>Wrightsville<br> Beach</li>
                            </ul>
                        </div>
                        <div id="popTrigger3" class="search-form">
                            <input id="search" oninput="keySearch()" type="text" size="20" placeholder="Keyword Search">
                            <a href="#" onclick="clearSearch()"
                                style="color: red; font-size: 2rem; line-height: 0; margin-left: 5px;">x</a>
                            <button onClick="keySearch()"><span>Search</span></button>
                        </div>
                        <div class="sort-options">
                            <button style="margin-left: 10px;" id="popupTrigger2" class="sort-button">sort
                                options</button>

                            <div id="popup2" class="popup">
                                <!--<button class="popup-close">Close</button>-->
                                <ul class="menu">
                                    <li class="poplink2"><a href="#" onclick="viewAll()" class="all">Show All</a></li>
                                    <li id="near" class="poplink2"><a href="#" onclick="nearMePins()" class="near">Near
                                            Me</a>
                                    </li>
                                    <li id="nearOff" class="poplink2"><a href="#" onclick="nearMePinsOff()"
                                            class="near">Turn Off Near
                                            Me</a>
                                    </li>
                                    <li class="poplink2"><a href="#" onclick="comMenu()" class="community">Town</a>
                                    </li>
                                    <li id="stayLink" class="poplink2"><a href="#" onclick="stayCats()"
                                            class="stay">Lodging Type</a></li>
                                    <li id="playLink" class="poplink2"><a href="#" onclick="playCats()"
                                            class="play">Activity Type</a></li>
                                    <li id="dineLink" class="poplink2"><a href="#" onclick="dineCats()"
                                            class="cuisine">Cuisine Type</a></li>
                                    <li id="shopLink" class="poplink2"><a href="#" onclick="shopCats()"
                                            class="shop">Store Type</a></li>
                                    <li id="dateLink" class="poplink2"><a href="#" onclick="picker()" class="shop">By
                                            Dates</a></li>
                                    <li id="alpha" class="poplink2"><a href="#" onclick="order()"
                                            class="alphabetical">Alphabetical</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-wrapper"></div>
        </header>



        <div class="caption-block" id="cap-block">
            <span id="ico" class="caption-icon"></span>
            <h2 id="ico-text" class="caption"></h2>
        </div>

        <main class="content clearfix" id="home-menu">
            <h3 class="head-top">Tap to begin exploring.</h3>
            <div class="home-menu">
                <ul class="menu menu-main">
                    <li><a href="#" onclick="stay()"><span class="stay">Stay</span></a></li>
                    <li><a href="#" onclick="play()"><span class="play">Play</span></a></li>
                    <li><a href="#" onclick="dine()"><span class="dine">Dine</span></a></li>
                    <li><a href="#" onclick="shop()"><span class="shop">Shop</span></a></li>
                    <li><a href="#" onclick="eventKick()"><span class="events">Events</span></a></li>
                    <li><a href="#" onclick="map(display)"><span class="maps">Maps</span></a></li>
                </ul>
            </div>

            <div class="separator"></div>

            <h3 class="head-bottom">Or search by town.</h3>
            <div class="town-menu">
                <button id="popupTrigger3" class="menu-button">Choose a Town</button>

                <div id="popup3" class="popup absolute">
                    <!--<button class="popup-close">Close</button>-->
                    <ul class="menu">
                        <li><span>Choose a Town</span></li>
                        <li class="poplink3"><a href="#" onclick="wilmington()" class="wilmington">Wilmington</a></li>
                        <li class="poplink3"><a href="#" onclick="carolina()" class="carolina-beach">Carolina Beach</a>
                        </li>
                        <li class="poplink3"><a href="#" onclick="kure()" class="kure-beach">Kure Beach</a></li>
                        <li class="poplink3"><a href="#" onclick="wrightsville()"
                                class="wrightsville-beach">Wrightsville Beach</a></li>
                    </ul>
                </div>
            </div>
        </main>

        <div class="content clearfix" id="display">
            <ul id="cards" class="AtoZ"></ul>
            <div id="map"></div>
            <div id="edit"></div>
            <ul style="list-style: none; padding-left: 0;" id="itin"></ul>
        </div>
    </div>

    <footer class="footer clearfix">
        <div class="footer-wrapper fixed">
            <div class="footer-bar">
                <div class="menu-wrapper" id="display-low">
                    <ul class="menu menu-main">
                        <li class="target"><a id="stay" href="#" onclick="stay()"><span class="stay">Stay</span></a>
                        </li>
                        <li class="target"><a id="play" href="#" onclick="play()"><span class="play">Play</span></a>
                        </li>
                        <li class="target"><a id="dine" href="#" onclick="dine()"><span class="dine">Dine</span></a>
                        </li>
                        <li class="target"><a id="shop" href="#" onclick="shop()"><span class="shop">Shop</span></a>
                        </li>
                        <li class="target"><a id="event" href="#" onclick="eventKick()"><span
                                    class="events">Events</span></a>
                        </li>
                        <li class="target" id="togBut"></li>
                    </ul>
                </div>

                <div class="free-info">
                    <a style="text-align: center;"
                        href="https://www.wilmingtonandbeaches.com/about/area-information/vic/" target="_blank">
                        <strong>Get Free Info</strong><br>
                        at Visitor Information Center
                    </a>
                </div>

            </div>
        </div>
        <div class="footer-wrapper"></div>
    </footer>
    </div>

    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js">
    </script>
    <!--<script type="text/javascript" src="js/script.js"></script>-->
    <script type="text/javascript" src="js/data.js"></script>
    <script type="text/javascript" src="tripengin/poptriggers.js"></script>



</body>

</html>