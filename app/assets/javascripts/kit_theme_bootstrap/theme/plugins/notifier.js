/*
Based on Notificationr (v2.1.4):
  - Copyright 2012-2015
  - Authors: John Papa, Hans Fjällemark, and Tim Ferrell.
  - Project: https://github.com/CodeSeven/toastr
  - License: MIT license, available at http://www.opensource.org/licenses/mit-license.php

KitThemeBootstrap Notifier:
  - Tweaked to make it Bootstrap compatible as this remains a comprehensive / simple notification system.
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

        version: '1.0.0',
      };

      var previousNotification;

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
        if (!clearNotification(notificationElement, options, clearOptions)) {
          clearContainer(options);
        }
      }

      function remove(notificationElement) {
        var options = getOptions();
        if (!$container) {
          getContainer(options);
        }
        if (notificationElement && $(':focus', notificationElement).length === 0) {
          removeNotification(notificationElement);
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
          clearNotification($(notificationsToClear[i]), options);
        }
      }

      function clearNotification(notificationElement, options, clearOptions) {
        var force = clearOptions && clearOptions.force ? clearOptions.force : false;
        if (notificationElement && (force || $(':focus', notificationElement).length === 0)) {
          notificationElement[options.hideMethod]({
            duration: options.hideDuration,
            easing: options.hideEasing,
            complete: function() {
              removeNotification(notificationElement);
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

          timeOut:           0, // Set timeOut and afterHoverTimeOut to 0 to make it sticky
          pauseTimerOnHover: true,
          afterHoverTimeOut: 0,

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

          notificationClass: 'notification notification-primary',
          contentClass:      'notification-content',

          closeHtml:         '<button type="button" class="btn-close" data-bs-dismiss="notification" aria-label="Close"></button>',
          closeClass:        'notification-dismissible',

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
        var notificationElement = $('<div/>').addClass(options.notificationClass).attr('role', 'alert');
        var $contentElement     = $('<div/>');
        var $progressElement    = $('<div/>');
        var $closeElement       = $(options.closeHtml);
        var response = {
          notificationId: notificationId,
          state: 'visible',
          startTime: new Date(),
          options: options,
          map: map
        };

        personalizeNotification();

        displayNotification();

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

        function personalizeNotification() {
          setContent();
          setCloseButton();
          setProgressBar();
          setRTL();
          setSequence();
        }

        function handleEvents() {
          if (options.afterHoverTimeOut > 0) {
            notificationElement.hover(stickAround, delayedHideNotification);
          }

          if (!options.onclick && options.closeOnClick) {
            notificationElement.attr('data-close-on-click', 'true');
            notificationElement.click(hideNotification);
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

              hideNotification(true);
            });
          }

          if (options.onclick) {
            notificationElement.click(function(event) {
              options.onclick(event);
              hideNotification();
            });
          }
        }

        function displayNotification() {
          notificationElement.hide();

          notificationElement[options.showMethod]({
            duration: options.showDuration,
            easing: options.showEasing,
            complete: options.onShown
          });

          if (options.timeOut > 0) {
            if (!options.progressBar) {
              intervalId = setTimeout(hideNotification, options.timeOut);
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
            notificationElement.addClass(options.closeClass);
            notificationElement.prepend($closeElement);
          }
        }

        function setProgressBar() {
          if (options.progressBar) {
            $progressElement.addClass(options.progressClass);

            if (options.pauseTimerOnHover && options.afterHoverTimeOut == 0) {
              $progressElement.attr('data-hover-pause-animation', 'true');
            }

            insertProgressBar(options.timeOut);
          }
        }

        function insertProgressBar(duration) {
          if (duration == 0)
            return;

          $progressElement.css('animation-duration', duration + 'ms');
          notificationElement.prepend($progressElement);

          $progressElement.on('animationend', function() {
            hideNotification(true);
          });
        }

        function setRTL() {
          if (options.rtl) {
            notificationElement.addClass('rtl');
          }
        }

        function shouldExit(options, map) {
          if (options.preventDuplicates) {
            if (map.content === previousNotification) {
              return true;
            } else {
              previousNotification = map.content;
            }
          }
          return false;
        }

        function hideNotification(override) {
          var method   = override && options.closeMethod   !== false ? options.closeMethod   : options.hideMethod;
          var duration = override && options.closeDuration !== false ? options.closeDuration : options.hideDuration;
          var easing   = override && options.closeEasing   !== false ? options.closeEasing   : options.hideEasing;

          if ($(':focus', notificationElement).length && !override) {
            return;
          }

          return notificationElement[method]({
            duration: duration,
            easing:   easing,
            complete: function() {
              removeNotification(notificationElement);
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

        function delayedHideNotification() {
          if (options.timeOut > 0 || options.afterHoverTimeOut > 0) {
            if (options.progressBar) {
              insertProgressBar(options.afterHoverTimeOut);
            } else {
              intervalId = setTimeout(hideNotification, options.afterHoverTimeOut);
            }
          }
        }

        function stickAround() {
          clearTimeout(intervalId);

          if (options.progressBar) {
            $progressElement.remove();
          }

          notificationElement.stop(true, true)[options.showMethod]({
            duration: options.showDuration,
            easing: options.showEasing
          });
        }
      }

      function getOptions() {
        return $.extend({}, getDefaults(), notifier.options);
      }

      function removeNotification(notificationElement) {
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
          previousNotification = undefined;
        }
      }

    })();
  });
}(typeof define === 'function' && define.amd ? define : function(deps, factory) {
  if (typeof module !== 'undefined' && module.exports) { //Node
    module.exports = factory(require('jquery'));
  } else {
    window.notifier = factory(window.jQuery);
  }
}));
