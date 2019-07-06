
var selectedColor = ''
var ContactFullName = ''
var ContactFirstName = ''
var ContactLastName = ''
var ContactNumber = ''
var ContactColor = ''
var ContactUId = ''

var shortName = 'WebSqlDB'
var version = '1.0'
var displayName = 'WebSqlDB'
var maxSize = 4.9 * 1024 * 1024
var colorArray = ['#bcbec0', '#be1e2d', '#f15a29', '#1b75bc', '#009444']

function selectColor (el) {
  return selectedColor = el.value
}

function errorHandler (transaction, error) {
  console.log('Error: ' + error.message + ' code: ' + error.code)
}

function successCallBack () {
  console.log('DEBUGGING: success')
  //
}

function errorHandlerImage (transaction, error) {
  alert('***' + error)
}

function successCallBackImage () {
  console.log('DEBUGGING: success')
}

function InsertDBSuccessCallBack () {

}

function nullHandler () { };

function createTable () {
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  db.transaction(function (tx) {
    tx.executeSql('DROP TABLE IF EXISTS Contacts')
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Contacts(UId INTEGER NOT NULL PRIMARY KEY, ContactName TEXT NOT NULL, ContactNumber TEXT NOT NULL,ProfilePic TEXT NOT NULL, ContactColor TEXT NOT NULL)',
      [], nullHandler, errorHandler)
  }, errorHandler, successCallBack)
}

function InsertValueInDB (ContactFullName, ContactNumber, ContactColor, ImageUrl) {
  console.log('inside insert')
  // alert('herein');

  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  db.transaction(function (transaction) {
    console.log('Inserting')

    transaction.executeSql(
      'INSERT INTO Contacts(ContactName, ContactNumber, ContactColor, ProfilePic) VALUES (?,?, ?, ?)',
      [
        ContactFullName, ContactNumber, ContactColor, ImageUrl
      ],
      function () {
        console.log('DEBUGGING: success')
        document.getElementById('addContactFirstName').value = ''
        document.getElementById('addContactLastName').value = ''
        document.getElementById('addContactNumber').value = ''
        $('#dummy-img').attr('src', 'img/btn-photo-contact.png')
        var planCompleted = localStorage.getItem('planCompleted')
        GetContactsValueFromDB11()
        $('#ContactsAddPage1').hide()
        if (planCompleted == '0' || planCompleted == 0) {
          // document.location.href='CreateMySafetyPlanQ4.html';
          $('.contents').hide()
          $('#CreateMySafetyPlanQ4').show()
        } else {
          // document.location.href='myteam.html';
          $('.contents').hide()
          //  $("#myteam").load( document.URL +"#myteam");
          $('#myteam').show()
        }
      }, errorHandlerImage, successCallBackImage)
  })
}

document.addEventListener('deviceready', onDeviceReadyAddContacts, false)

function onDeviceReadyAddContacts () {
  var ImageUrl = ''
  db = openDatabase(shortName, version, displayName, maxSize)
  createTable()
  $('#addNewContactBtn').click(function () {
    // alert('here');
    // ContactColor = selectedColor;
    var ContactColor = colorArray[Math.floor(Math.random() * colorArray.length)]
    console.log(document.getElementById('addContactFirstName').value)
    ContactFirstName = document.getElementById('addContactFirstName').value
    ContactLastName = document.getElementById('addContactLastName').value
    ContactNumber = document.getElementById('addContactNumber').value
    ContactFullName = ContactFirstName.trim() + ' ' + ContactLastName.trim()
    ImageUrl = $('#dummy-img').attr('src')
    if (ImageUrl == 'img/btn-photo-contact.png') {
      ImageUrl == 'img/dummy.png'
    }

    if (ContactFirstName.trim() != '' && ContactLastName.trim() != '' && ContactNumber.trim() !=
      '' && ImageUrl != '') {
      // alert('if');
      $('#formValidationerr').hide()
      InsertValueInDB(ContactFullName, ContactNumber.trim(), ContactColor.trim(), ImageUrl)
    } else {
      // alert('iwwf');
      $('#formValidationerr').show()
      console.log('Validation Faild')
    }
  })

  $('#btn-camera-image').click(function () {
    getPhotoFromCameraProfilePic()
  })
  $('#btn-library-image').click(function () {
    getPhotoFromAlbumProfilePic()
  })
}

function moveProfilePic (file) {
  window.resolveLocalFileSystemURL(file, resolveOnSuccessProfilePic, resOnError)
}

function resolveOnSuccessProfilePic (entry) {
  var d = new Date()
  var n = d.getTime()
  // new file name
  var newFileName = n + '.jpg'
  var imageFolder = 'Re-Minder/profile_pic'

  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
    // The folder is created if doesn't exist
    fileSys.root.getDirectory(imageFolder, {
      create: true,
      exclusive: false
    },
      function (directory) {
        entry.moveTo(directory, newFileName, successMoveProfilePic, resOnError)
      },
      resOnError)
  },
    resOnError)
}

function successMoveProfilePic (entry) {
  // I do my insert with "entry.fullPath" as for the path
  console.log('successfull move')
  // alert
  ImageUrl = entry.toURL()
  $('#dummy-img').attr('src', ImageUrl)
  // CheckThemeInDB(entry.toURL());
  //
}

function resOnError (error) {
  //
  console.log(error)
  location.reload(true)
}

function getPhotoFromCameraProfilePic () {
  $('#AddUserImage').hide()
  navigator.camera.getPicture(onPhotoDataSuccessProfilePic, onFailProfilePic, {
    quality: 50,
    correctOrientation: true,
    sourceType: navigator.camera.PictureSourceType.CAMERA,
    destinationType: navigator.camera.DestinationType.FILE_URI
  })
}

function onPhotoDataSuccessProfilePic (imageData) {
  console.log(imageData)

  // var image = document.getElementById('myImage');
  // image.style.display = 'block';
  // image.src =imageData;
  // console.log(imageData);
  // CheckImageInDB(imageData);
  moveProfilePic(imageData)
}

function getPhotoFromAlbumProfilePic () {
  $('#AddUserImage').hide()
  console.log(pictureSource)
  console.log(destinationType)
  navigator.camera.getPicture(onPhotoURISuccessProfilePic, onFail, {
    quality: 50,
    correctOrientation: true,
    sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
    destinationType: navigator.camera.DestinationType.FILE_URI
  })
}

function onPhotoURISuccessProfilePic (imageURI) {
  // var image = document.getElementById('myImage');
  // image.style.display = 'block';
  // image.src = imageURI;
  // console.log(imageURI);
  // CheckImageInDB(imageURI);
  if (imageURI[0] == 'c' || imageURI[0] == 'C') {
    window.FilePath.resolveNativePath(imageURI, function (result) {
      // onSuccess code
      var correctedImageURI = 'file://' + result
      moveProfilePic(correctedImageURI)
    }, function (error) {
      // onError code here
    })
  } else {
    moveProfilePic(imageURI)
  }
}

function errorCallback () { }

function onFailProfilePic (message) {
  console.log('Failed because:' + message)
  location.reload(true)
}

function getPhoto (pictureSource) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccessProfilePic, onFailProfilePic, {
    quality: 50,
    destinationType: destinationType.FILE_URI,
    sourceType: source
  })
}

/* document.addEventListener('init', function(event) {
var page = event.target;

if (page.id === 'page1') {
page.querySelector('#push-button').onclick = function() {
  document.querySelector('#myNavigator').pushPage('page2.html', {data: {title: 'Page 2'}});
};
} else if (page.id === 'page2') {
page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
}
});
*/
