/* SLIDER VIDEO PLAY
/*====================================================================*/
	
	(function($){

		$(".slider").each(function(){
			var video = $(this).find('video');
			if (video.paused) {video.hide();}
		});

	})(jQuery);

/* FORMS
/*====================================================================*/
	
	(function($){

		$.fn.placeholder = function() {

			$.each(this, function(){

				var $this       = $(this);
				var placeholder = $this.data("placeholder");

				if($this.val() == '') { $this.val(placeholder);}

				$this
				.on('focus', function(){
					if($this.val() == placeholder) { $this.val('');}
				})
				.on('focusout', function(){
					if($this.val() == '') { $this.val(placeholder);}
				});

			});

		}

		$('input:not([type="submit"]),textarea').placeholder();
		$('input:not([type="submit"]),textarea,select').wrap('<div class="form-wrap"></div>');

		$('.form-wrap').each(function(){
			var $this = $(this);
			$this.addClass($this.children().data('icon'));
			if ($this.children('textarea').length != 0) {
				$this.addClass('textarea');
			};

			if ($this.children('input[type="radio"]').length != 0 || $this.children('input[type="checkbox"]').length != 0) {
				$this.attr('data-value',$this.children().attr('value'));
			};

		});

		var form         = $('#ajax-form').append('<div id="form-messages"></div>');
		var formMessages = $('#form-messages');
		var formSent     = $('#submit');

		// Set up an event listener for the contact form.
		$(form).submit(function(e) {

			// Stop the browser from submitting the form.
			e.preventDefault();

			formSent.attr('disabled','disabled');

			// Serialize the form data.
			var formData = $(form).serialize();

			// Submit the form using AJAX.
			$.ajax({
				type: 'POST',
				url: $(form).attr('action'),
				data: formData
			})
			.done(function(response) {
				// Make sure that the formMessages div has the 'success' class.
				$(formMessages).removeClass('error');
				$(formMessages).addClass('success');

				formSent.removeAttr('disabled');

				// Set the message text.
				$(formMessages).text(response);

				// Clear the form.
				$('#name').val('');
				$('#email').val('');
				$('#subject').val('');
				$('#message').val('');
			})
			.fail(function(data) {
				// Make sure that the formMessages div has the 'error' class.
				$(formMessages).removeClass('success');
				$(formMessages).addClass('error');

				// Set the message text.
				if (data.responseText !== '') {
					$(formMessages).text(data.responseText);
				} else {
					$(formMessages).text('Oops! An error occured and your message could not be sent.');
				}
			});

		});


	})(jQuery);

/*	FROM-TO COUNTER
/*====================================================================*/

	(function(a){a.fn.fromTo=function(g){g=g||{};return a(this).each(function(){function e(a){a=b.formatter.call(h,a,b);f.html(a)}var b=a.extend({},a.fn.fromTo.defaults,{from:a(this).data("from"),to:a(this).data("to"),speed:a(this).data("speed"),refreshInterval:a(this).data("refresh-interval"),decimals:a(this).data("decimals")},g),j=Math.ceil(b.speed/b.refreshInterval),l=(b.to-b.from)/j,h=this,f=a(this),k=0,c=b.from,d=f.data("fromTo")||{};f.data("fromTo",d);d.interval&&clearInterval(d.interval);d.interval=setInterval(function(){c+=l;k++;e(c);"function"==typeof b.onUpdate&&b.onUpdate.call(h,c);k>=j&&(f.removeData("fromTo"),clearInterval(d.interval),c=b.to,"function"==typeof b.onComplete&&b.onComplete.call(h,c))},b.refreshInterval);e(c)})};a.fn.fromTo.defaults={from:0,to:0,speed:1E3,refreshInterval:100,decimals:0,formatter:function(a,e){return a.toFixed(e.decimals)},onUpdate:null,onComplete:null}})(jQuery);

/*	HEADER
/*====================================================================*/
	
	(function($){

		var docElem = document.documentElement,
			header       = $( '.header' )
	        didScroll = false,
	        changeHeaderOn  = 500;

	    function init() {
	        window.addEventListener( 'scroll', function( event ) {
	            if( !didScroll ) {
	                didScroll = true;
	                scrollPage();
	            }
	        }, false );
	    }

	    function scrollPage() {
	        var sy = scrollY();

    		if ( sy >= changeHeaderOn ) {

        		header.addClass('fixed');
        		setTimeout(function(){
        			header.addClass('active');
        		},400);
        		
        	} else {

        		header
        		.removeClass('active')
        		.removeClass('fixed');
        	}
	        
	        didScroll = false;
	    }

	    function scrollY() {
	        return window.pageYOffset || docElem.scrollTop;
	    }

	    init();

	    $('.menu-toggle').on('click',function(){
			$(this).toggleClass('animate');
			$('.menu').slideToggle(400, "easeOutCubic");
		});

	})(jQuery);

/*  PARALLAX
/*====================================================================*/

	(function($){

		function parallax(target, offset){
			if(Modernizr.mq("only screen and (min-width: 1280px)")){

		    	var $window = $(window);

		    	$.each(target,function(){

					var $this = $(this);

				    $(window).scroll(function() {
						var yPos   = (offset) ? -(($window.scrollTop()-$this.offset().top) / 2) : -($window.scrollTop() / 2);
						var coords = '50% '+ yPos + 'px';
						$this.css({ backgroundPosition: coords });    
					}); 
				})
			}
		}

		parallax($('*[data-parallax="true"]'), false);
		parallax($('.section[data-parallax="true"]'), true);

	})(jQuery);

/*  TABS
/*====================================================================*/
	
	(function($){

		$('.tabs').each(function(){

			var $this = $(this),
				tabs = $this.find('.tab'),
				tabsQ = tabs.length,
				tabsContent = $this.find('.tab-content'),
				tabSet = $this.find('.tabset'),
				tabsDefaultWidth  = 0,
				tabsDefaultHeight = 0;

				if(!tabs.hasClass('active')){
					tabs.first().addClass('active');
				}
				
				tabs.each(function(){
					tabsDefaultWidth += $(this).outerWidth();
					tabsDefaultHeight += $(this).outerHeight();
				});

				function OverflowCorrection(){

					if(tabsDefaultWidth >= $this.outerWidth()  && $this.hasClass('horizontal')){
						$this.addClass('tab-full');
					} else {
						$this.removeClass('tab-full');
					}

				}

				if(tabsQ >= 2){

					tabs.on('click', function(){
						$self = $(this);

						if(!$self.hasClass("active")){

							$self.addClass("active").siblings().removeClass("active");
							tabsContent.hide();
							tabsContent.eq($self.index()).fadeIn(300);
						}
						
					});
				}

				if($this.hasClass('vertical')){
					$this.find('.tabs-container').css("min-height",tabsDefaultHeight + (tabs.length - 1));
				}

				OverflowCorrection();

				$(window).resize(OverflowCorrection);			

		});

	})(jQuery);

/*  ACCORDION
/*====================================================================*/
	
	(function($){

		$('.accordion').each(function(){
			var $this = $(this),
				title = $this.find('.toggle-title'),
				content =  $this.find('.toggle-content');

				if($this.hasClass('collapsible-true')){
					$this.find('.active:not(:first)').removeClass("active");
				}

				content.hide();

				$this.find('.toggle-title.active').next().show();

				title.on('click', function(){

					$self = $(this);
					$selfContent = $self.next();
			
					if($this.hasClass('collapsible-true')){

						if(!$self.hasClass('active')){

							$self.addClass("active").siblings().removeClass("active");
							content.slideUp(300);
							$selfContent.slideDown(300);
						}

					} else {

						if(!$self.hasClass('active')){
							$self.addClass("active");
							$selfContent.stop().slideDown(300);
						} else {

							$self.removeClass("active");
							$selfContent.stop().slideUp(300);
						}

					}

				});

		});

	})(jQuery);

/*  CONTENT BOXES, COLUMNS, CLIENTS, CAROUSEL, PRICING TABLES
/*====================================================================*/
	
	(function($){

		function animateInView(container,child){

			container.each(function(){

				var $this   = $(this);
				var child   = $this.children(child);
				var length  = child.length;
				var i = 0;

				$this.one('inview', function(event, isInView, visiblePartX, visiblePartY){
			    	if (isInView) {
			    		function animation() {
							$(child[i]).addClass('active');
							i++;
							if (i == length ) {clearInterval(timer);}
						}

						var timer = setInterval(animation, 250); 
			    	};
			    });
			});

		}

		animateInView($('.row'), $('[data-animate="true"]'));
		animateInView($('.content-box[data-animate="true"]'), $('.box'));
		animateInView($('.clients[data-animate="true"]'), $('.client'));
		animateInView($('.carousel[data-animate="true"]'), $('.item'));
		animateInView($('.pricing-table[data-animate="true"]'), $('.column'));


	})(jQuery);

/*  PROGRESS BAR
/*====================================================================*/
	
	(function($){

		$(".progress-bar").each(function() {

			var $this = $(this);
			var line = $this.find('.line').wrap("<div class='bar'></div>");

			function progressLine(){

				line.each(function(){
					var $self = $(this).addClass('visible');
					var percentage = $self.data('percentage');
					$self
					.width(0)
					.animate({width: percentage+'%'}, 2500, 'easeOutCirc')
					.fromTo({from: 0, to: percentage, speed: 2500});
				});
				
			}
			
			$this.one('inview', function(event, isInView, visiblePartX, visiblePartY){
			    	if (isInView) {
		    		setTimeout(function(){
		    			progressLine();
		    		},250)
		    	};
		    });
				
		});

	})(jQuery);

/*  COUNTERS
/*====================================================================*/
	
	(function($){

		$('.counter').each(function(){

			var $self = $(this),
				count = $self.find('.count').text("0");

			function counter(){
				count.each(function(){
					var $this = $(this);
					$this.fromTo({from: 0, to: $this.data('value'), speed: 2000});
				})
			}

			$self.one('inview', function(event, isInView, visiblePartX, visiblePartY){
			    if (isInView) {
		    		setTimeout(function(){
		    			counter();
		    		}, 250)
		    	};
		    });

		});

	})(jQuery);

/*  SECTIONS
/*====================================================================*/
	
	(function($){

		$('.section[data-animate="true"]').each(function(){

			var $self = $(this),
				layer = $self.find('.layer');

			function animate(){
				layer.each(function(){
					$(this).addClass('active');
				})
			}

			$self.one('inview', function(event, isInView, visiblePartX, visiblePartY){
			    if (isInView) {
		    		setTimeout(function(){
		    			animate();
		    		}, 300)
		    	};
		    });

		});

	})(jQuery);

/*	PERSONS
/*====================================================================*/
	
	(function($){

		imagesLoaded( $('.person'), function() {

			$('.person .img').each(function(){
				var $this = $(this);
				$this.width($this.children('img').width());
			});
			
		});

	})(jQuery);

/*	GMAP
/*====================================================================*/
	
	jQuery(document).on("ready", function(){

		var styleArray = [{"featureType":"all","stylers":[{"saturation":-100},{"gamma":0.5}]}];

		if (jQuery('body').data('skin') == 'dark') {
			styleArray = [{"stylers":[{"hue":"#ff1a00"},{"invert_lightness":true},{"saturation":-100},{"lightness":33},{"gamma":0.5}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2D333C"}]}];
		};

		$('.map').each(function(){

			var $this     = jQuery(this),
				x         = ($this.attr('data-x')) ? $this.data('x') : 53.385873,
				y         = ($this.attr('data-y')) ? $this.data('y') : -1.471471,
				z         = ($this.attr('data-zoom')) ? parseInt($this.data('zoom')) : 18;

			var options = {
				center     : new google.maps.LatLng(x, y),
				zoom       : z, 
				mapTypeId  : google.maps.MapTypeId.ROADMAP,
				styles     : styleArray,
				scrollwheel: false
			};

			var map    = new google.maps.Map(document.getElementById($this.attr('id')), options);

			if ($this.attr('data-marker')) {
				var marker = new google.maps.Marker({ position: new google.maps.LatLng(x,y), map: map, icon: $this.data('marker')});
			};

		});

	});

/*	SEPARATORS
/*====================================================================*/

	(function($){

		$('.i-separator').each(function(){

			var $this = $(this);

			if ($this.data('target') !== undefined) {

				$this.bind('click.smoothscroll', function (event) {
				    event.preventDefault();
				    var target = $this.data('target');
				    $('html, body').stop().animate({'scrollTop': $(target).offset().top}, 500, function () {
				        window.location.hash = target;
				    });
				});

			};
			
		})
		;
	})(jQuery);

/*	SMOOTH SCROLL
/*====================================================================*/

	(function($){

		 function init() {
	        window.addEventListener( 'scroll', function( event ) {
	            if( !didScroll ) {
	                didScroll = true;
	                scrollPage();
	            }
	        }, false );
	    }

	    function scrollPage() {
	        var sy = scrollY();
    		if ( sy >= activateOn ) {
        		top.addClass('animate')
        	} else {
        		top.removeClass('animate')
        	}
	        
	        didScroll = false;
	    }

	    function scrollY() {
	        return window.pageYOffset || docElem.scrollTop;
	    }

		var top         = $('#top'),
			docElem     = document.documentElement,
	        didScroll   = false,
	        activateOn  = 700;

		top.bind('click.smoothscroll', function (event) {
		    event.preventDefault();
		    var target = this.hash;
		    $('html, body').stop().animate({
		        'scrollTop': $(target).offset().top
		    }, 800, function () {
		        window.location.hash = target;
		    });
		});

	    init();

	})(jQuery);

/*	EXTERNAL PLUGINS
/*====================================================================*/

	(function($){

		$('.slider').NinzioSlider({
			container     : $('.slides'),
	   		slide         : $('.slide'),
	   		autoplay      : true,
			autoplaydelay : 5000,
			bullets       : true
		});

		$(".carousel").owlCarousel({
 
		    items :4,
		    itemsDesktop : [1280,4],
		    itemsDesktopSmall : [1024,3],
		    itemsTablet: [768,2],
		    itemsTabletSmall: [640,1],
		    itemsMobile : [480,1],
		    singleItem : false,
		 
		    //Basic Speeds
		    slideSpeed : 200,
		    paginationSpeed : 800,
		    rewindSpeed : 1000,
		 
		    //Autoplay
		    autoPlay : true,
		    stopOnHover : true,
		 
		    // Navigation
		    navigation : false,
		    navigationText : ["prev","next"],
		    rewindNav : true,
		    scrollPerPage : false,
		 
		    //Pagination
		    pagination : true,
		    paginationNumbers: false,
		 
		    // Responsive 
		    responsive: true,
		    responsiveRefreshRate : 200,
		    responsiveBaseWidth: window,
		});

		$(".testimonials").owlCarousel({
 
		    singleItem : true,
		    autoHeight : true,
		 
		    //Basic Speeds
		    slideSpeed : 200,
		    paginationSpeed : 800,
		    rewindSpeed : 1000,
		 
		    //Autoplay
		    autoPlay : true,
		    stopOnHover : true,
		 
		    // Navigation
		    navigation : false,
		    rewindNav : true,
		    scrollPerPage : false,
		 
		    //Pagination
		    pagination : true,
		    paginationNumbers: false,
		 
		    // Responsive 
		    responsive: true,
		    responsiveRefreshRate : 200,
		    responsiveBaseWidth: window,
		});

		$(".clients").owlCarousel({
 
		    items :4,
		    itemsDesktop : [1280,4],
		    itemsDesktopSmall : [1024,3],
		    itemsTablet: [768,2],
		    itemsTabletSmall: [640,1],
		    itemsMobile : [480,1],
		    singleItem : false,
		 
		    //Basic Speeds
		    slideSpeed : 200,
		    paginationSpeed : 800,
		    rewindSpeed : 1000,
		 
		    //Autoplay
		    autoPlay : true,
		    stopOnHover : true,
		 
		    // Navigation
		    navigation : true,
		    navigationText : ["",""],
		    rewindNav : true,
		    scrollPerPage : false,
		 
		    //Pagination
		    pagination : false,
		    paginationNumbers: false,
		 
		    // Responsive 
		    responsive: true,
		    responsiveRefreshRate : 200,
		    responsiveBaseWidth: window,
		});

		$('.menu').singlePageNav({
		    currentClass: 'current',
		    speed: 750,
		    offset:60,
		    filter:":not(#goback,#purchase)",
		    easing: "easeOutCubic",
		    updateHash:false
		});


		if(Modernizr.mq("only screen and (min-width: 1024px)")){
			$("a").nivoLightbox({
				effect: 'fadeScale',
			    theme: 'default', 
			    keyboardNav: true, 
			    clickOverlayToClose: true, 
			    errorMessage: 'The requested content cannot be loaded. Please try again later.' 
			});
		}

	})(jQuery);
