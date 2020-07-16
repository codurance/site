(function() {
  var TRACK_SELECTOR = "[data-nav-track]";
  var NAV_ITEM_SELECTOR = "[data-nav-item]";
  var ACTIVE_CLASS = 'active'

  var track = document.querySelectorAll(TRACK_SELECTOR);
  var navItems = Array.prototype.slice.call(document.querySelectorAll(NAV_ITEM_SELECTOR));

  navItems.forEach(function(item) {
    item.addEventListener('click', handleNavItemClick);
  });

  function handleNavItemClick(e) {
    var position = e.target.dataset.position;
    goToPosition(position);
  }

  function goToPosition(position) {
    positionCard(position);
    highlightNavItem(position);
  }

  function positionCard(position) {
    console.log(`positionCard: `, position);

  }

  function highlightNavItem(position) {
    var currentlyActive = document.querySelector(NAV_ITEM_SELECTOR + '.' + ACTIVE_CLASS);
    var newlyActive = navItems[position - 1];

    currentlyActive.classList.remove(ACTIVE_CLASS);
    newlyActive.classList.add(ACTIVE_CLASS);
  }

})();