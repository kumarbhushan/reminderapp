
$(document).ready(function () {
  var k10_results = localStorage.getItem('k10')
  if (k10_results > 9 && k10_results < 16) {
    $('#results-low').show()
    $('#results-high').hide()
    $('#results-medium').hide()
  } else if (k10_results > 15 && k10_results < 30) {
    $('#results-medium').show()
    $('#results-low').hide()
    $('#results-high').hide()
  } else {
    $('#results-high').show()
    $('#results-low').hide()
    $('#results-medium').hide()
  }
})

            // }
