
var shortName = 'WebSqlDB'
var version = '1.0'
var displayName = 'WebSqlDB'
var maxSize = 4.9 * 1024 * 1024
var selectedElement = ''
var answers = []

function createTable () {
  console.log('DEBUGGING: we are in the onBodyLoad() function')
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  db.transaction(function (tx) {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Plan(UId INTEGER NOT NULL PRIMARY KEY, QId INTEGER NOT NULL, AId INTEGER NOT NULL, Answer TEXT NOT NULL)',
      [], nullHandler, errorHandler)
  }, errorHandler, successCallBack)
}
function GetValueFromDB (QId, AId) {
  // alert('here');
  var answer = ''
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  db.transaction(function (transaction) {
    transaction.executeSql('SELECT Answer FROM Plan WHERE AId=? AND QId=?', [AId, QId],
      function (transaction, results) {
        if (results.rows.length) {
          console.log(results.rows.item(0).Answer)
          answer = results.rows.item(0).Answer.trim()

          if (answer != null && answer != 'undefined' && answer != '') {
            // $("#"+"Q"+QId+"A"+AId).show();
            document.getElementById('Q' + QId + 'A' + AId).style.display = 'block'
            document.getElementById('Q' + QId + 'A' + AId).innerHTML = answer
          } else {
            document.getElementById('Q' + QId + 'A' + AId).style.display = 'none'
            document.getElementById('Q' + QId + 'A' + AId).innerHTML = ''
          }
        } else {
          answer = ''
        }
      })
  })
}
function editQuestion (QId) {
  localStorage.setItem('editPlanMode', 'on')
  var editPlanStage = localStorage.setItem('planStage', (parseInt(QId) - 1))
  $('.contents').hide()
  $('#CreateMySafetyPlanQ' + QId).show()
  for (var i = 1; i < 7; i++) {
    GetValueFromDBPlan(QId, i)
  }
}
function GetContactsValueFromDB1 () {
  var contacts = []
  var contactNumbers = []
  var contactColors = []
  var contactIds = []
  var contactPic = []
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  db.transaction(function (transaction) {
    transaction.executeSql('SELECT UId, ProfilePic, ContactName, ContactNumber, ContactColor FROM Contacts',
      [],
      function (transaction, results) {
        if (results.rows.length) {
          for (var i = 0; i < results.rows.length; i++) {
            console.log(results.rows.item(i).ContactName)
            contacts.push(results.rows.item(i).ContactName)
            contactColors.push(results.rows.item(i).ContactColor)
            contactNumbers.push(results.rows.item(i).ContactNumber)
            contactIds.push(results.rows.item(i).UId)
            conactPic.push(results.rows.item(i).ProfilePic)
          }
          console.log(contacts.length)
          console.log(contactColors)
          for (var j = 0; j < contacts.length; j++) {
            /* $("#contactsNumbers").append(
                 '<div class="callcard-contact1" style="background-color:' +
                 contactColors[j] +
                 '"><div class="contact-gradient"></div><div class="contactname">' +
                 contacts[j] + '<br>' + contactNumbers[j] +
                 '</div><div><a class="callbtn" href="tel:' + contactNumbers[j] +
                 '"></a></div></div>'); */
            $('#contactsNumbers').append(
              '<div class="main-div">' +
              '<div class="img"><img style="width:90px;height:90px;border-radius:50%;" src="' + conactPic[j] + '">	</div>' +
              '<div class="head-num">' +
              '<div class="heading"><span class="cus head">' + contacts[j] + '</span></div>' +
              '<div class="num"><p>' + contactNumbers[j] +
              '</p> </div>' +
              '</div>' +
              '<div class="call-icon"><a href ="tel:' + contactNumbers[j] +
              '" ><img style="width:60px;" src="img/icon-phone.png"></a></div>' +
              '</div>'
            )
            $('#contactsNumbers1').append(
              '<div class="main-div">' +
              '<div class="img"><img style="width:90px;height:90px;border-radius:50%;" src="' + conactPic[j] + '">	</div>' +
              '<div class="head-num">' +
              '<div class="heading"><span class="cus head">' + contacts[j] + '</span></div>' +
              '<div class="num"><p>' + contactNumbers[j] +
              '</p> </div>' +
              '</div>' +
              '<div class="call-icon"><a href ="tel:' + contactNumbers[j] + '" ><img style="width:60px;" src="img/icon-phone.png"></a></div>' +
              '</div>'
            )
          }
        } else {
          contacts = []
        }
      })
  })
}
document.addEventListener('deviceready', onDeviceReadyMySafetyPlan, false)
function onDeviceReadyMySafetyPlan () {
  localStorage.setItem('editPlanMode', 'off')
  db = openDatabase(shortName, version, displayName, maxSize)
  createTable()
  for (var i = 1; i < 7; i++) {
    GetValueFromDB(1, i)
    GetValueFromDB(2, i)
    GetValueFromDB(3, i)
    GetValueFromDB(5, i)
  }
  GetContactsValueFromDB1()
}
function getShareDocument (selector) {
  var $childrens = jQuery(selector).children(),
    output = []

  jQuery.each($childrens, function (index, child) {
    var $child = jQuery(child).children().filter(function () {
      return !jQuery(this).get(0).hasAttribute('onclick') && jQuery(this).is(
        ':visible') && !jQuery(this).is('img')
    })

    if ($child.length > 0) {
      jQuery.each($child, function (index, element) {
        var $this = jQuery(element)

        if ($this.is('p') && $this.hasClass('safety-label')) { output.push('<strong>' + $this.get(0).outerHTML + '</strong>') } else { output.push($this.get(0).outerHTML) }
      })
    }
  })
  return output.join(' ')
}
$(document).on('click', '#sharethis', function () {
  var _data = $('<div>' + $('#pdfData').html() + '</div>')
  _data.find('#ignorePDF').remove()
  var data = _data.html(),
    folderPath = cordova.file.cacheDirectory,
    fileName = 'safetyPlan.pdf'
  try {
    reportGenerator.generate(data, folderPath, fileName, function (fileUrl) {
      var options = {
        message: 'share this', // not supported on some apps (Facebook, Instagram)
        subject: 'My Safety Plan', // fi. for email
        files: [
          fileUrl
        ], // an array of filenames either locally or remotely
        chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title,
        appPackageName: 'com.apple.social.facebook' // Android only, you can provide id of the App you want to share with
      }
      window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError)
    })
  } catch (ex) {
  }
})
var onSuccess = function (result) {
  console.log('Share completed? ' + result.completed)
  console.log('Shared to app: ' + result.app)
}
var onError = function (msg) {
  console.log('Sharing failed with message: ' + msg)
}
