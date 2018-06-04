(function (root) {
    'use strict';

    var DOMAIN = 'piecioshka.pl';
    var LOG_PREFIX = 'Debugging Smart TV';

    var DEBUG_SCREEN_ID = 'debugging-smart-tv'; // After changes, remember about CSS
    var DEBUG_SCREEN_TAG_NAME = 'pre';
    var REVEAL_LOGS_NUMBER = 10;

    // -------------------------------------------------------------------------
    // DO NOT MODIFY BELOW
    // -------------------------------------------------------------------------

    var ONE_SECOND = 1000;
    var KEY_CODE_BUTTON_3 = 51;

    var logs = [];
    var $debugScreen = null;
    var isDebugScreenVisible = false;
    var isConsoleEnabled = (typeof console === 'object'
        || typeof console.log === 'function');

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

    function padStart(value, limit, char) {
        if (typeof value !== 'string' && typeof value !== 'number') {
            return value;
        }

        var appendixSize = limit - String(value).length;

        if (appendixSize < 1) {
            return value;
        }

        var diff = new Array(appendixSize + 1).join(char);

        return diff + value;
    }

    // -------------------------------------------------------------------------

    function sendLogInHTTP(message) {
        new Image().src = 'http://' + DOMAIN + '/?log=' + slugify(message);
    }

    function setupClock() {
        API.log('setupClock');

        setInterval(function () {
            var time = parseTime(new Date()).join('-');
            API.log('tick--' + time);
        }, ONE_SECOND);
    }

    function hideDebugScreen() {
        if (!isDebugScreenVisible) {
            return;
        }

        isDebugScreenVisible = false;

        $debugScreen.style.display = 'none';
    }

    function clearDebugScreen() {
        if (!$debugScreen) {
            return;
        }

        $debugScreen.innerHTML = '';
    }

    function displayDebugScreen() {
        if (!document.body) {
            API.log('document.body is not defined');
            return;
        }

        if (isDebugScreenVisible) {
            return;
        }

        isDebugScreenVisible = true;

        if ($debugScreen) {
            $debugScreen.style.display = 'block';
        } else {
            renderDebugScreen();
        }
    }

    function renderDebugScreen() {
        $debugScreen = document.createElement(DEBUG_SCREEN_TAG_NAME);
        $debugScreen.id = DEBUG_SCREEN_ID;
        document.body.appendChild($debugScreen);
    }

    function displayLastLogs(limit) {
        var lastLogs = logs.slice(-1 * limit);

        for (var i = 0; i < lastLogs.length; i++) {
            var log = lastLogs[i];
            printLog(log);
        }
    }

    function printLogOnDebugScreen(message) {
        if (!$debugScreen) {
            return;
        }

        $debugScreen.innerHTML += message + '\n';
        scrollToBottom();
    }

    function scrollToBottom() {
        if (!$debugScreen) {
            return;
        }

        var body = document.documentElement || document.body;
        body.scrollTop += $debugScreen.clientHeight;
    }

    function setupDebugScreen() {
        setupToggleSwitcher();
        displayDebugScreen();
        API.log('setupDebugScreen');
    }

    function setupToggleSwitcher() {
        root.addEventListener('keypress', function (evt) {
            var keyCode = evt.keyCode || evt.charCode || evt.which;

            switch (keyCode) {
                case API.SPECIAL_BUTTON:
                    if (isDebugScreenVisible) {
                        hideDebugScreen();
                    } else {
                        clearDebugScreen();
                        clearDevTools();

                        displayDebugScreen();
                        displayLastLogs(REVEAL_LOGS_NUMBER);
                    }
                    break;
            }
        });
    }

    function setupWindowEvents() {
        window.addEventListener('load', function () {
            API.log('DOMEvent triggered: window.onload');
        });

        window.addEventListener('error', function (evt) {
            API.log('DOMEvent triggered: window.onerror');
            API.log(' - error: message=' + evt.message);
            API.log(' - error: file=' + evt.filename);
            API.log(' - error: column=' + evt.colno);
            API.log(' - error: line=' + evt.lineno);
        });
    }

    function clearDevTools() {
        if (!isConsoleEnabled) {
            return;
        }
        console.clear();
    }

    function printLogInDevTools(message) {
        if (!isConsoleEnabled) {
            return;
        }
        console.log(message);
    }

    // ----------

    function parseDevToolsMessage(message) {
        return '[' + LOG_PREFIX + '] ' + String(message);
    }

    function parseDebugScreenMessage(message) {
        var now = parseTime(new Date());
        var prefix = now.join('<span>:</span>');
        return '[<em>' + prefix + '</em>] ' + String(message);
    }

    function parseTime(date) {
        var hour = padStart(date.getHours(), 2, '0');
        var minutes = padStart(date.getMinutes(), 2, '0');
        var seconds = padStart(date.getSeconds(), 2, '0');
        var milliseconds = padStart(date.getMilliseconds(), 3, '0');
        return [hour, minutes, seconds, milliseconds];
    }

    function parseHTTPMessage(message) {
        return String(message);
    }

    function printLog(message) {
        printLogInDevTools(parseDevToolsMessage(message));
        sendLogInHTTP(parseHTTPMessage(message));

        if (isDebugScreenVisible) {
            printLogOnDebugScreen(parseDebugScreenMessage(message));
        }
    }

    function saveLog(message) {
        logs.push(message);
    }

    var API = {
        SPECIAL_BUTTON: KEY_CODE_BUTTON_3,
        installClock: setupClock,
        installDebugScreen: setupDebugScreen,
        attachWindowEvents: setupWindowEvents,
        log: function (message) {
            saveLog(message);
            return printLog(message);
        }
    };

    root.DebuggingSmartTV = API;
    root.logs = logs;
})(window);
