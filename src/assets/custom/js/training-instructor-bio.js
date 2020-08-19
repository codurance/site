(function () {
    var CLOSED_TEXT = isSpanishSite() ? "más info" : "read more";
    var OPEN_TEXT = isSpanishSite() ? "menos info" : "read less";
    var button = document.querySelector(".training-bio__read-more-button");
    var training_bio = document.querySelector(".training-bio");

    button.addEventListener("click", handleClick);

    function handleClick() {
        updateClass();
        updateButtonText();
    }

    function updateClass() {
        if (training_bio) {
            training_bio.classList.toggle("training-bio--open");
        }
    }

    function updateButtonText() {
        if (button) {
            button.textContent = training_bio.classList.contains("training-bio--open") ? OPEN_TEXT : CLOSED_TEXT;
        }
    }

    function isSpanishSite() {
        return window.location.host.includes(".es") || window.location.pathname.includes("/es/");
    }
})();
