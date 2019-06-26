var db
var shortName = 'WebSqlDB'
var version = '1.0'
var displayName = 'WebSqlDB'
var maxSize = 4.9 * 1024 * 1024
var contacts = []
var contactColors = []
var contactIds = []
var contactNumbers = []
function getContactId (contactId) {
  localStorage.setItem('editContactId', contactId)
}
function GetContactsValueFromDB () {
  var contacts = []
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }

  db.transaction(function (transaction) {
    transaction.executeSql('SELECT UId, ContactName, ContactNumber, ContactColor FROM Contacts', [], function (transaction, results) {
      if (results.rows.length) {
        for (var i = 0; i < results.rows.length; i++) {
          console.log(results.rows.item(i).ContactName)
          contacts.push(results.rows.item(i).ContactName)
          contactColors.push(results.rows.item(i).ContactColor)
          contactNumbers.push(results.rows.item(i).ContactNumber)
          contactIds.push(results.rows.item(i).UId)
        }
        console.log(contacts)
        console.log(contactColors)
        for (var j = 0; j < contacts.length; j++) {
          /* <div class="callcard-contact1">
<div class="contact-gradient"></div>
     <div class="contactname">Mum</div>
     <div><a class="callbtn"></a></div>
     <div><a href="editcontacts.html" class="editcontact"></a></div>
   </div> */
          $('#contactsNumbers').append('<div class="callcard-contact1" style="background-color:' + contactColors[j] + '"><div class="contact-gradient"></div><div class="contactname">' + contacts[j] + '<br>' + contactNumbers[j] + '</div><div><a class="callbtn" href="tel:' + contactNumbers[j] + '"></a></div><div><a onclick="getContactId(' + contactIds[j] + ');" href="editcontacts.html" class="editcontact"></a></div></div>')
        }
      } else {
        contacts = []
      }
    })
  })
}

document.addEventListener('deviceready', onDeviceReady, false)

function onDeviceReady () {
  db = openDatabase(shortName, version, displayName, maxSize)
  GetContactsValueFromDB()
}
