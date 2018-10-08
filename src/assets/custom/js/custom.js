var fieldName = function (target, field) {
     return '[name=' + target + '-' + field + ']';
};

var submitTrainingContactForm = function() {
    var $inputs = $('#training-contact-form :input');
    var data = {};
    $inputs.each(function() {
        data[this.name] = $(this).val();
    });
    data['message'] = "\nTraining URL: " + window.location.href + "\n";
    data['message'] += "\nNumber of participants: " + data['participants'] + "\n";
    data['message'] += "Start date: " + data['start_date'] + "\n";
    data['message'] += "\n" + data['body'] + "\n";

    var request = new XMLHttpRequest();
    request.open('POST', 'https://codurance.com/api/emailer', true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                window.location = data['_next']
            } else {
                alert('Something went wrong ! Please send an email to hello@codurance.com')
            }
        }
    };

    request.send(JSON.stringify(data));

    return false;
};


var submitApplication = function (title, target) {
   // event.preventDefault();
    var firstName = $(fieldName(target, 'firstname')).val();
    var lastName = $(fieldName(target, 'lastname')).val();
    var email = $(fieldName(target, 'email')).val();
    var phone = $(fieldName(target, 'phone')).val();
    var location = $(fieldName(target, 'location')).val();
    var github = $(fieldName(target, 'github')).val();
    var stackoverflow = $(fieldName(target, 'stackoverflow')).val();
    var linkedin = $(fieldName(target, 'linkedin')).val();
    var blog = $(fieldName(target, 'blog')).val();
    var message = $(fieldName(target, 'message')).val().replace('"', "'");
    var craftmanship = $(fieldName(target, 'craftmanship')).val().replace('"', "'");
    var consent = $(fieldName(target, 'consent')).is(':checked');

    var errors = "";
    if (!firstName) {
        errors += "<br>First Name";
    }
    if (!lastName) {
        errors += "<br>Last Name";
    }
    if (!email) {
        errors += "<br>Email";
    }
    if (!phone) {
        errors += "<br>Phone";
    }
    if(!craftmanship) {
        errors += "<br>What does Software Craftsmanship mean to you?";
    }
    if(!message) {
        errors += "<br>Tell us about yourself";
    }
    if(!consent) {
        errors += "<br>Accept privacy policy";
    }


    if(errors) {
        $('#input-error-msg-' + target).show();
        $('#fields-' + target).html("<strong>Please: </strong> enter all the requested fields:" + errors).show();
        return false;
    } else {
        $('#input-error-msg-' + target).hide();
    }
    
    var bodyMessage = 'First Name: ' + firstName + '\r\n';
    bodyMessage += 'Last Name: ' + lastName + '\r\n';
    bodyMessage += 'Email: ' + email + '\r\n';
    bodyMessage += 'Phone: ' + phone + '\r\n';
    bodyMessage += 'Location: ' + location + '\r\n\r\n';
    bodyMessage += 'Github: ' + github + '\r\n';
    bodyMessage += 'StackOverflow: ' + stackoverflow + '\r\n';
    bodyMessage += 'Linkedin: ' + linkedin + '\r\n';
    bodyMessage += 'Blog: ' + blog + '\r\n\r\n';
    bodyMessage += 'About Software Craftsmanship: ' + craftmanship + '\r\n\r\n';
    bodyMessage += 'About Him/Her ' + message + '\r\n';
    bodyMessage += 'I Agree ' + consent + '\r\n';

    var emailAddresses = {
       'London': 'join-us@codurance.com',
       'Barcelona': 'join-us-bcn@codurance.com'
    };

    var body = {
        to: emailAddresses[location],
        name: firstName + ' ' + lastName,
        subject: title,
        email: email,
        message: bodyMessage
    };


    var url = "https://codurance.com/api/emailer";

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(body),
        success: function(data) {
  
          ga('send', {
            hitType: 'event',
            eventCategory: 'Application',
            eventAction: 'apply',
            eventLabel: title 
          });

            $('#' + target + '-fields').hide();
            $('#' + target + '-apply-btn').hide();
            $('#success-msg-' + target).show();
        },
        error: function(msg) {
            $('#error-msg-' + target).show();
        },
        dataType: "json",
        contentType: "application/json"
    });
    return false;
};


var announcementOnDevConsole = function(){
	try{
		var headline="box-sizing:border-box;display:block;font-family:Oxygen, sans-serif;font-size:28px;font-style:normal;font-variant:normal;font-weight:normal;height:40px;line-height:40px;margin-bottom:10px;margin-left:0px;margin-right:0px;margin-top:5px;text-align:center;text-shadow:none;";
		var main="display:block;font-family:'Open Sans', Arial, sans-serif;font-size:14px;font-style:normal;font-variant:normal;font-weight:normal;height:34px;line-height:17px;margin-bottom:10px;margin-top:5px;text-align:center;text-shadow:none;";
		var link="cursor:pointer;display:inline-block;font-family:'Roboto Slab', sans-serif;font-size:14px;font-stretch:normal;font-style:normal;font-variant:normal;font-weight:normal;height:25px;letter-spacing:normal;line-height:25.7143px;margin-bottom:5px;margin-left:0px;margin-right:0px;margin-top:10px;outline-style:none;padding-bottom:10px;padding-left:12px;padding-right:12px;padding-top:10px;text-align:center;";
		var isNewEnoughBrowser = "repeat" in String.prototype;
		if(isNewEnoughBrowser){
			window.console.log("\n%cHello Dev!\n\n%cWe're hiring both Apprentices and Craftspeople in London, Barcelona and Manchester. Want to know more? \n%chttps://codurance.com/careers/ \n\n",headline,main,link);
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

    announcementOnDevConsole();
});

$(window).resize(function () {
    equalizeHeights();
});


(function navbarActive(){
	$(function() {
		const url = window.location.href;
		$(".nav a").each(function() {
			if (url.includes(this.href)) {
				$(this).closest("li").addClass("active");
			}
		});
	});
})();

(function navbarProjectsActive(){//TODO delete once we add projects to the navbar
	$(function() {
		const url = window.location.href;
		$(".nav a").each(function() {
			if (url.includes("/projects") && this.href.includes("/client")) {
				$(this).closest("li").addClass("active");
			}
		});
	});
})();
