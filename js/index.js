
function scrollspy() {
  'use strict';

  var section = document.querySelectorAll(".section");
  var sections = {};
  var i = 0;

  Array.prototype.forEach.call(section, function(e) {
    sections[e.id] = e.offsetTop;
  });

  window.onscroll = function() {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    for (i in sections) {
      if (sections[i] <= scrollPosition) {
      	// console.log(i)
      	// console.log(document.querySelector('a[href*=' + i + ']'))
        document.querySelector('.active').setAttribute('class', ' ');
        document.querySelector('a[href*=' + i + ']').setAttribute('class', 'active');
      }
    }
  };
};



function navScroll(){
	let nav = document.getElementById("contact-head")

	var scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
  	var draw = 300 * scrollpercent;
  	nav.scrollLeft = draw;
}

function splashScroll(){
	console.log('splashScroll')
	var clientHeight = document.getElementById("splasher").clientHeight;
	var splash = document.getElementById("splasher");
	var nav = document.getElementById("head");
	var logo = document.querySelector('.splashLogo')
	window.onscroll = function(section) {
		 if (window.scrollY >= (clientHeight/4)) {
	 		splash.classList.add("splasher-disappear")
	 		nav.classList.remove("no-display")
	 		console.log(logo)
	 		logo.classList.add("splashLogoTransition")
	 		logo.classList.remove("splashLogo");

	    } else {
	    	console.log('not past 300 pixels');
	    	splash.classList.remove("splasher-disappear")
	    	nav.classList.add("no-display")
	    	logo.classList.remove("splashLogoTransition")
	    	logo.classList.add("splashLogo");
	    }
	}

}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function main(){
	window.addEventListener("scroll", navScroll);
	// scrollspy()
	splashScroll();



}

main()