const popupEl = document.getElementById("popup");
const popupBttn = document.getElementById("popupTrigger");

popupBttn.addEventListener("click", () => {
    setTimeout(() => {
        if (!popupEl.classList.contains("show")) {
            popupEl.classList.add("show");
        } else {
            popupEl.classList.remove("show");
        }
    }, 250);
});

document.querySelectorAll('.page-home').forEach(item => {
    item.addEventListener('click', event => {
        if (popupEl.classList.contains("show")) {
            popupEl.classList.remove("show");
        }
    })
});


const popupEl2 = document.getElementById("popup2");
const popupBttn2 = document.getElementById("popupTrigger2");

popupBttn2.addEventListener("click", () => {
    setTimeout(() => {
        if (!popupEl2.classList.contains("show")) {
            popupEl2.classList.add("show");
        } else {
            popupEl2.classList.remove("show");
        }
    }, 250);
});

document.querySelectorAll('.page-home').forEach(item => {
    item.addEventListener('click', event => {
        if (popupEl2.classList.contains("show")) {
            popupEl2.classList.remove("show");
        }
    })
});

const popupEl3 = document.getElementById("popup3");
const popupBttn3 = document.getElementById("popupTrigger3");

popupBttn3.addEventListener("click", () => {
    setTimeout(() => {
        if (!popupEl3.classList.contains("show")) {
            popupEl3.classList.add("show");
        } else {
            popupEl3.classList.remove("show");
        }
    }, 250);
});

document.querySelectorAll('.page-home').forEach(item => {
    item.addEventListener('click', event => {
        if (popupEl3.classList.contains("show")) {
            popupEl3.classList.remove("show");
        }
    })
});