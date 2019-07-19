// localStorage.clear();
var contactAdded = 0
var ContactName = ''
var ContactNUmber = ''
var names = []
var numbers = {}
var colorArray = ['#bcbec0', '#be1e2d', '#f15a29', '#1b75bc', '#009444']
document.addEventListener('deviceready', onDeviceReadyContacts, false)
function onDeviceReadyContacts () {
  try {
    var options = new ContactFindOptions()
    options.filter = ''          // empty search string returns all contacts
    options.multiple = true      // return multiple results
    filter = ['displayName', 'name', 'photos']   // return contact.displayName
    navigator.contacts.find(filter, onSuccessContact, onErrorContact, options)
    StatusBar.hide()
    GetValueFromDBContact()
    $('#importContactDone').click(function () {
      $('#loader').show()
      $('.selectedContact').each(function (index) {
        var ContactName = $(this).prev().prev()[0].innerText.trim()
        var ContactNumber = $(this).prev()[0].innerText.trim()
        if ($(this).prev().prev().is(':visible')) {
          // alert('here');
          AddValueToDB_new(ContactName, ContactNumber)
        }
      })
      // setTimeout(function(){
      $('#loader').hide()
      // }, 1000);
      $('#searchContact').val('')
      $('.contactList').show()
      // alert('0ut');
      var planCompleted = localStorage.getItem('planCompleted')
      if (planCompleted == '0' || planCompleted == 0) {
        // document.location.href='CreateMySafetyPlanQ4.html';
        // alert('0');
        $('.contents').hide()
        $('#CreateMySafetyPlanQ4').show()
        GetContactsValueFromDB11()
        GetValueFromDBContact()
      } else {
        if (localStorage.getItem('editPlanMode') == 'on') {
          // alert('0n');
          // document.location.href='MySafetyPlan.html';
          $('.contents').hide()
          $('#MySafetyPlan').show()
          GetContactsValueFromDB11()
          GetValueFromDBContact()
        } else {
          // alert('0ff');
          // document.location.href='myteam.html';
          $('.contents').hide()
          $('#myteam').show()
          GetContactsValueFromDB11()
          GetValueFromDBContact()
        }
      }
    })
  } catch (err) {
    alert(err)
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
      tx.executeSql('CREATE TABLE IF NOT EXISTS Contacts(UId INTEGER NOT NULL PRIMARY KEY, ContactName TEXT NOT NULL, ContactNumber TEXT NOT NULL, ContactColor TEXT NOT NULL)', [], nullHandler, errorHandler)
    }, errorHandler, successCallBack)
  } catch (error) {
    console.log('transaction_failed', error)
  }
}
function AddValueToDB_new (ContactName, ContactNumber) {
  // alert('here');
  var ImageUrl = $('#dummy-img').attr('src')
  if (ImageUrl == 'img/btn-photo-contact.jpg') {
    ImageUrl == 'img/dummy.png'
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
        /* 'INSERT INTO Contacts(ContactName, ContactNumber, ContactColor) VALUES (?,?, ?)',
          [ContactName, ContactNumber, ContactColor], */
        nullHandler,
        errorHandler,
        successCallBack
      )
    }, errorHandlerContact, successCallBackContact)
  } catch (error) {
    console.log('transaction_failed', error)
  }
  /* var contactFull = (ContactName + ContactNumber).replace(/\s+/, "") ;
  contactFull = contactFull.replace(/[\W_]+/g,"");
           console.log(contactFull);
           //$("#add"+contactFull).hide();
           $("#add"+contactFull).removeClass('addContactBtn');
           $("#add"+contactFull).addClass('selectedContact'); */
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
            console.log(contactFull)
            $('#add' + contactFull).addClass('addContactBtn')
            $('#add' + contactFull).removeClass('selectedContact')
            $('#rowId' + contactFull).hide()
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
  createTable()
  GetValueFromDBContact()
  // alert(JSON.stringify(contacts[0].photos[0].value));
  // alert(contacts);
  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].name) {  // many contacts don't have displayName
      var fullname = contacts[i].name.formatted
      names.push(fullname)
      if (contacts[i].phoneNumbers != null && contacts[i].phoneNumbers != '') {
        var phoneNumList = []
        for (var j = 0; j < 1; j++) { // contacts[i].phoneNumbers.length is replaced with 1 to avoid duplication
          if ((phoneNumList.includes(contacts[i].phoneNumbers[j].value) == false)) {
            phoneNumList.push(contacts[i].phoneNumbers[0].value)
          }
        }
        numbers[contacts[i].name.formatted] = phoneNumList
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
  console.log(orderedNumbers)
  for (var key in orderedNumbers) {
    var elementId = ''
    elementId = (key + orderedNumbers[key]).replace(/\s+/, '')
    var elementId2 = elementId.replace(/[\W_]+/g, '')
    // alert('ele'+key);

    $('#contactsList').append('<div id="rowId' + elementId2 + '" class="show-all-contact"><div class="' + 'contactList"' + '><div value="' + key + '" class="' + 'contactName inline"' + '>' + key + '</div>' + '<div hidden value="' + orderedNumbers[key] + '" class="' + 'contactNum inline "' + '>' + orderedNumbers[key] + '</div><div id="add' + elementId2 + '" class="' + 'inline addContactBtn clickable"></div></div></div>')
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
    // alert(ContactName + ' ===== '+ ContactNumber);
    // AddValueToDB(ContactName, ContactNumber);
    console.log($(this).prev().prev()[0].innerText)
    console.log($(this).prev()[0].innerText)

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
