/*
 * Toastr
 * Copyright 2012-2015
 * Authors: John Papa, Hans Fjällemark, and Tim Ferrell.
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * ARIA Support: Greta Krafsig
 *
 * Project: https://github.com/CodeSeven/toastr
 */

(function(define) {
  define(['jquery'], function($) {
    return (function() {
      var $container;
      var listener;
      var notificationId = 0;

      var interface = {
        notify:  notify,
        clear:   clear,
        remove:  remove,
        options: {},

        getContainer: getContainer,
        subscribe:    subscribe,

        version: '2.1.4',
      };

      var previousToast;

      return interface;

      function getContainer(options, create) {
        if (!options) {
          options = getOptions();
        }
        $container = $('#' + options.containerId);
        if ($container.length) {
          return $container;
        }
        if (create) {
          $container = createContainer(options);
        }
        return $container;
      }

      function subscribe(callback) {
        listener = callback;
      }

      function clear(notificationElement, clearOptions) {
        var options = getOptions();
        if (!$container) {
          getContainer(options);
        }
        if (!clearToast(notificationElement, options, clearOptions)) {
          clearContainer(options);
        }
      }

      function remove(notificationElement) {
        var options = getOptions();
        if (!$container) {
          getContainer(options);
        }
        if (notificationElement && $(':focus', notificationElement).length === 0) {
          removeToast(notificationElement);
          return;
        }
        if ($container.children().length) {
          $container.remove();
        }
      }

      // internal functions

      function clearContainer(options) {
        var notificationsToClear = $container.children();
        for (var i = notificationsToClear.length - 1; i >= 0; i--) {
          clearToast($(notificationsToClear[i]), options);
        }
      }

      function clearToast(notificationElement, options, clearOptions) {
        var force = clearOptions && clearOptions.force ? clearOptions.force : false;
        if (notificationElement && (force || $(':focus', notificationElement).length === 0)) {
          notificationElement[options.hideMethod]({
            duration: options.hideDuration,
            easing: options.hideEasing,
            complete: function() {
              removeToast(notificationElement);
            }
          });
          return true;
        }
        return false;
      }

      function createContainer(options) {
        $container = $('<div/>')
          .attr('id', options.containerId)
          .addClass(options.containerClass);

        $container.appendTo($(options.target));
        return $container;
      }

      function getDefaults() {
        return {
          target: 'body',

          debug:             false,

          newestOnTop:       true,
          preventDuplicates: false,
          progressBar:       false,
          escapeHtml:        false,

          rtl:               false,

          // Timeout

          timeOut:           0, // Set timeOut and extendedTimeOut to 0 to make it sticky
          pauseTimerOnHover: true,
          resetTimerOnHover: false,
          extendedTimeOut:   0,

          // Effets

          showMethod:    'fadeIn', //fadeIn, slideDown, and show are built into jQuery
          showDuration:  300,
          showEasing:    'swing', //swing and linear are built into jQuery
          onShown:       undefined,

          hideMethod:    'fadeOut',
          hideDuration:   1000,
          hideEasing:    'swing',
          onHidden:      undefined,

          // Close / dismiss behaviour

          closeOnClick:      false,
          closeMethod:       false,
          closeDuration:     false,
          closeEasing:       false,

          // Classes
          containerId:       'notifications-container',
          containerClass:    'notification-top-right',

          notificationClass: 'notification',
          contentClass:      'notification-content',

          closeHtml:         '<button type="button">&times;</button>',
          closeClass:        'notification-close-button',

          progressClass:     'notification-progress',
        };
      }

      function publish(args) {
        if (!listener) {
          return;
        }
        listener(args);
      }

      function notify(map) {
        var options  = getOptions();

        if (typeof(map.optionsOverride) !== 'undefined') {
          options = $.extend(options, map.optionsOverride);
        }

        if (shouldExit(options, map)) {
          return;
        }

        notificationId++;

        $container = getContainer(options, true);

        var intervalId = null;
        var notificationElement = $('<div/>').addClass(options.notificationClass);
        var $contentElement     = $('<div/>');
        var $progressElement    = $('<div/>');
        var $closeElement       = $(options.closeHtml);
        var progressBar = {
          intervalId: null,
          hideEta: null,
          maxHideTime: null
        };
        var response = {
          notificationId: notificationId,
          state: 'visible',
          startTime: new Date(),
          options: options,
          map: map
        };

        personalizeToast();

        displayToast();

        handleEvents();

        publish(response);

        if (options.debug && console) {
          console.log(response);
        }

        return notificationElement;

        function escapeHtml(source) {
          if (source == null) {
            source = '';
          }

          return source
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        }

        function personalizeToast() {
          setContent();
          setCloseButton();
          setProgressBar();
          setRTL();
          setSequence();
        }

        function handleEvents() {
          if (options.resetTimerOnHover) {
            notificationElement.hover(stickAround, delayedHideToast);
          }

          if (!options.onclick && options.closeOnClick) {
            notificationElement.attr('data-close-on-click', 'true');
            notificationElement.click(hideToast);
          }

          if (options.closeButton && $closeElement) {
            $closeElement.click(function(event) {
              if (event.stopPropagation) {
                event.stopPropagation();
              } else if (event.cancelBubble !== undefined && event.cancelBubble !== true) {
                event.cancelBubble = true;
              }

              if (options.onCloseClick) {
                options.onCloseClick(event);
              }

              hideToast(true);
            });
          }

          if (options.onclick) {
            notificationElement.click(function(event) {
              options.onclick(event);
              hideToast();
            });
          }
        }

        function displayToast() {
          notificationElement.hide();

          notificationElement[options.showMethod]({
            duration: options.showDuration,
            easing: options.showEasing,
            complete: options.onShown
          });

          console.log('displayToast', options.timeOut)

          if (options.timeOut > 0) {
            intervalId = setTimeout(hideToast, options.timeOut);
            progressBar.maxHideTime = parseFloat(options.timeOut);
            progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
            if (options.progressBar) {
              progressBar.intervalId = setInterval(updateProgress, 10);
            }
          }
        }

        function setSequence() {
          if (options.newestOnTop) {
            $container.prepend(notificationElement);
          } else {
            $container.append(notificationElement);
          }
        }

        function setContent() {
          if (map.content) {
            var content = map.content;
            if (options.escapeHtml) {
              content = escapeHtml(content);
            }
            $contentElement.append(content).addClass(options.contentClass);
            notificationElement.append($contentElement);
          }
        }

        function setCloseButton() {
          if (options.closeButton) {
            $closeElement.addClass(options.closeClass).attr('role', 'button');
            notificationElement.prepend($closeElement);
          }
        }

        function setProgressBar() {
          if (options.progressBar) {
            $progressElement.addClass(options.progressClass);
            notificationElement.prepend($progressElement);
          }
        }

        function setRTL() {
          if (options.rtl) {
            notificationElement.addClass('rtl');
          }
        }

        function shouldExit(options, map) {
          if (options.preventDuplicates) {
            if (map.content === previousToast) {
              return true;
            } else {
              previousToast = map.content;
            }
          }
          return false;
        }

        function hideToast(override) {
          var method   = override && options.closeMethod   !== false ? options.closeMethod   : options.hideMethod;
          var duration = override && options.closeDuration !== false ? options.closeDuration : options.hideDuration;
          var easing   = override && options.closeEasing   !== false ? options.closeEasing   : options.hideEasing;
          if ($(':focus', notificationElement).length && !override) {
            return;
          }
          clearTimeout(progressBar.intervalId);
          return notificationElement[method]({
            duration: duration,
            easing:   easing,
            complete: function() {
              removeToast(notificationElement);
              clearTimeout(intervalId);
              if (options.onHidden && response.state !== 'hidden') {
                options.onHidden();
              }
              response.state = 'hidden';
              response.endTime = new Date();
              publish(response);
            }
          });
        }

        function delayedHideToast() {
          if (options.timeOut > 0 || options.extendedTimeOut > 0) {
            intervalId = setTimeout(hideToast, options.extendedTimeOut);
            progressBar.maxHideTime = parseFloat(options.extendedTimeOut);
            progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
          }
        }

        function stickAround() {
          clearTimeout(intervalId);
          progressBar.hideEta = 0;
          notificationElement.stop(true, true)[options.showMethod]({
            duration: options.showDuration,
            easing: options.showEasing
          });
        }

        function updateProgress() {
          var percentage = ((progressBar.hideEta - (new Date().getTime())) / progressBar.maxHideTime) * 100;
          $progressElement.width(percentage + '%');
        }
      }

      function getOptions() {
        return $.extend({}, getDefaults(), toastr.options);
      }

      function removeToast(notificationElement) {
        if (!$container) {
          $container = getContainer();
        }
        if (notificationElement.is(':visible')) {
          return;
        }
        notificationElement.remove();
        notificationElement = null;
        if ($container.children().length === 0) {
          $container.remove();
          previousToast = undefined;
        }
      }

    })();
  });
}(typeof define === 'function' && define.amd ? define : function(deps, factory) {
  if (typeof module !== 'undefined' && module.exports) { //Node
    module.exports = factory(require('jquery'));
  } else {
    window.toastr = factory(window.jQuery);
  }
}));
