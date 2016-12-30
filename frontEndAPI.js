// This script uses jquery.js as dependency
// Load this script after jquery.js 
// Sets visual release timeout after key has been pushed
var queryString = '';
var ctrlKeysList = [];
var isComby = false;
ctrlKeysList[0] = '';
let KEY_TAP_TIMEOUT = 100;
function pushButtonOnce(button, keyName, isMouseClick) {
    $(button).addClass('push');
    if(keyName.match(/(control|alt|win)/) || ctrlKeysList[0].match(/(control|alt|win)/) && !isMouseClick) {
        isComby = true;
        if(keyName !== 'enter') {
            // add keyName to the list of keys
            if(ctrlKeysList.length === 1 && ctrlKeysList[0] === '') {
                ctrlKeysList[0] = keyName;
            }else {
                ctrlKeysList.push(keyName);
            }
            console.log(ctrlKeysList);
        }else {
            ctrlKeysList.forEach(function(key, i, arr){
                queryString = queryString + key;
                if(i < arr.length - 1) {
                    queryString = queryString + '_';
                }
            });
        }
    }
    if(isMouseClick) {
        $.ajax({
            type: 'GET',
            url: '/mouseClick/' + keyName
        });
    }else if(!isComby && !isMouseClick) {
        $.ajax({
            type: 'GET',
            url: '/key/' + keyName,
            success: function(){
                // no operation by default
            }
        });
    }else if(isComby && keyName === 'enter') {
        $.ajax({
            type: 'GET',
            url: '/key/' + queryString,
            success: function() {
                // no operation by default
            }
        });

        ctrlKeysList = [];
        ctrlKeysList[0] = '';
        queryString = '';
        isComby = false;
    }

    setTimeout(
        function() {
            $(button).removeClass('push');
        },
        KEY_TAP_TIMEOUT
    );
}