(function($) {

  Drupal.behaviours.commercePaymill = {
    attach: function(context, settings) {
      // Configure Paymill bridge
	  window.PAYMILL_PUBLIC_KEY = settings.publicKey;
      paymill.config('3ds_cancel_label', Drupal.t('Cancel'));
      // First load - bind the submit button
      $('#edit-continue').bind('click', paymillSubmit);
      // Ensure changes to selected payment method bind/unbind
      $('input[name="commerce_payment[payment_method]"]').change(function() {
        var selected = $('input[name="commerce_payment[payment_method]"]:checked').val();
        if (selected == 'commerce_paymill|commerce_payment_commerce_paymill') {
          $('#edit-continue').bind('click', paymillSubmit);
        } else {
          $('#edit-continue').unbind('click', paymillSubmit);
        }
      });
    }
  };

  function paymillSubmit() {
    event.preventDefault();
    paymillGetToken();
  }

  function paymillGetToken() {
    var cardHolderName = $('#payment-details input:eq(0)').val();
    var number1 = $('#payment-details input:eq(1)').val();
    var expMonth = $('#payment-details select:eq(0)').val();
    var expYear = $('#payment-details select:eq(1)').val();
    var cvc1 = $('#payment-details input:eq(2)').val();
    var amount1 = $('input[name="commerce_payment[payment_details][credit_card][amount]"]').val();
    var currency1 = $('input[name="commerce_payment[payment_details][credit_card][currency]"]').val();
      paymill.createToken({
      number: number1,
      exp_month: expMonth,
      exp_year: expYear,
      cvc: cvc1,
      cardholdername: cardHolderName,
      amount: amount1,
      currency: currency1,
    },
    paymillResponseHandler);
  }

  function paymillResponseHandler(error,result) {
    if (error) {
      alert('Error: error.apierror');
    } else {
      $('input[name="commerce_payment[payment_details][credit_card][token]"]').val(result.token);
      $('#commerce-checkout-form-review').get(0).submit();
    }
  }
  
  function paymillGetError(error) {
    switch (error) {
	  case 'internal_server_error':
	    return Drupal.t('Communication with PSP failed');
		break;
	  case 'invalid_public_key':
	    return Drupal.t('Invalid Public Key');
		break;
	  case 'unknown_error':
	    return Drupal.t('Unknown Error');
		break;
	  case '3ds_cancelled':
	    return Drupal.t('Password Entry of 3-D Secure password was cancelled by the user');
		break;
	  case 'field_invalid_card_number':
	    return Drupal.t('Missing or invalid creditcard number');
		break;
	  case 'field_invalid_card_exp_year':
	    return Drupal.t('Missing or invalid Expiry Year');
		break;
	  case 'field_invalid_card_exp_month':
	    return Drupal.t('Missing or invalid Expiry Month');
		break;
	  case 'field_invalid_card_exp':
	    return Drupal.t('Card is no longer valid or not anymore');
		break;
	  case 'field_invalid_card_cvc':
	    return Drupal.t('Invalid Checking Number');
		break;
	  case 'field_invalid_card_holder':
	    return Drupal.t('Invalid Cardholder');
		break;
	  case 'field_invalid_account_number':
	    return Drupal.t('Missing or invalid bank account number');
		break;
	  case 'field_invalid_account_holder':
	    return Drupal.t('Missing or invalid bank account holder');
		break;
	  case 'field_invalid_bank_code':
	    return Drupal.t('Missing or invalid zip code');
		break;
	  default:
		return Drupal.checkPlain(error.replace('_', ' '));
	}
  }

})(jQuery);
