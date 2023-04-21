function dateSet() {
    date1 = document.getElementById("datePic1").value;
    let date2PullRaw = document.getElementById("datePic2").value;
    let date2Pull = new Date(date2PullRaw);
    console.log(date2PullRaw.getDate)

    function addOneDay(date2Pull) {
        date2Pull.setDate(date2Pull.getDate() + 1);
        return date2Pull;
      }

    date2 = addOneDay(date2Pull)
    matrix();
}

function picker() {
        const list = document.getElementById("cards");
    
        let popBox = document.createElement("div");
        let close = document.createElement("a");
        let closeP = document.createElement("p");
        let pickWrap = document.createElement("div");
        let pick1p = document.createElement("p");
        let pick1 = document.createElement("input");
        let pick2p = document.createElement("p");
        let pick2 = document.createElement("input");
        let dateButt = document.createElement("button");
        
        list.appendChild(popBox);
        popBox.appendChild(close);
        close.href = "#";
        close.addEventListener("click", function () {
            popBox.style.display = "none";
        });
        close.appendChild(closeP);
        closeP.innerText = "x";
        popBox.appendChild(pickWrap);
        pickWrap.appendChild(pick1p);
        pick1p.innerText = "Select start date";
        pickWrap.appendChild(pick1);
        pick1.type = "date";
        pick1.addEventListener("input", function () {
            date1 = document.getElementById("datePic1").value;
            document.getElementById("datePic2").value = date1;  
        })
        pickWrap.appendChild(pick2p);
        pick2p.innerText = "Select end date";
        pickWrap.appendChild(pick2);
        pick2.type = "date";
        pickWrap.appendChild(dateButt);
        dateButt.innerText = "Search";
        dateButt.addEventListener("click", function () {
            dateSet()
        });
    
        popBox.className = "dateListPop";
        popBox.style.display = "block";
        close.className = "closeX";
        pickWrap.className = "pickWrap";
        pick1.id = "datePic1";
        pick2.id = "datePic2";
}