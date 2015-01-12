var Index = function () {

    return {

        // Owl carousel
        initOwlCarousel: function() {
            $(document).ready(function() {

                var owl = $("#client-carousel");
                owl.owlCarousel({
                    autoPlay: 4000, //Set AutoPlay to 3 seconds
                    items: 3, //10 items above 1000px browser width
                    itemsDesktop: [1000, 3], //5 items between 1000px and 901px
                    itemsDesktopSmall: [900, 3], // betweem 900px and 601px
                    itemsTablet: [600, 2], //2 items between 600 and 0
                    itemsMobile: [400, 1] // itemsMobile disabled - inherit from itemsTablet option
                });
            });
        }

    };
}();