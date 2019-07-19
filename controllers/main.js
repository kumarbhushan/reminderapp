// alert("Laoccal Stogate"+localStorage);
// if (!window.cordova) {
//   window.cordova = require('cordova');
//   }
var db
var shortName = 'WebSqlDB'
var version = '1.0'
var displayName = 'WebSqlDB'
var maxSize = 1 * 1024 * 1024
try {
  db = openDatabase(shortName, version, displayName, maxSize)
} catch (error) {
  console.log('db-init-failed', error)
}

try {
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
} catch (err) {
  console.log('main', err)
}
function navigate() {
  console.log('navigation')
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
function qnavigate(que) {
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

function errorHandler(transaction, error) {
  console.log('Error: ' + error.message + ' code: ' + error.code)
}
function successCallBack() {
  console.log('DEBUGGING: success')
}
function nullHandler() { };
document.addEventListener('deviceready', onDeviceReady, false)
// PhoneGap is ready
//
function onDeviceReady() {
  var popuphome = true
  // StatusBar.hide();
}
function cancelCall() {
  document.getElementById('CallConfirm').style.display = 'none'
}
function call() {
  document.getElementById('CallConfirm').style.display = 'block'

  console.log('call')
}
$(document).on('click', '.cus-theme', function (e) {
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
      $('.botnav-container').removeClass('wh')
    } else {
      $('#notes').hide()
      $('.botnav-container').addClass('wh')
    }
    if (page == 'instructions') {
      $('#QQ1A1').focus()
    }
    if (page == 'myteam') {
      $('#addContactFirstName').val('')
      $('#addContactLastName').val('')
      $('#addContactNumber').val('')
      $('#dummy-img').attr('src', 'img/btn-photo-contact.jpg')
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
      $('#add-notes-btn').hide()
      $('#add-image-btn').show()
      $('#add-resourses-btn').hide()
      $('#delete-selected-notes').hide()
      $('#addNewNoteBtn').hide()
      $('#editNewNoteBtn').hide()
      $('.tabs').removeClass('activeTab')
      $('.btn-gallery').addClass('activeTab')
      $('#addThemePop').hide()
    }
    $('.commonhide').hide()
    $('.contents').hide()
    $('#' + page).show()
    return false
  })
  $('#AddNotes_ArrowBack').click(function () {
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
    $('#addThemePop').hide()
    $('#AddNotes_ArrowBack').hide()
  })
  $('.tabs').click(function (e) {
    e.preventDefault()
    tab = $(this).data('tab')
    $('.tabs').removeClass('activeTab')
    $(this).addClass('activeTab')

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
      $('#addThemePop').hide()
      $('#AddNotes_ArrowBack').hide()
    }
    if (tab == 'resourses') {
      $('#add-resourses-btn').show()
      $('#add-notes-btn').hide()
      $('#add-image-btn').hide()
      $('#delete-selected-notes').hide()
      $('#add-resourses').hide()
      $('#edit-resourses').hide()
      // $('#delete-notes').hide();
      $('#addNewResoursesBtn').show()
      $('#addNewNoteBtn').hide()
      $('#editNewNoteBtn').hide()
      $('#resourses-list').show()
      $('#tag-list').show()
      $('#addThemePop').hide()
    }
    if (tab == 'gallery') {
      $('#add-notes-btn').hide()
      $('#add-image-btn').show()
      $('#add-resourses-btn').hide()
      $('#delete-selected-notes').hide()
      $('#addNewNoteBtn').hide()
      $('#editNewNoteBtn').hide()
      $('#addThemePop').hide()
    }
    if (tab == 'theme-tab') {
      $('#add-resoures').hide()
      $('#edit-resourses').hide()
      $('#addNewResoursesBtn').hide()
      $('#resourses-list').show()
      $('#tag-list').show()
      $('#add-notes').hide()
      $('#edit-notes').hide()
      $('#delete-notes').hide()
      $('#select-all-notes').hide()
      $('#deselect-all-notes').hide()
      $('#show-notes-list').hide()
      $('#delete-icon-black-notes').hide()
      $('#notes-list').hide()
      $('#add-notes-btn').hide()
      $('#add-image-btn').hide()
      $('#add-resourses-btn').hide()
      $('#delete-selected-notes').hide()
      $('#addNewNoteBtn').hide()
      $('#editNewNoteBtn').hide()
      $('#addThemePop').show()
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
    $('#ContactsAddPage').hide()
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
    // $('#instructions').css('display','block')
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
    $('.commonhide').hide()
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

  $('#searchTags').keyup(function () {
    var filter = this.value.toLowerCase()  // no need to call jQuery here

    $('.resourses-tags').each(function () {
      var _this = $(this)
      var title = _this.text().toLowerCase()
      if (title.indexOf(filter) < 0) {
        _this.parent().hide()
        _this.parent().prev().hide()
        _this.parent().prev().prev().hide()
        _this.parent().prev().prev().prev().hide()
      } else {
        _this.parent().show()
        _this.parent().prev().show()
        _this.parent().prev().prev().show()
        _this.parent().prev().prev().prev().show()
      }
    })
    $('.tag-tags').each(function () {
      var _this = $(this)
      var title = _this.text().toLowerCase()
      if (title.indexOf(filter) < 0) {
        _this.hide()
      } else {
        _this.show()
      }
    })
  })
  if ((localStorage.getItem('emoji') != 'icon-sad') && (localStorage.getItem('emoji') != 'icon-neutral') && (
    localStorage.getItem('emoji') != 'icon-smile')) {
    localStorage.setItem('emoji', 'icon-neutral')
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
  $('#QQ1A1').focus()
})

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

function headerFooterFormatting(doc, totalPages) {
  for (var i = totalPages; i >= 1; i--) {
    doc.setPage(i)
    // header
    header(doc)

    footer(doc, i, totalPages)
    doc.page++
  }
};

function header(doc) {
  doc.setFontSize(30)
  doc.setTextColor(40)
  doc.setFontStyle('normal')
  doc.text('Report Header Template', margins.left + 50, 40)
  doc.setLineCap(2)
  doc.line(3, 70, margins.width + 43, 70) // horizontal line
};

function imgToBase64(url, callback, imgVariable) {
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

function footer(doc, pageNumber, totalPages) {
  var str = 'Page ' + pageNumber + ' of ' + totalPages
  doc.setFontSize(10)
  doc.text(str, margins.left, doc.internal.pageSize.height - 20)
};

/* load js dynamically */
function loadjscssfile(filename, filetype) {
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

function b64toBlob(b64Data, contentType, sliceSize) {
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
function savebase64AsPDF(folderpath, filename, content, contentType) {
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
function goBack1() {
  $('#AddTheme').hide()
  $('.contents').hide()
  $('.tab-content').hide()
  GetThemeFromDB()
  $('#theme-tab').show()
  $('#MyStuff').show()
  $('.tabs').removeClass('activeTab')
  $('#theme-tab-nav').addClass('activeTab')

  $('#themeTitle').val('')
}

function goBack() {
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
    $('#dummy-img').attr('src', 'img/btn-photo-contact.jpg')
    $('#myteam').show()
  }
}

let dummybase64 = 'data:image/png;base64,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'
