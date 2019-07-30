
function getContactId(contactId) {
  localStorage.setItem('editContactId', contactId)
  return true
}

function GetContactsValueFromDB11() {
  //

  var contacts = []
  var contactColors = []
  var contactIds = []
  var contactNumbers = []
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
            // alert(JSON.stringify(results.rows));
            for (var i = 0; i < results.rows.length; i++) {
              console.log(results.rows.item(i).ContactName)
              contacts.push(results.rows.item(i).ContactName)
              contactNumbers.push(results.rows.item(i).ContactNumber)
              contactColors.push(results.rows.item(i).ContactColor)
              contactIds.push(results.rows.item(i).UId)
              contactPic.push(results.rows.item(i).ProfilePic)
              // alert(results.rows.item(i).UId);
            }
            console.log(contacts)
            console.log(contactColors)
            //
            $('#contacts-container').empty()
            $('#delete-contacts-container').empty()
            $('#contact-data-share').empty()
            $('#contacts-container-emergency').empty()
            $('#contactsNumbers').empty()
            $('#contactsNumbers1').empty()

            for (var j = 0; j < contacts.length; j++) {
              $('#contacts-container').append(
                '<div class="main-div">' +

                '<div class="img"><img style="width:90px;height:90px;border-radius:50%;" src="' + contactPic[j] + '">	</div>' +
                '<div class="head-num">' +
                '<div class="heading"><span class="cus head">' + contacts[j] + '</span></div>' +
                '<div id="numid' + j + '" class="num"><p>' + contactNumbers[j] +
                '</p> <a onclick=" return getContactId(' +
                contactIds[j] +
                ');" data-id = "' + contactIds[j] +
                '" data-href="editcontacts" href="javascript:void();" class="custom-btn-edit"><img style="width:40px;" src="img/btn-edit.png"></a></div>' +
                '</div>' +
                '<div  class="call-icon"><a href ="tel:' + contactNumbers[j] +
                '" ><img style="width:60px;" src="img/icon-phone.png"></a><br>' +
                '<img  class="shareloc" style="width:60px;" src="img/btn-location.png">	</div>' +
                '</div>'
              )
              $('#contactsNumbers').append(
                '<div class="main-div">' +
                '<div class="img" id="main-emer-logo" ><img style="width:90px;height:90px;border-radius:50%;" src="' + contactPic[j] + '">	</div>' +
                '<div class="head-num">' +
                '<div class="heading"><span class="cus head">' + contacts[j] + '</span></div>' +
                '<div class="num"><span>' + contactNumbers[j] +
                '</span></div>' +
                '</div>' +
                '<div class="call-icon"><a href ="tel:' + contactNumbers[j] +
                '" ><img style="width:60px;" src="img/icon-phone.png"></a><br>' +
                '</div>' +
                '</div>'
              )
              $('#contactsNumbers1').append(
                '<div id="main-div-pdf" class="main-div">' +
                '<img id="emer-logo" style="width:90px;height:90px;border-radius:50%;" src="' + contactPic[j] + '">' +
                '<div id="head-num-pdf"  class="head-num">' +
                '<div class="heading"><span id="name-font" class="cus head">' + contacts[j] + '</span></div>' +
                '<div id="num-font" class="num"><span>' + contactNumbers[j] +
                '</span></div>' +
                '</div>' +
                '<div  id="main-phn-logo"  class="call-icon"><a href ="tel:' + contactNumbers[j] +
                '" ><img id="phn-logo"  style="width:60px;" src="' + iconPhone + '"></a><br>' +
                '</div>' +
                '</div>'
              )

              $('#contacts-container-emergency').append(
                '<div class="main-div">' +
                '<div class="img"><img style="width:90px;height:90px;border-radius:50%;" src="' + contactPic[j] + '">	</div>' +
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
                '<div class="img"><img style="width:90px;height:90px;border-radius:50%;" src="' + contactPic[j] + '">	</div>' +
                '<div class="head-num">' +
                '<div class="heading"><span class="cus head">' + contacts[j] + '</span></div>' +
                '<div class="num"><p>' + contactNumbers[j] +
                '</p> </div>' +
                '</div>' +
                '</div>'
              )

              var id = contactNumbers[j].replace('(', '')
              id = id.replace(')', '')
              id = id.replace('+', '')
              id = id.replace(/\s/g, '')
              $('#contact-data-share').append(
                '<div class="main-div">' +
                '<div class="check-contact"><div id="' + id + '" data-href ="' + contactNumbers[j] + '" class=" checkContactShare contactUncheckedShare"></div></div>' +
                '<div class="img"><img style="width:90px;height:90px;border-radius:50%;" src="' + contactPic[j] + '">	</div>' +
                '<div class="head-num">' +
                '<div class="heading"><span class="cus head">' + contacts[j] + '</span></div>' +
                '<div class="num"><p>' + contactNumbers[j] +
                '</p> </div>' +
                '</div>' +

                '</div>'
              )
            }
            $('#contacts-container').append('<div class="empty-space"></div>')
            $('#delete-contacts-container').append('<div class="empty-space"></div>')
          } else {
            $('#contacts-container').empty()
            $('#delete-contacts-container').empty()
            $('#contact-data-share').empty()
            $('#contacts-container-emergency').empty()
            $('#contactsNumbers').empty()
            $('#contactsNumbers1').empty()
            contacts = []
            $('#contacts-container').append(
              '<div style="text-align: center;" class="empty-space">Add your first team member.</div>'
            )
          }
        })
    })
  } catch (error) {
    console.log('transaction_failed', error)
  }
}

function DeleteContactFromDB(ContactUId) {
  try {
    db.transaction(function (transaction) {
      transaction.executeSql('DELETE FROM Contacts WHERE UId=?', [ContactUId], function () {

      })
    })
  } catch (error) {
    console.log('transaction_failed', error)
  }
}
function myTeamInit() {
  localStorage.setItem('editPlanMode', 'off')
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
    navigator.geolocation.getCurrentPosition(onSuccessLoc, onErrorMap, {
      timeout: 30000
    })
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
        // navigator.geolocation.getCurrentPosition(onSuccessLoc, onErrorMap, {
        //   timeout: 30000
        // })
        // $('#share-contacts-container').hide();
        $('#locValidation').show()
      }
    }
  })
}
document.addEventListener('deviceready', onDeviceReadyMyTheme, false)
function onDeviceReadyMyTheme() {
  StatusBar.hide()
  myTeamInit()
}
