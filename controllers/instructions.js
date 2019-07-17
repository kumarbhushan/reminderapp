var finInstruc = 0
document.addEventListener('deviceready', onDeviceReadyIntruction, false)
var dot1 = document.getElementById('dots11')
var dot2 = document.getElementById('dots21')
var dot3 = document.getElementById('dots31')
var dot4 = document.getElementById('dots41')
function next1 () {
  var carousel = document.getElementById('carousel1')
  var curr = carousel.getActiveIndex()
  if (curr == 3) {
    navigate()
  }
  if (curr == 4) {
    document.getElementById('carousel1').setActiveIndex(1)
  } else {
    document.getElementById('carousel1').setActiveIndex(curr + 1)
  }
}
function onDeviceReadyIntruction () {
  //
  StatusBar.hide()
  document.getElementById('dots11').style.backgroundColor = 'rgba(0,0,0,1)'
  var carousel = document.getElementById('carousel1')
  var curr = carousel.getActiveIndex()
  carousel.addEventListener('postchange', function () {
    finInstruc++
    var curr = carousel.getActiveIndex()
    if (curr == 0) {
      finInstruc++
      document.getElementById('dots11').style.backgroundColor = 'rgba(0,0,0,1)'
    } else {
      document.getElementById('dots11').style.backgroundColor = 'rgba(225,225,225,0.3)'
    }
    if (curr == 1) {
      finInstruc++
      document.getElementById('dots21').style.backgroundColor = 'rgba(0,0,0,1)'
    } else {
      document.getElementById('dots21').style.backgroundColor = 'rgba(225,225,225,0.3)'
    }

    if (curr == 2) {
      finInstruc++
      document.getElementById('dots31').style.backgroundColor = 'rgba(0,0,0,1)'
    } else {
      document.getElementById('dots31').style.backgroundColor = 'rgba(225,225,225,0.3)'
    }

    if (curr == 3) {
      finInstruc++
      document.getElementById('dots41').style.backgroundColor = 'rgba(0,0,0,1)'
    } else {
      document.getElementById('dots41').style.backgroundColor = 'rgba(225,225,225,0.3)'
    }
    if (finInstruc >= 4) {
      // document.getElementById("start").style.display = "block";
      // document.getElementById("skip").style.display = "none";

    }
    if (finInstruc <= 4) {
      // document.getElementById("start").style.display = "none";
      // document.getElementById("skip").style.display = "block";
    }
  })
}
document.getElementById('dots1').addEventListener('click', function () {
  document.getElementById('carousel1').setActiveIndex(0)
})
document.getElementById('dots2').addEventListener('click', function () {
  document.getElementById('carousel1').setActiveIndex(1)
})
document.getElementById('dots3').addEventListener('click', function () {
  document.getElementById('carousel1').setActiveIndex(2)
})
document.getElementById('dots4').addEventListener('click', function () {
  document.getElementById('carousel1').setActiveIndex(3)
})
// ons.disableAutoStyling()
var eventName =
  'drag dragleft dragright dragup dragdown hold release swipe swipeleft swiperight ' +
  'swipeup swipedown tap doubletap touch transform pinch pinchin pinchout rotate'

$(document).on(eventName, 'body', function (event) {
  if (event.type !== 'release') {

  }
})
window.fn = {}
