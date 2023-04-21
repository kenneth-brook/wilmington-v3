let colorHex = "";

let zoom = 12;
let coords = [];
let pin = "";
let pop = "";
let markers = "";

let nearMe = "off";

function nearMePins() {
 nearMe = "on";

 mapSpawn()
}

function nearMePinsOff() {
  nearMe = "off";
  mapSpawn()
  
 }

//function mapSingle() {
  //wipe();
  //display = [itemSingle];
  //mapSpawn();
//}

function mapSpawn() {
  mSingle = display
  display2 = [mSingle];
  document.getElementById("display").style.display = "block";
  document.getElementById("map").style.display = "block";
  document.getElementById("display-low").style.display = "block";
  document.getElementById("cap-block").style.display = "flex";
  

  capBlock();

  let longAdd = 0;
  let latAdd = 0;
  let cLong = 0;
  let cLat = 0;
  let dirivedCenter = [];

  if (city == "all") {
    //dirivedCenter = [-77.8915, 34.1819];
    zoom = 9;
  } else {
     zoom = 12
  }

  if (nearMe == "off") {
    console.log(display)
    display.forEach(set => {
    longAdd += set.longitude;
    latAdd += set.latitude;
  })

  cLong = longAdd / display.length;
  cLat = latAdd / display.length;

  dirivedCenter = [cLong, cLat];
  document.getElementById("near").style.display = "block";
  document.getElementById("nearOff").style.display = "none";
} else if (nearMe == "on") {
  dirivedCenter = [...cordSet];
  
  zoom = 14;
  document.getElementById("near").style.display = "none";
  document.getElementById("nearOff").style.display = "block";
}
 
console.log(dirivedCenter);
    

    mapboxgl.accessToken =
    'pk.eyJ1Ijoid29tYmF0MTk3MiIsImEiOiJjbDdycmxjNXIwaTJ1M3BudXB2ZTZoZm1tIn0.v-NAvl8Ba0yPtAtxOt9iTg';
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/outdoors-v12?optimize=true', // style URL
            zoom: zoom, // starting zoom
            center: dirivedCenter,
        });

        //map.on('load', function () {

          //center: dirivedCenter
          
          //map.flyTo({
             //center: dirivedCenter,
             //essential: true // this animation is considered essential with respect to prefers-reduced-motion
          //});
       //});

        

        class ClickableMarker extends mapboxgl.Marker {
          onClick(handleClick) {
            this._handleClick = handleClick;
            return this;
          }
          _onMapClick(e) {
            const targetElement = e.originalEvent.target;
            const element = this._element;
    
            if (this._handleClick && (targetElement === element || element.contains((targetElement)))) {
              this._handleClick();
            }
          }
        };
        
        function popDrop(passDisplay) {
          let item = [];
          item.push(passDisplay);
          function cleanPop() {
            pop.remove()
          }
          
          pin = document.createElement("div");
          let tip = document.createElement("div");
          let pinMain = document.createElement("div");
          let bodyMain = document.createElement("div");
          let popHead = document.createElement("div");
          let popHeadImg = document.createElement("div");
          let popImg = document.createElement("img");
          let title = document.createElement("h3");
          let popBody = document.createElement("div");
          let addyTop = document.createElement("p");
          let addyBottom = document.createElement("p");
          let buttons = document.createElement("ul");
          let buttonSingle = document.createElement("li");
          let baSingle = document.createElement("a");
          let baSingles = document.createElement("span");
          let button1 = document.createElement("li");
          let ba1 = document.createElement("a");
          let ba1s = document.createElement("span");
          let button2 = document.createElement("li");
          let ba2 = document.createElement("a");
          let ba2s = document.createElement("span");
          let button3 = document.createElement("li");
          let ba3 = document.createElement("a");
          let ba3s = document.createElement("span");
        
          pin.appendChild(tip);
          pin.appendChild(pinMain);
          pinMain.appendChild(bodyMain);
          bodyMain.appendChild(popHead);
          popHead.appendChild(popHeadImg);
          if (passDisplay.listingmedia !== "") {
          popHeadImg.appendChild(popImg);
          popImg.src = passDisplay.listingmedia;
          }
          popHead.appendChild(title);
          title.innerText = passDisplay.company;
          bodyMain.appendChild(popBody);
          popBody.appendChild(addyTop);
          addyTop.innerText = passDisplay.address1;
          popBody.appendChild(addyBottom);
          addyBottom.innerText = passDisplay.city + ", NC " + passDisplay.zip
          bodyMain.appendChild(buttons);
          buttons.appendChild(buttonSingle);
          buttonSingle.appendChild(baSingle);
          baSingle.innerText = "INFO"
          baSingle.addEventListener("click", function () {
            let com = document.getElementById("cards");
            let map = document.getElementById("map");
            map.style.display = 'none'
            com.style.display = 'block'
            console.log(locationsEvents)
            if (locationsEvents == "locations") {
              singleCard(passDisplay)
            } else {
              eventCard(passDisplay);
            }
          });
          baSingle.appendChild(baSingles);
          buttons.appendChild(button1);
          button1.appendChild(ba1);
          ba1.href = "tel:" + passDisplay.phone;
          ba1.innerText = "CALL"
          ba1.appendChild(ba1s);
          buttons.appendChild(button2);
          button2.appendChild(ba2);
          ba2.innerText = "SHARE"
          ba2.appendChild(ba2s);
          buttons.appendChild(button3);
          button3.appendChild(ba3);
          ba3.addEventListener("click", callback);
          ba3.addEventListener("touchstart", callback);
          function callback(event) {
            ba3.removeEventListener("click", callback);
            ba3.removeEventListener("touchstart", callback);
            itinerarySet(item)
          };
          ba3.innerText = "ITINERARY"
          ba3.appendChild(ba3s);
        
          pin.classList.add("mapboxgl-popup");
          pinMain.classList.add("mapboxgl-popup-content");
          tip.classList.add("mapboxgl-popup-tip");
          bodyMain.classList.add("popup-card");
          popHead.classList.add("popup-card-head");
          popHeadImg.classList.add("popup-card-image");
          popBody.classList.add("popup-card-body");
          buttons.classList.add("popup-card-buttons");
          baSingles.classList.add("info");
          ba1s.classList.add("phone");
          ba2s.classList.add("share");
          ba3s.classList.add("addto");

          pop = new mapboxgl.Marker(pin)
          .setLngLat([passDisplay.longitude, passDisplay.latitude])
          .addTo(map);

        document.body.addEventListener('click', cleanPop, true);
        }

    const marker1 = new mapboxgl.Marker({ "color": "red" })
    .setLngLat(cordSet)
    .addTo(map);
    
    if (display.length === 1) {
      console.log("click")
      let item = display[0]
        if (item.city == "Wilmington") {
            colorHex = "#005ba8";
          } else if (item.city == "Carolina Beach") {
            colorHex = "#0097a9";
          } else if (item.city == "Kure Beach") {
            colorHex = "#51863a";
          } else if (item.city == "Wrightsville Beach") {
            colorHex = "#f98411";
          }

        new mapboxgl.Marker({ "color": colorHex })
        .setLngLat([item.longitude, item.latitude])
        .setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: true, offset: 0}).setHTML("<div class='pinSingle' id=" + item.listingid + "></div>"))
        .addTo(map)
        .togglePopup();

        map.flyTo({
          center: [item.longitude, item.latitude],
          essential: true // this animation is considered essential with respect to prefers-reduced-motion
       });

            const pin = document.getElementById(item.listingid);
            let popHead = document.createElement("div");
            let popHeadImg = document.createElement("div");
            let popImg = document.createElement("img");
            let title = document.createElement("h3");
            let popBody = document.createElement("div");
            let addyTop = document.createElement("p");
            let addyBottom = document.createElement("p");
            let buttons = document.createElement("ul");
            let buttonSingle = document.createElement("li");
            let baSingle = document.createElement("a");
            let baSingles = document.createElement("span");
            let button1 = document.createElement("li");
            let ba1 = document.createElement("a");
            let ba1s = document.createElement("span");
            let button2 = document.createElement("li");
            let ba2 = document.createElement("a");
            let ba2s = document.createElement("span");
            let button3 = document.createElement("li");
            let ba3 = document.createElement("a");
            let ba3s = document.createElement("span");

            pin.appendChild(popHead);
            popHead.appendChild(popHeadImg);
            if (item.listingmedia !== "") {
            popHeadImg.appendChild(popImg);
            popImg.src = item.listingmedia;
            }
            popHead.appendChild(title);
            title.innerText = item.company;
            pin.appendChild(popBody);
            popBody.appendChild(addyTop);
            addyTop.innerText = item.address1;
            popBody.appendChild(addyBottom);
            addyBottom.innerText = item.city + ", NC " + item.zip
            pin.appendChild(buttons);
            buttons.appendChild(buttonSingle);
            buttonSingle.appendChild(baSingle);
            baSingle.innerText = "INFO"
            baSingle.addEventListener("click", function () {
              let com = document.getElementById("cards");
              let map = document.getElementById("map");
              map.style.display = 'none'
              com.style.display = 'block'
              console.log(locationsEvents)
              if (locationsEvents == "locations") {
                singleCard(item)
              } else {
                eventCard(item);
              }
            });
            baSingle.appendChild(baSingles);
            buttons.appendChild(button1);
            button1.appendChild(ba1);
            ba1.href = "tel:" + item.phone;
            ba1.innerText = "CALL"
            ba1.appendChild(ba1s);
            buttons.appendChild(button2);
            button2.appendChild(ba2);
            ba2.innerText = "SHARE"
            ba2.appendChild(ba2s);
            buttons.appendChild(button3);
            button3.appendChild(ba3);
            ba3.addEventListener("click", callback);
            ba3.addEventListener("touchstart", callback);
            function callback() {
              ba3.removeEventListener("click", callback);
              ba3.removeEventListener("touchstart", callback);
              itinerarySet(item)
            };
            ba3.innerText = "ITINERARY"
            ba3.appendChild(ba3s);

            pin.classList.add("popup-card");
            popHead.classList.add("popup-card-head");
            popHeadImg.classList.add("popup-card-image");
            popBody.classList.add("popup-card-body");
            buttons.classList.add("popup-card-buttons");
            baSingles.classList.add("info");
            ba1s.classList.add("phone");
            ba2s.classList.add("share");
            ba3s.classList.add("addto");

    } else {
      //cordSet = [display.longitude, display.latitude]
        display.forEach((displayS) => {
            let passDisplay = displayS
            if (displayS.city == "Wilmington") {
                colorHex = "#005ba8";
              } else if (displayS.city == "Carolina Beach") {
                colorHex = "#0097a9";
              } else if (displayS.city == "Kure Beach") {
                colorHex = "#51863a";
              } else if (displayS.city == "Wrightsville Beach") {
                colorHex = "#f98411";
              }
            markers = new ClickableMarker({ "color": colorHex })
            .setLngLat([displayS.longitude, displayS.latitude])
            .onClick(() => {
              popDrop(passDisplay);
            })
            .addTo(map);
        });
    }


  goTop()
  buttonMake()
  subCatSort()
}