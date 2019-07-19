// localStorage.clear();

function successCallBackTags () {
  console.log('DEBUGGING: success')
  GetResoursesFromDB()
  GetTagsFromDB()
}

function createResoursesTable () {
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  db.transaction(function (tx) {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Resourses(UId INTEGER NOT NULL PRIMARY KEY, Weburl TEXT NOT NULL, Name TEXT NOT NULL, Tag TEXT NOT NULL)',
      [], nullHandler, errorHandler)
  }, errorHandler, successCallBack)
}
function createTagTable () {
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  try {
    db.transaction(function (tx) {
      tx.executeSql('DROP TABLE IF EXISTS Tags')
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Tags(UId INTEGER NOT NULL PRIMARY KEY, Name TEXT NOT NULL)',
        [], nullHandler, errorHandler)
    }, errorHandler, successCallBack)
  } catch (error) {
    console.log('transaction_failed', error)
  }
}
function isUrlValid (url) {
  return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url)
}
function GetResoursesValueFromDB (resoursesUId) {
  //
  contactAdded = 0
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  try {
    db.transaction(function (transaction) {
      transaction.executeSql(
        'SELECT Weburl, Name, Tag FROM Resourses WHERE UId=?', [
          resoursesUId
        ],
        function (transaction, results) {
          if (results.rows.length) {
            console.log(results.rows.item(0).ContactName)

            editWeburl = results.rows.item(0).Weburl
            editName = results.rows.item(0).Name
            editTag = results.rows.item(0).Tag
          } else {
            console.log('error: contact not found')
          }

          document.getElementById('editWeburl').value = editWeburl
          document.getElementById('editName').value = editName
          // document.getElementById('editTag').value = editTag
          var tags = editTag.split('~')
          $('#existingTags').empty()
          var htmlData = ''
          for (var k = 0; k < tags.length; k++) {
            if (k == 0) {
              htmlData += '<div class="tag-list">'
            }
            htmlData += '<p class="resourses-tags edit-tags-list ">' + tags[k] + '<span class="close-it"></span></p>'
            if (k == tags.length - 1) {
              htmlData += '</div>'
            }
          }
          $('#existingTags').append(htmlData)
          document.getElementById('resoursesUId').value = resoursesUId
        })
    })
  } catch (error) {
    console.log('transaction_failed', error)
  }
}
function GetResoursesFromDB () {
  // alert('hhh');
  var contactIds = []
  var resoursesWeburl = []
  var resoursesName = []
  var resoursesTag = []
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  try {
    db.transaction(function (transaction) {
      transaction.executeSql('SELECT UId, Weburl, Name, Tag  FROM Resourses',
        [],
        function (transaction, results) {
          if (results.rows.length) {
            for (var i = 0; i < results.rows.length; i++) {
              resoursesWeburl.push(results.rows.item(i).Weburl)
              resoursesName.push(results.rows.item(i).Name)
              resoursesTag.push(results.rows.item(i).Tag)
              contactIds.push(results.rows.item(i).UId)
            }

            //
            $('#resourses-list').empty()
            $('#addLinkTag').empty()

            for (var j = 0; j < resoursesWeburl.length; j++) {
              var htmlData = ' <div class="main-edit-delete"><div  class="custom-resourses-edit" data-id="' + contactIds[j] + '">' +
                '<div class="border-middle-res"></div>' +
                '<div class="edit-res"><img class="img-button-edit" src="img/btn-edit.png"></div></div><div class="delete-resourse" id="res_' + contactIds[j] + '"><img style="width:40px;height:40px;"src="img/btn-delete-dark-white.png" /></div></div>' +

                '<p class="notes-label">' + resoursesName[j] + '</p>' +
                '<p class="resourses-url">' + resoursesWeburl[j] + '</p>'

              var tags = resoursesTag[j].split('~')
              for (var k = 0; k < tags.length; k++) {
                if (k == 0) {
                  htmlData += '<div class="tag-list">'
                }
                htmlData += '<p class="resourses-tags">' + tags[k] + '</p>'
                if (k == tags.length - 1) {
                  htmlData += '</div>'
                }
              }

              $('#resourses-list').append(htmlData)
              $('#addLinkTag').append(

                '<option value="' + resoursesWeburl[j] + '">' + resoursesWeburl[j] + '</option>'
              )
            }
            $('#resourses-list').append('<div class="empty-space"></div>')
          } else {
            $('#resourses-list').empty()
            // $("#delete-notes").empty();
            contacts = []
            // $('#resourses-list').append(
            //   '<div style="text-align: center;" class="empty-space">Add your first Resourses.</div>'
            // )
          }
        })
    })
  } catch (error) {
    console.log('transaction_failed', error)
  }
}
function GetTagsFromDB () {
  // alert('hhh');
  var tagIds = []

  var resoursesTagName = []
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  try {
    db.transaction(function (transaction) {
      transaction.executeSql('SELECT UId,  Name  FROM Tags',
        [],
        function (transaction, results) {
          if (results.rows.length) {
            for (var i = 0; i < results.rows.length; i++) {
              resoursesTagName.push(results.rows.item(i).Name)
              tagIds.push(results.rows.item(i).UId)
            }
            $('#tag-list').empty()
            for (var j = 0; j < resoursesTagName.length; j++) {
              $('#tag-list').append(

                '<p class="tag-tags">' + resoursesTagName[j] + '</p>'
              )
            }
          } else {
            $('#tag-list').empty()
            // contacts = [];
            $('#tag-list').append(
              '<div style="width:100%;text-align: center;" >Add your first tag.</div>'
            )
          }
        })
    })
  } catch (error) {
    console.log('transaction_failed', error)
  }
}
function DeleteResoursesFromDB (ContactUId) {
  // alert(ContactUId);
  try {
    db.transaction(function (transaction) {
      transaction.executeSql('DELETE FROM Resourses WHERE UId=?', [ContactUId], function () {

      })
    })
  } catch (error) {
    console.log('transaction_failed', error)
  }
}
document.addEventListener('deviceready', onDeviceReadyResourses, false)
// PhoneGap is ready
//
function onDeviceReadyResourses () {
  StatusBar.hide()
  registerEventsAndInit()
}
$(document).ready(function () {
  registerEventsAndInit()
})

function CreateResouceData () {
  var resourseTable = []
  var ResoursesData = { id: '', Linkname: '', Weburl: '', img: '' }

  ResoursesData.id = 1
  ResoursesData.Linkname = 'Suicide Call Back Service'
  ResoursesData.Weburl = 'https://www.suicidecallbackservice.org.au/'
  ResoursesData.img = 'img/tweets-logo.png'
  resourseTable.push(ResoursesData)

  ResoursesData = { id: '', Linkname: '', Weburl: '' }
  ResoursesData.id = 2
  ResoursesData.Linkname = 'SuicideLine Victoria'
  ResoursesData.Weburl = 'https://www.suicideline.org.au/'
  ResoursesData.img = 'img/logo-suicideline.png'
  resourseTable.push(ResoursesData)
  ResoursesData = { id: '', Linkname: '', Weburl: '' }
  ResoursesData.id = 3
  ResoursesData.Linkname = 'Mensline Australia'
  ResoursesData.Weburl = 'https://mensline.org.au/'
  ResoursesData.img = 'img/logo-mensline.png'
  resourseTable.push(ResoursesData)
  ResoursesData = { id: '', Linkname: '', Weburl: '' }
  ResoursesData.id = 4
  ResoursesData.Linkname = 'Lifeline'
  ResoursesData.Weburl = 'https://www.lifeline.org.au/'
  ResoursesData.img = 'img/logo-lifeline.png'
  resourseTable.push(ResoursesData)
  ResoursesData = { id: '', Linkname: '', Weburl: '' }
  ResoursesData.id = 5
  ResoursesData.Linkname = 'Kids Helpline'
  ResoursesData.Weburl = 'https://kidshelpline.com.au/'
  ResoursesData.img = 'img/logo-kidshelpline.png'
  resourseTable.push(ResoursesData)
  localforage.setItem('ResourceDB', JSON.stringify(resourseTable), function (err, value) {
    if (err) {
      console.error('Oh noes!')
    } else {
      AppendData(value)
    }
  })
}

function AppendData (value) {
  $('#resourses-listStatic').empty()
  var val = JSON.parse(value)
  for (var j = 0; j < val.length; j++) {
    var htmlData = '<div class="main-edit-delete" style="margin-bottom: 25px;"><div  class="" data-id="' + val[j].id + '"> '
    htmlData += '<div class="border-middle-res"></div> '
    htmlData += '</div><div class="delete-resourse" id="' + val[j].id + '"></div></div>'
    htmlData += ' <p class="notes-label"><img class="" src="' + val[j].img + '" style="width: 60px;float:left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + val[j].Linkname + '  </p>'
    htmlData += ' <p class="resourses-url" style="padding-left: 110px;font-size:14px;"><a href="' + val[j].Weburl + '" target="_blank">' + val[j].Weburl + '</a></p>'
    $('#resourses-listStatic').append(htmlData)
  }
}

function registerEventsAndInit () {
  createResoursesTable()
  GetResoursesFromDB()
  createTagTable()
  GetTagsFromDB()
  $('#addNewResoursesBtn').click(function () {
    // alert('here');
    resoursesWeburl = document.getElementById('addWeburl').value
    resoursesName = document.getElementById('addName').value
    resoursesTag = document.getElementById('addTag').value
    if (resoursesWeburl.trim() != '' && resoursesName.trim() != '' && resoursesTag.trim() != '') {
      $('#formValidationResourses').hide()
      if (!isUrlValid(resoursesWeburl)) {
        $('#validateResoursesUrl').show()
      } else {
        $('#validateResoursesUrl').hide()
        InsertResoursesInDB(resoursesWeburl.trim(), resoursesName.trim(), resoursesTag.trim())
      }
    } else {
      $('#formValidationResourses').show()
    }
  })

  $('#addNewTagBtn').click(function () {
    // alert('here');

    addTagName = document.getElementById('addTagName').value
    addLinkTag = document.getElementById('addLinkTag').value

    if (addTagName.trim() != '' && addLinkTag.trim() != '') {
      $('#formValidationTag').hide()
      InsertTagInDB2(addTagName.trim(), addLinkTag.trim())
    } else {
      $('#formValidationTag').show()
    }
  })

  $(document).on('click', '.delete-resourse', function (e) {
    var id = $(this).attr('id')
    id = id.replace('res_', '')
    DeleteResoursesFromDB(id)
    GetResoursesFromDB()
  })
  $(document).on('click', '.custom-resourses-edit', function (e) {
    // alert('here');
    e.preventDefault()
    $('.commonhide').hide()
    // $('#resourses-list').hide();
    $('#edit-resourses').show()
    // $('#editNewResoursesBtn').show();
    // $('#add-resourses-btn').hide();
    GetResoursesValueFromDB($(this).data('id'))
    return false
  })
  $(document).on('click', '.close-it', function () {
    $(this).parent().remove()
  })
  $('#editNewResoursesBtn').click(function () {
    editWeburl = document.getElementById('editWeburl').value
    editName = document.getElementById('editName').value
    editTag = document.getElementById('editTag').value
    var tags = ''
    $('.edit-tags-list').each(function () {
      // alert($(this).text());
      if (editTag == $(this).text()) {
        editTag = ''
      }
      if (tags == '') {
        tags = $(this).text()
      } else {
        tags += '~' + $(this).text()
      }
    })
    if (editTag.trim() != '') {
      if (tags != '') {
        var finalTag = editTag + '~' + tags
      } else {
        var finalTag = editTag
      }
    } else {
      if (tags != '') {
        var finalTag = tags
      } else {
        var finalTag = ''
      }
    }

    resoursesUId = document.getElementById('resoursesUId').value
    if (editWeburl.trim() != '' && editName.trim() != '' && finalTag != '') {
      $('#formValidationEditResourses').hide()
      if (editTag.trim() != '') {
        try {
          db.transaction(function (transaction) {
            transaction.executeSql(
              'SELECT  Name FROM Tags WHERE Name=?', [
                editTag
              ],
              function (transaction, results) {
                if (results.rows.length) {
                  // alert('here');
                } else {
                  // alert('her-fe');
                  InsertTagInDB(editTag)
                }
                GetTagsFromDB()
                document.getElementById('editTag').value = ''
                UpdateResoursesValueInDB(editWeburl.trim(), editName.trim(), finalTag, resoursesUId)
              })
          })
        } catch (error) {
          console.log('transaction_failed', error)
        }
      } else {
        document.getElementById('editTag').value = ''
        UpdateResoursesValueInDB(editWeburl.trim(), editName.trim(), finalTag, resoursesUId)
      }
    } else {
      $('#formValidationEditResourses').show()
      console.log('Validation Faild')
    }
  })
  localforage.getItem('ResourceDB', function (err, value) {
    if (err) {
      console.log('iconlogo29!')
    } else {
      if (value == null) {
        CreateResouceData()
      } else {
        AppendData(value)
      }
    }
  })
}

function UpdateResoursesValueInDB (editWeburl, editName, editTag, resoursesUId) {
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  try {
    db.transaction(function (transaction) {
      console.log('Updating')
      transaction.executeSql(
        'UPDATE Resourses SET Weburl = ?, Name = ?, Tag = ? WHERE UId=?',
        [editWeburl, editName, editTag, resoursesUId],
        function () {
          console.log('DEBUGGING: success')
          $('#edit-resourses').hide()
          $('#add-resourses-btn').show()
          GetResoursesFromDB()
        })
    })
  } catch (error) {
    console.log('transaction_failed', error)
  }
}
function UpdateResoursesLinksInDBByTag (Weburl, Tag) {
  // alert('here***');
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  try {
    db.transaction(function (transaction) {
      transaction.executeSql(
        'SELECT  Tag FROM Resourses WHERE Weburl=?', [
          Weburl
        ],
        function (transaction, results) {
          if (results.rows.length) {
            // alert('here');
            var finalTag = results.rows.item(0).Tag + '~' + Tag
            // alert(finalTag)
            db.transaction(function (transaction) {
              console.log('Updating')
              transaction.executeSql(
                'UPDATE Resourses SET Tag = ? WHERE Weburl=?',
                [finalTag, Weburl],
                function () {

                })
            }, errorHandler, successCallBackTags)
          }
        })
    }, errorHandler, successCallBack)
  } catch (error) {
    console.log('transaction_failed', error)
  }
}
function InsertResoursesInDB (resoursesWeburl, resoursesName, resoursesTag) {
  console.log('inside insert')
  // alert('herein');

  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  try {
    db.transaction(function (transaction) {
      console.log('Inserting')

      transaction.executeSql(
        'INSERT INTO Resourses(Weburl, Name, Tag) VALUES (?,?,?)',
        [
          resoursesWeburl, resoursesName, resoursesTag
        ],
        function () {
          console.log('DEBUGGING: success')
          document.getElementById('addWeburl').value = ''
          document.getElementById('addName').value = ''
          document.getElementById('addTag').value = ''

          db.transaction(function (transaction) {
            transaction.executeSql(
              'SELECT  Name FROM Tags WHERE Name=?', [
                resoursesTag
              ],
              function (transaction, results) {
                if (results.rows.length) {

                } else {
                  InsertTagInDB(resoursesTag)
                }
                GetResoursesFromDB()
                GetTagsFromDB()
                $('#add-resourses').hide()
                $('#resourses-list').show()
                $('#tag-list').show()
                $('#add-resourses-btn').show()
              })
          })
        }, errorHandler, successCallBack)
    })
  } catch (error) {
    console.log('transaction_failed', error)
  }
}

function InsertTagInDB (resoursesTag) {
  console.log('inside insert')
  // alert('herein');

  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  try {
    db.transaction(function (transaction) {
      console.log('Inserting')

      transaction.executeSql(
        'INSERT INTO Tags( Name) VALUES (?)',
        [
          resoursesTag
        ],
        function () {
          console.log('Added')
        }, errorHandler, successCallBack)
    })
  } catch (error) {
    console.log('transaction_failed', error)
  }
}
function InsertTagInDB2 (Tag, link) {
  console.log('inside insert')
  // alert('herein');

  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  try {
    db.transaction(function (transaction) {
      console.log('Inserting')

      transaction.executeSql(
        'INSERT INTO Tags( Name) VALUES (?)',
        [
          Tag
        ],
        function () {
          UpdateResoursesLinksInDBByTag(link, Tag)
          console.log('Added')

          GetResoursesFromDB()
          GetTagsFromDB()
          $('#add-tag').hide()
          $('#resourses-list').show()
          $('#tag-list').show()
          $('#add-resourses-btn').show()
        }, errorHandler, successCallBack)
    })
  } catch (error) {
    console.log('transaction_failed', error)
  }
}
