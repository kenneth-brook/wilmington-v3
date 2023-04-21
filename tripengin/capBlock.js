function capBlock() {
    const bod = document.getElementById("body-toggle");

    if (city == "Carolina Beach") {
        bod.className = "page-listings town-carolina-beach";
    } else if (city == "Kure Beach") {
        bod.className = "page-listings town-kure-beach";
    } else if (city == "Wrightsville Beach") {
        bod.className = "page-listings town-wrightsville-beach";
    } else if (city == "Wilmington") {
        bod.className = "page-listings Wilmington";
    } else {
        bod.className = "page-listings";
    }

    const icoSet = document.getElementById("ico");
    const icoSetText = document.getElementById("ico-text");

    if (locationsEvents == "events" && city == "Carolina Beach") {
        icoSet.className = "caption-icon events";
        icoSetText.innerText = ("Events (Carolina Beach)");
    } else if (locationsEvents == "events" && city == "Kure Beach") {
        icoSet.className = "caption-icon events";
        icoSetText.innerText = ("Events (Kure Beach)");
    } else if (locationsEvents == "events" && city == "Wrightsville Beach") {
        icoSet.className = "caption-icon events";
        icoSetText.innerText = ("Events (Wrightsville Beach)");
    } else if (catagory == "Places to Stay" && city == "Carolina Beach") {
        icoSet.className = "caption-icon stay";
        icoSetText.innerText = ("Stay (Carolina Beach)");
    } else if (catagory == "Places to Stay" && city == "Kure Beach") {
        icoSet.className = "caption-icon stay";
        icoSetText.innerText = ("Stay (Kure Beach)");
    } else if (catagory == "Places to Stay" && city == "Wrightsville Beach") {
        icoSet.className = "caption-icon stay";
        icoSetText.innerText = ("Stay (Wrightsville Beach)");
    } else if (catagory == "Things to Do" && city == "Carolina Beach") {
        icoSet.className = "caption-icon play";
        icoSetText.innerText = ("Play (Carolina Beach)");
    } else if (catagory == "Things to Do" && city == "Kure Beach") {
        icoSet.className = "caption-icon play";
        icoSetText.innerText = ("Play (Kure Beach)");
    } else if (catagory == "Things to Do" && city == "Wrightsville Beach") {
        icoSet.className = "caption-icon play";
        icoSetText.innerText = ("Play (Wrightsville Beach)");
    } else if (catagory == "Restaurants" && city == "Carolina Beach") {
        icoSet.className = "caption-icon dine";
        icoSetText.innerText = ("Dine (Carolina Beach)");
    } else if (catagory == "Restaurants" && city == "Kure Beach") {
        icoSet.className = "caption-icon dine";
        icoSetText.innerText = ("Dine (Kure Beach)");
    } else if (catagory == "Restaurants" && city == "Wrightsville Beach") {
        icoSet.className = "caption-icon dine";
        icoSetText.innerText = ("Dine (Wrightsville Beach)");
    } else if (catagory == "Shopping" && city == "Carolina Beach") {
        icoSet.className = "caption-icon shop";
        icoSetText.innerText = ("Shop (Carolina Beach)");
    } else if (catagory == "Shopping" && city == "Kure Beach") {
        icoSet.className = "caption-icon shop";
        icoSetText.innerText = ("Shop (Kure Beach)");
    } else if (catagory == "Shopping" && city == "Wrightsville Beach") {
        icoSet.className = "caption-icon shop";
        icoSetText.innerText = ("Shop (Wrightsville Beach)");
    } else if (catagory === "all" && city == "Carolina Beach") {
        icoSetText.innerText = ("Carolina Beach");
    } else if (catagory === "all" && city == "Kure Beach") {
        icoSetText.innerText = ("Kure Beach");
    } else if (catagory === "all" && city == "Wrightsville Beach") {
        icoSetText.innerText = ("Wrightsville Beach");
    } else if (catagory == "Places to Stay" && city == "all") {
        icoSet.className = "caption-icon stay";
        icoSetText.innerText = ("Stay");
    } else if (catagory == "Things to Do" && city == "all") {
        icoSet.className = "caption-icon play";
        icoSetText.innerText = ("Play");
    } else if (catagory == "Restaurants" && city == "all") {
        icoSet.className = "caption-icon dine";
        icoSetText.innerText = ("Dine");
    } else if (catagory == "Shopping" && city == "all") {
        icoSet.className = "caption-icon shop";
        icoSetText.innerText = ("Shop");
    } else if (catagory == "all" && city == "all") {
        icoSet.className = "caption-icon";
        icoSetText.innerText = "All";
    }

    const stay = document.getElementById("stay");
    const play = document.getElementById("play");
    const dine = document.getElementById("dine");
    const shop = document.getElementById("shop");
    const event = document.getElementById("event");

    stay.classList.remove("current");
    play.classList.remove("current");
    dine.classList.remove("current");
    shop.classList.remove("current");
    event.classList.remove("current");

    if (catagory == "Places to Stay") {
        stay.classList.add("current")
    } else if (catagory == "Things to Do") {
        play.classList.add("current")
    } else if (catagory == "Restaurants") {
        dine.classList.add("current")
    } else if (catagory == "Shopping") {
        shop.classList.add("current")
    } else if (locationsEvents == "events") {
        event.classList.add("current")
    }
}