function cardSpawn(results){

    function truncate( str, n, useWordBoundary ){
        if (str.length <= n) { return str; }
        const subString = str.slice(0, n-1);
        return (useWordBoundary 
          ? subString.slice(0, subString.lastIndexOf(" ")) 
          : subString) + ' [...]';
      };

    let card = document.getElementById("listing-list");

    results.forEach((item) => {
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
        

        card.appendChild(li);
        li.appendChild(listing);
        listing.appendChild(listingTitle);
        listingTitle.innerText = item.company;
        listing.appendChild(listingBody);
        listingBody.appendChild(listingBodyP);
        listingBodyP.innerHTML = truncate(item.descr, 100,);
        var textS = listingBodyP.textContent || listingBodyP.innerText || "";
        document.write(textS)
        listing.appendChild(listingFooter);
        listingFooter.appendChild(googleReview);
        googleReview.appendChild(stars);
        googleReview.appendChild(googleText);
        listingFooter.appendChild(button);
        button.innerText = ("more");



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
    });
}