let subDisplay = [];

function matrix() {
    wipe()
    if (locationsEvents === "locations") {
        display = locationPool;
    } else if (locationsEvents === "events") {
        display = eventPool;
    }

    if (city != "all") {
        let subSort = [];
        for (i in display) {
            if (display[i].city == city) {
                subSort.push(display[i]);
            }
        }
        display = subSort;
    }

    if (catagory != "all") {
        let subSort = [];
        for (i in display) {
            if (display[i].categoryname == catagory) {
                subSort.push(display[i]);
            }
        }
        display = subSort;
    }

    if (subCatagory != "all") {
        let subSort = [];
        for (i in display) {
            if (display[i].subcategoryname == subCatagory) {
                subSort.push(display[i]);
            }
        }
        display = subSort;
    }

    if (searchInput != "") {
        let subSort = display.filter(function(o) {
            return Object.keys(o).some(function(k) {
                return o[k].toString().toLowerCase().indexOf(searchInput) != -1;
            })
        })
        
        display = subSort;
    }

    if (date1 != "empty") {
        let rList = [];
        let unpack = [];
        display.forEach((sort) => {
            unpack = sort
            let repack = [];
            sort.datea.forEach((date) => {
                let pDate = [date]
                pDate.forEach((dateData) => {
                    if (new Date(dateData) >= new Date(date1) && new Date(dateData) <= new Date(date2)) {
                        repack.push(new Date(dateData));
                    }
                });
                //if (unpack.datea.length >= 1) {
                    unpack.datea = repack
                //}
            });
            if (unpack.datea.length >= 1) {
                rList.push(unpack)
            }
        })
        subDisplay = rList;
    
    display = subDisplay.sort((a, b) => {return a.datea[0] - b.datea[0]});
    
    }

    if (listMap == "list") {
        document.getElementById("near").style.display = "none"
        render();
    } else if (listMap == "map") {
        if (mapOne == "on") {
            display = [itemSingle];
            listMap = "list";
        }
        mapOne = "off";
        document.getElementById("near").style.display = "block"
        mapSpawn();
    }
}