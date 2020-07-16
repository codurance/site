(function() {
  var TRACK_SELECTOR = "[data-nav-track]";
  var NAV_ITEM_SELECTOR = "[data-nav-item]";
  var ACTIVE_CLASS = 'active';
  var ANIMATING_CLASS = 'animating';

  var track = document.querySelector(TRACK_SELECTOR);
  var navItems = Array.prototype.slice.call(document.querySelectorAll(NAV_ITEM_SELECTOR));

  var touchstartPosition, touchendPosition, currentPosition, numberOfCards;

  track.addEventListener('touchstart', handleTouchStart, false);
  track.addEventListener('touchend', handleTouchEnd, false);

  function storeCurrentPosition() {
    currentPosition = track.dataset.position / 1;
  }

  function storeNumberOfCards() {
    numberOfCards = track.dataset.numberOfCards / 1;
  }

  storeCurrentPosition();
  storeNumberOfCards();

  navItems.forEach(function(item) {
    item.addEventListener('click', handleNavItemClick);
  });

  function handleTouchStart(e) {
    touchstartPosition = getTouchPosition(e);
    console.log(`touchstartPosition: `, touchstartPosition);

  }

  function handleTouchEnd(e) {
    touchendPosition = getTouchPosition(e);
    console.log(`touchendPosition: `, touchendPosition);

    handleSwipeDirection();
  }

  function handleSwipeDirection() {
    var diff = touchstartPosition - touchendPosition;
    diff < 0 ? moveTrackRight() : moveTrackLeft();
  }

  function moveTrackLeft() {
    var targetPosition = currentPosition + 1;
    if (targetPosition > numberOfCards) targetPosition = numberOfCards;
    goToPosition(targetPosition);
  }

  function moveTrackRight() {
    var targetPosition = currentPosition - 1;
    if (targetPosition < 1) targetPosition = 1;
    goToPosition(targetPosition);
  }

  function getTouchPosition(e) {
    return e.changedTouches[0].clientX;
  }

  function handleNavItemClick(e) {
    var position = e.target.dataset.position;
    goToPosition(position);
  }

  function goToPosition(position) {
    updateCurrentPosition(position);
    positionCard(position);
    highlightNavItem(position);
  }

  function updateCurrentPosition(position) {
    currentPosition = position;
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