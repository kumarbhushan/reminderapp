    
        var shortName = 'WebSqlDB';
        var version = '1.0';
        var displayName = 'WebSqlDB';
        var maxSize = 4.9 * 1024 * 1024;

        function cancelCall() {
            document.getElementById("CallConfirm").style.display = "none";
        }

        function call() {
            document.getElementById("CallConfirm").style.display = "block";
            console.log("call")
        }

        function getContactId(contactId) {
            localStorage.setItem('editContactId', contactId);
            return true;
        }

        function errorHandler(transaction, error) {
            console.log('Error: ' + error.message + ' code: ' + error.code);
        }

        function successCallBack() {
            console.log("DEBUGGING: success");
        }

        function nullHandler() { };

        function createNotesTable() {
            if (!window.openDatabase) {
                console.log('Databases are not supported in this browser.');
                return;
            }
            db.transaction(function (tx) {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS Notes(UId INTEGER NOT NULL PRIMARY KEY, Title TEXT NOT NULL, Note TEXT NOT NULL)',
                    [], nullHandler, errorHandler);
            }, errorHandler, successCallBack);
        }

        function GetNotesFromDB() {
            //alert('hhh');
            var contactIds = [];
            var noteTitles = [];
            var noteNotes = [];
            if (!window.openDatabase) {
                console.log('Databases are not supported in this browser.');
                return;
            }
            db.transaction(function (transaction) {
                transaction.executeSql('SELECT UId, Title, Note  FROM Notes',
                    [],
                    function (transaction, results) {
                        if (results.rows.length) {
                            
                            for (var i = 0; i < results.rows.length; i++) {
                                
                                noteTitles.push(results.rows.item(i).Title);
                                noteNotes.push(results.rows.item(i).Note);
                                contactIds.push(results.rows.item(i).UId);
                            
                                
                            }
                            
                            //
                            $("#notes-list").empty();
                            $("#delete-notes").empty();
                            
                            for (var j = 0; j < noteTitles.length; j++) {
                                
                                $("#notes-list").append(
                                    '<div  onclick="editNotes(1);">'+
                                    '<div class="border-middle"></div>'+
                                    '<div class=""><img class="img-button-edit" src="img/btn-edit.png"></div>'+
                                '</div>'+
                            '<p class="notes-label">'+noteTitles[j]+'</p>'
                                );
                                $("#delete-notes").append(
                                     
                                    '<p class="notes-label1">'+noteTitles[j]+'</p>'+
                                    '<div class="check-contact"><div id="' + contactIds[j] +'" class=" checkNote noteUnchecked"></div></div>'
                                );
                                
                            }
                            $("#notes-list").append('<div class="empty-space"></div>');
                        } else {
                            contacts = [];
                            $("#notes-list").append(
                                '<div style="text-align: center;" class="empty-space">Add your first team member.</div>'
                            );
                        }
                    });
            });
        }

        function DeleteNotesFromDB(ContactUId) {
            //alert(ContactUId);
            db.transaction(function (transaction) {
                transaction.executeSql('DELETE FROM Notes WHERE UId=?', [ContactUId], function () {
                    
                });
            });

        }
        document.addEventListener("deviceready", onDeviceReadyNotes, false);
        // PhoneGap is ready
        //
        function onDeviceReadyNotes() {
            StatusBar.hide();
            localStorage.setItem("editPlanMode", "off");
            db = openDatabase(shortName, version, displayName, maxSize); 
            createNotesTable();
            GetNotesFromDB();
            $(document).on('click','.checkNote', function(){
                var id= $(this).attr('id');
                $('#'+id).toggleClass('noteChecked');  
                $('#'+id).toggleClass('notetUnchecked'); 
                if($('.checkNote').length == $('.noteChecked').length){
                    $("#deselect-all-notes").show();
                    $("#select-all-notes").hide();
                }else{
                    $("#deselect-all-notes").hide();
                    $("#select-all-notes").show();
                }
            });

            $("#select-all-notes").click(function() {
               
                $( ".checkNote" ).each(function( index ) {
                    var id= $(this).attr('id');
                    $('#'+id).toggleClass('noteChecked');  
                    $('#'+id).toggleClass('notetUnchecked');      
                });
                $("#deselect-all-notes").show();
                $("#select-all-notes").hide();
               
            });
            $("#deselect-all-notes").click(function() {
               
                $( ".checkNote" ).each(function( index ) {
                    var id= $(this).attr('id');
                    $('#'+id).toggleClass('noteChecked');  
                    $('#'+id).toggleClass('notetUnchecked');      
                });
                $("#deselect-all-notes").hide();
                $("#select-all-notes").show();
               
            });

            $("#delete-selected-notes").click(function(){
                    $( ".noteChecked" ).each(function( index ) {
                    var id= $(this).attr('id');
                    DeleteNotesFromDB(id);
                });
                
                GetNotesFromDB();
                //GetValueFromDBContact();
                $('#show-notes-list').show();
                    $('#delete-selected-notes').hide();
                    $('#add-notes-btn').show();
                    $('#notes-list').show();
                    $('#delete-notes').hide();
                    $('#delete-icon-black-notes').hide();
                
            });
            
            $("#addNewNoteBtn").click(function () {
                //alert('here');
                
                noteTitle = document.getElementById("addTitle").value;
                noteNote = document.getElementById("addNote").value;
                if (noteTitle.trim() != "" && noteNote.trim() != "") {
                    
                    $("#formValidationNote").hide();
                    InsertNoteInDB(noteTitle.trim(), noteNote.trim());
                } else {
                    
                    $("#formValidationNote").show();
                    
                }


            });


            
        }
        
        
        var NoteUId = "";
        

        function InsertNoteInDB(noteTitle, noteNote) {
            console.log("inside insert");
            // alert('herein');
            
            if (!window.openDatabase) {
                console.log('Databases are not supported in this browser.');
                return;
            }
            db.transaction(function (transaction) {
                console.log("Inserting");
                
                transaction.executeSql(
                    'INSERT INTO Notes(Title, Note) VALUES (?,?)',
                    [
                        noteTitle, noteNote
                    ],
                    function () {
                        console.log("DEBUGGING: success");
                        document.getElementById("addTitle").value = "";
                        document.getElementById("addNote").value = "";
                        
                        GetNotesFromDB();
                        $('#add-notes').hide();
                        $('#notes-list').show();
                        $('#addNewNoteBtn').hide();
                        $('#add-notes-btn').show();
                            
                            
                    }, errorHandlerImage, successCallBackImage);
            });
        }

