var db
var shortName = 'WebSqlDB'
var version = '1.0'
var displayName = 'WebSqlDB'
var maxSize = 4.9 * 1024 * 1024
var selectedElement = ''
var answers = []
var editPlanMode
$('#QQ1A1').focus()
if (!db) {
  db = openDatabase(shortName, version, displayName, maxSize)
  createTable()
}
function createTable () {
  console.log('DEBUGGING: we are in the onBodyLoad() function')

  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }

  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS Plan(UId INTEGER NOT NULL PRIMARY KEY, QId INTEGER NOT NULL, AId INTEGER NOT NULL, Answer TEXT NOT NULL)', [], nullHandler, errorHandler)
  }, errorHandler, successCallBack)
}
function AddValueToDB (QId, AId) {
  var editPlanMode = localStorage.getItem('editPlanMode')
  console.log(QId)
  console.log(answers)
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }

  db.transaction(function (transaction) {
    transaction.executeSql('INSERT INTO Plan(QId, AId, Answer) VALUES (?,?,?)', [QId, AId, answers['Q' + QId][AId - 1]], function () {
      if (AId == 6 || AId == '6') {
        console.log('going forward')
        if (editPlanMode == 'off') {
          // document.location.href='CreateMySafetyPlanQ'+(QId+1)+'.html';
          $('.contents').hide()
          $('#CreateMySafetyPlanQ' + (QId + 1)).show()
          $('#QQ' + (QId + 1) + 'A1').focus()
        } else {
          // document.location.href='MySafetyPlan.html';
          $('.contents').hide()
          $('#MySafetyPlan').show()
          for (var i = 1; i < 7; i++) {
            GetValueFromDB(QId, i)
          }
          // GetContactsValueFromDB1();
        }
      }
    })
  })
}
function UpdateValueInDB (QId, AId) {
  var editPlanMode = localStorage.getItem('editPlanMode')

  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }

  db.transaction(function (transaction) {
    console.log('Updating')
    transaction.executeSql('UPDATE Plan SET Answer = ? WHERE AId=? AND QId=?', [answers['Q' + QId][AId - 1], AId, QId], function () {
      if (AId == 6 || AId == '6') {
        console.log('going forward')
        if (editPlanMode == 'off') {
          // document.location.href='CreateMySafetyPlanQ'+(QId+1)+'.html';
          $('.contents').hide()
          $('#CreateMySafetyPlanQ' + (QId + 1)).show()
          $('#QQ' + (QId + 1) + 'A1').focus()
        } else {
          // document.location.href='MySafetyPlan.html';
          $('.contents').hide()
          $('#MySafetyPlan').show()
          for (var i = 1; i < 7; i++) {
            GetValueFromDB(QId, i)
          }
          // GetContactsValueFromDB1();
        }
      }
    })
  })
}
function GetValueFromDBPlan (QId, AId) {
  // alert('in');
  var answer = ''
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  db.transaction(function (transaction) {
    transaction.executeSql('SELECT Answer FROM Plan WHERE AId=? AND QId=?', [AId, QId], function (transaction, results) {
      if (results.rows.length) {
        console.log(results.rows.item(0).Answer)
        answer = results.rows.item(0).Answer
        // var editedAnswer = answer.slice(0, 29) + "<br>" + answer.slice(29);
        document.getElementById('QQ' + QId + 'A' + AId).value = answer.trim()
        if (answer != null && answer != 'undefined' && answer != '') {
          // document.getElementById("Q"+QId+"AddField"+(AId+1)).style.display = "none";
          $('#QQ' + QId + 'A' + AId).show()
          $('#QQ' + QId + 'A' + AId).focus()
          // document.getElementById("Q"+QId+"A"+AId).style.display = "block";
          // document.getElementById("Q"+QId+"AddField"+(AId+2)).style.display = "block";
        } else {
          autoselectElement('QQ' + QId + 'A' + AId)
        }
      } else {
        autoselectElement('QQ' + QId + 'A' + AId)
        answer = ''
      }
    })
  })
}
function CheckValueInDB (QId) {
  var answerRow = ''
  if (!window.openDatabase) {
    console.log('Databases are not supported in this browser.')
    return
  }
  db.transaction(function (transaction) {
    transaction.executeSql('SELECT * FROM Plan WHERE AId=? AND QId=?', [1, QId], function (transaction, results) {
      if (results.rows.length) {
        answerRow = 1
        UpdateValueInDB(QId, 1)
      } else {
        answerRow = 0
        AddValueToDB(QId, 1)
      }
    },
      function (transaction, results) {
        console.log(transaction); console.log(results)
      })

    transaction.executeSql('SELECT * FROM Plan WHERE AId=? AND QId=?', [2, QId], function (transaction, results) {
      if (results.rows.length) {
        answerRow = 1
        UpdateValueInDB(QId, 2)
      } else {
        answerRow = 0
        AddValueToDB(QId, 2)
      }
    })

    transaction.executeSql('SELECT * FROM Plan WHERE AId=? AND QId=?', [3, QId], function (transaction, results) {
      if (results.rows.length) {
        answerRow = 1
        UpdateValueInDB(QId, 3)
      } else {
        answerRow = 0
        AddValueToDB(QId, 3)
      }
    })

    transaction.executeSql('SELECT * FROM Plan WHERE AId=? AND QId=?', [4, QId], function (transaction, results) {
      if (results.rows.length) {
        answerRow = 1
        UpdateValueInDB(QId, 4)
      } else {
        answerRow = 0
        AddValueToDB(QId, 4)
      }
    })
    transaction.executeSql('SELECT * FROM Plan WHERE AId=? AND QId=?', [5, QId], function (transaction, results) {
      if (results.rows.length) {
        answerRow = 1
        UpdateValueInDB(QId, 5)
      } else {
        answerRow = 0
        AddValueToDB(QId, 5)
      }
    })
    transaction.executeSql('SELECT * FROM Plan WHERE AId=? AND QId=?', [6, QId], function (transaction, results) {
      if (results.rows.length) {
        answerRow = 1
        UpdateValueInDB(QId, 6)
      } else {
        answerRow = 0
        AddValueToDB(QId, 6)
      }
    })
  })
}
function selectElement (el) {
  console.log($(el)[0].id)
  return selectedElement = $(el)[0].id
}
function autoselectElement (elementId) {
  var field = document.getElementById(selectedElement)
  console.log(field)
  if (field == null || field == 'null') {
    var textFields = document.getElementById(elementId)

    console.log(textFields.value)
    if (textFields.value.trim() == '') {
      $('#' + elementId).show()
      return selectedElement = textFields.id
    }
  }
}
function populateField (QId, selectedOption) {
  var field = document.getElementById(selectedElement)
  if (selectedElement == '') {
    selectedElement = 'Q' + QId + 'A1'
    field = document.getElementById('Q' + QId + 'A1')
  }

  var field_oldVal = field.value
  var oldVal_isInList = 0
  // var selectedIndex = document.getElementById('dropdown'+QId).selectedIndex;
  field.value = selectedOption.trim()
  document.getElementById(selectedElement).nextElementSibling.nextElementSibling.style.display = 'block'
  if (['QQ1A6', 'QQ2A6', 'QQ3A6', 'QQ4A6', 'QQ5A6', 'QQ6A6'].indexOf(selectedElement) >= 0) {
    console.log('last field is selected')
  } else {
    selectedElement = document.getElementById(selectedElement).nextElementSibling.nextElementSibling.id
  }

  /* $('#dropdown'+QId+' option:eq(' + selectedIndex + ')').remove();
   $('#dropdown'+QId+' > option').each(function() {
       if (this.value != field_oldVal){
           console.log("working with options")
          oldVal_isInList = oldVal_isInList+1;
       }
       if (this.value == ""){
           this.remove();
       }
     });
      if (oldVal_isInList != 0 && oldVal_isInList!=""){
          $('#dropdown'+QId).append($('<option>', {
                 value: field_oldVal,
                 text: field_oldVal
             }));
           } */ // document.getElementById('idValue').value=document.getElementById('dropdown'+QId).options[document.getElementById('dropdown'+QId).selectedIndex].value;
}
function submitAns (QId) {
  var editPlanMode = localStorage.getItem('editPlanMode')
  answers = { 'Q1': [], 'Q2': [], 'Q3': [], 'Q4': [], 'Q5': [], 'Q6': [], 'Q7': [] }
  switch (QId) {
    case 1:
      for (var i = 0; i < $('.ans-' + QId).length; i++) {
        answers['Q1'].push($('.ans-' + QId)[i].value)
      }
      localStorage.setItem('planStage', '1')
      if (answers['Q1'][0].trim() == '' && answers['Q1'][1].trim() == '' && answers['Q1'][2].trim() == '' && answers['Q1'][3].trim() == '' && answers['Q1'][4].trim() == '' && answers['Q1'][5].trim() == '') {
        $('#formValidationQ1').show()
      } else {
        $('#formValidationQ1').hide()
        CheckValueInDB(QId)
      }

      break
    case 2:
      for (var i = 0; i < $('.ans-' + QId).length; i++) {
        answers['Q2'].push($('.ans-' + QId)[i].value)
      }
      localStorage.setItem('planStage', '2')
      if (answers['Q2'][0].trim() == '' && answers['Q2'][1].trim() == '' && answers['Q2'][2].trim() == '' && answers['Q2'][3].trim() == '' && answers['Q2'][4].trim() == '' && answers['Q2'][5].trim() == '') {
        $('#formValidationQ2').show()
      } else {
        $('#formValidationQ2').hide()
        CheckValueInDB(QId)
      }

      break
    case 3:
      for (var i = 0; i < $('.ans-' + QId).length; i++) {
        answers['Q3'].push($('.ans-' + QId)[i].value)
      }
      localStorage.setItem('planStage', '3')
      if (answers['Q3'][0].trim() == '' && answers['Q3'][1].trim() == '' && answers['Q3'][2].trim() == '' && answers['Q3'][3].trim() == '' && answers['Q3'][4].trim() == '' && answers['Q3'][5].trim() == '') {
        $('#formValidationQ3').show()
      } else {
        $('#formValidationQ3').hide()
        CheckValueInDB(QId)
      }

      break
    case 4:
      localStorage.setItem('planStage', '4')
      if (editPlanMode == 'off') {
        // document.location.href='CreateMySafetyPlanQ5.html';
        $('.contents').hide()
        $('#CreateMySafetyPlanQ5').show()
        $('#QQ5A1').focus()
      } else {
        // document.location.href='MySafetyPlan.html';
        $('.contents').hide()
        $('#MySafetyPlan').show()
      }
      break
    case 5:
      for (var i = 0; i < $('.ans-' + QId).length; i++) {
        answers['Q5'].push($('.ans-' + QId)[i].value)
      }
      localStorage.setItem('planStage', '5')
      if (answers['Q5'][0].trim() == '' && answers['Q5'][1].trim() == '' && answers['Q5'][2].trim() == '' && answers['Q5'][3].trim() == '' && answers['Q5'][4].trim() == '' && answers['Q5'][5].trim() == '') {
        $('#formValidationQ5').show()
      } else {
        $('#formValidationQ5').hide()
        CheckValueInDB(QId)
      }

      break
    case 6:
      for (var i = 0; i < $('.ans-' + QId).length; i++) {
        answers['Q6'].push($('.ans-' + QId)[i].value)
      }
      localStorage.setItem('planStage', '6')
      // CheckValueInDB(QId);
      break
    case 7:
      for (var i = 0; i < $('.ans-' + QId).length; i++) {
        answers['Q7'].push($('.ans-' + QId)[i].value)
      }
      localStorage.setItem('planStage', '7')
      localStorage.setItem('planCompleted', '1')
      CheckValueInDB(QId)
  }

  console.log(answers)
}
function agreement () {
  console.log($('#Q7A1')[0].checked)
  if ($('#Q7A1')[0].checked) {
    $('#Q7Submit').show()
  }
  if ($('#Q7A1')[0].checked == false) {
    $('#Q7Submit').hide()
  }
}
function uncheck () {
  $('#Q7A1')[0].prop('checked', false)
}
function openCloseOptions (options) {
  if (options.nextElementSibling.style.display != 'block') {
    options.nextElementSibling.style.display = 'block'
  } else {
    options.nextElementSibling.style.display = 'none'
  }
}
function validateField (selectedElement) {
  console.log(selectedElement.value)
  console.log(document.getElementById(selectedElement.id).nextElementSibling)
  console.log(document.getElementById(selectedElement.id).nextElementSibling.nextElementSibling)
  if (selectedElement.value != '') {
    console.log('if')
    document.getElementById(selectedElement.id).nextElementSibling.nextElementSibling.style.display = 'block'
    // document.getElementById(selectedElement.id).nextElementSibling.style.display="block";
    // $('#Answer1 #'+selectedElement.id).next().next().show();
  } else if (selectedElement.value == '') {
    console.log('else')
    if (document.getElementById(selectedElement.id).nextElementSibling.nextElementSibling.value == '') {
      document.getElementById(selectedElement.id).nextElementSibling.nextElementSibling.style.display = 'none'
      // $('#Answer1 #'+selectedElement.id).next().next.hide();
    }
  }

  /* if (selectedElement.value != ""){
      if((document.getElementById(selectedElement.id).nextElementSibling.nextElementSibling.style.display=="" || document.getElementById(selectedElement.id).nextElementSibling.nextElementSibling.style.display=="none") &&(document.getElementById(selectedElement.id).nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.display=="" || document.getElementById(selectedElement.id).nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.display=="none")){
          document.getElementById(selectedElement.id).nextElementSibling.style.display="block";
      }

  }else if(selectedElement.value == ""){
    selectedElement.value =  document.getElementById(selectedElement.id).nextElementSibling.nextElementSibling.value; document.getElementById(selectedElement.id).nextElementSibling.style.display="none";
    document.getElementById(selectedElement.id).nextElementSibling.nextElementSibling.value="";  document.getElementById(selectedElement.id).nextElementSibling.nextElementSibling.style.display="none";
  } */
}
