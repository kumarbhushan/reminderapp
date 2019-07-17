
var finInstruc = 0

document.addEventListener('deviceready', onDeviceReadyInstruction2, false)
var dot1 = document.getElementById('dots1')
var dot2 = document.getElementById('dots2')
var dot3 = document.getElementById('dots3')
var dot4 = document.getElementById('dots4')
// PhoneGap is ready

//

function onDeviceReadyInstruction2 () {
  StatusBar.hide()
  document.getElementById('dots1').style.backgroundColor = 'rgba(225,225,225,1)'

  var carousel = document.getElementById('carousel22')
  var curr = carousel.getActiveIndex()
  // document.getElementById('video').setAttribute("id", curr);
  carousel.addEventListener('postchange', function () {
    finInstruc++
    var curr = carousel.getActiveIndex()
    if (curr == 0) {
      finInstruc++
      document.getElementById('dots1').style.backgroundColor = 'rgba(225,225,225,1)'
    } else {
      document.getElementById('dots1').style.backgroundColor = 'rgba(225,225,225,0.3)'
    }
    if (curr == 1) {
      finInstruc++
      document.getElementById('dots2').style.backgroundColor = 'rgba(225,225,225,1)'
    } else {
      document.getElementById('dots2').style.backgroundColor = 'rgba(225,225,225,0.3)'
    }

    if (curr == 2) {
      finInstruc++
      document.getElementById('dots3').style.backgroundColor = 'rgba(225,225,225,1)'
    } else {
      document.getElementById('dots3').style.backgroundColor = 'rgba(225,225,225,0.3)'
    }

    if (curr == 3) {
      finInstruc++
      document.getElementById('dots4').style.backgroundColor = 'rgba(225,225,225,1)'
    } else {
      document.getElementById('dots4').style.backgroundColor = 'rgba(225,225,225,0.3)'
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
  document.getElementById('carousel22').setActiveIndex(0)
})
document.getElementById('dots2').addEventListener('click', function () {
  document.getElementById('carousel22').setActiveIndex(1)
})
document.getElementById('dots3').addEventListener('click', function () {
  document.getElementById('carousel22').setActiveIndex(2)
})

document.getElementById('dots4').addEventListener('click', function () {
  document.getElementById('carousel22').setActiveIndex(3)
})

//ons.disableAutoStyling()
var eventName =
  'drag dragleft dragright dragup dragdown hold release swipe swipeleft swiperight ' +
  'swipeup swipedown tap doubletap touch transform pinch pinchin pinchout rotate'

$(document).on(eventName, 'body', function (event) {
  if (event.type !== 'release') {

  }
})
window.fn = {}
