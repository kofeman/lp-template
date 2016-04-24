/**
 * animations
 */

jQuery(function($){

	var $animation_1 = $('.animation_1'),
		$animation_3_parent = $('.animation-1-block');


	/* animate on load */

	animateItOnLoad($animation_1, 500);


	/* animate on scroll */

	$(window).scroll(function () {

		animateIt($animation_1_parent, $animation_1, 700);

	});



	/* animate functions */

	function animateIt(block, element, animTimeout){
		var animateType = $(element).data('animate'),
			animateDuration = $(element).data('duration');

		if ( $(document).scrollTop() >= $(block).offset().top) {

			setTimeout(function(){
				$(element)
					.css({
						'-webkit-animation-duration' : animateDuration,
						'animation-duration' : animateDuration
					})
					.addClass(animateType)
					.addClass('animated');

			}, animTimeout)
		}
	}

	function animateItOnLoad(element, animTimeout){
		var animateType = $(element).data('animate'),
			animateDuration = $(element).data('duration');

		setTimeout(function(){
			$(element)
				.css({
					'-webkit-animation-duration' : animateDuration,
					'animation-duration' : animateDuration
				})
				.addClass(animateType)
				.addClass('animated');

		}, animTimeout)
	}

});


