$(function() {
  $('[data-input-mask]').each(function(_idx, el) {
    let $el  = $(el);
    let data = $el.attr('data-input-mask');

    if (!data)
      return;

    try {
      data = JSON.parse(data);

      if (!data.mask)
        return;

      $el.mask(data.mask, data);
    } catch(e) {}
  });
});
