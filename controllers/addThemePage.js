
// sets the format of returned value
var gallery
var pictureSource
var destinationType
var shortName = 'WebSqlDB'
var version = '1.0'
var displayName = 'WebSqlDB'
var maxSize = 4.9 * 1024 * 1024
function createThemeTable () {
  if (!window.openDatabase) {
      console.log('Databases are not supported in this browser.')
      return
    }
  db.transaction(function (tx) {
      tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Theme(UId INTEGER NOT NULL PRIMARY KEY, ThemeURI TEXT NOT NULL, ThemeTitle TEXT NOT NULL)',
            [], nullHandler, errorHandler)
    }, errorHandler, successCallBack)
  console.log('table created')
    //
}
function GetThemeFromDB () {
  if (!window.openDatabase) {
      console.log('Databases are not supported in this browser.')
      return
    }
  db.transaction(function (transaction) {
      transaction.executeSql('SELECT ThemeURI, ThemeTitle FROM Theme', [], function (transaction,
            results) {
            //

          if (results.rows.length) {
                //
              console.log(results)

              console.log(results)
                //
              $('#themeItem').empty()
              for (var i = 0; i < results.rows.length; i++) {
                    //

                    // localStorage.setItem('add-theme-' + i, "enabled");
                  var cusTheme = localStorage.getItem('add-theme-' + i)
                    // alert(cusTheme  );
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
                // openGallery();
            } else {
                //
              console.log('GetThemeFromDB - no Image in db')
                // openGallery();
            }
        })
    })
}
function GetThemeFromDBHomePage () {
  if (!window.openDatabase) {
      console.log('Databases are not supported in this browser.')
      return
    }
  db.transaction(function (transaction) {
      transaction.executeSql('SELECT ThemeURI, ThemeTitle FROM Theme', [], function (transaction,
            results) {
            //

          if (results.rows.length) {
                //
              console.log(results)

              console.log(results)
                //
              $('#carousel').empty()
              $('#carousel').append(
                    '<ons-carousel-item id="ons-carousel-item1">' +
                    '<div class="video_contain" value="lake" style="text-align: center; font-size: 30px;  color: #fff;">' +
                    '<img src="videos/sunsine.gif">' +
                    '<audio id="audio_1" loop>' +
                    '<source src="audio/sunrise.mp3" type="audio/mpeg"></audio>' +
                    '</div>' +
                    '</ons-carousel-item>' +
                    '<ons-carousel-item id="ons-carousel-item2">' +
                    '<div class="video_contain" value="lake" style="text-align: center; font-size: 30px;  color: #fff;">' +
                    '<img src="videos/ripples.gif">' +
                    '<audio id="audio_2" loop>' +
                    '<source src="audio/ripples.mp3" type="audio/mpeg"></audio>' +
                    '</div>' +
                    '</ons-carousel-item>' +
                    '<ons-carousel-item id="ons-carousel-item3">' +
                    '<div class="video_contain" value="lake" style="text-align: center; font-size: 30px;  color: #fff;">' +
                    '<img src="videos/shells.gif">' +
                    '<audio id="audio_3" loop>' +
                    '<source src="audio/shells.mp3" type="audio/mpeg"></audio>' +
                    '</div>' +
                    '</ons-carousel-item>')

              for (var i = 0; i < results.rows.length; i++) {
                    //

                  var cusTheme = localStorage.getItem('add-theme-' + i)
                    // alert(cusTheme);
                  if (cusTheme == 'enabled') {
                      $('#carousel').append('<ons-carousel-item id ="' + i + 6 +
                            '"><div  class="video_contain" value="waves" style="text-align: center; font-size: 30px;  color: #fff;"><img class="gif" src="' +
                            results.rows.item(i).ThemeURI +
                            '"></div></ons-carousel-item>')
                    }
                }
                // openGallery();
            } else {
                //
              console.log('GetThemeFromDB - no Image in db')
                // openGallery();
            }
        })
    })
}
function CheckThemeInDB (imageURI) {
  if (!window.openDatabase) {
      console.log('Databases are not supported in this browser.')
      return
    }
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
}
function AddThemeToDB (imageURI) {
  if (!window.openDatabase) {
      console.log('Databases are not supported in this browser.')
      return
    }
  db.transaction(function (transaction) {
        //
      transaction.executeSql('INSERT INTO Theme(ThemeURI, ThemeTitle) VALUES (?,?)', [imageURI, $(
            '#themeTitle').val()], function (transaction, imageURI) {
                //
                // $('#themeItem').append($('<div class="common-theme" style="background:url('+imageURI+'); background-size: cover;"><div class="contact-gradient"></div><div class="contactname">'+$('#themeTitle').val()+'</div><img src="img/btn-cross-white.png"  class="btn-select-theme" id="add-theme-lake"></div>'));
              $('#AddTheme').hide()
              $('.contents').hide()
              $('#theme').show()
              $('#themeTitle').val('')
                // location.reload(true);
              GetThemeFromDB()
                // nullHandler,errorHandler, successCallBack
            }, errorHandler, successCallBack

        )
    })
    // console.log("table populated");

    // openGallery();
}
function DeleteThemeFromDB (imageURI) {
  if (!window.openDatabase) {
      console.log('Databases are not supported in this browser.')
      return
    }
  db.transaction(function (transaction) {
      transaction.executeSql('DELETE FROM Theme WHERE ThemeURI=?', [imageURI], nullHandler,
            errorHandler, successCallBack)
    }, errorHandler, successCallBack)
    // console.log("table populated");
}
document.addEventListener('deviceready', onDeviceReadyAddThemePage, false)
function onDeviceReadyAddThemePage () {
  console.log('device Ready')
  console.log(cordova.file)
  db = openDatabase(shortName, version, displayName, maxSize)
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
      fileSys.root.getDirectory('Re-Minder', {
          create: true,
          exclusive: false
        }, function (dir) {
          console.log('Created dir ' + dir.name)
        }, function (error) {
          console.log('Error creating directory ' + fileErrorCode(error.code))
        })
    })
  pictureSource = navigator.camera.PictureSourceType
  destinationType = navigator.camera.DestinationType
  console.log(pictureSource)
  console.log(destinationType)
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
  StatusBar.hide()
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
  location.reload(true)
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
  console.log(imageData)
    // var image = document.getElementById('myImage');
    // image.style.display = 'block';
    // image.src =imageData;
    // console.log(imageData);
    // CheckImageInDB(imageData);
  moveTheme(imageData)
}
function getPhotoFromAlbumTheme () {
  console.log(pictureSource)
  console.log(destinationType)
  navigator.camera.getPicture(onPhotoURISuccessTheme, onFail, {
      quality: 50,
      correctOrientation: true,
      sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: navigator.camera.DestinationType.FILE_URI
    })
}
function onPhotoURISuccessTheme (imageURI) {
    // var image = document.getElementById('myImage');
    // image.style.display = 'block';
    // image.src = imageURI;
    // console.log(imageURI);
    // CheckImageInDB(imageURI);
  if (imageURI[0] == 'c' || imageURI[0] == 'C') {
      window.FilePath.resolveNativePath(imageURI, function (result) {
            // onSuccess code
          var correctedImageURI = 'file://' + result
          moveTheme(correctedImageURI)
        }, function (error) {
            // onError code here
        })
    } else {
      moveTheme(imageURI)
    }
}
function errorCallback () { }
function onFailTheme (message) {
  console.log('Failed because:' + message)
  location.reload(true)
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
  GetThemeFromDB()
  var popuphome = true
})
