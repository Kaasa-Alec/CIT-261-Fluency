/*Timezone for clock IF statement.  
  If empty, displays time as normal.  
  If not, displays time in time zone. */
var zone = "";
    
// Print minute/hour lines
function timeLines() {
      
  var lines = document.getElementsByClassName('lines'),
  clockEdge = document.getElementsByClassName('clock')[0];

  for (var i = 1; i < 60; i++) {
    clockEdge.innerHTML += "<div class='lines'></div>";
    lines[i].style.transform = "rotate(" + 6 * i + "deg)";
  }
}

// Run the current time zone's clock
function clock(){

  // Local time.  Changes for timezone if not empty.
  if (zone == "") {

    // Time element grabbers
    var t = new Date(),
    h = t.getHours(),
    m = t.getMinutes(),
    s = t.getSeconds();
    
    displayTime(h, m, s);

  } else {

    switch(zone) {
      case "local":
        break;
      case "eastern":
        var timeZone = "America/New_York";
        getTimeZone(timeZone);
        break;
      case "central":
        var timeZone = "America/Chicago";
        getTimeZone(timeZone);
        break;
      case "mt":
        var timeZone = "America/Denver";
        getTimeZone(timeZone);
        break;
      case "pdt":
        var timeZone = "America/Los_Angeles";
        getTimeZone(timeZone);
        break;
      case "adt":
        var timeZone = "America/Anchorage";
        getTimeZone(timeZone);
        break;
      case "hast":
        var timeZone = "Pacific/Honolulu";
        getTimeZone(timeZone);
        break;
    }
  }
}

/*When you tap the button to change the time zone, sets the
zone variable so the clock() IF statement triggers.*/
function changeTimeZone(timeZone) {

  var timeZone = document.getElementById("timeZones").value;

  switch(timeZone) {
    case "local":
      zone = "";
      break;
    case "eastern":
      zone = "eastern";
      break;
    case "central":
      zone = "central";  
      break;
    case "mt":
      zone = "mt";  
      break;
    case "pdt":
      zone = "pdt";  
      break;
    case "adt":
      zone = "adt";  
      break;
    case "hast":
      zone = "hast";  
      break;
    default:
      zone = "";
      document.getElementById("timeZones").innerHTML = "Local Time";
  }
}

// Retrieve timestamp and call a new clock
function getTimeZone(zone) {

  var req = new XMLHttpRequest();

  req.open('GET', 'https://api.timezonedb.com/v2.1/get-time-zone?key=FQASQV7RU9MQ&format=json&by=zone&zone=' + zone, true);
            
  req.onload = function () {
    var data = JSON.parse(req.responseText),
    time = data.timestamp;
    newClock(time);
  };
  req.send(null);
}

// New Clock for a different time zone
function newClock(timestamp) {

  var t = new Date(timestamp*1000);   // Grab time from timestamp
  var h = t.getHours() + 7,      // Grab Hours
  m = t.getMinutes(),                 // Grab Minutes
  s = t.getSeconds();                 // Grab Seconds

  displayTime(h, m, s);
}

// Display analog and digital time
function displayTime(h, m, s) {
  // Analog
  var hAngle = h * 30 + m * (360/720), // Hour hand angle
  mAngle = m * 6 + s * (360/3600),     // Minute hand angle
  sAngle = s * 6;                      // Second hand angle

  var hHand = document.querySelector('.hour'),  // Hour hand grabber
  mHand = document.querySelector('.minute'),    // Minute hand grabber
  sHand = document.querySelector('.second');    // Second hand grabber

  // Angle rotation
  hHand.style.transform = "rotate(" + hAngle + "deg)";
  mHand.style.transform = "rotate(" + mAngle + "deg)";
  sHand.style.transform = "rotate(" + sAngle + "deg)";

  // Digital
  if (h >= 24) { h -= 24; }
  var hFixed = ((h + 11) % 12) + 1; 
  var session = h > 11 ? "PM" : "AM";
  if (m < 10) { m = "0" + m; }
  if (s < 10) { s = "0" + s; }
  var digitalTime = hFixed + ':' + m + ':' + s + " " + session;
  document.getElementById("digital").innerText = digitalTime;
  document.getElementById("digital").textContent = digitalTime;
}

timeLines();
setInterval(clock, 1000);