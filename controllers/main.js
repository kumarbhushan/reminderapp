// alert("Laoccal Stogate"+localStorage);
// if (!window.cordova) {
//   window.cordova = require('cordova');
//   }
var db
var shortName = 'WebSqlDB'
var version = '1.0'
var displayName = 'WebSqlDB'
var maxSize = 1 * 1024 * 1024
let GetStuffFromDB = function () { }
try {
  db = openDatabase(shortName, version, displayName, maxSize)
} catch (error) {
  console.log('db-init-failed', error)
}

function navigate () {
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
      GetStuffFromDB()
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

    $('.resourses-tagsStatic').each(function () {
      var _this = $(this)
      var title = _this.text().toLowerCase()
      if (title.indexOf(filter) < 0) {
        _this.parent().prev().hide()
        _this.parent().prev().prev().hide()
        _this.parent().prev().prev().prev().hide()
      } else {
        _this.parent().prev().show()
        _this.parent().prev().prev().show()
        _this.parent().prev().prev().prev().show()
      }
    })

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
    $('#dummy-img').attr('src', 'img/btn-photo-contact.jpg')
    $('#myteam').show()
  }
}

let dummybase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKsAAACsCAYAAAAE7VyhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACe9JREFUeNrsnU1oVFcYhs8dJaU2pYOtoiBmFCnoJiMWV2ImruymiXYXWpysXCbpuhADpcsmWbqakRZ3rXHnqo7iSho6bhRKSyciGPpjp2gVpKW93+SLjmkmc3/O/3kfuNyKdSY588x7v/Pde88VAgAAAAAAAAAAAGERYQj6U1ueKMU72srxVoy3If6z4D+XE7xMi7f1/16Jt3a8NWk/eexyEyMNWdOKSeJV4m2YhaxofPsmbyRyIxa4gU8EsnbLWWEhRzSLmUZgkvZGLO8SZA1LTjpsj8fbGMtZdOxXIGFv0D6WtwVZ/ZS0yoKOe/RrUeousrhtyOp+/TnFghY9/ywpcS/5XCpEnkpaZUnLIjxanLZ139I28khQSs7peDsnXraVQqbdJW0Lstol6VQAh/qs1ONtznVpI8dFJUlnIWmqpF1wtTyIHJWUJkzzONxnlpZSdgGyqpWU5KwJO5v3rkFtrxmXzpJFDol6gQ/5QH49O+NCaRA5IGmZ07QMr5SWBpO292gjy0VFmiJl7ZYVtalRWvF2xsZLFiMLRSVBrwi0o0xDZUEdsuKwj7LAVVn5LBT1TavwwzqoHBi1QdjIElGvY7Zvfbdg1HQdWzAsahmiOkEnUPjzCi9Zu0TFRAoTL3tlhagQ1glZISqEdUJWH0XdX3xP7Hx9SOx58/D//u7533+J1Sf3xOrje+LRsxUI64qsPok6OLBLlPee7Yg6sG1Hon/z5PmvovnwG/Hj7zchrM2ycnvqZ9dFJTGP7H6/I2pWSNrbD74S99vf+SKrtrZWpElU59tTdKg/UTrf2cuAEvbWykUImwIdfdYrPoh6+t1PpYlKHHr7ZOc1k5YRlkOBVONgclPW+Id3/sqpdVFVSLVn8LA4MXTel3QtczC5Jyvfu191vUalQ7/K9KNJWnnvh74IW4k/93mnZOWZ/7zzURFLJPPQ3/t9zm7a+nKUab6h035ZuW5x/npUak8d2X1a6xfDI2p8Ab31yerFLdJ52lNZ61eP0rWoon6VKivHf9X1kaYalWbrujm086TwiDJfTG+frHz4r/kwyjTpMYGJL4hiZmVeVigzWWvCk3P+dEg29t7+lALdXtgjKx/+vVmkd/C1XcbeW0f3wdVyoCBB1PX7p7zBpDAD294QHjIrozsgI1mnhWcLpHlyCtS7ciCXrPxtwa3TIAkVXhPCWLJ6KSpdxgfsS9fMsvK3pOqnrL/hi6KGEl8zoj1ZvT38P3q6EuR765psaZW166l8XkL3TZng+T9Pfb1XS0q6FnR/O1yAbjkhcUy8byDMapG160G8XmPixr67v1wLRdZM6ZolWadCGE0SR2e6UqoGUALkStdUsnJftRrCSNKsXFfS0ZeC7ngNjFLavmvaZK2GNJrNh19rmWzdfvBlqL3dKZWyngttNL/96Qulh2eqjT1c+CIp42muGUgsK19ZVQptNOkQfe2Hz5QI69naAZmFVZGsY6GO5rqwslpL9HokKURNVwokWpGFLwP8A+O6dhfB8X0fdW4ozALVwLdaF3H9wascTbKay3bZUe07lK600S0odPdr0mtfO7Xpo5udFQXBpnMhabKOYTw3nxhRwu7cMdSRdnDgnRd3GdA5fjrcrz65C0GTheGMrDLgX4wnMF0KFBKIihIAWNEVSNINQAkAdDAmQ9YKxhFooNxvycxCnxKgJAI8EQCMUcmTrEhVoJORPLIOY/yAzlJgq7/s12cNPlmpj0pL+lAflfqpsqDHDj16dr9zzcHq47tG7kxwrQyI+tSswfZX056hygvOcL2gZ791+xaiBpmqec/95/ly0IZrBzqlQDNtzRpUF6Dz/ICh8+LUwRntonZDKxh+cPhzH5e/TMpwlpq1FJKosh8dJOOLs14eYJLVP1lHIKpZSNgAE7aURdYgnlp9fN/HVq+JSsJ6uMCwdFnLvo8KTaZcSK5TBz8JahnOXvdlFUTA0KzflVKFHnAceroWephd8X00KFFNzvrTQj3fgNK1iGTd8OG7NhEMaLJVhqxM51YUBx80EXDvdUtZvZ5c7S8ec/Ln9vBJLlJk9bpt5VKtupFA2lhvoQxYT6gdYScUalagJ1kHj6AMAACyAgBZAWQFALICkJhWGlnbGC9gkJU0sjYxXgBlAACQFXhE8rtbJ49dbmC8gEHaSFbgrayYZAEj9FqRpZDWbgBMpCqSFTgzueon6wrGDdgk6/YQk5Ue++MqASzY1vPDwZKXwDZGe7VO+7WuULcC3Z2ARpaaFbICa+rVJLLewfgBjTTyyNrA+AGN3MksK59JwMkB4ESyEksYQ6CjXo3DsZVX1hsYR2A6VZGswCau5pY1juY2JlpAMe0k11AXZFkPQA4SHb0LMl8MAFUlQGJZeZYGYYEKWrFfUpMVpQAwWgKkkjW2vy5wggDIZ1G6rEwdYwsk0uh3IiCPrIsYXyCRS2n+5yjtq9eWJ67HuwrGGUiYWB1I8w+yrBswh3EGulM1k6x8pgEXZYM80ER9QbmsqF2BjA4An8ZXLyu3sVoYc6ArVfMka8dZjDvQlaq5ZOXatYGxBzpSNW+yojMA0jKTNVWJKO+715YnavGuis8B9IFuWzma5wVkrM86I3DNAEjmiTAqK8c6ygGwFQsyVlOXsvJ1/IMsYLIFtphUSQkzmcu0z+BzAZtlWZ5JlRJZeUEMCAu6WUp6F4DuZEU5ALppCcknjlQ8rWUS3QEg8/CvTFa+8hunYsNmTsWz1JQ8B4vrFLSzwq1TL6h4YWUPbeMfGLdvh0VT5VFV9RMGJwUu1A6Ftoo6tZtI9W9QW54oxbvv462Iz9NrRlU/81f5s1t5wjWKDoH3M/+G6jfR8qBhPmGADoG/otZ1vJG2p2JzhwDC+sWCLlG11Kyb1LBV2uFzdp56LKrW8IlM/JYQFqI6IyuERY3qlKwsbDne0XJEaGtBVHsmWFt0CdDWsp+2aVGNJ2tXwhY5YcvwwkpRRzlYjFKwYTT4FB0lbB1uWAUJesAGUa1J1g0pOx3v5uFJmDN+p2TtmnhdibcSnDFy2J8xXZ86I2tXHUutrXH4o/WwfybN0umQ9VVpx1latLfUMqfqoulgZEXKKqfBh33rrzuOXBpVTtl51LLSatM5viPZCSLXRphTljoGUygNss/0Rc4V/SBrOmkpXWcFVjD08pDvlayQNrWkczqu5oeskDZoSb2TdYO0UyxtqDUt1aSLrh7ug5F1w0RsnMUN4QKZllh75FPdtYlT8LL2SFuSt+TRr0ZSLvmYosHKukFcStlzDovb4lr0qszlJCGrG4lL0o6ItYcn21rjduQUa488D3aFm6Bl7ZG6tA3zvmLgx2jydid0OSFrtvQtdYk7wvtyxiRui5frf9H+T963ICZk1ZnKm8rrS58TAAAAAAAAAIAn/CfAALcsXPRaodK+AAAAAElFTkSuQmCC'
let iconPhone = 'data:image/jpeg;base64,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'
