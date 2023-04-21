function singleCard(item) {
    let dataPass = item
    wipe()
    const bod = document.getElementById("body-toggle");

    document.getElementById("cap-block").style.display = "none";

    const list = document.getElementById("cards");
    list.style.display = "flex";

    let bb = document.createElement("div");

    let li = document.createElement("li");
    let listing = document.createElement("div");
    let imgdiv = document.createElement("div");
    let pic = document.createElement("img");
    let listingBody = document.createElement("div");
    let title = document.createElement("h3");
    let linediv = document.createElement("div");
    let addy = document.createElement("ul");
    let l1 = document.createElement("li");
    let l2 = document.createElement("li");
    let l3 = document.createElement("li");
    let listingpara = document.createElement("div");
    let para = document.createElement("p");
    let listingButtons = document.createElement("div");
    let buttleft = document.createElement("ul");
    let butleftbutt = document.createElement("li");
    let buttleftbutta= document.createElement("a");
    let buttright = document.createElement("ul");
    let buttell = document.createElement("li");
    let buttella = document.createElement("a");
    let telspan = document.createElement("span");
    let butmap = document.createElement("li");
    let butmapa = document.createElement("a");
    let mapspan = document.createElement("span");
    let footerWrap = document.createElement("div");
    let google = document.createElement("div");
    let stars = document.createElement("div");
    let starText = document.createElement("div");
    let bottom = document.createElement("div");
    let bottomButtons = document.createElement("ul");
    let b1 = document.createElement("li");
    let b1a = document.createElement("a");
    let b1span = document.createElement("span");
    let b2 = document.createElement("li");
    let b2a = document.createElement("a");
    let b2span = document.createElement("span");
    let b3 = document.createElement("li");
    let b3a = document.createElement("a");
    let b3span = document.createElement("span");
    

    
    list.appendChild(bb);
    bb.innerHTML= "<p>< BACK</p>"
    list.appendChild(li);
    li.appendChild(listing);
    listing.appendChild(imgdiv);
    imgdiv.appendChild(pic);
    pic.src = item.listingmedia;
    listing.appendChild(listingBody);
    listingBody.appendChild(title);
    title.innerText = item.company;
    listingBody.appendChild(linediv);
    listingBody.appendChild(addy);
    addy.appendChild(l1);
    addy.appendChild(l2);
    addy.appendChild(l3);
    l1.innerText = item.address1;
    l2.innerText = item.city;
    l3.innerText = "NC, "+item.zip;
    listingBody.appendChild(listingpara);
    listingpara.appendChild(para);
    para.innerHTML = item.descr;
    listingBody.appendChild(listingButtons);
    listingButtons.appendChild(buttleft);
    buttleft.appendChild(butleftbutt);
    butleftbutt.appendChild(buttleftbutta);
    buttleftbutta.innerText = "Website";
    buttleftbutta.href = item.website;
    buttleftbutta.target = "_blank";
    listingButtons.appendChild(buttright);
    buttright.appendChild(buttell);
    buttell.appendChild(buttella);
    buttella.href = "tel:"+ item.phone;
    buttella.appendChild(telspan);
    telspan.innerText = item.phone;
    buttright.appendChild(butmap);
    butmap.appendChild(butmapa);
    butmapa.href = `https://www.google.com/maps?q=${item.latitude},${item.longitude}`
    butmapa.target = "_blank"
    butmapa.appendChild(mapspan);
    mapspan.innerText = "Get Directions";
    listingBody.appendChild(footerWrap);
    footerWrap.appendChild(google);
    google.appendChild(stars);
    google.appendChild(starText);
    starText.innerText = " Google review";
    listing.appendChild(bottom);
    bottom.appendChild(bottomButtons);
    //bottomButtons.appendChild(b1);
    //b1.appendChild(b1a);
    //b1a.appendChild(b1span);
    //b1span.innerText = "Share";
    bottomButtons.appendChild(b2);
    b2.appendChild(b2a);
    b2a.appendChild(b2span);
    b2span.innerText = "Map";
    b2a.addEventListener("click", clickback);
    b2a.addEventListener("touchstart", clickback);
    function clickback() {
      itemSingle = item;
      b2a.removeEventListener("click", clickback);
      b2a.removeEventListener("touchstart", clickback);
      itinMapSingle();
    };
    bottomButtons.appendChild(b3);
    b3.appendChild(b3a);
    b3a.appendChild(b3span);
    b3span.innerText = "Add to Itinerary";
    b3a.addEventListener("click", callback);
    b3a.addEventListener("touchstart", callback);
    function callback() {
      let item = dataPass
      console.log(item)
      b3a.removeEventListener("click", callback);
      b3a.removeEventListener("touchstart", callback);
      itinerarySet(item)
    };

    bb.addEventListener("click", function () {
      matrix();
  });
    bb.className = "bb"
    listing.classList.add("listing-detail");
    imgdiv.classList.add("listing-image");
    listingBody.classList.add("listing");
    title.classList.add("listing-title");
    linediv.classList.add("listing-content");
    linediv.classList.add("border-top");
    addy.classList.add("listing-highlight");
    addy.classList.add("mb-0");
    listingpara.classList.add("listing-body");
    listingButtons.classList.add("listing-buttons");
    telspan.classList.add("phone");
    mapspan.classList.add("map");
    footerWrap.classList.add("listing-footer");
    footerWrap.classList.add("border-top");
    google.classList.add("google-review");
    google.classList.add("loaded");
    stars.classList.add("stars");
    starText.classList.add("text");
    bottom.classList.add("listing-bottom");
    bottomButtons.classList.add("buttons");
    b1span.classList.add("share");
    b2span.classList.add("map");
    b3span.classList.add("addto");

  let imgUrl = item.listingmedia;
  checkImgExists(imgUrl, successOnImgExits, failureOnImgExits);

  function successOnImgExits(){
	  console.log("Good")
  }

  function failureOnImgExits(){
	  imgdiv.style.display = "none";
  }

  if (item.website === "") {
    buttleft.style.display = "none";
  }
  goTop()
}