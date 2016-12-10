// This script uses jquery.js as dependency
// Load this script after jquery.js 
let KEY_TAP_TIMEOUT = 300;
function pushButtonOnce(button) {
    $(button).addClass('push');
    setTimeout(
        function() {
            $(button).removeClass('push');
        },
        KEY_TAP_TIMEOUT
    );
}	
