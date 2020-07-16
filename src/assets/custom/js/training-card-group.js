(function() {
  var TRACK_SELECTOR = "[data-nav-track]";
  var NAV_ITEM_SELECTOR = "[data-nav-item]";

  var track = document.querySelectorAll(TRACK_SELECTOR);
  var navItems = Array.prototype.slice.call(document.querySelectorAll(NAV_ITEM_SELECTOR));

  navItems.forEach(function(item) {
    item.addEventListener('click', handleNavItemClick);
  });

  function handleNavItemClick(e) {
    var position = e.target.dataset.position;
    console.log(position);

  }


})();