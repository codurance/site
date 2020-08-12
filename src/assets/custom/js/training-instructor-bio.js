(function () {
    var button = document.querySelector(".training-bio__read-more-button");
    button.addEventListener("click", readMore);

    var content = document.querySelector(".training-bio");

    function readMore() {
        content.classList.toggle("training-bio--open");
    }
})();
