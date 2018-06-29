$(document).ready( function () {

    var geolertEmail

    var userTypedMsg = $("#message").val(); //change if necessary
    var msgInput

    var minsFromDest = false;
    var minsAway
    var selLocation
    var recipient

    var qURL = "https://www.googleapis.com/gmail/v1/users/" + geolertEmail + "/messages/send"



    // prefab message says "I'm at [geolocation]." 
    //or "I'm [number of] minutes from [geolocation]."
    // or a pretyped message

    function msgTextContent() {
        if (userTypedMsg) {
            msgInput = userTypedMsg;
        } else if (minsFromDest ===true) {
            msgInput = `I'm ${minsAway} minutes away from ${selLocation}.`
        } else {
            msgInput = `I've arrived at ${selLocation}.`
        }
        return msgInput;
    }

/// ??? DANG YOU GMAIL API.
/**
 * Send Message.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} email RFC 5322 formatted String.
 * @param  {Function} callback Function to call when the request is complete.
 */
function sendMessage(userId, email, callback) {
    // Using the js-base64 library for encoding:
    // https://www.npmjs.com/package/js-base64
    var base64EncodedEmail = Base64.encodeURI(email);
    var request = gapi.client.gmail.users.messages.send({
      'userId': userId,
      'resource': {
        'raw': msgInput
      }
    });
    request.execute(callback);
  }


})