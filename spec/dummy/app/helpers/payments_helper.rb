module PaymentsHelper

  def payment_methods_arthurchayka
    @payment_methods_arthurchayka ||= %w[
      Affirm
      Alipay
      AmazonPay
      Amex
      ApplePay
      Bancontact
      Bitcoin
      BitcoinCash
      Bitpay
      Citadele
      DinersClub
      Discover
      Elo
      Etherium
      Forbrugsforeningen
      Giropay
      GooglePay
      Ideal
      Interac
      JCB
      Klarna
      Lightcoin
      Maestro
      Mastercard
      PayPal
      Payoneer
      Paysafe
      Qiwi
      SEPA
      ShopPay
      Skrill
      Sofort
      Stripe
      UnionPay
      Verifone
      Visa
      WeChat
      Webmoney
      Yandex
    ].map { |el| el.downcase }
  end

  def payment_methods_fontawesome
    @payment_methods_fontawesome ||= %w[
      alipay
      amazon-pay
      apple-pay
      bitcoin
      btc
      cc-amazon-pay
      cc-amex
      cc-apple-pay
      cc-diners-club
      cc-discover
      cc-jcb
      cc-mastercard
      cc-paypal
      cc-stripe
      cc-visa
      google-pay
      google-wallet
      paypal
      stripe
      stripe-s
    ]
  end

end
