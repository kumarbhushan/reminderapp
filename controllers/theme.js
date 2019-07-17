
document.addEventListener('deviceready', onDeviceReadyTheme, false)
// PhoneGap is ready
//
function onDeviceReadyTheme () {
  StatusBar.hide()
  var lakeTheme = localStorage.getItem('lake')

  if (lakeTheme && lakeTheme === 'enabled') {
    $('#add-theme-lake')[0].src = 'img/btn-cross-white.png'
  }
  if (lakeTheme && lakeTheme === 'disabled') {
    $('#add-theme-lake')[0].src = 'img/btn-plus-white.png'
  }

  var sunsetTheme = localStorage.getItem('sunset')
  if (sunsetTheme && sunsetTheme === 'enabled') {
    $('#add-theme-sunset')[0].src = 'img/btn-cross-white.png'
  }
  if (sunsetTheme && sunsetTheme === 'disabled') {
    $('#add-theme-sunset')[0].src = 'img/btn-plus-white.png'
  }

  var flowersTheme = localStorage.getItem('flowers')
  if (flowersTheme && flowersTheme === 'enabled') {
    $('#add-theme-flowers')[0].src = 'img/btn-cross-white.png'
  }
  if (flowersTheme && flowersTheme === 'disabled') {
    $('#add-theme-flowers')[0].src = 'img/btn-plus-white.png'
  }

  var rainTheme = localStorage.getItem('rain')
  if (rainTheme && rainTheme === 'enabled') {
    $('#add-theme-rain')[0].src = 'img/btn-cross-white.png'
  }
  if (rainTheme && rainTheme === 'disabled') {
    $('#add-theme-rain')[0].src = 'img/btn-plus-white.png'
  }

  var wavesTheme = localStorage.getItem('waves')
  if (wavesTheme && wavesTheme === 'enabled') {
    $('#add-theme-waves')[0].src = 'img/btn-cross-white.png'
  }
  if (wavesTheme && wavesTheme === 'disabled') {
    $('#add-theme-waves')[0].src = 'img/btn-plus-white.png'
  }

  $('#add-theme-lake').click(function () {
    lakeTheme = localStorage.getItem('lake')
    if (lakeTheme && lakeTheme === 'disabled') {
      localStorage.setItem('lake', 'enabled')
      $('#add-theme-lake')[0].src = 'img/btn-cross-white.png'
    }
    if (lakeTheme && lakeTheme === 'enabled') {
      localStorage.setItem('lake', 'disabled')
      $('#add-theme-lake')[0].src = 'img/btn-plus-white.png'
    }
    if (!lakeTheme) {
      localStorage.setItem('lake', 'enabled')
      $('#add-theme-lake')[0].src = 'img/btn-cross-white.png'
    }
  })

  $('#add-theme-sunset').click(function () {
    sunsetTheme = localStorage.getItem('sunset')
    if (sunsetTheme && sunsetTheme === 'disabled') {
      localStorage.setItem('sunset', 'enabled')
      $('#add-theme-sunset')[0].src = 'img/btn-cross-white.png'
    }
    if (sunsetTheme && sunsetTheme === 'enabled') {
      localStorage.setItem('sunset', 'disabled')
      $('#add-theme-sunset')[0].src = 'img/btn-plus-white.png'
    }
    if (!sunsetTheme) {
      localStorage.setItem('sunset', 'enabled')
      $('#add-theme-sunset')[0].src = 'img/btn-cross-white.png'
    }
  })

  $('#add-theme-flowers').click(function () {
    flowersTheme = localStorage.getItem('flowers')
    if (flowersTheme && flowersTheme === 'disabled') {
      localStorage.setItem('flowers', 'enabled')
      $('#add-theme-flowers')[0].src = 'img/btn-cross-white.png'
    }
    if (flowersTheme && flowersTheme === 'enabled') {
      localStorage.setItem('flowers', 'disabled')
      $('#add-theme-flowers')[0].src = 'img/btn-plus-white.png'
    }
    if (!flowersTheme) {
      localStorage.setItem('flowers', 'enabled')
      $('#add-theme-flowers')[0].src = 'img/btn-cross-white.png'
    }
  })

  $('#add-theme-rain').click(function () {
    rainTheme = localStorage.getItem('rain')
    if (rainTheme && rainTheme === 'disabled') {
      localStorage.setItem('rain', 'enabled')
      $('#add-theme-rain')[0].src = 'img/btn-cross-white.png'
    }
    if (rainTheme && rainTheme === 'enabled') {
      localStorage.setItem('rain', 'disabled')
      $('#add-theme-rain')[0].src = 'img/btn-plus-white.png'
    }
    if (!rainTheme) {
      localStorage.setItem('rain', 'enabled')
      $('#add-theme-rain')[0].src = 'img/btn-cross-white.png'
    }
  })

  $('#add-theme-waves').click(function () {
    wavesTheme = localStorage.getItem('waves')
    if (wavesTheme && wavesTheme === 'disabled') {
      localStorage.setItem('waves', 'enabled')
      $('#add-theme-waves')[0].src = 'img/btn-cross-white.png'
    }
    if (wavesTheme && wavesTheme === 'enabled') {
      localStorage.setItem('waves', 'disabled')
      $('#add-theme-waves')[0].src = 'img/btn-plus-white.png'
    }
    if (!wavesTheme) {
      localStorage.setItem('waves', 'enabled')
      $('#add-theme-waves')[0].src = 'img/btn-cross-white.png'
    }
  })
}
