
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

function main(){
	window.addEventListener("scroll", navScroll);
	scrollspy()
}

main()