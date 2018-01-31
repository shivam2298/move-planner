
function loadData(e) {
  e.preventDefault();
    var $body = $('body');
    var $weatherElem = $('#weather-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $weatherElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $('#street').val();
    var city = $('#city').val();
    console.log(street,city);
    var url = "https://maps.googleapis.com/maps/api/streetview?size=600x600&location="+street+","+city;
    console.log(url);
    $('body').append('<img class="bgimg" src="'+url+'">"');
    $('img').css({
            "width": "100%",
            "height": "100%",
            "max-height": "100%",
            "margin": "0",
            "padding": "0",
            "background-size":"100% 100%",
            "background-repeat": "no-repeat"
        });
  // newyork Times

  var nyturl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + city + "&hl=true&sort=newest&api-key=f9e4e718e409448694c8faf981b0dec6"+'';

  console.log(nyturl);
  $.ajax({
  url: nyturl,
  method: 'GET',
}).done(function(result) {
  var articles = result.response.docs;
  for(var i = 0; i < articles.length; ++i){
    article  = articles[i];
    $nytHeaderElem.append('<li class = "article"><a href="'+article.web_url+'">'+article.headline.main+'</a><div>'+article.snippet+'</div></li>')
  }
  console.log(articles);
}).fail(function(err) {
  throw err;
});

// openweather map api

var opwurl = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=357a3970aae103f19b7675c9593f626d";

console.log(opwurl);
$.ajax({
url: opwurl,
method: 'GET',
}).done(function(result) {
weathers = result.weather;
for(var i = 0; i < weathers.length; ++i){
  weather  = weathers[i];
  $weatherElem.append('<li class="article"><div><strong>'+weather.main+'</strong></div><span><img src = "http://openweathermap.org/img/w/'+weather.icon+'.png"></span><div>'+weather.description+'</div>');
}

}).fail(function(err) {
throw err;
});
};

$('#form-container').submit(loadData);
