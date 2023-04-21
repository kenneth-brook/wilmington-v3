function dateList(item) {
    let dates = item.datea

    const list = document.getElementById("cards");

    let popBox = document.createElement("div");
    let close = document.createElement("a");
    let closeP = document.createElement("p");
    let dateCont = document.createElement("ul");
    
    list.appendChild(popBox);
    popBox.appendChild(close);
    popBox.appendChild(dateCont);
    
    close.href = "#"
    close.addEventListener("click", function () {
        popBox.style.display = "none";
    });
    close.appendChild(closeP);
    closeP.innerText = "x"
    dates.forEach((date) => {
        let i = 0
        let classN = "li" + i;
        //let dateClean = date.toLocaleDateString();

        let day = new Date(date).getDate();
        let month = new Date(date).getMonth()+1;
        let year = new Date(date).getFullYear();

        let theDate = `${month}/${day}/${year}`;

        let dateContI = document.createElement("li");
        dateCont.appendChild(dateContI);
        dateContI.innerText = theDate;
        dateContI.className = classN;
        i++
    });

    popBox.className = "dateListPop";
    popBox.style.display = "block";
    close.className = "closeX";
    dateCont.className = "dateHolder";
}