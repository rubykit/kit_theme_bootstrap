$(function() {
  $('.bd-main').each(function(idx, el) {
    let $container = $(el);

    $container.prepend(`
      <div class="bd-toc mt-4 mb-5 my-md-0 ps-xl-3 mb-lg-5 text-muted">
        <strong class="d-block h6 my-2 pb-2 border-bottom">On this page</strong>
        <nav id="TableOfContents"></nav>
      </div>
    `);

    $('#TableOfContents').each(function(idx, el) {
      Toc.init($(el));
    });

  });
});
