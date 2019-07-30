// localStorage.clear();
var contactAdded = 0
var ContactName = ''
var ContactNUmber = ''
var names = []
var Contactimg = {}
var numbers = {}
var colorArray = ['#bcbec0', '#be1e2d', '#f15a29', '#1b75bc', '#009444']
document.addEventListener('deviceready', onDeviceReadyContacts, false)
function getFileContentAsBase64 (path, callback) {
  if (path && path != 'null') {
    if (path.includes('content://')) {
      window.FilePath.resolveNativePath(path, function (newPath) {
        window.resolveLocalFileSystemURL(newPath, gotFile, fail)
      }, fail)
    } else {
      window.resolveLocalFileSystemURL('file://' + path, gotFile, fail)
    }
  } else {
    callback(dummybase64)
  }

  function gotFile (fileEntry) {
    fileEntry.file(function (file) {
      var reader = new FileReader()
      reader.onloadend = function (e) {
        var content = this.result
        callback(content)
      }
      // The most important point, use the readAsDatURL Method from the file plugin
      reader.readAsDataURL(file)
    })
  }
  function fail (e) {
    console.log('Cannot found requested file', e)
  }
}
function onDeviceReadyContacts () {
  try {
    var options = new ContactFindOptions()
    options.filter = ''          // empty search string returns all contacts
    options.multiple = true      // return multiple results
    filter = ['displayName', 'name', 'photos']   // return contact.displayName
    createTable()
    GetValueFromDBContact()
    navigator.contacts.find(filter, onSuccessContact, onErrorContact, options)
    StatusBar.hide()
    GetValueFromDBContact()
    $('#importContactDone').click(function () {
      $('#loader').show()
      let count = $('.selectedContact').length
      $('.selectedContact').each(function (index) {
        var ContactName = $(this).prev().prev()[0].innerText.trim()
        var ContactNumber = $(this).prev()[0].innerText.trim()
        var contactimg = $(this).prev().prev().prev()[0].innerText.trim()
        if ($(this).prev().prev().is(':visible')) {
          getFileContentAsBase64(contactimg, function (img) {
            AddValueToDB_new(ContactName, ContactNumber, img)
            count--
            if (count == 0) {
              $('#loader').hide()
              $('#searchContact').val('')
              $('.contactList').show()
              var planCompleted = localStorage.getItem('planCompleted')
              if (planCompleted == '0' || planCompleted == 0) {
                $('.contents').hide()
                $('#CreateMySafetyPlanQ4').show()
                GetContactsValueFromDB11()
                GetValueFromDBContact()
              } else {
                if (localStorage.getItem('editPlanMode') == 'on') {
                  $('.contents').hide()
                  $('#MySafetyPlan').show()
                  GetContactsValueFromDB11()
                  GetValueFromDBContact()
                } else {
                  $('.contents').hide()
                  $('#myteam').show()
                  GetContactsValueFromDB11()
                  GetValueFromDBContact()
                }
              }
            }
          })
        }
      })
    })
  } catch (err) {
    console.log(err)
  }
}

function errorHandlerContact (transaction, error) {
  alert('Error: ' + error.message + ' code: ' + error.code)
}
function successCallBackContact () {
  console.log('DEBUGGING: success')
  // alert('Success');
}
function createTable () {
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  try {
    db.transaction(function (tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS Contacts(UId INTEGER NOT NULL PRIMARY KEY, ContactName TEXT NOT NULL, ContactNumber TEXT NOT NULL, ContactColor TEXT NOT NULL,ProfilePic TEXT  NULL)', [], nullHandler, errorHandler)
    }, errorHandler, successCallBack)
  } catch (error) {
    console.log('transaction_failed', error)
  }
}

function AddValueToDB_new (ContactName, ContactNumber, Contactimg) {
  var ImageUrl = $('#dummy-img').attr('src')
  if (ImageUrl == 'img/btn-photo-contact.jpg') {
    ImageUrl == dummybase64
  }
  if (Contactimg && Contactimg != 'null') {
    ImageUrl = Contactimg
  }
  var ContactColor = colorArray[Math.floor(Math.random() * colorArray.length)]
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  try {
    db.transaction(function (transaction) {
      transaction.executeSql(
        'INSERT INTO Contacts(ContactName, ContactNumber, ContactColor, ProfilePic) VALUES (?,?, ?, ?)',
        [
          ContactName, ContactNumber, ContactColor, ImageUrl
        ],
        nullHandler,
        errorHandler,
        successCallBack
      )
    }, errorHandlerContact, successCallBackContact)
  } catch (error) {
    console.log('transaction_failed', error)
  }
}
function GetValueFromDBContact () {
  // alert('db');
  $('.clickable').addClass('addContactBtn')
  $('.clickable').removeClass('selectedContact')
  $('.show-all-contact').show()
  contactAdded = 0
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  try {
    db.transaction(function (transaction) {
      transaction.executeSql('SELECT ContactName, ContactNumber FROM Contacts', [], function (transaction, results) {
        if (results.rows.length) {
          console.log(results)
          for (i = 0; i < results.rows.length; i++) {
            var contactFull = (results.rows.item(i).ContactName + results.rows.item(i).ContactNumber).replace(/\s+/, '')
            contactFull = contactFull.replace(/[\W_]+/g, '')

            var GetContactNumber = $('#numid' + i).children('p').text()
            if (results.rows.item(i).ContactNumber == GetContactNumber) {
              $('#add' + contactFull).addClass('addContactBtn')
              $('#add' + contactFull).removeClass('selectedContact')
              // $('#rowId' + contactFull).hide()

              var numid = GetContactNumber.replace('(', '')
              numid = numid.replace(')', '')
              numid = numid.replace('+', '')
              numid = numid.replace(/\s/g, '')

              $('.numid' + numid).hide()
            }
          }
        } else {
          contactAdded = 0
        }
      }, errorHandlerContact, successCallBackContact)
    })
  } catch (error) {
    console.log('transaction_failed', error)
  }
}
function onSuccessContact (contacts) {
  // alert(JSON.stringify(contacts[0].phoneNumbers[0].value));
  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].name) {  // many contacts don't have displayName
      var fullname = contacts[i].name.formatted

      var img = null
      if (contacts[i].photos != null) {
        img = contacts[i].photos[0].value
      }

      names.push(fullname)

      if (contacts[i].phoneNumbers != null && contacts[i].phoneNumbers != '') {
        var phoneNumList = []
        for (var j = 0; j < 1; j++) { // contacts[i].phoneNumbers.length is replaced with 1 to avoid duplication
          if ((phoneNumList.includes(contacts[i].phoneNumbers[j].value) == false)) {
            phoneNumList.push(contacts[i].phoneNumbers[0].value)
          }
        }
        numbers[contacts[i].name.formatted] = phoneNumList
        Contactimg[contacts[i].name.formatted] = img
      }
    }
  }

  var orderedNumbers = {}
  Object.keys(numbers)
    .sort()
    .forEach(function (k, v) {
      if (k != undefined && k != 'undefined') {
        orderedNumbers[k] = numbers[k]
      }
    })

  for (var key in orderedNumbers) {
    var elementId = ''
    var img = Contactimg[key]

    elementId = (key + orderedNumbers[key]).replace(/\s+/, '')
    var elementId2 = elementId.replace(/[\W_]+/g, '')
    // alert('ele'+key);
    //  alert("Key= "+key+".....Pic= "+)

    var numid = orderedNumbers[key].toString()
    numid = numid.replace('(', '')
    numid = numid.replace(')', '')
    numid = numid.replace('+', '')
    numid = numid.replace(/\s/g, '')
    $('#contactsList').append('<div id="rowId' + elementId2 + '" class="show-all-contact numid' + numid + '"><div class="' + 'contactList"' + '><div hidden>' + img + '</div><div value="' + key + '" class="' + 'contactName inline"' + '>' + key + '</div>' + '<div hidden value="' + orderedNumbers[key] + '" class="' + 'contactNum inline "' + '>' + orderedNumbers[key] + '</div><div id="add' + elementId2 + '" class="' + 'inline addContactBtn clickable"></div></div></div>')
  }

  $('#select-all-import').click(function () {
    // alert('here')
    $('#loader').show()
    $('#loader').css('display', 'inline-block')
    // $('.loader').style('display', 'block');
    setTimeout(function () {
      $('.clickable').each(function (index) {
        var ContactName = $(this).prev().prev()[0].innerText.trim()
        var ContactNumber = $(this).prev()[0].innerText.trim()
        var contactFull = (ContactName + ContactNumber).replace(/\s+/, '')
        contactFull = contactFull.replace(/[\W_]+/g, '')
        $('#add' + contactFull).removeClass('addContactBtn')
        $('#add' + contactFull).addClass('selectedContact')

        // alert('here');
      })
      $('#deselect-all-import').show()
      $('#select-all-import').hide()
      $('#loader').hide()
      $('#loader').css('display', 'none')
    }, 2000)

    //  $('.loader').css('display', 'none');
    // $('.loader').style('display', 'none');
  })
  $('#deselect-all-import').click(function () {
    $('#loader').show()
    setTimeout(function () {
      $('.clickable').each(function (index) {
        var ContactName = $(this).prev().prev()[0].innerText.trim()
        var ContactNumber = $(this).prev()[0].innerText.trim()
        var contactFull = (ContactName + ContactNumber).replace(/\s+/, '')
        contactFull = contactFull.replace(/[\W_]+/g, '')
        $('#add' + contactFull).addClass('addContactBtn')
        $('#add' + contactFull).removeClass('selectedContact')
      })
      $('#deselect-all-import').hide()
      $('#select-all-import').show()
      $('#loader').hide()
      $('#loader').css('display', 'none')
    }, 2000)
  })

  $(document).on('click', '.clickable', function () {
    // alert('Here');

    var ContactName = $(this).prev().prev()[0].innerText.trim()
    var ContactNumber = $(this).prev()[0].innerText.trim()
    var contactimg = $(this).prev().prev().prev()[0].innerText.trim()
    var contactFull = (ContactName + ContactNumber).replace(/\s+/, '')
    contactFull = contactFull.replace(/[\W_]+/g, '')
    console.log(contactFull)
    // $("#add"+contactFull).hide();
    $('#add' + contactFull).toggleClass('addContactBtn')
    $('#add' + contactFull).toggleClass('selectedContact')
    if ($('.clickable').length == $('.addContactBtn').length) {
      $('#deselect-all-import').show()
      $('#select-all-import').hide()
    } else {
      $('#deselect-all-import').hide()
      $('#select-all-import').show()
    }

    // $(this).hide();
  })
}
function onErrorContact (contactError) {
  console.log('onError!')
  var planCompleted = localStorage.getItem('planCompleted')
  if (planCompleted == '0' || planCompleted == 0) {
    // document.location.href='CreateMySafetyPlan4.html';
    $('.contents').hide()
    $('#CreateMySafetyPlanQ4').show()
    GetContactsValueFromDB11()
    GetValueFromDBContact()
  } else {
    // document.location.href='myteam.html';
    $('.contents').hide()
    $('#myteam').show()
    GetContactsValueFromDB11()
    GetValueFromDBContact()
  }
}
