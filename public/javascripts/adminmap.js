var alertt = $('#alertt');
var map;
var arrMarkers = [];
var markersArray = [];



$(document).ready(function() {

$('#route_weekend_day').hide();
$('#route_ado_day').hide();
$('#route_weekday_night').hide();
$('#route_weekend_night').hide();
$('#route_ado_night').hide();

$('#route_weekday_day').on('keyup change', function() {
$('#route_weekend_day').show();
});
$('#route_weekend_day').on('keyup change', function() {
  $('#route_ado_day').show();
});
$('#route_ado_day').on('keyup change', function() {
  $('#route_weekday_night').show();
});
$('#route_weekday_night').on('keyup change', function() {
  $('#route_weekend_night').show();
});
$('#route_weekend_night').on('keyup change', function() {
  $('#route_ado_night').show();
});
$('#alertt').hide();
$(window).resize(function () {
    var h = $(window).height(),
        offsetTop = 150; // Calculate the top offset
    $('#gmaps').css('height', (h - offsetTop));
  }).resize();
initialize();
});

function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(56.6962120441464, -111.30317687988281),
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("gmaps"), mapOptions)

  google.maps.event.addListener(map, 'click', function(event) {
    var latitude = event.latLng.lat();
    var longitude = event.latLng.lng();
    deleteOverlays();
    addMarker(event.latLng);
    updateTextFields(latitude, longitude)
  });

console.log(arrMarkers.length);

}

function setMarker(lat, lon, markerTitle, id, content) {
  var latLonMarker = new google.maps.LatLng(lat,lon);
  marker = new google.maps.Marker({
    position: latLonMarker,
    map: map,
    draggable: true,
    title: markerTitle
  });

  google.maps.event.addListener(marker, 'drag', function() {
    $('#route_latitude').val(this.getPosition().lat());
    $('#route_longitude').val(this.getPosition().lng());
  });
  google.maps.event.addListener(marker, 'rightclick', function() {
    var gId = id;
    fetchMarker(id);
  });
  bindInfoWindow(marker, content);
  arrMarkers.push({marker: marker, id: id})
}

function deleteMarker(id) {
  console.log('In Delete Marker');
  for (var i = 0; i < arrMarkers.length; i += 1) {
    if (arrMarkers[i].id === id) {
      arrMarkers[i].marker.setMap(null);
      console.log('Found it');
    }
  }
}

function bindInfoWindow(marker, content) {
  var infowindow = new google.maps.InfoWindow();
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(content);
    infowindow.open(map, this);
  });
}

function updateTextFields(lati, longi) {
  $('#route_latitude').val(lati);
  $('#route_longitude').val(longi);
}

function addMarker(location) {
  marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markersArray.push(marker);
}

function deleteOverlays() {
  if (markersArray) {
    for (i in markersArray) {
      markersArray[i].setMap(null);
    };
markersArray.length = 0;
  }
}


function increment() {
  $('#rotue_stop_number').val( function(i, oldval) {
    return ++oldval;
  });
}

$(function() {

  $("#submit_action").click(function(e) { e.preventDefault(); 
      var dataString = $('#markerform').serialize();
      var id = $('#route_id').val();
    if ($('#markeroption').val() === "addmarkers") {
      $.ajax({
        type: 'POST',
        url:  '/admin.html',
        data: dataString,
        dataType: "JSON",
        success: function(data) {
          var lati = $('#route_latitude').val();
          var longi = $('#route_longitude').val();
          console.log('Added');
          console.log(data);
          increment();
          setMarker(lati, longi);
          $('#alertt').text(data.message);
          $('#alertt').show();
          $('#alertt').fadeIn().delay(2000).fadeOut('slow');

        }
      });
      return false;
    } else if ($('#markeroption').val() === "changemarker") {
      $.ajax({
        type: 'PUT',
        url:  '/routes/'+id,
        data: dataString,
        dataType: "JSON",
        success: function(data) {
          console.log(data);
          console.log('works');
          $('#alertt').text(data.message);
          $('#alertt').show();
           $('#alertt').fadeIn().delay(2000).fadeOut('slow');
        }
      });
      return false;
    } else if ($('#markeroption').val() === "deletemarker") {
      $.ajax({
        type: 'POST',
        url:  '/routes/'+id,
        data: { _method:'DELETE' },
        dataType: 'JSON',
        success: function(data) {
          console.log(data);
          deleteMarker(id);
       $('#alertt').text(data.message);
       $('#alertt').show();
       $('#alertt').fadeIn().delay(2000).fadeOut('slow');
        }
      });
      return false;
    }
  });
});


// ON MARKER RIGHT CLICK FETCH THE PROPPER INFORMATION FROM DATABASE
// AND POPULATE THE APPROPRIATE TEXT FIELDS.
function fetchMarker(id) {
  var data;
  $.ajax({
    type: "GET",
    url: '/routes/'+id,
    dataType: "JSON",
    success: function(data) {
      console.log(data)
      $('#weekend_day').show();
      $('#ado_day').show();
      $('#weekday_night').show();
      $('#weekend_night').show();
      $('#ado_night').show();
      $('#route_id').val(data.info.id);
      $('#route_plant_site').val(data.info.plant_site);
      $('#route_route_number').val(data.info.route_number);
      $('#route_stop_number').val(data.info.stop_number);
      $('#route_latitude').val(data.info.latitude);
      $('#route_longitude').val(data.info.longitude);
      $('#route_street_name').val(data.info.street_name);
      $('#route_weekday_day').val(data.info.weekday_day);
      $('#route_weekend_day').val(data.info.weekend_day);
      $('#route_ado_day').val(data.info.ado_day);
      $('#route_weekday_night').val(data.info.weekday_night);
      $('#route_weekend_night').val(data.info.weekend_night);
      $('#route_ado_night').val(data.info.ado_night);
      console.log($('#route_id').val());
      $('#alertt').text(data.message);
      $('#alertt').show();
      $('#alertt').fadeIn().delay(2000).fadeOut('slow');
    }
  });
}