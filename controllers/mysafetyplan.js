
var selectedElement = ''
var answers = []

function createTable() {
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
function GetValueFromDB(QId, AId) {
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
function editQuestion(QId) {
  localStorage.setItem('editPlanMode', 'on')
  var editPlanStage = localStorage.setItem('planStage', (parseInt(QId) - 1))
  $('.contents').hide()
  $('#CreateMySafetyPlanQ' + QId).show()
  for (var i = 1; i < 7; i++) {
    GetValueFromDBPlan(QId, i)
  }
}
function GetContactsValueFromDB1() {
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
            for (var i = 0; i < results.rows.length; i++) {
              contacts.push(results.rows.item(i).ContactName)
              contactColors.push(results.rows.item(i).ContactColor)
              contactNumbers.push(results.rows.item(i).ContactNumber)
              contactIds.push(results.rows.item(i).UId)
              conactPic.push(results.rows.item(i).ProfilePic)
            }
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
                '<div class="img" id="main-emer-logo" ><img style="width:90px;height:90px;border-radius:50%;" src="' + conactPic[j] + '">	</div>' +
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
                '<img style="width:90px;height:90px;border-radius:50%;" src="' + conactPic[j] + '">	' +
                '<div class="head-num">' +
                '<div class="heading"><span class="cus head">' + contacts[j] + '</span></div>' +
                '<div class="num"><span>' + contactNumbers[j] +
                '</span> </div>' +
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
  } catch (error) {
    console.log('transaction_failed', error)
  }
}
document.addEventListener('deviceready', onDeviceReadyMySafetyPlan, false)
function onDeviceReadyMySafetyPlan() {
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
function getShareDocument(selector) {
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
  var _data = $('<div style="width:185px">' + $('#pdfData').html() + '</div>')
  _data.find('#ignorePDF').remove()
  _data.find('#safetyPlanImage').css({ 'width': '170px', 'margin-top': '20px' })
  _data.find('#emer-logo').remove()
  // _data.find('#head-num-pdf').remove()
  _data.find('#phn-logo').remove()
  _data.find('#main-phn-logo').remove()
  // _data.find('#emer-logo').css({
  //   'display': 'inline-block',
  //   'float': 'left',
  //   'width': '40px',
  //   'height': '35px',
  //   'padding': '0px'
  // })
  _data.find('#head-num-pdf').css({
    'display': 'inline-block',
    'float': 'left',
    'width': '120px',
    'height': '45px',
    'padding': '5px 5px'

  })

  _data.find('#emer-logo1').css('width', '40px')
  _data.find('#emer-logo1').css('height', '40px')
  _data.find('#Q1A1').css('font-size', '10px')
  _data.find('#Q1A2').css('font-size', '10px')
  _data.find('#Q1A3').css('font-size', '10px')
  _data.find('#Q1A4').css('font-size', '10px')
  _data.find('#Q1A5').css('font-size', '10px')
  _data.find('#Q1A6').css('font-size', '10px')
  _data.find('#Q1A1').css('padding-right', '10px')
  _data.find('#Q1A2').css('padding-right', '10px')
  _data.find('#Q1A3').css('padding-right', '10px')
  _data.find('#Q1A4').css('padding-right', '10px')
  _data.find('#Q1A5').css('padding-right', '10px')
  _data.find('#Q1A6').css('padding-right', '10px')
  _data.find('#que').css('padding-right', '12px')
  _data.find('#que').css('font-size', '12px')
  _data.find('#que').css('font-family', 'proxima_nova_condensedSBd')
  _data.find('#name-font').css('font-size', '10px')
  _data.find('#name-font').css('height', '10px')
  _data.find('#num-font').css('font-size', '10px')
  _data.find('#num-font').css('height', '10px')
  _data.find('#name-font').css('border-bottom', '1px solid #9ecd59')
  _data.find('#main-div-pdf').css('display', 'block')
  _data.find('#main-div-pdf').css('width', '185px')
  _data.find('#main-div-pdf').css('height', '50px')
  _data.find('#main-div-pdf').css('min-height', '50px')
  _data.find('#main-div-pdf').css('max-height', '50px')
  _data.find('#main-div-pdf').css('overflow', 'hidden')
  _data.find('#Q2A1').css('font-size', '10px')
  _data.find('#Q2A2').css('font-size', '10px')
  _data.find('#Q2A3').css('font-size', '10px')
  _data.find('#Q2A4').css('font-size', '10px')
  _data.find('#Q2A5').css('font-size', '10px')
  _data.find('#Q2A6').css('font-size', '10px')
  _data.find('#Q3A1').css('font-size', '10px')
  _data.find('#Q3A2').css('font-size', '10px')
  _data.find('#Q3A3').css('font-size', '10px')
  _data.find('#Q3A4').css('font-size', '10px')
  _data.find('#Q3A5').css('font-size', '10px')
  _data.find('#Q3A6').css('font-size', '10px')
  _data.find('#Q5A1').css('font-size', '10px')
  _data.find('#Q5A2').css('font-size', '10px')
  _data.find('#Q5A3').css('font-size', '10px')
  _data.find('#Q5A4').css('font-size', '10px')
  _data.find('#Q5A5').css('font-size', '10px')
  _data.find('#Q5A6').css('font-size', '10px')
  _data.find('#QSet7').css('font-size', '12px')

  let data = _data.html()
  let folderPath = cordova.file.cacheDirectory
  let fileName = 'safetyPlan.pdf'
  try {
    reportGenerator.generate(data, folderPath, fileName, function (fileUrl) {
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
    })
  } catch (ex) {
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
