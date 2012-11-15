jQuery(document).ready(function() {
  // First load - bind the submit button
  jQuery('#edit-continue').bind('click', paymillSubmit);
  // Ensure changes to selected payment method bind/unbind
  jQuery('input[name="commerce_payment[payment_method]"]').change(function() {
    var selected = jQuery('input[name="commerce_payment[payment_method]"]:checked').val();
	if (selected == 'commerce_paymill|commerce_payment_commerce_paymill') {
      jQuery('#edit-continue').bind('click', paymillSubmit);
	} else {
      jQuery('#edit-continue').unbind('click', paymillSubmit);
	}
  });
});

function paymillSubmit() {
  event.preventDefault();
  paymillGetToken();
}

function paymillGetToken() {
  var cardHolderName = jQuery('#payment-details input:eq(0)').val();
  var number1 = jQuery('#payment-details input:eq(1)').val();
  var expMonth = jQuery('#payment-details select:eq(0)').val();
  var expYear = jQuery('#payment-details select:eq(1)').val();
  var cvc1 = jQuery('#payment-details input:eq(2)').val();
  var amount1 = jQuery('input[name="commerce_payment[payment_details][credit_card][amount]"]').val();
  var currency1 = jQuery('input[name="commerce_payment[payment_details][credit_card][currency]"]').val();
  paymill.config('3ds_cancel_label', PAYMILL_3DS_BUTTON_LABEL);
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
    jQuery('input[name="commerce_payment[payment_details][credit_card][token]"]').val(result.token);
    jQuery('#commerce-checkout-form-review').get(0).submit();
  }
}
