$(function () {
  'use strict';

  function close (closable) {
    $(closable).hide();
  }

  function readCookie (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  function hasCookie (name) {
      return readCookie(name) !== null;
  }

  function setCookie (name) {
    var days = 60;
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    document.cookie = name + "=1; expires=" + date.toGMTString() + "; path=/";
  }

  function createCloseButton (closable, cookieName) {
    var closer = $('<button>Close</button>');

    closer.on('click', function () {
      close(closable);
      setCookie(cookieName);
    });

    $(closable).append(closer);
  }

  function init(index, closable) {
    var cookieName = $(closable).data('cookie-name');

    if (hasCookie(cookieName)) {
      close(closable);
    } else {
      createCloseButton(closable, cookieName);
    }
  }

  $('.closable-with-cookie').each(init);
});
