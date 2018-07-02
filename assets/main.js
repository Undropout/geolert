var config = {
    apiKey: config.apiKey_2,
    authDomain: config.authDomain_2,
    databaseURL: config.databaseURL_2,
    storageBucket: config.storageBucket_2,
    messagingSenderId: config.messagingSenderId_2
    };

    console.log("This is your config variable: " + config);
firebase.initializeApp(config);

var database = firebase.database();
console.log("THis is your database: " + database);

database.ref().on("child_added", function (snapshot) {




var newRow = $('<tr>');
//attempting to do a new variable that'll populate with a mostly-complete URL in a href, so when coordinates come back from the Firebase server we can put them into a link by DOM manipulation

var newName = $('<td>');
var newUserType = $('<td>');
var newUserEmail = $('<td>');
var newRecipient = $('<td>');
//var newTriggerLocation = $('<td>');
//^ This has been temporarily commented out to allow an experiment in DOM manipulation below with the variable "newLoc"
var newLoc = $('<td>');
var newMessage = $('<td>');

newName.html(snapshot.val().userName);
newUserType.html(snapshot.val().userType);
newUserEmail.html(snapshot.val().userEmail);
newRecipient.html(snapshot.val().recipient);
//newTriggerLocation.html(snapshot.val().triggerLocation);
//^ Temporarily commented out to allow for DOM manipulation experiment below
if (snapshot.val().userType=='Scout'){
newLoc.html('<a href = "https://www.google.com/maps/?q=' + snapshot.val().triggerLocation + '">Location');
}
if (snapshot.val().userType=='HQ'){
    newLoc.html('');
    }
    
newRow.append(newName);
newRow.append(newUserType);
newRow.append(newUserEmail);
newRow.append(newRecipient);
newRow.append(newLoc);
newRow.append(newMessage);


$('tbody').append(newRow);

});
//-=-=-=-=-=-=-=-
//Function to show or hide entry fields depending on whether user is HQ or Scout type
$("#newUserType").bind('change', function(){

var whatUserType = $(this).find(':selected').text();
console.log(whatUserType);
//If they're HQ, 3 fields will disappear so they don't enter anything they're not supposed to
if (whatUserType == "HQ"){
    document.getElementById("newRecipient").style.display='none'; 
     document.getElementById("newTriggerLocation").style.display='none';
     document.getElementById("newMessage").style.display='none';
}
//If they're a scout, the ability to access those 3 fields comes back
if (whatUserType == "Scout"){
    document.getElementById("newRecipient").style.display='block';
    document.getElementById("newTriggerLocation").style.display='block';
    document.getElementById("newMessage").style.display='block';
}
});
//-=-=-=-=-=-=-=-


$('#submitNewUser').on("click", function (e) {
e.preventDefault();


var inputUser = $('#newUserName').val().trim();
var inputUserType = $('#newUserType').val();
var inputUserEmail = $('#newUserEmail').val();
var inputRecipient = $('#newRecipient').val();
var inputTriggerLocation = $('#newTriggerLocation').val();
var inputMessage = $('#newMessage').val();
console.log("User name entered is: " + inputUser);
console.log("User type is: " + inputUserType);



// }
if(inputUser.length > 0 && inputUserType.length > 0 &&inputUserEmail.length > 0) {
    database.ref().push({
        userName: inputUser,
        userType: inputUserType,
        userEmail: inputUserEmail,
        recipient: inputRecipient,
        triggerLocation: inputTriggerLocation,
        message: inputMessage
    });
    }
    //clears the input form; later we'll change this to repopulate with localstorage values so the same user doesn't have to input their info every time.
$("#newUserName").val("");
$("#newUserType").val("");
$("#newUserEmail").val("");
$("#newRecipient").val("");
$("#newTriggerLocation").val("");
$("#newMessage").val("");

});