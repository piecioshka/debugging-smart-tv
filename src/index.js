(function (root) {
    'use strict';

    var DOMAIN = 'piecioshka.pl';
    var LOG_PREFIX = 'Smart TV Debugging';
    var DEBUG_SCREEN_STYLES = {
        'box-sizing': 'border-box',
        'font-size': '30px',
        'background': 'transparent',
        'min-height': '100%',
        'z-index': 9999999,
        color: '#F0CA4D',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        margin: 0,
        padding: '0 10px'
    };

    // -------------------------------------------------------------------------
    // DO NOT MODIFY BELOW
    // -------------------------------------------------------------------------

    var ONE_SECOND = 1000;
    var CLOCK_INTERVAL = null;

    function assign(target) {
        var args = Array.prototype.slice.call(arguments);
        var sources = args.slice(1);


        for (var i = 0; i < sources.length; i++) {
            var source = sources[i];

            for (var key in source) {

                if (source.hasOwnProperty(key)) {
                    target[key] = source[key];
                }
            }
        }
    }

    function slugify(text) {
        if (typeof text !== 'string') {
            return text;
        }
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    }

    function after(fn, after) {
        return function (message) {
            fn(message);
            after(message);
        };
    }

    function sendImageRequest(message) {
        new Image().src = 'http://' + DOMAIN + '/?log=' + slugify(message);
    }

    function setupClock() {
        log('setupClock');

        CLOCK_INTERVAL = setInterval(function () {
            var time = new Date().getTime();
            log('tick-' + time);
        }, ONE_SECOND);
    }

    function stopClock() {
        log('stopClock');

        if (CLOCK_INTERVAL) {
            clearInterval(CLOCK_INTERVAL);
        }
    }

    function displayDebugScreen() {
        if (!document.body) {
            log('document.body is not defined');
            return;
        }

        var $debugScreen = document.createElement('pre');
        assign($debugScreen.style, DEBUG_SCREEN_STYLES);
        document.body.appendChild($debugScreen);

        return $debugScreen;
    }

    function setupDebugScreen() {
        var $debugScreen = displayDebugScreen();
        log = after(log, function (message) {
            $debugScreen.innerHTML = message + '\n' + $debugScreen.innerHTML;
        });

        log('setupDebugScreen');
    }

    function setupWindowEvents() {
        window.addEventListener('load', function () {
            log('DOMEvent triggered: window.onload');
        });

        window.addEventListener('error', function (evt) {
            log('DOMEvent triggered: window.onerror');
            log(' - error: message=' + evt.message);
            log(' - error: file=' + evt.filename);
            log(' - error: column=' + evt.colno);
            log(' - error: line=' + evt.lineno);
        });
    }

    function devToolsLog(message) {
        if (typeof console !== 'object' || typeof console.log !== 'function') {
            return;
        }
        console.log(message);
    }

    function log(message) {
        message = '[' + LOG_PREFIX + '] ' + String(message);
        devToolsLog(message);
        sendImageRequest(message);
    }

    root.SmartTVDebugging = {
        installClock: setupClock,
        uninstallClock: stopClock,
        installDebugScreen: setupDebugScreen,
        attachWindowEvents: setupWindowEvents,
        log: function () {
            return log.apply(this, arguments);
        }
    };
})(window);
