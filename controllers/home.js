var db
console.log('*********************************onsInt***********************************************')
function newInit () { 
  // alert('here');
  $("#carousel").empty();
  GetThemeFromDBHomePage();
  //localStorage.clear()
  // document.addEventListener('init', function(event) {
  var selectedEmoji = localStorage.getItem('emoji')
  document.getElementById('emoji').src = 'img/' + selectedEmoji + '.png'
  if (document.getElementById('video_1')) document.getElementById('video_1').muted = false
  if (document.getElementById('video_1')) document.getElementById('video_1').play()
  var lakeTheme = localStorage.getItem('lake')
  if (lakeTheme != 'enabled') {
      $("#ons-carousel-item1").remove()
  }else{
      $("#carousel").append(
        '<ons-carousel-item id="ons-carousel-item1">'+
        '<div class="video_contain" value="lake" style="text-align: center; font-size: 30px;  color: #fff;">'+
            '<video webkit-playsinline playsinline id="video_1" class="gif" autoplay loop muted="muted">'+
                '<source src="videos/flowers.mp4" type="video/mp4" poster="#">'+
                'Your browser does not support the video tag.'+
            '</video>'+
        '</div>'+
    '</ons-carousel-item>'
      );
 
  }
  var sunsetTheme = localStorage.getItem('sunset')
  if (sunsetTheme != 'enabled') {
     $("#ons-carousel-item2").remove()

    // $("#carousel").append('<ons-carousel-item id ="2"><div  class="video_contain" value="beach" style="text-align: center; font-size: 30px;  color: #fff;"><img class="gif" src="videos/ripples.mp4"></div></ons-carousel-item>');
  }else{
    $("#carousel").append(
      '<ons-carousel-item id="ons-carousel-item2">'+
      '<div class="video_contain" value="lake" style="text-align: center; font-size: 30px;  color: #fff;">'+
          '<video webkit-playsinline playsinline id="video_2" class="gif" autoplay loop muted="muted">'+
              '<source src="videos/ripples.mp4" type="video/mp4" poster="#">'+
              'Your browser does not support the video tag.'+
          '</video>'+
      '</div>'+
  '</ons-carousel-item>'
    );

}
  var flowersTheme = localStorage.getItem('flowers')
  if (flowersTheme != 'enabled') {
     $("#ons-carousel-item3").remove()
    //  $("#carousel").append('<ons-carousel-item id ="3"><div  class="video_contain" value="flowers" style="text-align: center; font-size: 30px;  color: #fff;"><img class="gif" src="videos/shells.mp4"></div></ons-carousel-item>');
  }else{
    $("#carousel").append(
      '<ons-carousel-item id="ons-carousel-item3">'+
      '<div class="video_contain" value="lake" style="text-align: center; font-size: 30px;  color: #fff;">'+
          '<video webkit-playsinline playsinline id="video_3" class="gif" autoplay loop muted="muted">'+
              '<source src="videos/tree.mp4" type="video/mp4" poster="#">'+
              'Your browser does not support the video tag.'+
          '</video>'+
      '</div>'+
  '</ons-carousel-item>'
    );

}

  var rainTheme = localStorage.getItem('rain')
  if (rainTheme != 'enabled') {
       $("#ons-carousel-item4").remove()

    //   $("#carousel").append('<ons-carousel-item id ="3"><div  class="video_contain" value="rain" style="text-align: center; font-size: 30px;  color: #fff;"><img class="gif" src="videos/sunrise.mp4"></div></ons-carousel-item>');
  }else{
    $("#carousel").append(
      '<ons-carousel-item id="ons-carousel-item4">'+
      '<div class="video_contain" value="lake" style="text-align: center; font-size: 30px;  color: #fff;">'+
          '<video webkit-playsinline playsinline id="video_4" class="gif" autoplay loop muted="muted">'+
              '<source src="videos/shells.mp4" type="video/mp4" poster="#">'+
              'Your browser does not support the video tag.'+
          '</video>'+
      '</div>'+
  '</ons-carousel-item>'
    );

}
  var wavesTheme = localStorage.getItem('waves')
  if (wavesTheme != 'enabled') {
      $("#ons-carousel-item5").remove()

    // $("#carousel").append('<ons-carousel-item id ="3"><div  class="video_contain" value="waves" style="text-align: center; font-size: 30px;  color: #fff;"><img class="gif" src="videos/tree.mp4"></div></ons-carousel-item>');
  }else{
    $("#carousel").append(
      '<ons-carousel-item id="ons-carousel-item5">'+
      '<div class="video_contain" value="lake" style="text-align: center; font-size: 30px;  color: #fff;">'+
          '<video webkit-playsinline playsinline id="video_5" class="gif" autoplay loop muted="muted">'+
              '<source src="videos/sunrise.mp4" type="video/mp4" poster="#">'+
              'Your browser does not support the video tag.'+
          '</video>'+
      '</div>'+
  '</ons-carousel-item>'
    );

}
  /* Images */
  var carousel = document.getElementById('carousel')
  var curr = carousel.getActiveIndex()
  carousel.addEventListener('postchange', function () {
    try {
      var curr = carousel.getActiveIndex()
      // document.getElementById("video" + curr).play();
      if (curr == 0) {
        //alert()
        if (document.getElementById('video_1')) document.getElementById('video_1').muted = false
        if (document.getElementById('video_2')) document.getElementById('video_2').muted = true
        if (document.getElementById('video_3')) document.getElementById('video_3').muted = true
        if (document.getElementById('video_4')) document.getElementById('video_4').muted = true
        if (document.getElementById('video_5')) document.getElementById('video_5').muted = true
        if (document.getElementById('video_1')) document.getElementById('video_1').play();
        $('#mute').attr('src', 'img/icon-sound.png');
      }
      if (curr == 1) {
        if (document.getElementById('video_1')) document.getElementById('video_1').muted = true
        if (document.getElementById('video_2')) document.getElementById('video_2').muted = false
        if (document.getElementById('video_3')) document.getElementById('video_3').muted = true
        if (document.getElementById('video_4')) document.getElementById('video_4').muted = true
        if (document.getElementById('video_5')) document.getElementById('video_5').muted = true
        if (document.getElementById('video_2')) document.getElementById('video_2').play();
        $('#mute').attr('src', 'img/icon-sound.png');
      }
      if (curr == 2) {
        if (document.getElementById('video_1')) document.getElementById('video_1').muted = true
        if (document.getElementById('video_2')) document.getElementById('video_2').muted = true
        if (document.getElementById('video_3')) document.getElementById('video_3').muted = false
        if (document.getElementById('video_4')) document.getElementById('video_4').muted = true
        if (document.getElementById('video_5')) document.getElementById('video_5').muted = true
        if (document.getElementById('video_3')) document.getElementById('video_3').play();
        $('#mute').attr('src', 'img/icon-sound.png');
      }
      if (curr == 3) {
        if (document.getElementById('video_1')) document.getElementById('video_1').muted = true
        if (document.getElementById('video_2')) document.getElementById('video_2').muted = true
        if (document.getElementById('video_3')) document.getElementById('video_3').muted = true
        if (document.getElementById('video_4')) document.getElementById('video_4').muted = false
        if (document.getElementById('video_5')) document.getElementById('video_5').muted = true
        if (document.getElementById('video_4')) document.getElementById('video_4').play();
        $('#mute').attr('src', 'img/icon-sound.png');
      }
      if (curr == 4) {
        if (document.getElementById('video_1')) document.getElementById('video_1').muted = true
        if (document.getElementById('video_2')) document.getElementById('video_2').muted = true
        if (document.getElementById('video_3')) document.getElementById('video_3').muted = true
        if (document.getElementById('video_4')) document.getElementById('video_4').muted = true
        if (document.getElementById('video_5')) document.getElementById('video_5').muted = false
        if (document.getElementById('video_5')) document.getElementById('video_5').play();
        $('#mute').attr('src', 'img/icon-sound.png');
      }
      
    } catch (err) {

    }
  })
}
document.addEventListener('init', function (event) {
  newInit()
}, false)
// ons.getScriptPage().onInit = function () { newInit() }
function showPopUp () {
  document.getElementById('popup').style.display = 'block'
  document.getElementById('emoji-container').style.display = 'none'
}

function changeto1 () {
  document.getElementById('emoji').src = 'img/icon-sad.png'
  document.getElementById('popup').style.display = 'none'
  document.getElementById('emoji-container').style.display = 'block'
  localStorage.setItem('emoji', 'icon-sad')
}

function changeto2 () {
  document.getElementById('emoji').src = 'img/icon-neutral.png'
  document.getElementById('popup').style.display = 'none'
  document.getElementById('emoji-container').style.display = 'block'
  localStorage.setItem('emoji', 'icon-neutral')
}

function changeto3 () {
  document.getElementById('emoji').src = 'img/icon-smile.png'
  document.getElementById('popup').style.display = 'none'
  document.getElementById('emoji-container').style.display = 'block'
  localStorage.setItem('emoji', 'icon-smile')
}
function MuteUnmute(){
  var carousel = document.getElementById('carousel')
  var curr = carousel.getActiveIndex();
  var index= curr  + 1;
  if($('#mute').attr('src') == 'img/icon-sound.png'){
  if (document.getElementById('video_'+index)) document.getElementById('video_'+index).muted = true
  // if (document.getElementById('video_2')) document.getElementById('video_2').muted = true
  // if (document.getElementById('video_3')) document.getElementById('video_3').muted = true
  // if (document.getElementById('video_4')) document.getElementById('video_4').muted = true
  // if (document.getElementById('video_5')) document.getElementById('video_5').muted = true
  $('#mute').attr('src', 'img/icon-mute.png');
  }else{
    if (document.getElementById('video_'+index)) document.getElementById('video_'+index).muted = false
 
  $('#mute').attr('src', 'img/icon-sound.png');
  }
}
ons.disableAutoStyling()
var eventName =
  'drag dragleft dragright dragup dragdown hold release swipe swipeleft swiperight ' +
  'swipeup swipedown tap doubletap touch transform pinch pinchin pinchout rotate'

$(document).on(eventName, 'body', function (event) {
  if (event.type !== 'release') {

  }
})
window.fn = {}
