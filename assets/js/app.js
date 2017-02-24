/*
* Template Name: Unify - Responsive Bootstrap Template
* Author: @htmlstream
* Website: http://htmlstream.com
*/

var App = function () {
	// We extend jQuery by method hasAttr
	jQuery.fn.hasAttr = function(name) {
	  return this.attr(name) !== undefined;
	};

	// Fixed Header
	function handleHeader() {
		if (jQuery(window).scrollTop() > 100) {
			jQuery('.header-fixed .header-sticky').addClass('header-fixed-shrink');
		}
		jQuery(window).scroll(function() {
		  if (jQuery(window).scrollTop() > 100) {
			jQuery('.header-fixed .header-sticky').addClass('header-fixed-shrink');
		  } else {
			jQuery('.header-fixed .header-sticky').removeClass('header-fixed-shrink');
		  }
		});
	}

	// Header Mega Menu
	function handleMegaMenu() {
		jQuery(document).on('click', '.mega-menu .dropdown-menu', function(e) {
			e.stopPropagation();
		})
	}

	// Search Box (Header)
	function handleSearch() {
		jQuery('.search').on("click", function () {
			if(jQuery('.search-btn').hasClass('fa-search')){
				jQuery('.search-open').fadeIn(500);
				jQuery('.search-btn').removeClass('fa-search');
				jQuery('.search-btn').addClass('fa-times');
			} else {
				jQuery('.search-open').fadeOut(500);
				jQuery('.search-btn').addClass('fa-search');
				jQuery('.search-btn').removeClass('fa-times');
			}
		});
	}

	// Search Box v1 (Header v5)
	function handleSearchV1() {
		jQuery('.header-v5 .search-button').click(function () {
			jQuery('.header-v5 .search-open').slideDown();
		});

		jQuery('.header-v5 .search-close').click(function () {
			jQuery('.header-v5 .search-open').slideUp();
		});

		jQuery(window).scroll(function(){
		  if(jQuery(this).scrollTop() > 1) jQuery('.header-v5 .search-open').fadeOut('fast');
		});
	}

	// Search Box v2 (Header v8)
	function handleSearchV2() {
		jQuery(".blog-topbar .search-btn").on("click", function() {
		  if (jQuery(".topbar-search-block").hasClass("topbar-search-visible")) {
			jQuery(".topbar-search-block").slideUp();
			jQuery(".topbar-search-block").removeClass("topbar-search-visible");
		  } else {
			jQuery(".topbar-search-block").slideDown();
			jQuery(".topbar-search-block").addClass("topbar-search-visible");
		  }
		});
		jQuery(".blog-topbar .search-close").on("click", function() {
		  jQuery(".topbar-search-block").slideUp();
		  jQuery(".topbar-search-block").removeClass("topbar-search-visible");
		});
		jQuery(window).scroll(function() {
			var isiPhone = /iphone/i.test(navigator.userAgent.toLowerCase());
			if (!isiPhone) {
			  jQuery(".topbar-search-block").slideUp();
			  jQuery(".topbar-search-block").removeClass("topbar-search-visible");
			}
		});
	}

	// TopBar (Header v8)
	function handleTopBar() {
		jQuery(".topbar-toggler").on("click", function() {
		  if (jQuery(".topbar-toggler").hasClass("topbar-list-visible")) {
			jQuery(".topbar-menu").slideUp();
			jQuery(this).removeClass("topbar-list-visible");
		  } else {
			jQuery(".topbar-menu").slideDown();
			jQuery(this).addClass("topbar-list-visible");
		  }
		});
	}

	// TopBar SubMenu (Header v8)
	function handleTopBarSubMenu() {
		jQuery(".topbar-list > li").on("click", function(e) {
		  if (jQuery(this).children("ul").hasClass("topbar-dropdown")) {
			if (jQuery(this).children("ul").hasClass("topbar-dropdown-visible")) {
			  jQuery(this).children(".topbar-dropdown").slideUp();
			  jQuery(this).children(".topbar-dropdown").removeClass("topbar-dropdown-visible");
			} else {
			  jQuery(this).children(".topbar-dropdown").slideDown();
			  jQuery(this).children(".topbar-dropdown").addClass("topbar-dropdown-visible");
			}
		  }
		  //e.preventDefault();
		});
	}

	// Sidebar Navigation Toggle
	function handleToggle() {
		jQuery('.list-toggle').on('click', function() {
			jQuery(this).toggleClass('active');
		});
	}

	// Equal Height Columns
	function handleEqualHeightColumns() {
		var EqualHeightColumns = function () {
			jQuery(".equal-height-columns").each(function() {
				heights = [];
				jQuery(".equal-height-column", this).each(function() {
					jQuery(this).removeAttr("style");
					heights.push(jQuery(this).height()); // write column's heights to the array
				});
				jQuery(".equal-height-column", this).height(Math.max.apply(Math, heights)); //find and set max
			});
		}

		EqualHeightColumns();
		jQuery(window).resize(function() {
			EqualHeightColumns();
		});
		jQuery(window).load(function() {
			EqualHeightColumns();
		});
	}

	// Equal Height Image-Columns
	function handleEqualHeightColumns__Images() {
		var EqualHeightColumns__Images = function () {
			jQuery('.equal-height-columns-v2').each(function() {
				var heights = [];
				jQuery('.equal-height-column-v2', this).each(function() {
					jQuery(this).removeAttr('style');
					heights.push(jQuery(this).height()); // Write column's heights to the array
				});
				jQuery('.equal-height-column-v2', this).height(Math.max.apply(Math, heights)); // Find and set max

				jQuery('.equal-height-column-v2', this).each(function() {
					if (jQuery(this).hasAttr('data-image-src')) {
						jQuery(this).css('background', 'url('+jQuery(this).attr('data-image-src')+') no-repeat scroll 50% 0 / cover');
					}
				});
			});
		}
    jQuery('.equal-height-columns-v2').ready(function() {
      EqualHeightColumns__Images();
    });
		jQuery(window).resize(function() {
			EqualHeightColumns__Images();
		});
	}

	// Full Screen
	var handleFullscreen = function() {
		var WindowHeight = jQuery(window).height();
		var HeaderHeight = 0;

		if (jQuery(document.body).hasClass("promo-padding-top")) {
		  HeaderHeight = jQuery(".header").height();
		} else {
		  HeaderHeight = 0;
		}

		jQuery(".fullheight").css("height", WindowHeight - HeaderHeight);

		jQuery(window).resize(function() {
		  var WindowHeight = jQuery(window).height();
		  jQuery(".fullheight").css("height", WindowHeight - HeaderHeight);
		});
	}

	// Align Middle
	var handleValignMiddle = function() {
		jQuery(".valign__middle").each(function() {
		  jQuery(this).css("padding-top", jQuery(this).parent().height() / 2 - jQuery(this).height() / 2);
		});
		jQuery(window).resize(function() {
		  jQuery(".valign__middle").each(function() {
			jQuery(this).css("padding-top", jQuery(this).parent().height() / 2 - jQuery(this).height() / 2);
		  });
		});
	}

	// Hover Selector
	function handleHoverSelector() {
	    jQuery('.hoverSelector').on('click', function(e) {
	      if (jQuery(this).children('ul').hasClass('languages')) {
	        if (jQuery(this).children('ul').hasClass('languages-visible')) {
	          jQuery(this).children('.languages').slideUp();
	          jQuery(this).children('.languages').removeClass('languages-visible');
	        } else {
	          jQuery(this).children('.languages').slideDown();
	          jQuery(this).children('.languages').addClass('languages-visible');
	        }
	      }
	    });
	}

	// Bootstrap Tooltips and Popovers
	function handleBootstrap() {
		/* Bootstrap Carousel */
		jQuery('.carousel').carousel({
			interval: 15000,
			pause: 'hover'
		});

		/* Tooltips */
		jQuery('.tooltips').tooltip();
		jQuery('.tooltips-show').tooltip('show');
		jQuery('.tooltips-hide').tooltip('hide');
		jQuery('.tooltips-toggle').tooltip('toggle');
		jQuery('.tooltips-destroy').tooltip('destroy');

		/* Popovers */
		jQuery('.popovers').popover();
		jQuery('.popovers-show').popover('show');
		jQuery('.popovers-hide').popover('hide');
		jQuery('.popovers-toggle').popover('toggle');
		jQuery('.popovers-destroy').popover('destroy');
	}

	return {
		init: function () {
			handleBootstrap();
			handleSearch();
			handleSearchV1();
			handleSearchV2();
			handleTopBar();
			handleTopBarSubMenu();
			handleToggle();
			handleHeader();
			handleMegaMenu();
			handleHoverSelector();
			handleFullscreen();
			handleValignMiddle();
			handleEqualHeightColumns();
			handleEqualHeightColumns__Images();
		},

		// Counters
		initCounter: function () {
			jQuery('.counter').counterUp({
				delay: 10,
				time: 1000
			});
		},

		// Parallax Backgrounds
		initParallaxBg: function () {
			jQuery(window).load(function() {
				jQuery('.parallaxBg').parallax("50%", 0.2);
				jQuery('.parallaxBg1').parallax("50%", 0.4);
			});
		},

		// Scroll Bar
		initScrollBar: function () {
			jQuery('.mCustomScrollbar').mCustomScrollbar({
				theme:"minimal",
				scrollInertia: 200,
				scrollEasing: "linear"
			});
		},

		// Sidebar Menu Dropdown
		initSidebarMenuDropdown: function() {
		  function SidebarMenuDropdown() {
			jQuery('.header-v7 .dropdown-toggle').on('click', function() {
			  jQuery('.header-v7 .dropdown-menu').stop(true, false).slideUp();
			  jQuery('.header-v7 .dropdown').removeClass('open');

			  if (jQuery(this).siblings('.dropdown-menu').is(":hidden") == true) {
				jQuery(this).siblings('.dropdown-menu').stop(true, false).slideDown();
				jQuery(this).parents('.dropdown').addClass('open');
			  }
			});
		  }
		  SidebarMenuDropdown();
		},

		// Animate Dropdown
		initAnimateDropdown: function() {
		  function MenuMode() {
			jQuery('.dropdown').on('show.bs.dropdown', function() {
			  jQuery(this).find('.dropdown-menu').first().stop(true, true).slideDown();
			});
			jQuery('.dropdown').on('hide.bs.dropdown', function() {
			  jQuery(this).find('.dropdown-menu').first().stop(true, true).slideUp();
			});
		  }

		  jQuery(window).resize(function() {
			if (jQuery(window).width() > 768) {
			  MenuMode();
			}
		  });

		  if (jQuery(window).width() > 768) {
			MenuMode();
		  }
		},
	};
}();
