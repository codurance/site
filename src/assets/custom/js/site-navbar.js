(function navbarActive(){
  const url = window.location.href;
  const navbarLinks = document.querySelectorAll('[data-js-target="site-navbar-link"]');
  const navbarLinksArr = Array.prototype.slice.call(navbarLinks);

  navbarLinksArr.forEach(link => {
    if (url.includes(link.href)) link.className += '--active';
  });
})();