
// sets the format of returned value
var gallery
var pictureSource
var destinationType

function createThemeTable () {
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  try {
    db.transaction(function (tx) {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Theme(UId INTEGER NOT NULL PRIMARY KEY, ThemeURI TEXT NOT NULL, ThemeTitle TEXT NOT NULL)',
        [], nullHandler, errorHandler)
    }, errorHandler, successCallBack)
  } catch (error) {
    console.log('transaction_failed', error)
  }
  console.log('table created')
  //
}
function GetThemeFromDB () {
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  try {
    db.transaction(function (transaction) {
      transaction.executeSql('SELECT ThemeURI, ThemeTitle FROM Theme', [], function (transaction,
        results) {
        if (results.rows.length) {
          $('#themeItem').empty()
          for (var i = 0; i < results.rows.length; i++) {
            var cusTheme = localStorage.getItem('add-theme-' + i)
            if (cusTheme == null) {
              localStorage.setItem('add-theme-' + i, 'disabled')
              $('#themeItem').append(
                '<div class="common-theme" style="background:url(' + results
                  .rows.item(i).ThemeURI +
                '); background-size: cover;"><div class="contact-gradient"></div><div class="contactname">' +
                results.rows.item(i).ThemeTitle +
                '</div><img src="img/btn-plus-white.png"  class="btn-select-theme cus-theme" id="add-theme-' +
                i + '"></div>')
            } else {
              if (cusTheme == 'enabled') {
                $('#themeItem').append(
                  '<div class="common-theme" style="background:url(' + results
                    .rows.item(i).ThemeURI +
                  '); background-size: cover;"><div class="contact-gradient"></div><div class="contactname">' +
                  results.rows.item(i).ThemeTitle +
                  '</div><img src="img/btn-cross-white.png"  class="btn-select-theme cus-theme" id="add-theme-' +
                  i + '"></div>')
              } else {
                $('#themeItem').append(
                  '<div class="common-theme" style="background:url(' + results
                    .rows.item(i).ThemeURI +
                  '); background-size: cover;"><div class="contact-gradient"></div><div class="contactname">' +
                  results.rows.item(i).ThemeTitle +
                  '</div><img src="img/btn-plus-white.png"  class="btn-select-theme cus-theme" id="add-theme-' +
                  i + '"></div>')
              }
            }
          }
        } else {
          console.log('GetThemeFromDB - no Image in db')
        }
      })
    })
  } catch (error) {
    console.log('transaction_failed', error)
  }
}
function GetThemeFromDBHomePage () {
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  try {
    db.transaction(function (transaction) {
      transaction.executeSql('SELECT ThemeURI, ThemeTitle FROM Theme', [], function (transaction,
        results) {
        if (results.rows.length) {
          var paras = document.getElementsByClassName('new_added')
          while (paras[0]) {
            paras[0].parentNode.removeChild(paras[0])
          }
          for (var i = 0; i < results.rows.length; i++) {
            var cusTheme = localStorage.getItem('add-theme-' + i)
            if (cusTheme == 'enabled') {
              $('#carousel').append('<ons-carousel-item class="new_added" id ="' + i + 6 +
                '"><div  class="video_contain" value="waves" style="text-align: center; font-size: 30px;  color: #fff;"><img class="gif" src="' +
                results.rows.item(i).ThemeURI +
                '"></div></ons-carousel-item>')
            }
          }
        } else {
          //
          console.log('GetThemeFromDB - no Image in db')
        }
      })
    })
  } catch (error) {
    console.log('transaction_failed', error)
  }
}
function CheckThemeInDB (imageURI) {
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  try {
    db.transaction(function (transaction) {
      transaction.executeSql('SELECT * FROM Theme WHERE ThemeURI=?', [imageURI], function (
        transaction, results) {
        if (results.rows.length) {
          //
          $('#AddTheme').hide()
        } else {
          //
          console.log('CheckThemeInDB - no Image in db')
          AddThemeToDB(imageURI)
        }
      })
    })
  } catch (error) {
    console.log('transaction_failed', error)
  }
}
function AddThemeToDB (imageURI) {
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  try {
    db.transaction(function (transaction) {
      //
      transaction.executeSql('INSERT INTO Theme(ThemeURI, ThemeTitle) VALUES (?,?)', [imageURI, $(
        '#themeTitle').val()], function (transaction, imageURI) {
          //
          // $('#themeItem').append($('<div class="common-theme" style="background:url('+imageURI+'); background-size: cover;"><div class="contact-gradient"></div><div class="contactname">'+$('#themeTitle').val()+'</div><img src="img/btn-cross-white.png"  class="btn-select-theme" id="add-theme-lake"></div>'));
          $('#AddTheme').hide()
          $('.contents').hide()
          $('.tab-content').hide()
          GetThemeFromDB()
          $('#theme-tab').show()
          $('#MyStuff').show()
          $('.tabs').removeClass('activeTab')
          $('#theme-tab-nav').addClass('activeTab')

          $('#themeTitle').val('')
          // location.reload(true);
          // nullHandler,errorHandler, successCallBack
        }, errorHandler, successCallBack

      )
    })
  } catch (error) {
    console.log('transaction_failed', error)
  }
  // console.log("table populated");

  // openGallery();
}
function DeleteThemeFromDB (imageURI) {
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  try {
    db.transaction(function (transaction) {
      transaction.executeSql('DELETE FROM Theme WHERE ThemeURI=?', [imageURI], nullHandler,
        errorHandler, successCallBack)
    }, errorHandler, successCallBack)
  } catch (error) {
    console.log('transaction_failed', error)
  }
  // console.log("table populated");
}
document.addEventListener('deviceready', onDeviceReadyAddThemePage, false)
function onDeviceReadyAddThemePage () {
  console.log('device Ready_AddThemePage')
  StatusBar.hide()
  addThemePageInit()
}
function addThemePageInit () {
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function () { }, resOnError)
  pictureSource = navigator.camera.PictureSourceType
  destinationType = navigator.camera.DestinationType
  createThemeTable()
  GetThemeFromDBHomePage()
  GetThemeFromDB()
  $('#btn-camera-theme').click(function () {
    getPhotoFromCameraTheme()
  })
  $('#btn-library-theme').click(function () {
    getPhotoFromAlbumTheme()
  })
  $('#addNewThemeBtn').click(function (e) {
    e.preventDefault()
    themeTitle = document.getElementById('themeTitle').value

    if (themeTitle.trim() != '') {
      $('#AddTheme').show()
    } else {
      $('#themeformValidation').show()
      console.log('Validation Faild')
    }
  })
}
function moveTheme (file) {
  window.resolveLocalFileSystemURL(file, resolveOnSuccessTheme, resOnError)
}
function resolveOnSuccessTheme (entry) {
  var d = new Date()
  var n = d.getTime()
  // new file name
  var newFileName = n + '.jpg'
  var imageFolder = 'Re-Minder/theme'
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
    // The folder is created if doesn't exist
    fileSys.root.getDirectory(imageFolder, {
      create: true,
      exclusive: false
    },
      function (directory) {
        entry.moveTo(directory, newFileName, successMoveTheme, resOnError)
      }, resOnError)
  }, resOnError)
}
function successMoveTheme (entry) {
  // I do my insert with "entry.fullPath" as for the path
  console.log('successfull move')
  CheckThemeInDB(entry.toURL())
}
function resOnError (error) {
  console.log(error)
}
function getPhotoFromCameraTheme () {
  navigator.camera.getPicture(onPhotoDataSuccessTheme, onFailTheme, {
    quality: 50,
    correctOrientation: true,
    sourceType: navigator.camera.PictureSourceType.CAMERA,
    destinationType: navigator.camera.DestinationType.FILE_URI
  })
}
function onPhotoDataSuccessTheme (imageData) {
  moveTheme(imageData)
}
function getPhotoFromAlbumTheme () {
  console.log(pictureSource)
  console.log(destinationType)
  navigator.camera.getPicture(onPhotoURISuccessTheme, onFailTheme, {
    quality: 50,
    correctOrientation: true,
    sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
    destinationType: navigator.camera.DestinationType.FILE_URI
  })
}
function onPhotoURISuccessTheme (imageURI) {
  if (imageURI[0] == 'c' || imageURI[0] == 'C') {
    window.FilePath.resolveNativePath(imageURI, function (result) {
      // onSuccess code
      var correctedImageURI = 'file://' + result
      moveTheme(correctedImageURI)
    }, function (error) {
      console.log('error:' + error)
    })
  } else {
    moveTheme(imageURI)
  }
}
function errorCallback () { }
function onFailTheme (message) {
  console.log('Failed because:' + message)
}
function getPhoto (pictureSource) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccessTheme, onFailTheme, {
    quality: 50,
    destinationType: destinationType.FILE_URI,
    sourceType: source
  })
}
// Gallery codes come below
$('document').ready(function () {
  // addThemePageInit()
  var popuphome = true
})
