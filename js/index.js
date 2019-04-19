let browser;

function checkBrowser() {
    // Return cached result if avalible, else get result then cache it.
    if (checkBrowser.prototype._cachedResult)
        return browser.prototype._cachedResult;

    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]"
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1+
    var isChrome = !!window.chrome ;

    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    return checkBrowser.prototype._cachedResult =
        isOpera ? 'Opera' :
        isFirefox ? 'Firefox' :
        isSafari ? 'Safari' :
        isChrome ? 'Chrome' :
        isIE ? 'IE' :
        isEdge ? 'Edge' :
        isBlink ? 'Blink' :
        "Don't know";
};

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


function PageScrollEvents(){
	// for contact-head scroll
	let contactNav = document.getElementById("contact-head")

  	window.addEventListener("scroll", contactHeadScroll); // chrome

  	const contentarea = document.querySelector('#content');
	contentarea.onscroll = logScroll; //for firefox
	splashScroll()

	var theHeight = document.getElementById("splasher").clientHeight ||document.getElementById("splasher").offsetHeight;
	var splash = document.getElementById("splasher");
	var nav = document.getElementById("head");
	var logo = document.querySelector('.splashLogo')
	let splashBreak;


	function logScroll(e) {
		if(browser == 'Chrome'){
			splashBreak = window.scrollY
		}
		else if (browser == 'Firefox'){
			splashBreak = e.target.scrollTop
		}

	  	if (splashBreak >= (theHeight/2)) {
	 		splash.classList.add("splasher-disappear")
	 		nav.classList.remove("no-display")
	 		logo.classList.add("splashLogoTransition")
	 		logo.classList.remove("splashLogo");

	    } else {
	    	splash.classList.remove("splasher-disappear")
	    	nav.classList.add("no-display")
	    	logo.classList.remove("splashLogoTransition")
	    	logo.classList.add("splashLogo");
	    }

	    var scrollpercent = (e.target.scrollTop ) / (e.target.scrollHeight -e.target.clientHeight);
	  	var draw = 300 * scrollpercent;
	  	contactNav.scrollLeft = draw;
	}


}

function topFunction(){
	document.body.scrollTop = 0; // For Safari
 	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


// chrome contact head scroll
function contactHeadScroll(){
	let nav = document.getElementById("contact-head")
	var scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
  	var draw = 300 * scrollpercent;
  	nav.scrollLeft = draw;
}

function topFunction(){
	document.body.scrollTop = 0; // For Safari
 	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function splashScroll(){

	var theHeight = document.getElementById("splasher").clientHeight ||document.getElementById("splasher").offsetHeight;
	var clientHeight = document.getElementById("splasher").clientHeight;
	var splash = document.getElementById("splasher");
	var nav = document.getElementById("head");
	var logo = document.querySelector('.splashLogo')
	window.onscroll = function(section) {
		// console.log('onscrol',  window.scrollY, (clientHeight/4))
		 if (window.scrollY >= (theHeight/4)) {
	 		splash.classList.add("splasher-disappear")
	 		nav.classList.remove("no-display")
	 		logo.classList.add("splashLogoTransition")
	 		logo.classList.remove("splashLogo");

	    } else {
	    	// console.log('not past 300 pixels');
	    	splash.classList.remove("splasher-disappear")
	    	nav.classList.add("no-display")
	    	logo.classList.remove("splashLogoTransition")
	    	logo.classList.add("splashLogo");
	    }
	}
}



function main(){
	// scrollspy()

	PageScrollEvents()
	browser = checkBrowser()
	console.log(browser)
}

main()