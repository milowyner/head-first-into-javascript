var options = {enableHighAccuracy: true, timeout: 100, maximumAge: 0};
window.onload = getMyLocation;
function getMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      displayLocation,
      displayError,
      options);
  } else {
    alert("Oops, no geolocation support");
  }
}
function displayError(error) {
  var errorTypes = {
    0: "Unknown error",
    1: "Permission denied by user",
    2: "Position is not available",
    3: "Request timed out"
  };
  var errorMessage = errorTypes[error.code];
  if (error.code == 0 || error.code == 2) {
    errorMessage = errorMessage + " " + error.message;
  }
  var div = document.getElementById("location");
  div.innerHTML = errorMessage;
  options.timeout += 100;
  navigator.geolocation.getCurrentPosition(
    displayLocation,
    displayError,
    options);
  div.innerHTML += " ... checking again with timeout=" + options.timeout;
}
function displayLocation(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var div = document.getElementById("location");
  div.innerHTML = "You are at a Latitude: " + latitude + ", Longitude: " + longitude;
  div.innerHTML += " (found in " + options.timeout + "milliseconds)";
}
