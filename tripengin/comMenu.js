function comMenu() {
    let com = document.getElementById("cards");
    let map = document.getElementById("map");
    map.style.display = 'none'
    com.style.display = 'block'
    com.classList.add("comMenu")
    com.innerHTML = '<li class="poplink3"><a href="#" onclick="wilmington()" class="wilmington">Wilmington</a></li><li class="poplink3"><a href="#" onclick="carolina()" class="carolina-beach">Carolina Beach</a></li><li class="poplink3"><a href="#" onclick="kure()" class="kure-beach">Kure Beach</a></li><li class="poplink3"><a href="#" onclick="wrightsville()"class="wrightsville-beach">Wrightsville Beach</a></li>'
}

function subCatSort() {
    let stay = document.getElementById("stayLink");
    let play = document.getElementById("playLink");
    let dine = document.getElementById("dineLink");
    let shop = document.getElementById("shopLink");
    let event = document.getElementById("dateLink");

    
    if (locationsEvents === "events") {
        stay.style.display = "none";
        play.style.display = "none";
        dine.style.display = "none";
        shop.style.display = "none";
        event.style.display = "block";
    } else if (catagory === "all") {
        stay.style.display = "block";
        play.style.display = "block";
        dine.style.display = "block";
        shop.style.display = "block";
        event.style.display = "none";
    } else if (catagory === "Places to Stay") {
        stay.style.display = "block";
        play.style.display = "none";
        dine.style.display = "none";
        shop.style.display = "none";
        event.style.display = "none";
    } else if (catagory === "Things to Do") {
        stay.style.display = "none";
        play.style.display = "block";
        dine.style.display = "none";
        shop.style.display = "none";
        event.style.display = "none";
    } else if (catagory === "Restaurants") {
        stay.style.display = "none";
        play.style.display = "none";
        dine.style.display = "block";
        shop.style.display = "none";
        event.style.display = "none";
    } else if (catagory === "Shopping") {
        stay.style.display = "none";
        play.style.display = "none";
        dine.style.display = "none";
        shop.style.display = "block";
        event.style.display = "none";
    }
}

function subCatSortFilter() {
    let subList1 = [];
    let subList2 = [];
    let subList3 = [];
    for (let i = 0; i < display.length; i++) {
        subList1.push(display[i].subcategoryname);
    }
    subList2 = [...new Set(subList1)];
    console.log(subList2)
    for (let i = 0; i < subList2.length; i++) {
        let s = "";
        let s2 = "";
        s = subList2[i].split(' ')[0];
        s2 = s.split('/')[0];
        subList3.push(s2);
    }
    for (let i = 0; i < subList3.length; i++) {
      document.getElementById("cards").classList.add(subList3[i]);
    }
    console.log(subList3)
}

function stayCats() {
    wipe()
    viewAll()
    let com = document.getElementById("cards");
    let map = document.getElementById("map");
    map.style.display = 'none'
    com.style.display = 'block'
    subCatSortFilter();
    com.classList.add("subMenu");
    com.innerHTML = '<li class="poplink3 bnb"><a href="#" onclick="bnb()">Bed & Breakfast</a></li><li class="poplink3 fsh"><a href="#" onclick="fsh()">Full-Service Hotels</a></li><li class="poplink3 lsl"><a href="#" onclick="lsl()">Limited Service Lodging</a></li><li class="poplink3 vr"><a href="#" onclick="vr()">Vacation Rentals</a></li>'
}

function playCats() {
    wipe()
    viewAll()
    let com = document.getElementById("cards");
    let map = document.getElementById("map");
    map.style.display = 'none'
    com.style.display = 'block'
    subCatSortFilter();
    com.classList.add("subMenu");
    com.innerHTML = '<li class="poplink3 anc"><a href="#" onclick="anc()">Arts and Culture</a></li><li class="poplink3 bar"><a href="#" onclick="bar()">Bars</a></li><li class="poplink3 fish"><a href="#" onclick="fish()">Fishing/Charters</a></li><li class="poplink3 golf"><a href="#" onclick="golf()">Golf</a></li><li class="poplink3 hist"><a href="#" onclick="hist()">History</a></li><li class="poplink3 rec"><a href="#" onclick="rec()">Lakes/Parks/Rec Area</a></li><li class="poplink3 music"><a href="#" onclick="music()">Music and Nightlife</a></li><li class="poplink3 nat"><a href="#" onclick="nat()">Nature/Eco</a></li><li class="poplink3 night"><a href="#" onclick="night()">Nightlife</a></li><li class="poplink3 outfit"><a href="#" onclick="outfit()">Outfitters & Equipment Rental</a></li><li class="poplink3 perf"><a href="#" onclick="perf()">Performing Arts & Theater</a></li><li class="poplink3 spas"><a href="#" onclick="spas()">Spas & Wellness</a></li><li class="poplink3 tour"><a href="#" onclick="tour()">Tours & Cruises</a></li><li class="poplink3 water"><a href="#" onclick="water()">Watersports</a></li>'
}

function dineCats() {
    wipe()
    viewAll()
    let com = document.getElementById("cards");
    let map = document.getElementById("map");
    map.style.display = 'none'
    com.style.display = 'block'
    subCatSortFilter();
    com.classList.add("subMenu");
    com.innerHTML = '<li class="poplink3 am"><a href="#" onclick="am()">American</a></li><li class="poplink3 as"><a href="#" onclick="as()">Asian</a></li><li class="poplink3 bbq"><a href="#" onclick="bbq()">Barbecue</a></li><li class="poplink3 brew"><a href="#" onclick="brew()">Breweries</a></li><li class="poplink3 drinks"><a href="#" onclick="drinks()">Drinks/Cocktails</a></li><li class="poplink3 fr"><a href="#" onclick="fr()">French</a></li><li class="poplink3 fresh"><a href="#" onclick="fresh()">Fresh Food Markets</a></li><li class="poplink3 health"><a href="#" onclick="health()">Healthy/Veggie</a></li><li class="poplink3 ind"><a href="#" onclick="ind()">Indian</a></li><li class="poplink3 iri"><a href="#" onclick="iri()">Irish</a></li><li class="poplink3 ita"><a href="#" onclick="ita()">Italian</a></li><li class="poplink3 la"><a href="#" onclick="la()">Latin American</a></li><li class="poplink3 med"><a href="#" onclick="med()">Mediterranean</a></li><li class="poplink3 mex"><a href="#" onclick="mex()">Mexican</a></li><li class="poplink3 pizza"><a href="#" onclick="pizza()">Pizza</a></li><li class="poplink3 sea"><a href="#" onclick="sea()">Seafood</a></li><li class="poplink3 steak"><a href="#" onclick="steak()">Steakhouse</a></li><li class="poplink3 sweet"><a href="#" onclick="sweet()">Sweet Treats</a></li><li class="poplink3 vari"><a href="#" onclick="vari()">Variety</a></li>'
}

function shopCats() {
    wipe()
    viewAll()
    let com = document.getElementById("cards");
    let map = document.getElementById("map");
    map.style.display = 'none'
    com.style.display = 'block'
    subCatSortFilter();
    com.classList.add("subMenu");
    com.innerHTML = '<li class="poplink3 ant"><a href="#" onclick="ant()">Antiques</a></li><li class="poplink3 spec"><a href="#" onclick="spec()">Specialty/Gifts</a></li><li class="poplink3 surf"><a href="#" onclick="surf()">Surf Shops</a></li><li class="poplink3 vill"><a href="#" onclick="vill()">Villages & Centers</a></li>'
}