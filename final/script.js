    // Timezone for clock IF statement.  If empty, displays time as normal.  If not, displays time in time zone.
    var zone = "";
    
    // Print minute/hour lines
    function timeLines() {
      
      var lines = document.getElementsByClassName('lines');
      var clockEdge = document.getElementsByClassName('clock')[0];

      for (var i = 1; i < 60; i++) {
        clockEdge.innerHTML += "<div class='lines'></div>";
        lines[i].style.transform = "rotate(" + 6 * i + "deg)";
      }

    }

    // Analog Clock
    function clock(){

      // Default computer clock for local time, else: alternate timezone clock
      if (zone == "") {

        // Time element grabbers
        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        var session = "AM";

        // Hand angles
        var hourAngle = hour * 30 + minute * (360/720);
        var minuteAngle = minute * 6 + second * (360/3600);
        var secondAngle = second * 6;

        // Hand grabbers
        var hourHand = document.querySelector('.hour');
        var minuteHand = document.querySelector('.minute');
        var secondHand = document.querySelector('.second');

        // Angle rotation
        hourHand.style.transform = "rotate(" + hourAngle + "deg)";
        minuteHand.style.transform = "rotate(" + minuteAngle + "deg)";
        secondHand.style.transform = "rotate(" + secondAngle + "deg)";

      // Digital Clock
        // Session Setter
        if (hour >= 12) {
          session = "PM";
        }

        // Standard Time Setter (instead of Military Time)
        if (hour == 0) {
          hour = 12;
          } else if (hour > 12) {
            hour -= 12;
        }

        if (minute < 10) {
          minute = "0" + minute;
        }

        if (second < 10) {
          second = "0" + second;
        }

        // Assemble and Display Digital Time
        var time = hour + ":" + minute + ":" + second + " " + session;
        document.getElementById("digital").innerText = time;
        document.getElementById("digital").textContent = time;

      } else {

        switch(zone) {
          case "local":

            break;
          case "eastern":

            var timeZone = new TimeZoneDB;
            var offset = 10;

            timeZone.getJSON({
              key: "FQASQV7RU9MQ",
              lat: 34.0536834,
              lng: -118.2427669
            }, function (timeZone) {
          
              newClock(timeZone.timestamp, offset);

            });

            break;
          case "central":

            var timeZone = new TimeZoneDB;
            var offset = 9;

            timeZone.getJSON({
              key: "FQASQV7RU9MQ",
              lat: 34.0536834,
              lng: -118.2427669
            }, function (timeZone) {
          
              newClock(timeZone.timestamp, offset);

            });
              
            break;
          case "mt":

            var timeZone = new TimeZoneDB;
            var offset = 8;

            timeZone.getJSON({
              key: "FQASQV7RU9MQ",
              lat: 33.4484367,
              lng: -112.0741417
            }, function (timeZone) {
          
              newClock(timeZone.timestamp, offset);

            });
              
            break;
          case "pdt":

            var timeZone = new TimeZoneDB;
            var offset = 7;

            timeZone.getJSON({
              key: "FQASQV7RU9MQ",
              lat: 34.0536834,
              lng: -118.2427669
            }, function (timeZone) {
          
              newClock(timeZone.timestamp, offset);

            });
              
            break;
          case "adt":

            var timeZone = new TimeZoneDB;
            var offset = 7;

            timeZone.getJSON({
              key: "FQASQV7RU9MQ",
              lat: 61.2163129,
              lng: -149.8948523
            }, function (timeZone) {
          
              newClock(timeZone.timestamp, offset);

            });
              
            break;
          case "hast":

            var timeZone = new TimeZoneDB;
            var offset = 7;

            timeZone.getJSON({
              key: "FQASQV7RU9MQ",
              lat: 21.304547,
              lng: -157.8556764
            }, function (timeZone) {
          
              newClock(timeZone.timestamp, offset);

            });
              
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

      var time = new Date(timestamp*1000);
      // Hours part from the timestamp
      var hour = time.getHours() + offset;

      if (hour >= 24) {
        hour -= 24;
      }

      var x = ((hour + 11) % 12) + 1;

      var session = hour > 11 ? "PM" : "AM";

      var minute = "0" + time.getMinutes();
      var second = "0" + time.getSeconds();

      // Display Digital Time
        var digitalTime = x + ':' + minute.substr(-2) + ':' + second.substr(-2) + " " + session;

        document.getElementById("digital").innerText = digitalTime;
        document.getElementById("digital").textContent = digitalTime;

      // Display Analog Time
        // Hand angles
        var hourAngle = x * 30 + minute * (360/720);
        var minuteAngle = minute * 6 + second * (360/3600);
        var secondAngle = second * 6;

        // Hand grabbers
        var hourHand = document.querySelector('.hour');
        var minuteHand = document.querySelector('.minute');
        var secondHand = document.querySelector('.second');

        // Angle rotation
        hourHand.style.transform = "rotate(" + hourAngle + "deg)";
        minuteHand.style.transform = "rotate(" + minuteAngle + "deg)";
        secondHand.style.transform = "rotate(" + secondAngle + "deg)";

    }

    // Pull the data from the TimeZone database. Function is the same one from the link before.
    function TimeZoneDB() {
      this.getJSON=function(e,t) {
        try {
          var n = e.key,
          o = e.zone,
          a = e.lat,
          i = e.lng,
          c = e.time,
          r = "_" + (new Date).getTime() + Math.floor(1e4 * Math.random()),
          d = document.createElement("script");
          window[r] = function(e) {
            
            t&&t(e);

            try {
              delete window[r]
            } catch(n) {
              window[r]=void 0
              }
          },
          
          o?d.src = "//api.timezonedb.com/?key=" 
          + n 
          + "&zone=" 
          + o 
          + (c?"&time=" + c:"") 
          + "&format=json&callback=" 
          + r:a&&i&&(d.src="//api.timezonedb.com/?key=" 
          + n 
          + (c?"&time="+c:"") 
          + "&lat="
          + a 
          + "&lng="
          + i 
          + "&format=json&callback="
          +r),document.body.appendChild(d),d.parentNode.removeChild(d)
            
        } catch(m) {
          return alert("JSON request failed."),!1
        }
      }
    }

    timeLines();
    setInterval(clock, 1000);