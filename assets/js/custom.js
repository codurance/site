
var announcementOnDevConsole = function(){
	try{
		var headline="box-sizing:border-box;display:block;font-family:Oxygen, sans-serif;font-size:28px;font-style:normal;font-variant:normal;font-weight:normal;height:40px;line-height:40px;margin-bottom:10px;margin-left:0px;margin-right:0px;margin-top:5px;text-align:center;text-shadow:none;";
		var main="display:block;font-family:'Open Sans', Arial, sans-serif;font-size:14px;font-style:normal;font-variant:normal;font-weight:normal;height:34px;line-height:17px;margin-bottom:10px;margin-top:5px;text-align:center;text-shadow:none;";
		var link="cursor:pointer;display:inline-block;font-family:'Roboto Slab', sans-serif;font-size:14px;font-stretch:normal;font-style:normal;font-variant:normal;font-weight:normal;height:25px;letter-spacing:normal;line-height:25.7143px;margin-bottom:0px;margin-left:0px;margin-right:0px;margin-top:10px;outline-style:none;padding-bottom:10px;padding-left:12px;padding-right:12px;padding-top:10px;text-align:center;";
		var isNewEnoughBrowser = "repeat" in String.prototype;
		if(isNewEnoughBrowser){
			window.console.log("\n%cHello Dev!\n\n%cWe're hiring both apprentices and crafts[wo]men. Want to know more? \n%chttp://codurance.com/careers/ \n\n",headline,main,link);
		}
	} catch(_) {}
}

var equalizeHeights = function() {
    var maxHeight = 0;

    $('.equalheight').each(function () {
        $(this).height('auto');
        var thisH = $(this).height();
        if (thisH > maxHeight) { maxHeight = thisH; }
    });

    $('.equalheight').height(maxHeight);
}

$(document).ready(function() { 
    equalizeHeights();

    //This function is necessary so Safari can redraw the menu 
    $(".dropdown").click(function(){
        return true;
    });

  $('.custom-owl-carousel').owlCarousel({
    loop:true,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            margin: 20
        },
        600:{
            items:3,
            margin: 30
        },
        1000:{
            items:6,
            margin: 40
        }
    }
  });

	announcementOnDevConsole();
});

$(window).resize(function () {
    equalizeHeights();
});

$(function() {
	const url = window.location.href;
	$(".nav a").each(function() {
		if (url.includes(this.href)) {
			$(this).closest("li").addClass("active");
		}
	});
});        
