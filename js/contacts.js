          var db;
          var shortName = 'WebSqlDB';
          var version = '1.0';
          var displayName = 'WebSqlDB';
          var maxSize = 65535;
          var selectedElement="";
          var answers = [];
          function errorHandler(transaction, error) {
               console.log('Error: ' + error.message + ' code: ' + error.code);
          }

          function successCallBack() {
               console.log("DEBUGGING: success");
          }
          
          function nullHandler(){};
          
          function createTable(){
            console.log("DEBUGGING: we are in the onBodyLoad() function");

             if (!window.openDatabase) {

               console.log('Databases are not supported in this browser.');
               return;
            }
            db = openDatabase(shortName, version, displayName,maxSize);
             db.transaction(function(tx){
               tx.executeSql( 'CREATE TABLE IF NOT EXISTS Plan(UId INTEGER NOT NULL PRIMARY KEY, QId INTEGER NOT NULL, AId INTEGER NOT NULL, Answer TEXT NOT NULL)', [], nullHandler,errorHandler); },errorHandler,successCallBack);
            }
          
           function AddValueToDB(QId, AId) {
               console.log(QId);
console.log(answers);
             if (!window.openDatabase) {
               console.log('Databases are not supported in this browser.');
               return;
             }

                  db.transaction(function(transaction) {
   
                            transaction.executeSql('INSERT INTO Plan(QId, AId, Answer) VALUES (?,?,?)', [QId, AId, answers['Q'+QId][AId-1]], nullHandler,errorHandler);
            
                  });
                }
                                 
            function UpdateValueInDB(QId, AId) {

             if (!window.openDatabase) {
               console.log('Databases are not supported in this browser.');
               return;
             }
             
                  db.transaction(function(transaction) {
                            console.log("Updating");
                            transaction.executeSql('UPDATE Plan SET Answer = ? WHERE AId=? AND QId=?', [answers['Q'+QId][AId-1], AId, QId], nullHandler,errorHandler);
                  });
                }

            function GetValueFromDB(QId, AId) {
              var answer = "";
             if (!window.openDatabase) {
               console.log('Databases are not supported in this browser.');
               return;
             }             
                  db.transaction(function(transaction) {
                 transaction.executeSql('SELECT Answer FROM Plan WHERE AId=? AND QId=?', [AId, QId], function(transaction,results){

                 if (results.rows.length){
                      console.log (results.rows[0]["Answer"]);
                     answer = results.rows[0]["Answer"];
                     document.getElementById("Q"+QId+"A"+AId).value = answer;

                 }
                else {
                        answer = "";
                }                   
                 });
                });
            }
          
          function CheckValueInDB(QId) {
              var answerRow = "";
             if (!window.openDatabase) {
               console.log('Databases are not supported in this browser.');
               return;
             }             
                  db.transaction(function(transaction) {
                      
                 transaction.executeSql('SELECT * FROM Plan WHERE AId=? AND QId=?', [1, QId], function(transaction,results){
                 if (results.rows.length){
                      answerRow = 1;
                    UpdateValueInDB(QId,1);
                 }
                else {
                        answerRow = 0;
                        AddValueToDB(QId, 1);
                } 
                 });
                      
                transaction.executeSql('SELECT * FROM Plan WHERE AId=? AND QId=?', [2, QId], function(transaction,results){
                 if (results.rows.length){
                      answerRow = 1;
                    UpdateValueInDB(QId,2);
                 }
                else {
                        answerRow = 0;
                        AddValueToDB(QId, 2);
                } 
                 });
                      
                transaction.executeSql('SELECT * FROM Plan WHERE AId=? AND QId=?', [3, QId], function(transaction,results){
                 if (results.rows.length){
                      answerRow = 1;
                    UpdateValueInDB(QId,3);
                 }
                else {
                        answerRow = 0;
                        AddValueToDB(QId, 3);
                }
                 });
                      
                transaction.executeSql('SELECT * FROM Plan WHERE AId=? AND QId=?', [4, QId], function(transaction,results){
                 if (results.rows.length){
                      answerRow = 1;
                    UpdateValueInDB(QId,4);
                 }
                else {
                        answerRow = 0;
                        AddValueToDB(QId, 4);
                }
                 });
                      transaction.executeSql('SELECT * FROM Plan WHERE AId=? AND QId=?', [5, QId], function(transaction,results){
                 if (results.rows.length){
                      answerRow = 1;
                    UpdateValueInDB(QId,5);
                 }
                else {
                        answerRow = 0;
                        AddValueToDB(QId, 5);
                }
                 });
                      transaction.executeSql('SELECT * FROM Plan WHERE AId=? AND QId=?', [6, QId], function(transaction,results){
                 if (results.rows.length){
                     answerRow = 1;
                    UpdateValueInDB(QId,6);
                 }
                else {
                    answerRow = 0;
                    AddValueToDB(QId, 6);
                } 
                      });
                });
            }   
          
          function selectElement(el){
              console.log($(el)[0].id);
              return selectedElement = $(el)[0].id;
          }
          
          function populateField(QId){
              var field = document.getElementById(selectedElement);
              var field_oldVal = field.value;
              var oldVal_isInList = 0;
              var selectedIndex = document.getElementById('dropdown'+QId).selectedIndex;
              field.value=document.getElementById('dropdown'+QId).options[selectedIndex].text;
              console.log(selectedElement);
              $('#dropdown'+QId+' option:eq(' + selectedIndex + ')').remove();
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
                      }  //document.getElementById('idValue').value=document.getElementById('dropdown'+QId).options[document.getElementById('dropdown'+QId).selectedIndex].value;
            }
          function submitAns(QId){
               answers = {'Q1':[], 'Q2':[], 'Q3':[], 'Q4':[], 'Q5':[], 'Q6':[], 'Q7':[]};
              switch (QId) {
                    case 1:
                        for (var i = 0; i < $(".ans-"+QId).length; i++) {
                          answers['Q1'].push($(".ans-"+QId)[i].value);
                        }
                      CheckValueInDB(QId);
                        break;
                    case 2:
                        for (var i = 0; i < $(".ans-"+QId).length; i++) {
                          answers['Q2'].push($(".ans-"+QId)[i].value);
                        }
                      CheckValueInDB(QId);
                        break;
                    case 3:
                        for (var i = 0; i < $(".ans-"+QId).length; i++) {
                          answers['Q3'].push($(".ans-"+QId)[i].value);
                        }
                      CheckValueInDB(QId);
                        break;
                    case 4:
                        for (var i = 0; i < $(".ans-"+QId).length; i++) {
                          answers['Q4'].push($(".ans-"+QId)[i].value);
                        }
                      CheckValueInDB(QId);
                        break;
                    case 5:
                        for (var i = 0; i < $(".ans-"+QId).length; i++) {
                          answers['Q5'].push($(".ans-"+QId)[i].value);
                        }
                      CheckValueInDB(QId);
                        break;
                    case 6:
                        for (var i = 0; i < $(".ans-"+QId).length; i++) {
                          answers['Q6'].push($(".ans-"+QId)[i].value);
                        }
                      CheckValueInDB(QId);
                        break;
                    case 7:
                        for (var i = 0; i < $(".ans-"+QId).length; i++) {
                          answers['Q7'].push($(".ans-"+QId)[i].value);
                        }
                      CheckValueInDB(QId);
                }
               
              console.log(answers);
              
          }

          $(document).ready(function(){
              
              createTable();

                for (var i = 1 ; i < 7 ; i++){
                    GetValueFromDB(1,i);
                }
              


          });