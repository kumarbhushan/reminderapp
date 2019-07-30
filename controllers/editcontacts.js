
var selectedColor = ''
var ContactFullName = ''
var ContactFirstName = ''
var ContactLastName = ''
var ContactNumber = ''
var ProfilePic = ''
// var ContactColor = "";
var ContactUId = ''
var colorArray = ['#bcbec0', '#be1e2d', '#f15a29', '#1b75bc', '#009444']

function selectColor (el) {
  return selectedColor = $(el)[0].val()
}

function UpdateValueInDBContact (ContactFullName, ContactNumber, ContactColor, ContactUId) {
  // alert(ContactUId);
  var ProfilePic = $('#dummy-img-edit').attr('src')
  if (ProfilePic == 'img/btn-photo-contact.jpg') {
    ProfilePic == 'img/dummy.png'
  }
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  try {
    db.transaction(function (transaction) {
      console.log('Updating')
      transaction.executeSql(
        'UPDATE Contacts SET ContactName = ?, ContactNumber = ?, ContactColor = ?, ProfilePic = ? WHERE UId=?',
        [ContactFullName, ContactNumber, ContactColor, ProfilePic, ContactUId],
        function () {
          console.log('DEBUGGING: success')
          var planCompleted = localStorage.getItem('planCompleted')
          if (planCompleted == '0' || planCompleted == 0) {
            // document.location.href='CreateMySafetyPlanQ4.html';
            $('.contents').hide()
            $('#CreateMySafetyPlanQ4').show()
            GetContactsValueFromDB11()
          } else {
            // document.location.href='myteam.html';
            $('.contents').hide()
            $('#myteam').show()
            GetContactsValueFromDB11()
          }
        })
    })
  } catch (error) {
    console.log('transaction_failed', error)
  }
  localStorage.setItem('editContactId', '')
}

function GetValueFromDB1 (ContactUId) {
  //
  contactAdded = 0
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  try {
    db.transaction(function (transaction) {
      transaction.executeSql(
        'SELECT ContactName, ContactNumber, ProfilePic FROM Contacts WHERE UId=?', [
          ContactUId
        ],
        function (transaction, results) {
          if (results.rows.length) {
            console.log(results.rows.item(0).ContactName)

            var FullName = results.rows.item(0).ContactName
            var FullNameSplit = FullName.split(' ')
            if (FullNameSplit != undefined && FullNameSplit != 'undefined') {
              ContactFirstName = ''
              if (FullNameSplit.length > 2) {
                for (k = 0; k < FullNameSplit.length - 1; k++) {
                  if (ContactFirstName == '') {
                    ContactFirstName = FullNameSplit[k]
                  } else {
                    ContactFirstName += ' ' + FullNameSplit[k]
                  }
                }
                ContactLastName = FullNameSplit[(FullNameSplit.length) - 1]
              } else {
                ContactFirstName = FullNameSplit[0]
                ContactLastName = FullNameSplit[(FullNameSplit.length) - 1]
              }
            } else {
              ContactFirstName = FullName
              ContactLastName = ''
            }

            ContactNumber = results.rows.item(0).ContactNumber
            ProfilePic = results.rows.item(0).ProfilePic
          } else {
            console.log('error: contact not found')
          }
          document.getElementById('contactFirstName').value = ContactFirstName
          document.getElementById('contactLastName').value = ContactLastName
          document.getElementById('contactNumber').value = ContactNumber
          document.getElementById('ContactUId').value = ContactUId
          $('#dummy-img-edit').attr('src', ProfilePic)
        })
    })
  } catch (error) {
    console.log('transaction_failed', error)
  }
}

document.addEventListener('deviceready', onDeviceReadyEditContacts, false)

function onDeviceReadyEditContacts () {
  ContactUId = localStorage.getItem('editContactId')
  console.log()
  GetValueFromDB1(ContactUId)
  $('#saveContact').click(function () {
    var ContactColor = colorArray[Math.floor(Math.random() * colorArray.length)]
    ContactFirstName = document.getElementById('contactFirstName').value
    ContactLastName = document.getElementById('contactLastName').value
    ContactNumber = document.getElementById('contactNumber').value
    ContactUId = document.getElementById('ContactUId').value
    ContactFullName = ContactFirstName.trim() + ' ' + ContactLastName.trim()
    if (ContactFirstName.trim() != '' && ContactLastName.trim() != '' && ContactNumber.trim() !=
      '') {
      UpdateValueInDBContact(ContactFullName, ContactNumber.trim(), ContactColor, ContactUId)
    } else {
      $('#formValidation').show()
      console.log('Validation Faild')
    }
  })

  $('#btn-delete-contacts').click(function () {
    document.getElementById('deleteConfirm').style.display = 'block'
  })

  $('#btn-camera-image-edit').click(function () {
    getPhotoFromCameraProfilePicEdit()
  })
  $('#btn-library-image-edit').click(function () {
    getPhotoFromAlbumProfilePicEdit()
  })
}

function moveProfilePicEdit (file) {
  window.resolveLocalFileSystemURL(file, resolveOnSuccessProfilePicEdit, resOnError)
}

function resolveOnSuccessProfilePicEdit (entry) {
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
        entry.moveTo(directory, newFileName, successMoveProfilePicEdit, resOnError)
      },
      resOnError)
  },
    resOnError)
}

function successMoveProfilePicEdit (entry) {
  // I do my insert with "entry.fullPath" as for the path
  console.log('successfull move')
  // alert
  ImageUrl = entry.toURL()
  $('#dummy-img-edit').attr('src', ImageUrl)
}

function resOnError (error) {
  // alert(error.code);
  console.log(error)
  location.reload(true)
}

function getPhotoFromCameraProfilePicEdit () {
  $('#AddUserImage').hide()
  $('#AddUserImage1').hide()
  navigator.camera.getPicture(onPhotoDataSuccessProfilePicEdit, onFailProfilePicEdit, {
    quality: 50,
    correctOrientation: true,
    sourceType: navigator.camera.PictureSourceType.CAMERA,
    destinationType: navigator.camera.DestinationType.DATA_URL
  })
}

function onPhotoDataSuccessProfilePicEdit (imageData) {
  console.log(imageData)
  let base64Image = 'data:image/jpeg;base64,' + imageData
  $('#dummy-img-edit').attr('src', base64Image)
  // moveProfilePicEdit(imageData)
}

function getPhotoFromAlbumProfilePicEdit () {
  $('#AddUserImage1').hide()
  console.log(pictureSource)
  console.log(destinationType)
  navigator.camera.getPicture(onPhotoURISuccessProfilePicEdit, onFail, {
    quality: 50,
    correctOrientation: true,
    sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
    destinationType: navigator.camera.DestinationType.DATA_URL
  })
}
function onPhotoURISuccessProfilePicEdit (imageData) {
  let base64Image = 'data:image/jpeg;base64,' + imageData
  $('#dummy-img-edit').attr('src', base64Image)
  // if (imageURI[0] == 'c' || imageURI[0] == 'C') {
  //   window.FilePath.resolveNativePath(imageURI, function (result) {
  //     // onSuccess code
  //     var correctedImageURI = 'file://' + result
  //     moveProfilePicEdit(correctedImageURI)
  //   }, function (error) {
  //     // onError code here
  //   })
  // } else {
  //   moveProfilePicEdit(imageURI)
  // }
}
function onFailProfilePicEdit (message) {
  console.log('Failed because:' + message)
}
