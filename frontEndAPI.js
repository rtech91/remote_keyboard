// This script uses jquery.js as dependency
// Load this script after jquery.js 
// Sets visual release timeout after key has been pushed
let KEY_TAP_TIMEOUT = 300;
function pushButtonOnce(button, keyName, isMouseClick) {
    $(button).addClass('push');
    if(isMouseClick) {
        $.ajax({
            type: 'GET',
            url: '/mouseClick/' + keyName,
        });
    }else {
        $.ajax({
            type: 'GET',
            url: '/key/' + keyName,
            success: function(){
                // no operation by default
            }
        });
    }
    setTimeout(
        function() {
            $(button).removeClass('push');
        },
        KEY_TAP_TIMEOUT
    );
}	
