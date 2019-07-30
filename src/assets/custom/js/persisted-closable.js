$(function () {
  'use strict';

  function close (closable) {
    $(closable).hide();
  }

  function open (closable) {
    $(closable).show();
  }

  function hasClosed (id) {
    return localStorage.getItem(id) !== null;
  }

  function setClosed (id) {
    localStorage.setItem(id, id);
  }

  function createCloseButton (closable, closableId) {
    var closer = $('<button class="closer btn btn-sm btn-dark">&times;</button>');

    closer.on('click', function () {
      close(closable);
      setClosed(closableId);
    });

    $(closable).append(closer);
  }

  function init(index, closable) {
    var closableId = $(closable).data('closable-id');

    createCloseButton(closable, closableId);

    if (hasClosed(closableId)) {
      close(closable);
    } else {
      open(closable);
    }
  }

  $('.persisted-closable').each(init);
});
