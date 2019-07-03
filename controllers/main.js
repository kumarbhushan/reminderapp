function navigate () {
  var planCompleted = localStorage.getItem('planCompleted')
  if (planCompleted == '1' || planCompleted == 1) {
    $('.contents').hide()
    $('#Home').show()
    $('#inner-header').show()
    $('.topnav').show()
    $('.botnav-container').show()
  } else {
    $('.contents').hide()
    $('#CreateMySafetyPlanQ1').show()
    $('#QQ1A1').focus()
    $('#inner-header').show()
  }
}
function qnavigate (que) {
  $('.contents').hide()
  $('#CreateMySafetyPlanQ1').hide()
  $('#CreateMySafetyPlanQ2').hide()
  $('#CreateMySafetyPlanQ3').hide()
  $('#CreateMySafetyPlanQ4').hide()
  $('#CreateMySafetyPlanQ5').hide()
  $('#CreateMySafetyPlanQ6').hide()
  $('#CreateMySafetyPlanQ7').hide()
  $('#' + que).show()
}
if ((localStorage.getItem('emoji') != 'emoji1') && (localStorage.getItem('emoji') != 'emoji2') && (
  localStorage.getItem('emoji') != 'emoji3')) {
  localStorage.setItem('emoji', 'emoji2')
}
localStorage.setItem('editPlanMode', 'off')
if (localStorage.getItem('lake') != 'disabled') {
  localStorage.setItem('lake', 'enabled')
}
if (localStorage.getItem('sunset') != 'disabled') {
  localStorage.setItem('sunset', 'enabled')
}
if (localStorage.getItem('flowers') != 'disabled') {
  localStorage.setItem('flowers', 'enabled')
}
if (localStorage.getItem('rain') != 'disabled') {
  localStorage.setItem('rain', 'enabled')
}
if (localStorage.getItem('waves') != 'disabled') {
  localStorage.setItem('waves', 'enabled')
}
if (localStorage.getItem('planCompleted') != '1' && localStorage.getItem('planCompleted') != 1) {
  document.getElementById('btn-start').style.display = 'block'
  localStorage.setItem('planCompleted', '0')
}
if (localStorage.getItem('planCompleted') == '1' || localStorage.getItem('planCompleted') == 1) {
  // document.location.href = "home.html";
  $('.contents').hide()
  $('#Home').show()
  $('#inner-header').show()
  $('.topnav').show()
  $('.botnav-container').show()
}
function errorHandler (transaction, error) {
  console.log('Error: ' + error.message + ' code: ' + error.code)
}
function successCallBack () {
  console.log('DEBUGGING: success')
}
function nullHandler () { };
document.addEventListener('deviceready', onDeviceReady, false)
// PhoneGap is ready
//
function onDeviceReady () {
  var popuphome = true
  // StatusBar.hide();
}
function cancelCall () {
  document.getElementById('CallConfirm').style.display = 'none'
}

function call () {
  document.getElementById('CallConfirm').style.display = 'block'

  console.log('call')
}
$(document).on('click', '.cus-theme', function (e) {
  //
  // e.preventDefault();

  id = $(this).attr('id')
  cusTheme = localStorage.getItem(id)
  if (cusTheme && cusTheme == 'disabled') {
    localStorage.setItem(id, 'enabled')
    $('#' + id)[0].src = 'img/btn-cross-white.png'
  }
  if (cusTheme && cusTheme == 'enabled') {
    localStorage.setItem(id, 'disabled')
    $('#' + id)[0].src = 'img/btn-plus-white.png'
  }
  if (!cusTheme) {
    localStorage.setItem(id, 'enabled')
    $('#' + id)[0].src = 'img/btn-cross-white.png'
  }
  GetThemeFromDBHomePage()
  newInit()
  return false
})

$(document).ready(function (e) {
  var page
  var prevPage
  var contentType = 'video/mp4'
  try {
    document.getElementById('audio_1').play()
    var blob = b64toBlob(v_flowers, contentType)
    var blobUrl = URL.createObjectURL(blob)
    document.getElementById('video_1').src = blobUrl
    document.getElementById('video_1').play()
    document.getElementById('video_1').oncanplay = function () {
      try {
        document.getElementById('video_1').play()
      } catch (err) { }
      setTimeout(function () {
        try {
          document.getElementById('video_1').play()
        } catch (err) { }
      }, 5000)
    }
    var blob2 = b64toBlob(v_ripples, contentType)
    var blobUrl2 = URL.createObjectURL(blob2)
    document.getElementById('video_2').src = blobUrl2
    var blob3 = b64toBlob(v_shells, contentType)
    var blobUrl3 = URL.createObjectURL(blob3)
    document.getElementById('video_3').src = blobUrl3
    var blob4 = b64toBlob(v_sunrise, contentType)
    var blobUrl4 = URL.createObjectURL(blob4)
    document.getElementById('video_4').src = blobUrl4
    var blob5 = b64toBlob(v_tree, contentType)
    var blobUrl5 = URL.createObjectURL(blob5)
    document.getElementById('video_5').src = blobUrl5
  } catch (err) {
    //
  }
  $('.panel-hotspot').click(function (e) {
    e.preventDefault()
    $('.commonhide').hide()
    page = $(this).data('href')
    $('.contents').hide()
    $('#' + page).show()
    if (page = 'myteam') {
      $('.contactList').show()
      $('#searchContact').val('')
      $('#deselect-all-import').hide()
      $('#select-all-import').show()
    }
    return false
  })
  $('.btntext').click(function (e) {
    e.preventDefault()
    $('#info-click').addClass('btn-info')
    $('#info-click').removeClass('btn-info-active')
    page = $(this).data('href')
    if (page == 'Home') {
      newInit()
    }
    if (page == 'instructions') {
      $('#QQ1A1').focus()
    }
    if (page == 'myteam') {
      $('#addContactFirstName').val('')
      $('#addContactLastName').val('')
      $('#addContactNumber').val('')
      $('#dummy-img').attr('src', 'img/btn-photo-contact.png')
      $('.contactList').show()
      $('#searchContact').val('')
      $('#deselect-all-import').hide()
      $('#select-all-import').show()
      $('#contacts-container').show()
      $('#delete-contacts-container').hide()
      $('#share-contacts-container').hide()
      $('#deselect-all-contacts').hide()
      $('#select-all-contacts').hide()
      $('#delete-icon-black').hide()
      $('#show-contact-list').show()
      $('#delete-selected').hide()
      $('#add-btn').show()
      $('.checkContact').addClass('contactUnchecked').removeClass('contactChecked')
    }
    if (page == 'content') {
      $('#info-click').removeClass('btn-info')
      $('#info-click').addClass('btn-info-active')
    }
    if (page == 'MyStuff') {
      $('.tab-content').hide()
      $('#gallery').show()
    }
    $('.commonhide').hide()
    $('.contents').hide()
    $('#' + page).show()
    return false
  })
  /* $('.question').click(function (e) {
               e.preventDefault();
               page = $(this).data('href');
               $('.contents').hide();
               $('#' + page).show();
               return false;
           }); */

  $('.tabs').click(function (e) {
    e.preventDefault()
    tab = $(this).data('tab')
    $('.commonhide').hide()
    if (tab == 'notes') {
      $('#add-notes-btn').show()
      $('#add-image-btn').hide()
      $('#add-resourses-btn').hide()
      $('#delete-selected-notes').hide()
      $('#add-notes').hide()
      $('#edit-notes').hide()
      $('#delete-notes').hide()
      $('#addNewNoteBtn').hide()
      $('#editNewNoteBtn').hide()
      $('#select-all-notes').hide()
      $('#deselect-all-notes').hide()
      $('#show-notes-list').show()
      $('#delete-icon-black-notes').hide()
      $('#notes-list').show()
    }
    if (tab == 'resourses') {
      $('#add-resourses-btn').show()
      $('#add-notes-btn').hide()
      $('#add-image-btn').hide()
      $('#delete-selected-notes').hide()
      $('#add-resoures').hide()
      $('#edit-resourses').hide()
      // $('#delete-notes').hide();
      // $('#addNewResoursesBtn').hide();
      // $('#editNewResoursesBtn').hide();
      $('#resourses-list').show()
      $('#tag-list').show()
    }
    if (tab == 'gallery') {
      $('#add-notes-btn').hide()
      $('#add-image-btn').show()
      $('#add-resourses-btn').hide()
      $('#delete-selected-notes').hide()
    }
    $('.tab-content').hide()
    $('#' + tab).show()
    // $('#add-' + tab).show();

    return false
  })
  $(document).on('click', '.custom-btn-edit', function (e) {
    e.preventDefault()
    $('.commonhide').hide()
    page = $(this).data('href')
    //
    localStorage.setItem('editContactId', $(this).data('id'))
    $('.contents').hide()
    $('#' + page).show()
    GetValueFromDB1($(this).data('id'))
    return false
  })

  $('.custom-btn').click(function (e) {
    $('#ContactsAddPage1').hide()
    $('.commonhide').hide()
    e.preventDefault()
    page = $(this).data('href')
    if (page == 'contacts') {
      GetValueFromDBContact()
    }
    $('.contents').hide()
    $('#' + page).show()

    return false
  })
  $('#start11').click(function () {
    $('.contents').hide()
    $('#instructions').show()
    $('#QQ1A1').focus()
  })
  $('#info-click').click(function () {
    $('.commonhide').hide()
    $('.contents').hide()
    $('#content').show()
    $('#inner-header').show()
    $('.botnav-container').show()
  })

  $('.grid-container-whitebg').click(function (e) {
    // alert(e.target.id);
    if (e.target.id != 'dummy-img' && e.target.id != 'dummy-img-edit') {
      // if($(".commonhide").is(":visible")){
      $('.commonhide').hide()
    }
    // }
  })
  $('.grid-container').click(function (e) {
    // alert(e.target.id);
    // if( e.target.id != 'pophide' && this.id != 'addNewThemeBtn' ) {
    // if($(".commonhide").is(":visible")){
    $('.commonhide').hide()
    // }
    // }
  })

  $('#searchContact').keyup(function () {
    var filter = this.value.toLowerCase()  // no need to call jQuery here

    $('.contactName').each(function () {
      /* cache a reference to the current .media (you're using it twice) */
      var _this = $(this)
      //  var title = _this.find('h4').text().toLowerCase();
      var title = _this.text().toLowerCase()
      // alert(title);
      // alert(filter);

      /*
          title and filter are normalized in lowerCase letters
          for a case insensitive search
      */
      if (title.indexOf(filter) < 0) {
        _this.parent().hide()
      } else {
        _this.parent().show()
      }
    })
  })
})
$('#QQ1A1').focus()
var base64Img = null
margins = {
  top: 70,
  bottom: 40,
  left: 30,
  width: 550
}

generate = function (writer) {
  var doc = new jsPDF()
  doc.text(20, 20, 'HELLO! Re-minder')
  doc.setFont('courier')
  doc.setFontType('normal')
  doc.text(20, 30, 'This is a PDF document generated using JSPDF.')
  doc.text(20, 50, 'YES, Inside of PhoneGap!')
  var pdfOutput = doc.output()
  var myBase64 = btoa(pdfOutput)
  var contentType = 'application/pdf'
  var folderpath = cordova.file.externalRootDirectory
  var filename = 'helloWorld.pdf'
  savebase64AsPDF(folderpath, filename, myBase64, contentType)
}

function headerFooterFormatting (doc, totalPages) {
  for (var i = totalPages; i >= 1; i--) {
    doc.setPage(i)
    // header
    header(doc)

    footer(doc, i, totalPages)
    doc.page++
  }
};

function header (doc) {
  doc.setFontSize(30)
  doc.setTextColor(40)
  doc.setFontStyle('normal')
  doc.text('Report Header Template', margins.left + 50, 40)
  doc.setLineCap(2)
  doc.line(3, 70, margins.width + 43, 70) // horizontal line
};

function imgToBase64 (url, callback, imgVariable) {
  if (!window.FileReader) {
    callback(null)
    return
  }
  var xhr = new XMLHttpRequest()
  xhr.responseType = 'blob'
  xhr.onload = function () {
    var reader = new FileReader()
    reader.onloadend = function () {
      imgVariable = reader.result.replace('text/xml', 'image/jpeg')
      callback(imgVariable)
    }
    reader.readAsDataURL(xhr.response)
  }
  xhr.open('GET', url)
  xhr.send()
};

function footer (doc, pageNumber, totalPages) {
  var str = 'Page ' + pageNumber + ' of ' + totalPages
  doc.setFontSize(10)
  doc.text(str, margins.left, doc.internal.pageSize.height - 20)
};

/* load js dynamically */
function loadjscssfile (filename, filetype) {
  if (filetype == 'js') { // if filename is a external JavaScript file
    var fileref = document.createElement('script')
    fileref.setAttribute('type', 'text/javascript')
    fileref.setAttribute('src', filename)
  } else if (filetype == 'css') { // if filename is an external CSS file
    var fileref = document.createElement('link')
    fileref.setAttribute('rel', 'stylesheet')
    fileref.setAttribute('type', 'text/css')
    fileref.setAttribute('href', filename)
  }
  if (typeof fileref !== 'undefined') { document.getElementsByTagName('head')[0].appendChild(fileref) }
}

function b64toBlob (b64Data, contentType, sliceSize) {
  contentType = contentType || ''
  sliceSize = sliceSize || 512

  var byteCharacters = atob(b64Data)
  var byteArrays = []

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize)

    var byteNumbers = new Array(slice.length)
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    var byteArray = new Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }

  var blob = new Blob(byteArrays, {
    type: contentType
  })
  return blob
}

/**
 * Create a PDF file according to its database64 content only.
 *
 * @param folderpath {String} The folder where the file will be created
 * @param filename {String} The name of the file that will be created
 * @param content {Base64 String} Important : The content can't contain the following string (data:application/pdf;base64). Only the base64 string is expected.
 */
function savebase64AsPDF (folderpath, filename, content, contentType) {
  // Convert the base64 string in a Blob
  var DataBlob = b64toBlob(content, contentType)
  console.log('Starting to write the file :3')
  window.resolveLocalFileSystemURL(folderpath, function (dir) {
    console.log('Access to the directory granted succesfully')
    dir.getFile(filename, {
      create: true
    }, function (file) {
      console.log('File created succesfully.')
      file.createWriter(function (fileWriter) {
        console.log('Writing content to file')
        fileWriter.write(DataBlob)
      }, function () {

      })
    })
  })
}
/* code snip */
function goBack1 () {
  $('.contents').hide()
  $('#theme').show()
  $('#themeTitle').val('')
}

function goBack () {
  var planCompleted = localStorage.getItem('planCompleted')
  if (planCompleted == '0' || planCompleted == 0) {
    // alert('here');
    // document.location.href='CreateMySafetyPlanQ4.html';
    $('.contents').hide()
    $('#CreateMySafetyPlanQ4').show()
  } else {
    // document.location.href='myteam.html';
    $('.contents').hide()
    // alert('here999');
    //  $("#myteam").load( document.URL +"#myteam");
    $('#addContactFirstName').val('')
    $('#addContactLastName').val('')
    $('#addContactNumber').val('')
    $('#dummy-img').attr('src', 'img/btn-photo-contact.png')
    $('#myteam').show()
  }
}