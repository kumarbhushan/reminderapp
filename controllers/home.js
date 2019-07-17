console.log('*********************************onsInt***********************************************')
function newInit () {
  try {
    var selectedEmoji = localStorage.getItem('emoji')
    document.getElementById('emoji').src = 'img/' + selectedEmoji + '.png'
    if (document.getElementById('video_1')) document.getElementById('video_1').muted = false
    if (document.getElementById('video_1')) document.getElementById('video_1').play()
    var lakeTheme = localStorage.getItem('lake')
    if (lakeTheme != 'enabled') {
      if ($('#ons-carousel-item1').length) { $('#ons-carousel-item1').remove() }
    } else {
      if (!$('#ons-carousel-item1').length) {
        $('#carousel').append(
          '<ons-carousel-item id="ons-carousel-item1">' +
          '<div class="video_contain" value="lake" style="text-align: center; font-size: 30px;  color: #fff;">' +
          '<video webkit-playsinline playsinline id="video_1" class="gif" autoplay loop muted="muted">' +
          '<source src="videos/flowers.mp4" type="video/mp4" poster="#">' +
          'Your browser does not support the video tag.' +
          '</video>' +
          '</div>' +
          '</ons-carousel-item>'
        )
      }
    }
    var sunsetTheme = localStorage.getItem('sunset')
    if (sunsetTheme != 'enabled') {
      if ($('#ons-carousel-item2').length) { $('#ons-carousel-item2').remove() }
    } else {
      if (!$('#ons-carousel-item2').length) {
        $('#carousel').append(
          '<ons-carousel-item id="ons-carousel-item2">' +
          '<div class="video_contain" value="lake" style="text-align: center; font-size: 30px;  color: #fff;">' +
          '<video webkit-playsinline playsinline id="video_2" class="gif" autoplay loop muted="muted">' +
          '<source src="videos/ripples.mp4" type="video/mp4" poster="#">' +
          'Your browser does not support the video tag.' +
          '</video>' +
          '</div>' +
          '</ons-carousel-item>'
        )
      }
    }
    var flowersTheme = localStorage.getItem('flowers')
    if (flowersTheme != 'enabled') {
      if ($('#ons-carousel-item3').length) { $('#ons-carousel-item3').remove() }
    } else {
      if (!$('#ons-carousel-item3').length) {
        $('#carousel').append(
          '<ons-carousel-item id="ons-carousel-item3">' +
          '<div class="video_contain" value="lake" style="text-align: center; font-size: 30px;  color: #fff;">' +
          '<video webkit-playsinline playsinline id="video_3" class="gif" autoplay loop muted="muted">' +
          '<source src="videos/tree.mp4" type="video/mp4" poster="#">' +
          'Your browser does not support the video tag.' +
          '</video>' +
          '</div>' +
          '</ons-carousel-item>'
        )
      }
    }

    var rainTheme = localStorage.getItem('rain')
    if (rainTheme != 'enabled') {
      if ($('#ons-carousel-item4').length) { $('#ons-carousel-item4').remove() }
    } else {
      if (!$('#ons-carousel-item4').length) {
        $('#carousel').append(
          '<ons-carousel-item id="ons-carousel-item4">' +
          '<div class="video_contain" value="lake" style="text-align: center; font-size: 30px;  color: #fff;">' +
          '<video webkit-playsinline playsinline id="video_4" class="gif" autoplay loop muted="muted">' +
          '<source src="videos/shells.mp4" type="video/mp4" poster="#">' +
          'Your browser does not support the video tag.' +
          '</video>' +
          '</div>' +
          '</ons-carousel-item>'
        )
      }
    }
    var wavesTheme = localStorage.getItem('waves')
    if (wavesTheme != 'enabled') {
      if ($('#ons-carousel-item5').length) { $('#ons-carousel-item5').remove() }
    } else {
      if (!$('#ons-carousel-item5').length) {
        $('#carousel').append(
          '<ons-carousel-item id="ons-carousel-item5">' +
          '<div class="video_contain" value="lake" style="text-align: center; font-size: 30px;  color: #fff;">' +
          '<video webkit-playsinline playsinline id="video_5" class="gif" autoplay loop muted="muted">' +
          '<source src="videos/sunrise.mp4" type="video/mp4" poster="#">' +
          'Your browser does not support the video tag.' +
          '</video>' +
          '</div>' +
          '</ons-carousel-item>'
        )
      }
    }
  } catch (err) { console.log('home', err) }
  GetThemeFromDBHomePage()
  /* Images */
  var carousel = document.getElementById('carousel')
  var curr = carousel.getActiveIndex()
  if (!window.postchange) {
    window.cpostchange = true
    carousel.addEventListener('postchange', function () {
      try {
        var curr = carousel.getActiveIndex()
        // document.getElementById("video" + curr).play();
        if (curr == 0) {
          // alert()
          if (document.getElementById('video_1')) document.getElementById('video_1').muted = false
          if (document.getElementById('video_2')) document.getElementById('video_2').muted = true
          if (document.getElementById('video_3')) document.getElementById('video_3').muted = true
          if (document.getElementById('video_4')) document.getElementById('video_4').muted = true
          if (document.getElementById('video_5')) document.getElementById('video_5').muted = true
          if (document.getElementById('video_1')) document.getElementById('video_1').play()
          $('#mute').attr('src', 'img/icon-sound.png')
        }
        if (curr == 1) {
          if (document.getElementById('video_1')) document.getElementById('video_1').muted = true
          if (document.getElementById('video_2')) document.getElementById('video_2').muted = false
          if (document.getElementById('video_3')) document.getElementById('video_3').muted = true
          if (document.getElementById('video_4')) document.getElementById('video_4').muted = true
          if (document.getElementById('video_5')) document.getElementById('video_5').muted = true
          if (document.getElementById('video_2')) document.getElementById('video_2').play()
          $('#mute').attr('src', 'img/icon-sound.png')
        }
        if (curr == 2) {
          if (document.getElementById('video_1')) document.getElementById('video_1').muted = true
          if (document.getElementById('video_2')) document.getElementById('video_2').muted = true
          if (document.getElementById('video_3')) document.getElementById('video_3').muted = false
          if (document.getElementById('video_4')) document.getElementById('video_4').muted = true
          if (document.getElementById('video_5')) document.getElementById('video_5').muted = true
          if (document.getElementById('video_3')) document.getElementById('video_3').play()
          $('#mute').attr('src', 'img/icon-sound.png')
        }
        if (curr == 3) {
          if (document.getElementById('video_1')) document.getElementById('video_1').muted = true
          if (document.getElementById('video_2')) document.getElementById('video_2').muted = true
          if (document.getElementById('video_3')) document.getElementById('video_3').muted = true
          if (document.getElementById('video_4')) document.getElementById('video_4').muted = false
          if (document.getElementById('video_5')) document.getElementById('video_5').muted = true
          if (document.getElementById('video_4')) document.getElementById('video_4').play()
          $('#mute').attr('src', 'img/icon-sound.png')
        }
        if (curr == 4) {
          if (document.getElementById('video_1')) document.getElementById('video_1').muted = true
          if (document.getElementById('video_2')) document.getElementById('video_2').muted = true
          if (document.getElementById('video_3')) document.getElementById('video_3').muted = true
          if (document.getElementById('video_4')) document.getElementById('video_4').muted = true
          if (document.getElementById('video_5')) document.getElementById('video_5').muted = false
          if (document.getElementById('video_5')) document.getElementById('video_5').play()
          $('#mute').attr('src', 'img/icon-sound.png')
        }
      } catch (err) {

      }
    })
  }
}
document.addEventListener('init', function (event) {
  try {
    newInit()
  } catch (err) { console.log('home', err) }
}, false)
function showPopUp () {
  try {
    document.getElementById('popup').style.display = 'block'
    document.getElementById('emoji-container').style.display = 'none'
  } catch (err) { console.log('home', err) }
}

function changeto1 () {
  try {
    document.getElementById('emoji').src = 'img/icon-sad.png'
    document.getElementById('popup').style.display = 'none'
    document.getElementById('emoji-container').style.display = 'block'
    localStorage.setItem('emoji', 'icon-sad')
  } catch (err) { console.log('home', err) }
}

function changeto2 () {
  try {
    document.getElementById('emoji').src = 'img/icon-neutral.png'
    document.getElementById('popup').style.display = 'none'
    document.getElementById('emoji-container').style.display = 'block'
    localStorage.setItem('emoji', 'icon-neutral')
  } catch (err) { console.log('home', err) }
}

function changeto3 () {
  try {
    document.getElementById('emoji').src = 'img/icon-smile.png'
    document.getElementById('popup').style.display = 'none'
    document.getElementById('emoji-container').style.display = 'block'
    localStorage.setItem('emoji', 'icon-smile')
  } catch (err) { console.log('home', err) }
}
function MuteUnmute () {
  var carousel = document.getElementById('carousel')
  var curr = carousel.getActiveIndex()
  var index = curr + 1
  try {
    if ($('#mute').attr('src') == 'img/icon-sound.png') {
      if (document.getElementById('video_' + index)) document.getElementById('video_' + index).muted = true
      $('#mute').attr('src', 'img/icon-mute.png')
    } else {
      if (document.getElementById('video_' + index)) document.getElementById('video_' + index).muted = false
      $('#mute').attr('src', 'img/icon-sound.png')
    }
  } catch (err) { console.log('home', err) }
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
