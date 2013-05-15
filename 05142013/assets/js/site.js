/********************************************************************

	THAIPOGRAFIK - site.js
	-----------------------------
	author: zack ginies - zack@zackginies.com
	date: sept 24, 2012

	INDEX
	-----------------------------------------
	- Vertical Centering
	- Navigation
	- Gallery

********************************************************************/

/*-------------------------------------------------------------------

	VERTICAL CENTERING
	Position the work descriptions

-------------------------------------------------------------------*/

function verticalCenter() {
	$('.work_desc').each(function(i) {
		var $this 		= $(this);
		var descHeight 	= $this.height() / 2;
		
		$this.css('margin-top', parseFloat('-'+descHeight));
	});
}

/*-------------------------------------------------------------------

	NAVIGATION
	Add active states to the navigation as the user scrolls - Adapted from http://f6design.com/projects/parallax-scrolling/
	Locks the header if the user scrolls to the bottom

-------------------------------------------------------------------*/

function setupNav() {
	var section1Top =  0;
	var section2Top 	=  $('footer').offset().top - (($(document).height() - $('footer').offset().top) / 2);;
	
	$('nav li').removeClass('active');
	
	if($(document).scrollTop() >= section1Top && $(document).scrollTop() < section2Top){
		$('nav li.selected_work').addClass('active');
	} else if ($(document).scrollTop() >= section2Top){
		$('nav li.about').addClass('active');
	}
	
	// CHANGE THESE NUMBERS TO ADJUST THE POSITION OF THE NAV WHEN YOU HIT THE FOOTER
	if($(window).scrollTop() >= 12032) {
		$('header').css('position', 'absolute');
		$('header').css('top', 12052);
	} else {
		$('header').css('position', 'fixed');
		$('header').css('top', 20);
	}
	
}

function scrollToSection(section) {
	if(section == 'about') {
		$(window).scrollTo('footer', 1000);
	} else if (section == 'contact') {
		$(window).scrollTo('footer', 1000);
	} else {
		$(window).scrollTo(0,1000);
	}
}


/*-------------------------------------------------------------------

	GALLERY
	Setup and build the gallery

-------------------------------------------------------------------*/

// Set up the jCarousel Inits and bind the next and previous buttons

function mycarousel_initCallback(carousel) {
	var carouselID	= carousel.list.attr('id');

    $('#'+carouselID).parent().parent().parent().find('.btn_next').on('click', function() {
        carousel.next();
        return false;
    });

    $('#'+carouselID).parent().parent().parent().find('.btn_prev').on('click', function() {
        carousel.prev();
        return false;
    });
};

function gallery() {
	
	$('.screens_wrapper').each(function() {
		var $this 		= $(this);
		var articleName	= $this.parent().attr('id');
		
		// INIT THE CAROUSEL
		$('#'+articleName+'_carousel').jcarousel({
	        scroll: 1,
    		initCallback: mycarousel_initCallback,
	        buttonNextHTML: null,
	        buttonPrevHTML: null
	    });
		
		// If there is only one item in the gallery, don't do any gallery functions		
		if($('#'+articleName+'_carousel li').length > 1) {
		
			// CLICK ON THE GALLERY 
			$this.on('click', function() {
				
				$this.find('.btn_prev').css('z-index', 5);
				$this.find('.btn_next').css('z-index', 5);
				
				// Used to expand the gallery full screen width
				$this.animate({
					'width' 		: '100%',
					'left'			: 0,
					'margin-left'	: 0
				}, 200);
				
				$this.off();
			
			});
	
			// HOVER ON THE GALLERY
			$this.hover(function() {
				$this.stop().animate({
					'width' 		: 980,
					'margin-left'	: -490
				}, 75);
			}, function() {
				$this.stop().animate({
					'width' 		: 959,
					'margin-left'	: -480
				}, 75);
			});
		
			// HIDE THE PROJECT TEXT
			$this.find('.btn_next').on('click', function() {
				$this.parent().find('.work_desc:visible').fadeOut('fast');
			});
			
			// SHOW THE PROJECT TEXT
			$this.find('.btn_prev').on('click', function() {
				if($this.parent().find('.work_screens').css('left') == '-959px') {
					$this.parent().find('.work_desc').fadeIn('slow');
				}
			});
		}
	});
}

$(document).ready(function() {
	
	verticalCenter();
	gallery();
	setupNav();
	
	$(window).on('scroll',function(e){
		setupNav();
    });
	
	$('nav li a').on('click', function(e){
		var section = $(this).parent().attr('class');

		scrollToSection(section)
	});
	
});