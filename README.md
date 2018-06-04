# debugging-smart-tv

> :hammer: Use `new Image` to debug Smart TV applications

## Installation

Attach file `src/index.js`:

```html
<script src="src/client/debugging.js"></script>
<link rel="stylesheet" href="src/client/debugging.css"/>
```

## Usage

0. `DebuggingSmartTV.installDebugScreen()`

    Add availability to display `Debug Screen`.<br/>
    `Debug Screen` will be display after you click `SPECIAL_BUTTON`

0. `DebuggingSmartTV.installClock()`

    Create one-second lock which logs on every tick.

0. `DebuggingSmartTV.attachWindowEvents()`

    Listen on DOM events and produce logs:

    - `window.onload`
    - `window.onerror`

0. `DebuggingSmartTV.log( message: string )`

    Log any message.

0. `DebuggingSmartTV.SPECIAL_BUTTON`

    Default value: 3

## Features

* Display logs in regular Console in DevTools
* Display logs in HTTP Traffic
* Display logs on Debug Screen
* Debug Screen:
    - **Logs are prefixed** with current time
    - AutoScroll is enabled
    - Visibility is toggleable (show / hide after pressing `SPECIAL_BUTTON`)
* HTTP Traffic:
    - **Logs are not prefixed**
    - Logs are [slugify](https://blog.tersmitten.nl/slugify/) (remove special chars)
* DevTools Console
    - **Logs are prefixed** with constant string

## Rules

* `ECMAScript 3` Standard 

    _Reason: Destination platforms does not support ES5+._

* Use HTTP protocol instead of HTTPS

    _Reason: Unsecured protocol could be sniff ex. by Wireshark._

## License

[The MIT License](http://piecioshka.mit-license.org) @ 2018
