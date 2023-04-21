function render() {
    document.getElementById("display").style.display = "block";
    document.getElementById("cards").style.display = "flex";
    document.getElementById("cards").className = "AtoZ"
    document.getElementById("display-low").style.display = "block";
    document.getElementById("cap-block").style.display = "flex";

    if (display.length === 0) {
        const list = document.getElementById("cards");

        let li = document.createElement("li");

        list.appendChild(li);
        li.innerText = "Sorry no results were found"
    } else {

    if (locationsEvents === "locations") {
        capBlock();
    const list = document.getElementById("cards");
    display.forEach((item) => {
        let li = document.createElement("li");
        let listing = document.createElement("div");
        let listingTitle = document.createElement("h3");
        let listingBody = document.createElement("div");
        let listingBodyP = document.createElement("p");
        let listingFooter = document.createElement("div");
        let googleReview = document.createElement("div");
        let stars = document.createElement("div");
        let googleText = document.createElement("div");
        let button = document.createElement("a");

        list.appendChild(li);
        li.appendChild(listing);
        listing.appendChild(listingTitle);
        listingTitle.innerText = item.company;
        listing.appendChild(listingBody);
        listingBody.appendChild(listingBodyP);
        listingBodyP.innerHTML = truncate(item.descr, 100,);
        listing.appendChild(listingFooter);
        listingFooter.appendChild(googleReview);
        googleReview.appendChild(stars);
        googleReview.appendChild(googleText);
        listingFooter.appendChild(button);
        button.innerText = "more";
        button.addEventListener("click", more);
        button.addEventListener("touchstart", more);
        function more() {
            button.removeEventListener("click", more);
            button.removeEventListener("touchstart", more);
            singleCard(item)
            console.log("MORE")
        };
        

        li.classList.add("listing-item");
        listing.classList.add("listing");
        listingTitle.classList.add("listing-title");
        listingBody.classList.add("listing-body");
        listingBody.classList.add("border-top");
        listingFooter.classList.add("listing-footer");
        listingFooter.classList.add("border-top");
        googleReview.classList.add("google-review");
        googleReview.classList.add("loaded");
        stars.classList.add("stars");
        googleText.classList.add("text");
        button.classList.add("button");
    })

} else if (locationsEvents === "events") {
    capBlock();
    const list = document.getElementById("cards");
    display.forEach((item) => {
        let li = document.createElement("li");
        let listing = document.createElement("div");
        let listingTitle = document.createElement("h3");
        let eventData = document.createElement("ul");
        let eDate = document.createElement("li");
        let dateLink = document.createElement("a")
        let eLoc = document.createElement("li");
        let listingBody = document.createElement("div");
        let listingBodyP = document.createElement("p");
        let listingFooter = document.createElement("div");
        let button = document.createElement("a");

        let day = new Date(item.datea[0]).getDate();
        let month = new Date(item.datea[0]).getMonth()+1;
        let year = new Date(item.datea[0]).getFullYear();

        let theDate = `${month}/${day}/${year}`;

        list.appendChild(li);
        li.appendChild(listing);
        listing.appendChild(listingTitle);
        listingTitle.innerText = item.company;
        listing.appendChild(eventData);
        eventData.appendChild(eDate);
        eDate.innerHTML = "Date: " + `${theDate}` + '&nbsp';
        if (item.datea.length > 1) {
            eDate.appendChild(dateLink);
            dateLink.href = "#";
            dateLink.innerText = " - More Dates";
            dateLink.addEventListener("click", function () {
                dateList(item);
            });
        }
        eventData.appendChild(eLoc);
        eLoc.innerHTML = item.loc;
        listing.appendChild(listingBody);
        listingBody.appendChild(listingBodyP);
        listingBodyP.innerHTML = truncate(item.descr, 100, );
        listing.appendChild(listingFooter);
        listingFooter.appendChild(button);
        button.innerText = ("more");
        button.addEventListener("click", function () {
            eventCard(item)
        });

        li.classList.add("listing-item");
        listing.classList.add("listing");
        listingTitle.classList.add("listing-title");
        eventData.classList.add("event-datas");
        eventData.classList.add("border-top");
        eDate.classList.add("event-date");
        eLoc.classList.add("event-location");
        listingBody.classList.add("listing-body");
        listingBody.classList.add("border-top");
        listingFooter.classList.add("listing-footer");
        listingFooter.classList.add("border-top");
        button.classList.add("button");
    })
}
}

    goTop()
    buttonMake()
    subCatSort()
}