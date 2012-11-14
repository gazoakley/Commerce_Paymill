jQuery(document).ready(function($) {
  $('#edit-continue').bind('click', function() {
    event.preventDefault();
    getToken($);
  });
});

function getToken($) {
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
//    amount: amount1,
//    currency: currency1,
  },
  paymillResponseHandler);
}

function paymillResponseHandler(error,result) {
  if (error) {
    alert(error.apierror);
  } else {
    alert(result.token);
    jQuery('input[name="commerce_payment[payment_details][credit_card][token]"]').val(result.token);
    jQuery('#commerce-checkout-form-review').get(0).submit();
  }
}
