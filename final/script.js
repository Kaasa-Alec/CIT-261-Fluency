// Timezone for clock IF statement.  If empty, displays time as normal.  If not, displays time in time zone.
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

// Analog Clock
function clock(){

  // Local time.  Changes for timezone if not empty.
  if (zone == "") {

    // Time element grabbers
    var date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    session = "AM";

    // Hand angles
    var hAngle = h * 30 + m * (360/720),
    mAngle = m * 6 + s * (360/3600),
    sAngle = s * 6;

    // Hand grabbers
    var hHand = document.querySelector('.hour'),
    mHand = document.querySelector('.minute'),
    sHand = document.querySelector('.second');

    // Angle rotation
    hHand.style.transform = "rotate(" + hAngle + "deg)";
    mHand.style.transform = "rotate(" + mAngle + "deg)";
    sHand.style.transform = "rotate(" + sAngle + "deg)";

    // Digital Clock
    // Session Setter
    if (h >= 12) {
      session = "PM";
    }

    // Standard Time Setter (instead of Military Time)
    if (h == 0) {
      h = 12;
      } else if (h > 12) {
        h -= 12;
    }

    // If minute/second is single digits, precede with 0
    if (m < 10) {
      m = "0" + m;
    }

    if (s < 10) {
      s = "0" + s;
    }

    // Assemble and Display Digital Time
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("digital").innerText = time;
    document.getElementById("digital").textContent = time;

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

// New Clock for a different time zone
function newClock(timestamp, offset) {

  // Format time
  var time = new Date(timestamp*1000);
  // Hours part from the timestamp
  var h = time.getHours() + offset;

  if (h >= 24) {
    h -= 24;
  }

  var hFixed = ((h + 11) % 12) + 1,
  session = h > 11 ? "PM" : "AM",
  m = "0" + time.getMinutes(),
  s = "0" + time.getSeconds();

  // Display Digital Time
  var digitalTime = hFixed + ':' + m.substr(-2) + ':' + s.substr(-2) + " " + session;

  document.getElementById("digital").innerText = digitalTime;
  document.getElementById("digital").textContent = digitalTime;

  // Display Analog Time
  // Hand angles
  var hAngle = hFixed * 30 + m * (360/720);
  var mAngle = m * 6 + s * (360/3600);
  var sAngle = s * 6;

  // Hand grabbers
  var hHand = document.querySelector('.hour');
  var mHand = document.querySelector('.minute');
  var sHand = document.querySelector('.second');

  // Angle rotation
  hHand.style.transform = "rotate(" + hAngle + "deg)";
  mHand.style.transform = "rotate(" + mAngle + "deg)";
  sHand.style.transform = "rotate(" + sAngle + "deg)";

}

// Retrieves timestamp and calls New Clock with it
function getTimeZone(zone) {

  var offset = 7;

  var req = new XMLHttpRequest();

  req.open('GET', 'https://api.timezonedb.com/v2.1/get-time-zone?key=FQASQV7RU9MQ&format=json&by=zone&zone=' + zone, true);
            
  req.onload = function () {

    var data = JSON.parse(req.responseText)

    var time = data.timestamp;

    newClock(time, offset);
              
  };
  req.send(null);
}

timeLines();
setInterval(clock, 1000);