var db
console.log('*********************************onsInt***********************************************')
function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || ''
  sliceSize = sliceSize || 512

  var byteCharacters = atob(b64Data)
  var byteArrays = []

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize)

    var byteNumbers = new Array(slice.length)
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    var byteArray = new Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }

  var blob = new Blob(byteArrays, { type: contentType })
  return blob
}
function newInit() {
  // alert('here');
  // document.addEventListener('init', function(event) {
  var selectedEmoji = localStorage.getItem('emoji')
  document.getElementById('emoji').src = 'img/' + selectedEmoji + '.png'
  document.getElementById('video_1').muted = false
  document.getElementById('video_1').play()
  var lakeTheme = localStorage.getItem('lake')
  if (lakeTheme != 'enabled') {
    //  $("#ons-carousel-item1").remove()
  }
  var sunsetTheme = localStorage.getItem('sunset')
  if (sunsetTheme != 'enabled') {
    // $("#ons-carousel-item2").remove()

    // $("#carousel").append('<ons-carousel-item id ="2"><div  class="video_contain" value="beach" style="text-align: center; font-size: 30px;  color: #fff;"><img class="gif" src="videos/ripples.mp4"></div></ons-carousel-item>');
  }
  var flowersTheme = localStorage.getItem('flowers')
  if (flowersTheme != 'enabled') {
    //  $("#ons-carousel-item3").remove()
    //  $("#carousel").append('<ons-carousel-item id ="3"><div  class="video_contain" value="flowers" style="text-align: center; font-size: 30px;  color: #fff;"><img class="gif" src="videos/shells.mp4"></div></ons-carousel-item>');
  }

  var rainTheme = localStorage.getItem('rain')
  if (rainTheme != 'enabled') {
    //   $("#ons-carousel-item4").remove()

    //   $("#carousel").append('<ons-carousel-item id ="3"><div  class="video_contain" value="rain" style="text-align: center; font-size: 30px;  color: #fff;"><img class="gif" src="videos/sunrise.mp4"></div></ons-carousel-item>');
  }
  var wavesTheme = localStorage.getItem('waves')
  if (wavesTheme != 'enabled') {
    //  $("#ons-carousel-item5").remove()

    // $("#carousel").append('<ons-carousel-item id ="3"><div  class="video_contain" value="waves" style="text-align: center; font-size: 30px;  color: #fff;"><img class="gif" src="videos/tree.mp4"></div></ons-carousel-item>');
  }
  /* Images */
  var carousel = document.getElementById('carousel')
  var curr = carousel.getActiveIndex()
  carousel.addEventListener('postchange', function () {
    try {
      var curr = carousel.getActiveIndex()
      // document.getElementById("video" + curr).play();
      if (curr == 0) {
        document.getElementById('video_1').muted = false
        document.getElementById('video_2').muted = true
        document.getElementById('video_3').muted = true
        document.getElementById('video_4').muted = true
        document.getElementById('video_5').muted = true
      }
      if (curr == 1) {
        document.getElementById('video_1').muted = true
        document.getElementById('video_2').muted = false
        document.getElementById('video_3').muted = true
        document.getElementById('video_4').muted = true
        document.getElementById('video_5').muted = true
        document.getElementById('video_2').play()
      }
      if (curr == 2) {
        document.getElementById('video_1').muted = true
        document.getElementById('video_2').muted = true
        document.getElementById('video_3').muted = false
        document.getElementById('video_4').muted = true
        document.getElementById('video_5').muted = true
        document.getElementById('video_3').play()
      }
      if (curr == 3) {
        document.getElementById('video_1').muted = true
        document.getElementById('video_2').muted = true
        document.getElementById('video_3').muted = true
        document.getElementById('video_4').muted = false
        document.getElementById('video_5').muted = true
        document.getElementById('video_4').play()
      }
      if (curr == 4) {
        document.getElementById('video_1').muted = true
        document.getElementById('video_2').muted = true
        document.getElementById('video_3').muted = true
        document.getElementById('video_4').muted = true
        document.getElementById('video_5').muted = false
        document.getElementById('video_5').play()
      }
    } catch (err) {

    }
  })
}
document.addEventListener('init', function (event) {
  newInit()
}, false)
// ons.getScriptPage().onInit = function () { newInit() }
function showPopUp() {
  document.getElementById('popup').style.display = 'block'
  document.getElementById('emoji-container').style.display = 'none'
}

function changeto1() {
  console.log('ready')
  document.getElementById('emoji').src = 'img/icon-sad.png'
  document.getElementById('popup').style.display = 'none'
  document.getElementById('emoji-container').style.display = 'block'
  localStorage.setItem('emoji', 'emoji1')
}

function changeto2() {
  document.getElementById('emoji').src = 'img/icon-neutral.png'
  document.getElementById('popup').style.display = 'none'
  document.getElementById('emoji-container').style.display = 'block'
  localStorage.setItem('emoji', 'emoji2')
}

function changeto3() {
  document.getElementById('emoji').src = 'img/icon-smile.png'
  document.getElementById('popup').style.display = 'none'
  document.getElementById('emoji-container').style.display = 'block'
  localStorage.setItem('emoji', 'emoji3')
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
