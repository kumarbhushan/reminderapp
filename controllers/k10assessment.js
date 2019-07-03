
var storedAssessmentDate = localStorage.getItem('timestamp')
var dayDifference = Math.floor((+new Date() - storedAssessmentDate) / 1000 / 60 / 60 / 24)
if (storedAssessmentDate == undefined || storedAssessmentDate == 'undefined') {
  $('#k10AssessmentEnable').show()
} else {
  if (dayDifference > 41) {
    $('#k10AssessmentEnable').show()
    $('#k10AssessmentDisble').hide()
    $('#k10StartBtn').show()
  } else {
    $('#k10AssessmentEnable').hide()
    $('#k10AssessmentDisble').show()
    $('#k10StartBtn').hide()
  }
}
