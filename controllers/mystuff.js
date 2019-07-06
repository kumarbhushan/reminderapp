//localStorage.clear();
// sets the format of returned value
var gallery
var pictureSource
var destinationType
var shortName = 'WebSqlDB'
var version = '1.0'
var displayName = 'WebSqlDB'
var maxSize = 4.9 * 1024 * 1024
function nullHandler () { };
function createStuffTable () {
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  db.transaction(function (tx) {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS MyStuff(UId INTEGER NOT NULL PRIMARY KEY, ImageURI)',
      [], nullHandler, errorHandler)
  }, errorHandler, successCallBack)
  console.log('table created')
}
function GetStuffFromDB () {
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  db.transaction(function (transaction) {
    transaction.executeSql('SELECT ImageURI FROM MyStuff', [], function (transaction, results) {
      if (results.rows.length) {
        $('#myStuffItemscus').empty()
        for (var i = 0; i < results.rows.length; i++) {
          $('#myStuffItemscus').append($('<img class="itemsInMyStuff" src="' +
            results.rows.item(i).ImageURI + '" style="background:url(' +
            results.rows.item(i).ImageURI +
            '); background-size: cover;">'))
        }
       // openGallery()
       if(window.viewer){
         window.viewer.update() 
       }else{
        ViewerSlider()
       }
      } else {
        $('#myStuffItemscus').empty()
        console.log('GetStuffFromDB - no Image in db')
       // openGallery()
       if(window.viewer){
        window.viewer.update() 
      }else{
       ViewerSlider()
      }
      }
    })
  })
}
function CheckImageInDB (imageURI) {
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  db.transaction(function (transaction) {
    transaction.executeSql('SELECT * FROM MyStuff WHERE ImageURI=?', [imageURI], function (
      transaction, results) {
      if (results.rows.length) {
        //
        $('#MyStuffAddPage').hide()
      } else {
        console.log('CheckImageInDB - no Image in db')
        AddImageToDB(imageURI)
      }
    })
  })
}
function AddImageToDB (imageURI) {
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  db.transaction(function (transaction) {
    transaction.executeSql('INSERT INTO MyStuff(ImageURI) VALUES (?)', [imageURI], function (
      imageURI) {
      // $('#myStuffItems').append($('<img class="itemsInMyStuff" src="'+imageURI+'"  style="background:url('+imageURI+'); background-size: cover;">'));
      $('#MyStuffAddPage').hide()
      // location.reload(true);
      GetStuffFromDB()
    })
  })
  // console.log("table populated");
  // openGallery();
}
function DeleteImageFromDB (imageURI) {
  //
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  db.transaction(function (transaction) {
    transaction.executeSql('DELETE FROM MyStuff WHERE ImageURI=?', [imageURI], nullHandler,
      errorHandler, successCallBack)
  }, errorHandler, successCallBack)
  // console.log("table populated");
  // GetStuffFromDB();
}
function createNotesTable () {
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  db.transaction(function (tx) {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Notes(UId INTEGER NOT NULL PRIMARY KEY, Title TEXT NOT NULL, Note TEXT NOT NULL)',
      [], nullHandler, errorHandler)
  }, errorHandler, successCallBack)
}
function GetNotesValueFromDB (noteUId) {
  //
  contactAdded = 0
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  db.transaction(function (transaction) {
    transaction.executeSql(
      'SELECT Title, Note FROM Notes WHERE UId=?', [
        noteUId
      ],
      function (transaction, results) {
        if (results.rows.length) {
          console.log(results.rows.item(0).ContactName)

          editTitle = results.rows.item(0).Title
          editNote = results.rows.item(0).Note
        } else {
          console.log('error: contact not found')
        }

        document.getElementById('editTitle').value = editTitle
        document.getElementById('editNote').value = editNote
        document.getElementById('noteUId').value = noteUId
      })
  })
}
function GetNotesFromDB () {
  // alert('hhh');
  var contactIds = []
  var noteTitles = []
  var noteNotes = []
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  db.transaction(function (transaction) {
    transaction.executeSql('SELECT UId, Title, Note  FROM Notes',
      [],
      function (transaction, results) {
        if (results.rows.length) {
          for (var i = 0; i < results.rows.length; i++) {
            noteTitles.push(results.rows.item(i).Title)
            noteNotes.push(results.rows.item(i).Note)
            contactIds.push(results.rows.item(i).UId)
          }

          //
          $('#notes-list').empty()
          $('#delete-notes').empty()

          for (var j = 0; j < noteTitles.length; j++) {
            $('#notes-list').append(
              '<div  class="custom-notes-edit" data-id="' + contactIds[j] + '">' +
              '<div class="border-middle"></div>' +
              '<div class=""><img class="img-button-edit" src="img/btn-edit.png"></div>' +
              '</div>' +
              '<p class="notes-label">' + noteTitles[j] + '</p>' +
              '<p class="notes-notes">' + noteNotes[j] + '</p>'
            )
            $('#delete-notes').append(

              '<p class="notes-label1">' + noteTitles[j] + '</p>' +

              '<div class="check-contact"><div id="note_' + contactIds[j] + '" class=" checkNote noteUnchecked"></div></div>'
            )
          }
          $('#notes-list').append('<div class="empty-space"></div>')
        } else {
          $('#notes-list').empty()
          $('#delete-notes').empty()
          contacts = []
          $('#notes-list').append(
            '<div style="text-align: center;" class="empty-space">Add your first Note.</div>'
          )
        }
      })
  })
}
function DeleteNotesFromDB (ContactUId) {
  // alert(ContactUId);
  db.transaction(function (transaction) {
    transaction.executeSql('DELETE FROM Notes WHERE UId=?', [ContactUId], function () {

    })
  })
}

var NoteUId = ''

function UpdateNotesValueInDB (editTitle, editNote, noteUId) {
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }

  db.transaction(function (transaction) {
    console.log('Updating')
    transaction.executeSql(
      'UPDATE Notes SET Title = ?, Note = ? WHERE UId=?',
      [editTitle, editNote, noteUId],
      function () {
        console.log('DEBUGGING: success')

        $('#notes-list').show()
        $('#edit-notes').hide()
        $('#editNewNoteBtn').hide()
        $('#add-notes-btn').show()
        GetNotesFromDB()
      })
  })
}
function InsertNoteInDB (noteTitle, noteNote) {
  console.log('inside insert')
  // alert('herein');

  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  db.transaction(function (transaction) {
    console.log('Inserting')

    transaction.executeSql(
      'INSERT INTO Notes(Title, Note) VALUES (?,?)',
      [
        noteTitle, noteNote
      ],
      function () {
        console.log('DEBUGGING: success')
        document.getElementById('addTitle').value = ''
        document.getElementById('addNote').value = ''

        GetNotesFromDB()
        $('#add-notes').hide()
        $('#notes-list').show()
        $('#addNewNoteBtn').hide()
        $('#add-notes-btn').show()
      }, errorHandlerImage, successCallBackImage)
  })
}

var shareUrlMap = ''
var onSuccessLoc = function (position) {
  // alert('zczxc');
  shareUrlMap = 'http://maps.google.com/maps?q=loc:' + position.coords.latitude + ',' +
    position.coords.longitude
}
function onErrorMap (error) {
  shareUrlMap = '';
  console.log('message: ' + error.message + '\n')
  // alert(error.code + 'message: ' + error.message + '\n');
  // $('#locationPopup').show();
}
function movePic (file) {
  window.resolveLocalFileSystemURL(file, resolveOnSuccess, resOnError)
}
function resolveOnSuccess (entry) {
  var d = new Date()
  var n = d.getTime()
  // new file name
  var newFileName = n + '.jpg'
  var imageFolder = 'Re-Minder/gallery'
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
    // The folder is created if doesn't exist
    fileSys.root.getDirectory(imageFolder, {
      create: true,
      exclusive: false
    },
      function (directory) {
        entry.moveTo(directory, newFileName, successMove, resOnError)
      },
      resOnError)
  },
    resOnError)
}
function successMove (entry) {
  // I do my insert with "entry.fullPath" as for the path
  console.log('successfull move')
  CheckImageInDB(entry.toURL())
  //
}
function resOnError (error) {
  //
  console.log(error)
  GetStuffFromDB()
  // location.reload(true);
}
function getPhotoFromCamera () {
  //alert('here');
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
    quality: 50,
    correctOrientation: true,
    sourceType: navigator.camera.PictureSourceType.CAMERA,
    destinationType: navigator.camera.DestinationType.FILE_URI
  })
}
function onPhotoDataSuccess (imageData) {
  console.log(imageData)
  // var image = document.getElementById('myImage');
  // image.style.display = 'block';
  // image.src =imageData;
  // console.log(imageData);
  // CheckImageInDB(imageData);
  movePic(imageData)
}
function getPhotoFromAlbum () {
  console.log(pictureSource)
  console.log(destinationType)
  //alert('phone');
  navigator.camera.getPicture(onPhotoURISuccess, onFail, {
    quality: 50,
    correctOrientation: true,
    sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
    destinationType: navigator.camera.DestinationType.FILE_URI
  })
}
function onPhotoURISuccess (imageURI) {
  // var image = document.getElementById('myImage');
  // image.style.display = 'block';
  // image.src = imageURI;
  // console.log(imageURI);
  // CheckImageInDB(imageURI);
  if (imageURI[0] == 'c' || imageURI[0] == 'C') {
    window.FilePath.resolveNativePath(imageURI, function (result) {
      // onSuccess code
      var correctedImageURI = 'file://' + result
      movePic(correctedImageURI)
    }, function (error) {
      // onError code here
    })
  } else {
    movePic(imageURI)
  }
}
function onFail (message) {
  console.log('Failed because:' + message)
  GetStuffFromDB()
  // location.reload(true);
}
function getPhoto (pictureSource) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onFail, {
    quality: 50,
    destinationType: destinationType.FILE_URI,
    sourceType: source
  })
}
function openGallery () {
  console.log('gallery_init')
  gallery = $('.myStuffItems img').simpleLightbox()
  console.log(gallery)
  gallery.on('show.simplelightbox', function () {
    console.log('Requested for showing')
  })
    .on('shown.simplelightbox', function () {
      console.log('Shown')
    })
    .on('close.simplelightbox', function () {
      console.log('Requested for closing')
      $('#CallConfirm').hide()
      $('#imageDeleteConfirm').hide()
      // location.reload(true);
      // gallery = $('.myStuffItems img').simpleLightbox();
    })
    .on('closed.simplelightbox', function () {
      console.log('Closed')
    })
    .on('change.simplelightbox', function () {
      console.log('Requested for change')
    })
    .on('next.simplelightbox', function () {
      console.log('Requested for next')
    })
    .on('prev.simplelightbox', function () {
      console.log('Requested for prev')
    })
    .on('nextImageLoaded.simplelightbox', function () {
      console.log('Next image loaded')
    })
    .on('prevImageLoaded.simplelightbox', function () {
      console.log('Prev image loaded')
    })
    .on('changed.simplelightbox', function () {
      console.log('Image changed')
    })
    .on('nextDone.simplelightbox', function () {
      console.log('Image changed to next')
    })
    .on('prevDone.simplelightbox', function () {
      console.log('Image changed to prev')
    })
    .on('error.simplelightbox', function (e) {
      console.log('No image found, go to the next/prev')
      console.log(e)
    })
}
function myStuffInit () {
  var DefaultImageItems = $('#myStuffItems')[0].children
  for (var key = 0; key < DefaultImageItems.length; key++) {
    // console.log(key);
    console.log(DefaultImageItems[key].id)
    if (DefaultImageItems[key].id != 'undefined' && DefaultImageItems[key].id != undefined) {
      if (localStorage.getItem(DefaultImageItems[key].id) == 'disabled') {
        $('#' + DefaultImageItems[key--].id).remove()
        // --key;
      } else {
        $('#' + DefaultImageItems[key].id).show()
      }
    }
  } 

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
  createStuffTable()
  GetStuffFromDB()
  createNotesTable() 
  GetNotesFromDB()
  //ViewerSlider()
 // openGallery()
  $('#btn-camera').click(function () {
    //alert('here');
    getPhotoFromCamera()
  })
  $('#btn-library').click(function () {
    getPhotoFromAlbum()
  })
  $(document).on('click', '.checkNote', function () {
    var id = $(this).attr('id')
    $('#' + id).toggleClass('noteChecked')
    $('#' + id).toggleClass('noteUnchecked')
    if ($('.checkNote').length == $('.noteChecked').length) {
      $('#deselect-all-notes').show()
      $('#select-all-notes').hide()
    } else {
      $('#deselect-all-notes').hide()
      $('#select-all-notes').show()
    }
  })

  $('#select-all-notes').click(function () {
    $('.checkNote').each(function (index) {
      var id = $(this).attr('id')
      $('#' + id).addClass('noteChecked')
      $('#' + id).removeClass('noteUnchecked')
    })
    $('#deselect-all-notes').show()
    $('#select-all-notes').hide()
  })
  $('#deselect-all-notes').click(function () {
    $('.checkNote').each(function (index) {
      var id = $(this).attr('id')
      $('#' + id).removeClass('noteChecked')
      $('#' + id).addClass('noteUnchecked')
    })
    $('#deselect-all-notes').hide()
    $('#select-all-notes').show()
  })

  $('#delete-selected-notes').click(function () {
    $('.noteChecked').each(function (index) {
      var id = $(this).attr('id')
      id = id.replace('note_', '')
      DeleteNotesFromDB(id)
    })

    GetNotesFromDB()
    // GetValueFromDBContact();
    $('#show-notes-list').show()
    $('#delete-selected-notes').hide()
    $('#add-notes-btn').show()
    $('#notes-list').show()
    $('#delete-notes').hide()
    $('#delete-icon-black-notes').hide()
    $('#deselect-all-notes').hide()
    $('#select-all-notes').hide()
  })

  $('#addNewNoteBtn').click(function () {
    // alert('here');
    noteTitle = document.getElementById('addTitle').value
    noteNote = document.getElementById('addNote').value
    if (noteTitle.trim() != '' && noteNote.trim() != '') {
      $('#formValidationNote').hide()
      InsertNoteInDB(noteTitle.trim(), noteNote.trim())
    } else {
      $('#formValidationNote').show()
    }
  })
  $(document).on('click', '.custom-notes-edit', function (e) {
    // alert('here');
    e.preventDefault()
    $('.commonhide').hide()
    $('#notes-list').hide()
    $('#edit-notes').show()
    $('#editNewNoteBtn').show()
    $('#add-notes-btn').hide()
    GetNotesValueFromDB($(this).data('id'))
    return false
  })

  $('#editNewNoteBtn').click(function () {
    editTitle = document.getElementById('editTitle').value
    editNote = document.getElementById('editNote').value
    noteUId = document.getElementById('noteUId').value
    if (editTitle.trim() != '' && editNote.trim() != '') {
      $('#formValidationEditNote').hide()
      UpdateNotesValueInDB(editTitle.trim(), editNote.trim(), noteUId)
    } else {
      $('#formValidationEditNote').show()
      console.log('Validation Faild')
    }
  })
}


function DeleteImage(Imageurl)
{
  $("#imageDeleteConfirm").hide(); 
          
          var isDefaultImage;
          var db;
          var shortName = 'WebSqlDB';
          var version = '1.0';
          var displayName = 'WebSqlDB';
           var imageURI = Imageurl; 
          db = openDatabase(shortName, version, displayName, maxSize);
          console.log(imageURI);
          var $currentImages = $("#myStuffItems")[0].children;
          console.log($currentImages);
          for (var i=0; i<$currentImages.length; i++){
              if ( $currentImages[i].currentSrc == imageURI){
                  
                  console.log($currentImages[i].classList);
                  $.each($currentImages[i].classList, function( index, value ) {
                    if (value=="defaultImage"){
                        isDefaultImage = "yes";
                       localStorage.setItem($currentImages[i].id, "disabled"); 
                        close(); 
                    }  
                  });  
              }
          }
  
  var DefaultImageItems = $("#myStuffItems")[0].children;
          for (var key = 0; key < DefaultImageItems.length; key++) {
               console.log(DefaultImageItems[key].id);
              if (DefaultImageItems[key].id != "undefined" && DefaultImageItems[key].id != undefined) {
                  if (localStorage.getItem(DefaultImageItems[key].id) == "disabled") {
                      $("#" + DefaultImageItems[key--].id).remove();
                      } else {
                      $("#" + DefaultImageItems[key].id).show();
                  }
              }

          }
  $("#imageDeleteConfirm").hide();
  $(".hideallimage").hide();
                  if(isDefaultImage!="yes"){
       if (!window.openDatabase) {
                     console.log('Databases are not supported in this browser.');
                     return;
                  }
                  db.transaction(function(transaction) {
                  transaction.executeSql('DELETE FROM MyStuff WHERE ImageURI=?', [imageURI], function(){
                       close();
         $("#imageDeleteConfirm").hide();
        GetStuffFromDB();
                        });
                  });
                  }  
}

function ViewerSlider(){ 
  var galley = document.getElementById('gallery');
        window.viewer = new Viewer(galley, {
          url: 'src', 
          title:false, 
          toolbar: {
      zoomIn: true,
      zoomOut: true, 
      prev: true, 
      next: true,
      rotateLeft: true,
      rotateRight: true,  
      delete: function() { 
        var button = document.createElement('button'); 
        button.className="fa fa-trash"; 
        // button.onclick = (confirm('Are you sure?'))? function(){ 
        //   window.viewer.hide(); 
        //   DeleteImage(window.viewer.image.src) 
        //   window.viewer.update(); 
        // }:''; 
        button.onclick = $('#imageDeleteConfirmNew').show(); 
        document.body.appendChild(button);
        button.click();
        document.body.removeChild(button);
      }, 
          } 
      });
      
}

document.addEventListener('deviceready', onDeviceReadyMyStuff, false)
function onDeviceReadyMyStuff () {
  console.log('device Ready')
  console.log(cordova.file)
  localStorage.setItem('editPlanMode', 'off')
  pictureSource = navigator.camera.PictureSourceType
  destinationType = navigator.camera.DestinationType
  console.log(pictureSource)
  console.log(destinationType)
  // openGallery();
  StatusBar.hide()
  navigator.geolocation.getCurrentPosition(onSuccessLoc, onErrorMap, {
    timeout: 30000
  })
  myStuffInit()
}
// Gallery codes come below
$('document').ready(function () {
  var popuphome = true
  //myStuffInit()
})
// function Viewerslider()
//      {
//       var galley = document.getElementById('gallery');
//       var viewer = new Viewer(galley, {
//         url: 'src',
//         toolbar: {
//           delete:true,
//           zoomIn: true,
//           zoomOut: true, 
//           prev: true, 
//           next: true,
//           rotateLeft: true,
//           rotateRight: true,  
//               }
//       });
//     }
