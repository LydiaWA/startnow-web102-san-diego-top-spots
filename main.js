$(document).ready(function() {
// write your code here
    $.getJSON("data.json", function(data){
        for(var i = 0; i < data.length; i++) {
            var longitude = data[i].location[0];
            var latitude = data[i].location[1];
            var mapLink = 'https://www.google.com/maps?q=' + longitude + ',' + latitude;
            /*console.log("longitude:", longitude);
            console.log("latitude::", latitude);
            console.log("mapLink::", mapLink);*/
            var trHtml = "<tr><td>" + data[i].name + "</td><td>" + data[i].description + "</td><td>" + "<a href =" +  mapLink + ">Open in Google Map</a></td></tr>";
            $(trHtml).appendTo("#topSpots");
    }
    })

    
})


function initMap() {    
    //map options
    var mapOptions = {
        center: {lat:32.7086, lng:-117.1560},
        zoom:10};
    //new map
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    
    $.getJSON("data.json",function(data){

        for(var i = 0; i < data.length; i++) {

            addMarker(data);
        }

            function addMarker(data){
                var latLng = {lat: data[i].location[0], lng: data[i].location[1]};
                //console.log('latLng::', latLng);
                
                var contentString = '<div id="infobox">' +
                '<h4 id ="name">' + data[i].name + '</h4>'+
                '<div id = "body">' +
                '<p id ="description">' + data[i].description + '</p>' +
                '</div>' +
                '</div>';

                var infowindow = new google.maps.InfoWindow({
                content: contentString 
                });

                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map
                });

                marker.addListener('click', function(){
                infowindow.open(map, marker);
                })
                //var contentString = 'hello'
                //'<div id = "infobox">' + '<h3 id = "nameHead">' + data[i].name + '</h3>' + '<div id = "bodyContent"><p>' + data[i].description + '</p></div></div>';
                //console.log('dataname::', data[i].name);
                
            }
        
    
    })

}