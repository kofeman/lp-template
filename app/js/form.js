/*
* form submit
* */

$(document).ready(function(){

	var telPattern = "^([+]+)*[0-9\s-]{7,20}",
		mailPattern = "^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$";

	$('input.name').attr({
		'required' : 'true',
		'title' : 'Например, Иванов Иван'
	});

	$('input.email').attr({
		'required' : 'true',
		//'pattern' : mailPattern,
		'title' : 'Например, ivanov@mail.ru'
	});

	$('input.phone').attr({
		'required' : 'true',
		'pattern' : telPattern,
		'title' : 'Например, +7 999 000 8888'
	});

	$('form')
		.removeAttr('novalidate')
		.on('submit', function(e){
			e.preventDefault();


			if ( validateEmail( $(this).find('.email') )  && validatePhone( $(this).find('.phone') ) ) {
				$(this).append("<div class='sending'><em>отправка...</em></div>");

				$.ajax({
					type: 'POST',
					url: 'sendmessage.php',
					data: $(this).serialize(),
					success: function (data) {
						if (data == "true") {
							$('this').html('<p>Отправлено</p>');
						}
					}
				});
			}
	});

	function errorClass (element, reg){

		if ( reg.test(element.val()) ){
			$(element).removeClass('error').next('.error-text').hide();
			return true;
		}

		else{
			$(element).addClass('error').next('.error-text').show();
			console.log(element);
			return false;
		}
	}

	function validateEmail(element) {
		var reg = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;

		return errorClass(element, reg);
	}

	function validatePhone(element) {
		var reg = /^([+]+)*[0-9\s-]{5,20}/;

		return errorClass(element, reg);
	}

});



