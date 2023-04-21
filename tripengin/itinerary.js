const localStorage = window.localStorage;
let currentDate = new Date();



function itinerarySet(item) {
    if (localStorage.getItem('itinerary') != null) {
        itin = JSON.parse(localStorage.getItem('itinerary'));
        if (itin.timeDate == null) {
            item.timeDate = currentDate;
        }
        itin.push(item);
        localStorage.setItem('itinerary', JSON.stringify(itin));
    } else {
        if (itin.timeDate == null) {
            item.timeDate = currentDate;
        }
        itin.push(item);
        localStorage.setItem('itinerary', JSON.stringify(itin));
    }
}

function editClickClose() {
    const itinEdit = document.getElementById("edit");
    itinEdit.innerHTML = "";
}

let breakSort = []

function timeFeed() {
    let itinSort = JSON.parse(localStorage.getItem('itinerary'));
        if (itinSort > 0) {
        breakSort = itinSort.map(obj => {
            return {...obj, timeDate: new Date(obj.timeDate)};
        });
    }
}

function dateSort() {
    itin = JSON.parse(localStorage.getItem('itinerary'));
    if (breakSort.length > 1) {
            let sortedActivities = breakSort.slice().sort((a, b) => b.timeDate - a.timeDate);
            localStorage.setItem('itinerary', JSON.stringify(sortedActivities));
    } else if(itin.length > 1) {
            let sortedActivities = itin.sort((a, b) => new Date(a.timeDate) - new Date(b.timeDate));
            localStorage.setItem('itinerary', JSON.stringify(sortedActivities));
    }
}

function editClick(item) {
    let listId = item.listingid;
    const itinEdit = document.getElementById("edit");
    let dataDrill = item.listingid;
    let editBox = document.createElement("div");
    let editBoxHead = document.createElement("h3");
    let dateWrap = document.createElement("div");
    let dateSubWrap = document.createElement("div");
    let date = document.createElement("input");
    let datep = document.createElement("p");
    let timeSubWrap = document.createElement("div");
    let time = document.createElement("input");
    let timep = document.createElement("p");
    let dateButtWrap = document.createElement("div");
    let subButt = document.createElement("button");
    let canButt = document.createElement("button");
    let delButt = document.createElement("button");
    
    itinEdit.appendChild(editBox);
    editBox.appendChild(editBoxHead);
    editBoxHead.innerHTML = "Set planned date and time<br> for this location";
    editBox.appendChild(dateWrap);
    dateWrap.appendChild(dateSubWrap);
    dateSubWrap.appendChild(datep);
    datep.innerText = "Enter planned arival date";
    dateSubWrap.appendChild(date);
    date.type = "date";
    dateWrap.appendChild(timeSubWrap);
    timeSubWrap.appendChild(timep);
    timep.innerText = "Enter planned visit time";
    timeSubWrap.appendChild(time);
    time.type = "time";
    editBox.appendChild(dateButtWrap);
    dateButtWrap.appendChild(delButt);
    delButt.innerText = "Remove";
    delButt.addEventListener("click", function (item) {
        let arr = JSON.parse(localStorage.getItem('itinerary'));

        const idxObj = arr.findIndex(object => {
            return object.listingid === listId;
          });

        arr.splice(idxObj, 1);
        localStorage.setItem('itinerary', JSON.stringify(arr));
        editClickClose();
        itineraryPost();
    });
    dateButtWrap.appendChild(canButt);
    canButt.innerText = "Cancel";
    canButt.addEventListener("click", function () {
        editClickClose();
    });
    dateButtWrap.appendChild(subButt);
    subButt.innerText = "Submit";
    subButt.addEventListener("click", function (item) {
        let tempItin = ""
        let tempObj = ""
        let indexPull = ""

        tempItin = JSON.parse(localStorage.getItem('itinerary'));
        
        function objectPull(tempItin) {
            return tempItin.listingid === dataDrill;
        }
        tempObj = tempItin.find(objectPull);

        let calc = document.getElementById("calc");

        let date = document.getElementById("date").value,
        time = document.getElementById("time").value

        tempObj.timeDate = new Date(date + " " + time);
        
        indexPull = tempItin.indexOf(dataDrill);
        if (indexPull !== -1) {
            tempItin[indexPull] = tempObj;
        }
        localStorage.setItem('itinerary', JSON.stringify(tempItin));
        editClickClose();
        timeFeed();
        dateSort();
        itineraryPost();
    });

    editBox.classList.add("editBox");
    dateWrap.classList.add("dateWrap");
    dateSubWrap.classList.add("subWrap")
    timeSubWrap.classList.add("subWrap")
    date.id = "date";
    time.id = "time";
    subButt.id = "calc";
    dateButtWrap.classList.add("dateButtWrap");
}
 
function itineraryPost() {
    wipe()
    document.getElementById("cap-block").style.display = "none";
    const ul = document.getElementById("cards");
    ul.className = ""
    timeFeed();
    dateSort();
    item = "";
    item = JSON.parse(localStorage.getItem('itinerary'));
    if (item != 0) {
    let itemA = item[0].timeDate;
    let itemAT = new Date(itemA);
    document.getElementById("body-toggle").className = "page-itinerary";
    document.getElementById("display").style.display = "block";
    document.getElementById("display-low").style.display = "block";
    document.getElementById("cards").style.display = "none";
    document.getElementById("home-menu").style.display = "none";
    document.getElementById("map").style.display = "none";
    const itin = document.getElementById("itin");
    itin.style.display = "block";
    itin.innerHTML = "";

    item.forEach((item) => {
        let itemB = item.timeDate;
        let itemBT = new Date(itemB);
        console.log(itemBT.getDate() + " " + itemAT.getDate())
        let onDay = itemBT.getDate() - itemAT.getDate();
        let onDayDisp = onDay + 1;
        let dt = new Date(item.timeDate);
        let sYear = dt.getFullYear().toString().slice(-2);
        let sMonth = ("0" + (dt.getMonth() + 1)).slice(-2);
        let sDay = String(dt.getDate()).padStart(2, '0');
        let sHour = "";
        let sDayNight = "";
        let rHour = String(dt.getHours()).padStart(2, '0');
        if (rHour > 12) {
            sHour = rHour - 12;
            sDayNight = "PM"
        } else {
            sHour = rHour;
            sDayNight = "AM"
        }
        let sMinutes = String(dt.getMinutes()).padStart(2, '0');

        let year = sYear;
        let month = sMonth;
        let daynum = sDay;
        let hour = sHour;
        let minute = sMinutes;
        let dayNight = sDayNight;

        let li = document.createElement("li");
        let itemWrap = document.createElement("div");
        let topWrap = document.createElement("div");
        let leftTop = document.createElement("div");
        let day = document.createElement("div");
        let dayDay = document.createElement("span");
        let dayNum = document.createElement("strong");
        let date = document.createElement("div");
        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        let rightTop = document.createElement("div");
        let icon = document.createElement("div");
        let name = document.createElement("h3");
        let p3 = document.createElement("p");
        let p4 = document.createElement("p");
        let edit = document.createElement("a");
        let bottomWrap = document.createElement("div");
        let leftBottom = document.createElement("div");
        let detail = document.createElement("a");
        let rightBottom = document.createElement("div");
        let itinButts = document.createElement("ul");
        let itinButt1 = document.createElement("li");
        let itinButt1a = document.createElement("a");
        let itinButt2 = document.createElement("li");
        let itinButt2a = document.createElement("a");
        let itinButt3 = document.createElement("li");
        let itinButt3a = document.createElement("a");
        let itinButt4 = document.createElement("li");
        let itinButt4a = document.createElement("a");

        itin.appendChild(li);
        li.appendChild(itemWrap);
        itemWrap.appendChild(topWrap);
        topWrap.appendChild(leftTop);
        leftTop.appendChild(day);
        day.appendChild(dayDay);
        dayDay.innerText = "Day";
        day.appendChild(dayNum);
        dayNum.innerText = onDayDisp;
        leftTop.appendChild(date);
        date.appendChild(p1);
        if (item.month != null) {
            month = item.month
        }
        if (item.day != null) {
            daynum = item.daynum
        }
        if (item.year != null) {
            year = item.year
        }
        p1.innerText = month + "/"+ daynum +"/"+ year;
        date.appendChild(p2);
        p2.innerText = hour + ":" + minute + " " + dayNight;
        topWrap.appendChild(rightTop);
        rightTop.appendChild(icon);
        rightTop.appendChild(name);
        name.innerText = item.company;
        rightTop.appendChild(p3);
        p3.innerText = item.address1;
        rightTop.appendChild(p4);
        p4.innerText = item.city + "," + " NC " + item.zip;
        rightTop.appendChild(edit);
        edit.onclick = function () {
            editClick(item);
        };
        edit.innerText = "Edit";
        itemWrap.appendChild(bottomWrap);
        bottomWrap.appendChild(leftBottom);
        leftBottom.appendChild(detail);
        detail.innerText = "Detail";
        detail.onclick = function () {
            singleCard(item)
        };
        bottomWrap.appendChild(rightBottom);
        rightBottom.appendChild(itinButts);
        itinButts.appendChild(itinButt1);
        itinButt1.appendChild(itinButt1a);
        itinButt1a.href = "#";
        itinButt1a.innerText = "Share";
        if (item.phone != "") {
            itinButts.appendChild(itinButt2);
            itinButt2.appendChild(itinButt2a);
            itinButt2a.href = "tel:" + item.phone;
            itinButt2a.innerText = "Call";
            itinButt2a.classList.add("call");
        }
        if (item.website != "") {
            itinButts.appendChild(itinButt3);
            itinButt3.appendChild(itinButt3a);
            itinButt3a.href = item.website;
            itinButt3a.target = "_blank";
            itinButt3a.innerText = "Web";
            itinButt3a.classList.add("web");
        }
        itinButts.appendChild(itinButt4);
        itinButt4.appendChild(itinButt4a);
        itinButt4a.onclick = function () {
            mapSingle = 1
            itinMapSingle(item);
        }
        itinButt4a.innerText = "Map";

        li.classList.add("itinerary-item");
        itemWrap.classList.add("itinerary");
        itemWrap.classList.add("border-bottom");
        topWrap.classList.add("row");
        leftTop.classList.add("col-left");
        day.classList.add("day");
        date.classList.add("date");
        p1.classList.add("pset");
        p2.classList.add("pset");
        rightTop.classList.add("col-right");
        icon.classList.add("icon");
        if (item.categoryname == "Places to Stay") {
            icon.classList.add("stay");
        } else if (item.categoryname == "Things to Do") {
            icon.classList.add("play");
        } else if (item.categoryname == "Restaurants") {
            icon.classList.add("dine");
        } else if (item.categoryname == "Shopping") {
            icon.classList.add("shop");
        } else if (item.categoryname == null) {
            icon.classList.add("events");
        }
        name.classList.add("name");
        p3.classList.add("pset2");
        p4.classList.add("pset2");
        edit.classList.add("edit-button");
        bottomWrap.classList.add("row");
        leftBottom.classList.add("col-left");
        detail.classList.add("detail-button");
        rightBottom.classList.add("col-right");
        itinButts.classList.add("itinerary-buttons");
        itinButt1a.classList.add("share");
        itinButt4a.classList.add("map");
    })
} else {
    document.getElementById("body-toggle").className = "page-itinerary";
    document.getElementById("display").style.display = "block";
    document.getElementById("display-low").style.display = "block";
    document.getElementById("cards").style.display = "none";
    document.getElementById("home-menu").style.display = "none";
    document.getElementById("map").style.display = "none";
    const itin = document.getElementById("itin");
    itin.style.display = "block";
    itin.innerHTML = "";

    let li = document.createElement("li");
    let itemWrap = document.createElement("div");
    let noItin = document.createElement("p");

    itin.appendChild(li);
    li.appendChild(itemWrap);
    itemWrap.appendChild(noItin);
    noItin.innerText = "Nothing has been added to your itinerary.";
    noItin.style.textAlign = "center";
}
dateSort();
goTop();
}