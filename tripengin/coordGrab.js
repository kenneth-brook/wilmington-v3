let lat = "";
let long = "";

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
  


function success(pos) {
    const crd = pos.coords;
    lat = parseFloat(crd.latitude);
    long = parseFloat(crd.longitude);
}
  
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
  
navigator.geolocation.getCurrentPosition(success, error, options);