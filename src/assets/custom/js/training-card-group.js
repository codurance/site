(function() {
  var TRACK_SELECTOR = "[data-nav-track]";
  var NAV_ITEM_SELECTOR = "[data-nav-item]";
  var ACTIVE_CLASS = 'active';
  var ANIMATING_CLASS = 'animating';

  var track = document.querySelector(TRACK_SELECTOR);
  var navItems = Array.prototype.slice.call(document.querySelectorAll(NAV_ITEM_SELECTOR));

  track.addEventListener('touchstart', handleTouchStart, false);
  track.addEventListener('touchend', handleTouchEnd, false);

  navItems.forEach(function(item) {
    item.addEventListener('click', handleNavItemClick);
  });

  function handleTouchStart() {
    console.log('touch start');

  }

  function handleTouchEnd() {
    console.log('touch end');

  }

  function handleNavItemClick(e) {
    var position = e.target.dataset.position;
    goToPosition(position);
  }

  function goToPosition(position) {
    positionCard(position);
    highlightNavItem(position);
  }

  function positionCard(position) {
    track.classList.add(ANIMATING_CLASS);
    track.addEventListener('transitionend', removeAnimatingClass);
    track.dataset.position = position;
  }

  function removeAnimatingClass() {
    track.classList.remove(ANIMATING_CLASS);
  }

  function highlightNavItem(position) {
    var currentlyActive = document.querySelector(NAV_ITEM_SELECTOR + '.' + ACTIVE_CLASS);
    var newlyActive = navItems[position - 1];

    currentlyActive.classList.remove(ACTIVE_CLASS);
    newlyActive.classList.add(ACTIVE_CLASS);
  }

})();