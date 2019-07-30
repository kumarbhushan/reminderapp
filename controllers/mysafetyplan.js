
var selectedElement = ''
var answers = []

function createTable () {
  console.log('DEBUGGING: we are in the onBodyLoad() function')
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  try {
    db.transaction(function (tx) {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Plan(UId INTEGER NOT NULL PRIMARY KEY, QId INTEGER NOT NULL, AId INTEGER NOT NULL, Answer TEXT NOT NULL)',
        [], nullHandler, errorHandler)
    }, errorHandler, successCallBack)
  } catch (error) {
    console.log('transaction_failed', error)
  }
}
function GetValueFromDB (QId, AId) {
  // alert('here');
  var answer = ''
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  try {
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
  } catch (error) {
    console.log('transaction_failed', error)
  }
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
  try {
    db.transaction(function (transaction) {
      transaction.executeSql('SELECT UId, ProfilePic, ContactName, ContactNumber, ContactColor FROM Contacts',
        [],
        function (transaction, results) {
          if (results.rows.length) {
            $('#contactsNumbers').empty()
            $('#contactsNumbers1').empty()

            for (var i = 0; i < results.rows.length; i++) {
              contacts.push(results.rows.item(i).ContactName)
              contactColors.push(results.rows.item(i).ContactColor)
              contactNumbers.push(results.rows.item(i).ContactNumber)
              contactIds.push(results.rows.item(i).UId)
              contactPic.push(results.rows.item(i).ProfilePic)
            }
            for (var j = 0; j < contacts.length; j++) {
              $('#contactsNumbers').append(
                '<div class="main-div">' +
                '<div class="img" id="main-emer-logo" ><img style="width:90px;height:90px;border-radius:50%;" src="' + contactPic[j] + '">	</div>' +
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
                '<img style="width:90px;height:90px;border-radius:50%;" src="' + contactPic[j] + '">' +
                '<div class="head-num">' +
                '<div class="heading"><span class="cus head">' + contacts[j] + '</span></div>' +
                '<div class="num"><span>' + contactNumbers[j] +
                '</span> </div>' +
                '</div>' +
                '<div class="call-icon"><a href ="tel:' + contactNumbers[j] + '" ><img style="width:60px;" src="' + iconPhone + '"></a></div>' +
                '</div>'
              )
            }
          } else {
            contacts = []
          }
        })
    })
  } catch (error) {
    console.log('transaction_failed', error)
  }
}
document.addEventListener('deviceready', onDeviceReadyMySafetyPlan, false)
function onDeviceReadyMySafetyPlan () {
  localStorage.setItem('editPlanMode', 'off')
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
  $('.share-text').text('sharing...')
  $('#sharethis').hide()
  let folderPath = cordova.file.cacheDirectory
  let fileName = 'safetyPlan.pdf'
  try {
    reportGenerator.generate(folderPath, fileName, function (fileUrl) {
      // alert(fileUrl);
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
      $('.share-text').text('Share Safety Plan')
      $('#sharethis').show()
    })
  } catch (ex) {
    $('.share-text').text('Share Safety Plan')
    $('#sharethis').show()
    console.log('genratepdf', ex)
  }
})
var onSuccess = function (result) {
  console.log('Share completed? ' + result.completed)
  console.log('Shared to app: ' + result.app)
}
var onError = function (msg) {
  console.log('Sharing failed with message: ' + msg)
}
