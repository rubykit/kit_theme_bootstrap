$(function() {
  $('[data-input-mask]').each(function(_idx, el) {
    let $el         = $(el);
    let mask        = $el.attr('data-input-mask');
    let placeholder = $el.attr('data-input-mask-placeholder');

    $el.mask(mask, { placeholder: placeholder });
  });
});
