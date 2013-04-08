duarts.on('push', function(path) {
  var transformed;
  var dformat;
  if (path == '/calendar') {
    $('#calendar').datepicker({

       onSelect: function(){
       var dateclick = $('#calendar').datepicker("getDate");
      // alert(dateclick);
      // console.log(dateclick);
       var month = dateclick.getMonth()+1;
       var day = dateclick.getDay();
       var year = dateclick.getFullYear();
       dformat = month + "/" + day + "/" + year;
     //  console.log(dformat);
       }
    });
  }

/*  $('#calendar').bind('onSelect', function() {
     var dateclick = $('#calendar').datepicker("getDate");
     alert(dateclick);
  });
*/
  $.getJSON('/events', function(events) {
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

  /*Object.keys(transformed).forEach(function(key){
    console.log(key, transformed[key]);
  });
*/

$('#calendar').datepicker({
  beforeShowDay: function(date) {
     showEvent(date);
     return [true, 'eventSelect', 'tooltip text'];
  }
})

function showEvent(date) {
  var eventname;
  for (var key in transformed) {
    var obj = transformed[key];
    for (var prop in obj) {
      //alert(prop + "=" + obj[prop]); //pops up id, name, date, desc, loc separately

      if (prop==='name') {
        eventname = obj[prop];
        //alert("name of event = " + eventname);
      }

      else if(typeof(obj[prop])==='object') {  //checks to see if property is another object; for date and loc
        //console.log("see another object");
        var obj2 = obj[prop];
        for (var prop2 in obj2) {
          if(typeof(obj2[prop2])==='object'){
            //console.log("got to the date!");

            var obj3 = obj2[prop2];
            for (var prop3 in obj3) {
              var date = $('#calendar').datepicker("getDate");
              var month = date.getMonth()+1;
              var day = date.getDay();
              var year = date.getFullYear();
              d = month + "/" + day + "/" + "year";
              if(obj3[prop3]==="d") {
                //console.log("print the matched date!");
                return eventname;
              }
            }

          }
        }
      }

    }
  }
  return;
 }


  });
});