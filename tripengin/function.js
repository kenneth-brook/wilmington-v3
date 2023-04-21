function buttonMake() {
    const togBut = document.getElementById("togBut");

    togBut.innerHTML = ""

    let toga = document.createElement("a");
    let togspan = document.createElement("span");

    togBut.appendChild(toga)
    toga.appendChild(togspan);
    toga.href = "#"

    togspan.classList.add("maps")

    if (listMap == "list") {
        toga.onclick = function () {
            map()
        }
        togspan.innerText = "Map";
    } else {
        toga.onclick = function () {
            list()
        }
        togspan.innerText = "List";
    }
}

function goTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function order() {
    const flip = document.getElementById("cards");
    if (flip.className == "AtoZ") {
        flip.className = "ZtoA"
    } else {
        flip.className = "AtoZ"
    }
}

function truncate(str, n, useWordBoundary) {
    if (str.length <= n) {
        return str;
    }
    const subString = str.slice(0, n - 1);
    return (useWordBoundary ?
        subString.slice(0, subString.lastIndexOf(" ")) :
        subString) + ' [...]';
}

// GOOGLE REVIEW
function _gplaceReviewUpdate($el, stars) {
    $('.stars', $el).attr({ 'data-val': stars });
    $('.text strong', $el).text(stars);
    $el.addClass('loaded');
}

function _gplaceReview($el, _datas = {}) {
    var _key = 'gplace_' + _datas.id;
    var stars;
    if (sessionStorage.getItem(_key)) {
        stars = sessionStorage.getItem(_key);
    }

    if (undefined === stars) {
        $.ajax({
            url: '_gplace.php',
            dataType: 'json',
            data: _datas,
            success: function (response) {
                if (response.stars) {
                    sessionStorage.setItem(_key, response.stars);
                    sessionStorage.removeItem(_key + '_req');
                } else {
                    var try_req = sessionStorage.getItem(_key + '_req');
                    sessionStorage.setItem(_key + '_req', (try_req ? Math.round(try_req) + 1 : 1));
                    if (try_req && Math.round(try_req) > 3) {
                        sessionStorage.removeItem(_key + '_req');
                        sessionStorage.setItem(_key, response.stars);
                    }
                }
                _gplaceReviewUpdate($el, response.stars);
            }
        });
    } else {
        _gplaceReviewUpdate($el, stars);
    }
}

function checkImgExists (url, success, failure) {
	let errors = {};
    let img = new Image(),
        loaded = false,
        errored = false;

    img.onload = function () {
      if (loaded) {
        return;
      }

      loaded = true;

      if (success && success.call) {
        success.call(img);
      }
    };

    img.onerror = function () {
      if (errored) {
        return;
      }

      errors[url] = errored = true;

      if (failure && failure.call) {
        failure.call(img);
      }
    };

    if (errors[url]) {
      img.onerror.call(img);
      return;
    }
    
    img.src = url;

    if (img.complete) {
      img.onload.call(img);
    }
}