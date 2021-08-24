$(function() {
  let clipboards = new ClipboardJS("[data-control='clipboard']");

  function setTooltip($target, message) {

  }

  document.querySelectorAll('[data-control="clipboard"][data-toggle="tooltip"]')
    .forEach(function (btn) {
      var tooltipBtn = new bootstrap.Tooltip(btn);

      btn.addEventListener('mouseleave', function () {
        // Explicitly hide tooltip, since after clicking it remains
        // focused (as it's a button), so tooltip would otherwise
        // remain visible until focus is moved away
        tooltipBtn.hide()
      })
    })

  clipboards.on('success', function(e) {
    let tooltipTrigger = e.trigger;
    let tooltipBtn = bootstrap.Tooltip.getInstance(e.trigger);

    console.log("HERE")

    tooltipTrigger.setAttribute('title', 'Copied!');
    tooltipBtn._fixTitle();
    tooltipBtn.update();


    tooltipTrigger.setAttribute('data-bs-original-title', 'Copy to clipboard');
    e.clearSelection();
  });

});

