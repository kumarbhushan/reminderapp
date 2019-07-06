
var assessmentResult = 0

function submitQ1() {
  for (var i = 0; i < 5; i++) {
    if ($('.K10Q1')[i].checked) {
      assessmentResult = assessmentResult + parseInt($('.K10Q1')[i].value)
    }
  }
}

function submitQ2() {
  for (var i = 0; i < 5; i++) {
    if ($('.K10Q2')[i].checked) {
      assessmentResult = assessmentResult + parseInt($('.K10Q2')[i].value)
    }
  }
}

function submitQ3() {
  for (var i = 0; i < 5; i++) {
    if ($('.K10Q3')[i].checked) {
      assessmentResult = assessmentResult + parseInt($('.K10Q3')[i].value)
    }
  }
}

function submitQ4() {
  for (var i = 0; i < 5; i++) {
    if ($('.K10Q4')[i].checked) {
      assessmentResult = assessmentResult + parseInt($('.K10Q4')[i].value)
    }
  }
}

function submitQ5() {
  for (var i = 0; i < 5; i++) {
    if ($('.K10Q5')[i].checked) {
      assessmentResult = assessmentResult + parseInt($('.K10Q5')[i].value)
    }
  }
}

function submitQ6() {
  for (var i = 0; i < 5; i++) {
    if ($('.K10Q6')[i].checked) {
      assessmentResult = assessmentResult + parseInt($('.K10Q6')[i].value)
    }
  }
}

function submitQ7() {
  for (var i = 0; i < 5; i++) {
    if ($('.K10Q7')[i].checked) {
      assessmentResult = assessmentResult + parseInt($('.K10Q7')[i].value)
    }
  }
}

function submitQ8() {
  for (var i = 0; i < 5; i++) {
    if ($('.K10Q8')[i].checked) {
      assessmentResult = assessmentResult + parseInt($('.K10Q8')[i].value)
    }
  }
}

function submitQ9() {
  for (var i = 0; i < 5; i++) {
    if ($('.K10Q9')[i].checked) {
      assessmentResult = assessmentResult + parseInt($('.K10Q9')[i].value)
    }
  }
}

function submitQ10() {
  for (var i = 0; i < 5; i++) {
    if ($('.K10Q10')[i].checked) {
      assessmentResult = assessmentResult + parseInt($('.K10Q10')[i].value)
    }
  }
  localStorage.setItem('timestamp', +new Date())
  localStorage.setItem('time', new Date())
  localStorage.setItem('k10', assessmentResult)
  // document.location.href = "k10results.html";
  $('.contents').hide()
  $('#k10results').show()
}

function showQ2() {
  document.getElementById('k10Ans1').style.display = 'none'
  document.getElementById('k10Ans2').style.display = 'block'
}

function showQ3() {
  document.getElementById('k10Ans2').style.display = 'none'
  document.getElementById('k10Ans3').style.display = 'block'
}

function showQ4() {
  document.getElementById('k10Ans3').style.display = 'none'
  document.getElementById('k10Ans4').style.display = 'block'
}

function showQ5() {
  document.getElementById('k10Ans4').style.display = 'none'
  document.getElementById('k10Ans5').style.display = 'block'
}

function showQ6() {
  document.getElementById('k10Ans5').style.display = 'none'
  document.getElementById('k10Ans6').style.display = 'block'
}

function showQ7() {
  document.getElementById('k10Ans6').style.display = 'none'
  document.getElementById('k10Ans7').style.display = 'block'
}

function showQ8() {
  document.getElementById('k10Ans7').style.display = 'none'
  document.getElementById('k10Ans8').style.display = 'block'
}

function showQ9() {
  document.getElementById('k10Ans8').style.display = 'none'
  document.getElementById('k10Ans9').style.display = 'block'
}

function showQ10() {
  document.getElementById('k10Ans9').style.display = 'none'
  document.getElementById('k10Ans10').style.display = 'block'
}

document.addEventListener('deviceready', onDeviceReadyK10q, false)

function onDeviceReadyK10q() {
  $('.K10Q1').click(function () {
    $('#K10SubmitQ1').show()
  })
  $('.K10Q2').click(function () {
    $('#K10SubmitQ2').show()
  })
  $('.K10Q3').click(function () {
    $('#K10SubmitQ3').show()
  })
  $('.K10Q4').click(function () {
    $('#K10SubmitQ4').show()
  })
  $('.K10Q5').click(function () {
    $('#K10SubmitQ5').show()
  })
  $('.K10Q6').click(function () {
    $('#K10SubmitQ6').show()
  })
  $('.K10Q7').click(function () {
    $('#K10SubmitQ7').show()
  })
  $('.K10Q8').click(function () {
    $('#K10SubmitQ8').show()
  })
  $('.K10Q9').click(function () {
    $('#K10SubmitQ9').show()
  })
  $('.K10Q10').click(function () {
    $('#K10SubmitQ10').show()
  })
}
