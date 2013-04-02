var events = [
    { Title: "Theology on Tap", Date: new Date("03/26/2013") },
    { Title: "ChoreoLab 2013", Date: new Date("03/30/2013")},
    { Title: "DCDT Showcase: Nuwa", Date: new Date("04/05/2013") },
    { Title: "Momentum Showcase", Date: new Date("04/06/2013") }
];

duarts.on('push', function(path) {
  var transformed;
  if (path == '/calendar') {
    $('#calendar').datepicker({

      beforeShowDay: function(date) {
        var result = [true, '', null];
        var matching = $.grep(events, function(event) {
            return event.Date.valueOf() === date.valueOf();
        });

        if (matching.length) {
            result = [true, 'highlight', null];
        }
        return result;
      },
      onSelect: function(dateText) {
        var date,
            selectedDate = new Date(dateText),
            i = 0,
            event = null;

        while (i < events.length && !event) {
            date = events[i].Date;

            if (selectedDate.valueOf() === date.valueOf()) {
                event = events[i];
            }
            i++;
        }
        if (event) {
            alert(event.Title + " " + event.Date);
        }
      }

    });
  }

/*  $('#calendar').bind('onSelect', function() {
     var dateclick = $('#calendar').datepicker("getDate");
     alert(dateclick);
  });
*/

/*  $.getJSON('/events', function(events) {
     transformed = _.map(events, function (event) {
      return {
        id: event._id,
        name: event.summary,
        date: {
          start: {
            date: event.start.shortdate,
            time: event.start.time
          },
          end: {
            date: event.end.shortdate,
            time: event.end.time
          }
        },
        description: event.description,
        loc: {
            address: event.location.address,
            link: event.location.link
        }
      };
    });

  });*/

});