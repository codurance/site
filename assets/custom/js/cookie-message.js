window.codurance  = window.codurance || {}

window.codurance.cookieMessage = (function() {
    const COOKIE_NAME = 'has-cookie-consent';
    var messageElement = document.getElementById('cookie-message');
    var acceptButton = document.getElementById('cookie-message-accept');
    
    if (!messageElement) {
        throw 'no element found for cookie message';
    }

    if(!acceptButton) {
        throw 'no element found for cookie message accept';
    }

    var onConsentCallbacks = [];

    /**
     * Set cookie
     *
     * @param string name
     * @param string value
     * @param int days
     * @param string path
     * @see http://www.quirksmode.org/js/cookies.html
     */
    function createCookie(name, value, days, path) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path="+path;
    }

    /**
     * Read cookie
     * @param string name
     * @returns {*}
     * @see http://www.quirksmode.org/js/cookies.html
     */
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function showMessage() {
        messageElement.style.display = 'block';
    }

    function hideMessage() {
        messageElement.style.display = 'none';
        messageElement.classList.add('accepted');
    }

    function hasConsent() {
        var cookie = readCookie('has-cookie-consent');
        var hasConsent = cookie != null && cookie == 'yes';
        return hasConsent;
    }

    function setConsent() {
        // Set/update cookie
        var cookieExpiry = 60;
        var cookiePath =  "/";

        createCookie(COOKIE_NAME, 'yes', cookieExpiry, cookiePath);
    }

    function onConsent(callback){
        onConsentCallbacks.push(callback);
    }

    function triggerOnConsent () {
        onConsentCallbacks.forEach(function(callback){
            callback.call(null);
        });
    }

    function init () {
        if (hasConsent()) {
            return;
        } 
        
        showMessage();

        acceptButton.addEventListener('click', function(){
            setConsent();
            hideMessage();
            triggerOnConsent();
        });
    }

    init();

    return {
        onConsent: onConsent
    };

})();
