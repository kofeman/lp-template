/**
 * animations
 */

jQuery(function($){

	$(window).scroll(function () {
		var block1 = $('.block1'),
			element1 = $('.element1');

		animateIt(block1, element1, 500);

		function animateIt(block, element, animTimeout){
			var animateType = $(element).data('animate');

			if ( $(document).scrollTop() >= $(block).offset().top) {

				setTimeout(function(){
					$(element).addClass('animated', animateType);
				}, animTimeout)
			}
		}
	});
});


