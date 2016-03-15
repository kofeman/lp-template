/*
 * smooth scroll
 * */

$(document).ready(function(){
	/*
	 arrays of anchors and hrefs
	 */

	var anchors = $('.scroll a'),
		hrefs = [],
		i;

	for( i = 0; i < anchors.length; i++) {
		hrefs[i] = $(anchors[i]).attr('href');
		$(hrefs[i]).attr('data-anchor', i);
	}

	if ( hrefs.length > 0 ) {

		/*
		 slow scrolling to href
		 */

		anchors.click(function (e) {
			var anchor = $(this);

			$('html, body')
				.stop()
				.animate( {
					scrollTop: ( $(anchor.attr('href'))
							.offset().top-115
					)
				}, 800);

			e.preventDefault();
		});

		/*
		 highlighting menu items
		 */


		$(window).scroll(function () {
				var currentPosition = $(document).scrollTop()+115,
					nav = $('nav');


				for ( i = 0; i < hrefs.length; i++ ){
					var currentHref = $( hrefs[i] );


					if ( (currentHref.offset().top <= currentPosition) ){
						$( anchors[ currentHref.attr('data-anchor') ])
							.parents('li')
							.addClass('active')
							.siblings('li')
							.removeClass('active');
					}
					if( currentHref.offset().top+currentHref.height()  <= currentPosition ) {
						$( anchors[ currentHref.attr('data-anchor') ])
							.parents('li')
							.removeClass('active')
							.siblings('li')
							.removeClass('active');
					}
				}
			}
		);
	}

	$('.scroll-link').on('click', function (e) {
		var anchor = $(this).attr('href');

		$('html, body')
			.stop()
			.animate( {
				scrollTop: ( $(anchor)
						.offset().top - 90
				)
			}, 800);

		e.preventDefault();
	});

});