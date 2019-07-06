
// var contacts = [];
// var contactColors = [];
// var contactIds = [];
// var contactNumbers = [];
var shortName = 'WebSqlDB'
var version = '1.0'
var displayName = 'WebSqlDB'
var maxSize = 4.9 * 1024 * 1024
function getContactId (contactId) {
  localStorage.setItem('editContactId', contactId)
  return true
}
function createContactsTable () {
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  db.transaction(function (tx) {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Contacts(UId INTEGER NOT NULL PRIMARY KEY, ContactName TEXT NOT NULL, ContactNumber TEXT NOT NULL, ContactColor TEXT NOT NULL)',
      [], nullHandler, errorHandler)
  }, errorHandler, successCallBack)
}

function GetContactsValueFromDB11 () {
  //

  var contacts = []
  var contactColors = []
  var contactIds = []
  var contactNumbers = []
  var conactPic = []
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  db.transaction(function (transaction) {
    transaction.executeSql('SELECT UId, ProfilePic, ContactName, ContactNumber, ContactColor FROM Contacts',
      [],
      function (transaction, results) {
        if (results.rows.length) {
          // alert(JSON.stringify(results.rows));
          for (var i = 0; i < results.rows.length; i++) {
            console.log(results.rows.item(i).ContactName)
            contacts.push(results.rows.item(i).ContactName)
            contactNumbers.push(results.rows.item(i).ContactNumber)
            contactColors.push(results.rows.item(i).ContactColor)
            contactIds.push(results.rows.item(i).UId)
            conactPic.push(results.rows.item(i).ProfilePic)
            // alert(results.rows.item(i).UId);
          }
          console.log(contacts)
          console.log(contactColors)
          //
          $('#contacts-container').empty()
          $('#delete-contacts-container').empty()
          $('#contact-data-share').empty();
          $('#contacts-container-emergency').empty()
          $('#contactsNumbers').empty()
          $('#contactsNumbers1').empty()
          
          for (var j = 0; j < contacts.length; j++) {
            // alert(j +"----" +contactIds[j]);
            /* $("#contacts-container").append(
                '<div class="callcard-contact1" style="background-color:' +
                contactColors[j] +
                '"><div class="contact-gradient"></div><div class="contactname">' +
                contacts[j] + '<br>' + contactNumbers[j] +
                '</div><div><a href="tel:' + contactNumbers[j] +
                '" class="callbtn"></a></div><div><a onclick=" return getContactId(' +
                contactIds[j] +
                ');" data-id = "' + contactIds[j] +
                '" data-href="editcontacts" href="javascript:void();" class="editcontact custom-btn-edit"></a></div></div>'
            ); */
           
            $('#contacts-container').append(
              '<div class="main-div">' +

              '<div class="img"><img style="width:90px;height:90px;border-radius:50%;" src="' + conactPic[j] + '">	</div>' +
              '<div class="head-num">' +
              '<div class="heading"><span class="cus head">' + contacts[j] + '</span></div>' +
              '<div class="num"><p>' + contactNumbers[j] +
              '</p> <a onclick=" return getContactId(' +
              contactIds[j] +
              ');" data-id = "' + contactIds[j] +
              '" data-href="editcontacts" href="javascript:void();" class="custom-btn-edit"><img style="width:40px;" src="img/btn-edit.png"></a></div>' +
              '</div>' +
              '<div class="call-icon"><a href ="tel:' + contactNumbers[j] +
              '" ><img style="width:60px;" src="img/icon-phone.png"></a><br>' +
              '<img  class="shareloc" style="width:60px;" src="img/btn-location.png">	</div>' +
              '</div>'
            )
            $('#contactsNumbers').append(
              '<div class="main-div">' +
              '<div class="img"><img style="width:90px;height:90px;border-radius:50%;" src="' + conactPic[j] + '">	</div>' +
              '<div class="head-num">' +
              '<div class="heading"><span class="cus head">' + contacts[j] + '</span></div>' +
              '<div class="num"><p>' + contactNumbers[j] +
              '</p></div>' +
              '</div>' +
              '<div class="call-icon"><a href ="tel:' + contactNumbers[j] +
              '" ><img style="width:60px;" src="img/icon-phone.png"></a><br>' +
              '</div>' +
              '</div>'
            )
            $('#contactsNumbers1').append(
              '<div class="main-div">' +
              '<div class="img"><img style="width:90px;height:90px;border-radius:50%;" src="' + conactPic[j] + '">	</div>' +
              '<div class="head-num">' +
              '<div class="heading"><span class="cus head">' + contacts[j] + '</span></div>' +
              '<div class="num"><p>' + contactNumbers[j] +
              '</p></div>' +
              '</div>' +
              '<div class="call-icon"><a href ="tel:' + contactNumbers[j] +
              '" ><img style="width:60px;" src="img/icon-phone.png"></a><br>' +
              '</div>' +
              '</div>'
            )
            $('#contacts-container-emergency').append(
              '<div class="main-div">' +
              '<div class="img"><img style="width:90px;height:90px;border-radius:50%;" src="' + conactPic[j] + '">	</div>' +
              '<div class="head-num">' +
              '<div class="heading"><span class="cus head">' + contacts[j] + '</span></div>' +
              '<div class="num"><p>' + contactNumbers[j] +
              '</p></div>' +
              '</div>' +
              '<div class="call-icon"><a href ="tel:' + contactNumbers[j] +
              '" ><img style="width:60px;" src="img/icon-phone.png"></a><br>' +
              '</div>' +
              '</div>'
            )
            $('#delete-contacts-container').append(
              '<div class="main-div">' +
              '<div class="check-contact"><div id="' + contactIds[j] + '" class=" checkContact contactUnchecked"></div></div>' +
              '<div class="img"><img style="width:90px;height:90px;border-radius:50%;" src="' + conactPic[j] + '">	</div>' +
              '<div class="head-num">' +
              '<div class="heading"><span class="cus head">' + contacts[j] + '</span></div>' +
              '<div class="num"><p>' + contactNumbers[j] +
              '</p> </div>' +
              '</div>' +

              '</div>'
            )
            $('#contact-data-share').append(
              '<div class="main-div">' +
              '<div class="check-contact"><div id="' + contactNumbers[j].replace('+', '') + '" data-href ="' + contactNumbers[j] + '" class=" checkContactShare contactUncheckedShare"></div></div>' +
              '<div class="img"><img style="width:90px;height:90px;border-radius:50%;" src="' + conactPic[j] + '">	</div>' +
              '<div class="head-num">' +
              '<div class="heading"><span class="cus head">' + contacts[j] + '</span></div>' +
              '<div class="num"><p>' + contactNumbers[j] +
              '</p> </div>' +
              '</div>' +

              '</div>'
            )
          }
          //         $("#contact-data-share").append(
          //         '<div class="btn-done2" value="Done" id="sharelocationWithusers"  >Done</div>'+
          // '<div class="btn-done2" value="Cancel" id="closeShare" >Cancel</div>'

          //         );
          $('#contacts-container').append('<div class="empty-space"></div>')
          $('#delete-contacts-container').append('<div class="empty-space"></div>')
          // $("#contacts-container").append('<div class="empty-space"></div>');
        } else {
          // alert('``````````');
          $('#contacts-container').empty()
          $('#delete-contacts-container').empty()
          $('#contact-data-share').empty()
          contacts = []
          $('#contacts-container').append(
            '<div style="text-align: center;" class="empty-space">Add your first team member.</div>'
          )
        }
      })
  })
}

function DeleteContactFromDB (ContactUId) {
  // alert(ContactUId);
  db.transaction(function (transaction) {
    transaction.executeSql('DELETE FROM Contacts WHERE UId=?', [ContactUId], function () {
      // document.getElementById("deleteConfirm").style.display = "none";
      // goBack();
    })
  })
}
function myTeamInit () {
  localStorage.setItem('editPlanMode', 'off')
  db = openDatabase(shortName, version, displayName, maxSize)
  createContactsTable()
  GetContactsValueFromDB11()
  $(document).on('click', '.checkContact', function () {
    var id = $(this).attr('id')
    // alert(id);
    $('#' + id).toggleClass('contactChecked')
    $('#' + id).toggleClass('contactUnchecked')
    if ($('.checkContact').length == $('.contactChecked').length) {
      $('#deselect-all-contacts').show()
      $('#select-all-contacts').hide()
    } else {
      $('#deselect-all-contacts').hide()
      $('#select-all-contacts').show()
    }
  })

  $(document).on('click', '#closeShare', function () {
    $('#share-contacts-container').hide()
    $('#shareValidation').hide()
    $('#locValidation').hide()
  })
  $(document).on('click', '.checkContactShare', function () {
    var id = $(this).attr('id')

    // alert(id);
    $('#' + id).toggleClass('contactCheckedShare')
    $('#' + id).toggleClass('contactUncheckedShare')
  })

  $('#delete-selected').click(function () {
    // alert('here1');
    $('.contactChecked').each(function (index) {
      // alert('here2');
      var id = $(this).attr('id')
      DeleteContactFromDB(id)
    })
    // alert('here3');

    $('#show-contact-list').show()
    $('#delete-selected').hide()
    $('#add-btn').show()
    $('#contacts-container').show()
    $('#delete-contacts-container').hide()
    $('#delete-icon-black').hide()
    $('#deselect-all-contacts').hide()
    $('#select-all-contacts').hide()
    GetContactsValueFromDB11()
    GetValueFromDBContact()
  })

  $('#select-all-contacts').click(function () {
    $('.checkContact').each(function (index) {
      var id = $(this).attr('id')
      $('#' + id).addClass('contactChecked')
      $('#' + id).removeClass('contactUnchecked')
    })
    $('#deselect-all-contacts').show()
    $('#select-all-contacts').hide()
  })
  $('#deselect-all-contacts').click(function () {
    $('.checkContact').each(function (index) {
      var id = $(this).attr('id')
      $('#' + id).removeClass('contactChecked')
      $('#' + id).addClass('contactUnchecked')
    })
    $('#deselect-all-contacts').hide()
    $('#select-all-contacts').show()
  })
  $(document).on('click', '.shareloc', function () {
    $('#share-contacts-container').show()
    $('.checkContactShare').addClass('contactUncheckedShare').removeClass('contactCheckedShare')
  })
  $(document).on('click', '#sharelocationWithusers', function (e) {
    // var onSuccessLoc = function (position) {
    // alert('here');
    var numbers = ''
    $('.contactCheckedShare').each(function (index) {
      var id = $(this).attr('id')
      if (numbers == '') {
        numbers = id
      } else {
        numbers += ',' + id
      }
    })
    if (numbers == '') {
      $('#shareValidation').show()
      $('#locValidation').hide()
    } else {
      $('#shareValidation').hide()
      if (shareUrlMap !== '') {
        $('#locValidation').hide()
        window.plugins.socialsharing.shareViaSMS(shareUrlMap, numbers, function (msg) { $('#share-contacts-container').hide(); $('#shareSuccess').hide(); console.log('ok: ' + msg) }, function (msg) { alert('error: ' + msg) })
      } else {
        navigator.geolocation.getCurrentPosition(onSuccessLoc, onErrorMap, {
          timeout: 30000
        })
        // $('#share-contacts-container').hide();
        $('#locValidation').show()
      }
    }
  })
}
document.addEventListener('deviceready', onDeviceReadyMyTheme, false)
async function onDeviceReadyMyTheme () {
  StatusBar.hide()
  myTeamInit()
}
