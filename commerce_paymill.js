/**
 * @file
 * Generates Paymill tokens and handles client side errors.
 */

(function($) {

  Drupal.behaviors.commercePaymill = {
    attach: function(context, settings) {
      window.PAYMILL_PUBLIC_KEY = settings.commercePaymill.publicKey;
      $('#edit-continue').bind('click', paymillSubmit);
    }
  };

  function paymillSubmit() {
    var selected = $('input[name="commerce_payment[payment_method]"]:checked').val();
    if (selected != 'commerce_paymill|commerce_payment_commerce_paymill') return;
    event.preventDefault();
    paymillGetToken();
    return false;
  }

  function paymillGetToken() {
    var cardHolderName = $('#payment-details input:eq(0)').val();
    var cardNumber = $('#payment-details input:eq(1)').val();
    var expMonth = $('#payment-details select:eq(0)').val();
    var expYear = $('#payment-details select:eq(1)').val();
    var securityCode = $('#payment-details input:eq(2)').val();
    var orderAmount = $('input[name="commerce_payment[payment_details][credit_card][amount]"]').val();
    var orderCurrency = $('input[name="commerce_payment[payment_details][credit_card][currency]"]').val();
    paymill.config('3ds_cancel_label', Drupal.t('Cancel'));
    paymill.createToken({
      number: cardNumber,
      exp_month: expMonth,
      exp_year: expYear,
      cvc: securityCode,
      cardholdername: cardHolderName,
      amount: orderAmount,
      currency: orderCurrency,
    },
    paymillResponseHandler);
  }

  function paymillResponseHandler(error,result) {
    if (error) {
      if (error.apierror == '3ds_cancelled') {
        return;
      }
      var errorText = paymillGetError(error.apierror);
      formSetError(errorText);
      $('.form-submit').removeAttr("disabled");
      $('.checkout-processing').hide();
    } else {
      $('input[name="commerce_payment[payment_details][credit_card][token]"]').val(result.token);
      $('#commerce-checkout-form-review').get(0).submit();
    }
  }
  
  function formSetError(errorText) {
    if (! $('#edit-commerce-payment-error').length) {
      $('#edit-commerce-payment > .fieldset-wrapper').prepend('<div id="edit-commerce-payment-error" class="messages error"></div><br />');
    }
    $('#edit-commerce-payment-error').html(errorText);
  }

  function paymillGetError(error) {
    switch (error) {
      case 'internal_server_error':
        return Drupal.t('Communication with Paymill failed');
        break;

      case 'invalid_public_key':
        return Drupal.t('Invalid public key');
        break;

      case 'unknown_error':
        return Drupal.t('Unknown error');
        break;

      case '3ds_cancelled':
        return Drupal.t('User cancelled 3D security password entry');
        break;

      case 'field_invalid_card_number':
        return Drupal.t('Missing or invalid credit card number');
        break;

      case 'field_invalid_card_exp_year':
        return Drupal.t('Missing or invalid expiry year');
        break;

      case 'field_invalid_card_exp_month':
        return Drupal.t('Missing or invalid expiry month');
        break;

      case 'field_invalid_card_exp':
        return Drupal.t('Card has expired');
        break;

      case 'field_invalid_card_cvc':
        return Drupal.t('Missing or invalid checking number');
        break;

      case 'field_invalid_card_holder':
        return Drupal.t('Missing or invalid cardholder name');
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
