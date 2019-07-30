/* accordion */

function accordion (id) {
  var x = document.getElementById(id)
  if (x.className.indexOf('info-show') == -1) {
      x.className += 'info-show'
    } else {
      x.className = x.className.replace('info-show', '')
    }
}
