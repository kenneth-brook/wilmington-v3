function keySearch() {
    const inputValue = document.getElementById("search");
    let val = inputValue.value.toLowerCase();
    searchInput = val;
    console.log(val)
    matrix();
}

function clearSearch() {
    searchInput = "";
    document.getElementById('search').value = "";
    matrix();
}