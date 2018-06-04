# debugging-smart-tv

> :hammer: Use `new Image` to debug Smart TV applications

## Installation

Attach code below into main HTML file in your app, ex. `index.html`:

```html
<script src="src/client/debugging.js"></script>
<link rel="stylesheet" href="src/client/debugging.css"/>
```

## Usage

### `DebuggingSmartTV.installDebugScreen()`

Add availability to display `Debug Screen`.<br/>
`Debug Screen` will be display after you click `SPECIAL_BUTTON`

### `DebuggingSmartTV.installClock()`

Create one-second lock which logs on every tick.

### `DebuggingSmartTV.attachWindowEvents()`

Listen on DOM events and produce logs:

- `window.onload`
- `window.onerror`

### `DebuggingSmartTV.log( message: string )`

Log any message.

### `DebuggingSmartTV.SPECIAL_BUTTON`

_Default value: 3_

## Features

* [x] Display logs in regular Console in DevTools
* [x] Display logs in HTTP Traffic
* [x] Display logs on Debug Screen
* [x] Debug Screen:
    - **Logs are prefixed** with current time
    - AutoScroll is enabled
    - Visibility is toggleable (show / hide after pressing `SPECIAL_BUTTON`)
* [x] HTTP Traffic:
    - **Logs are not prefixed**
    - Logs are [slugify](https://blog.tersmitten.nl/slugify/) (remove special chars)
* [x] DevTools Console
    - **Logs are prefixed** with constant string
* [ ] Read HTTP Traffic in server-side part

## Rules

* `ECMAScript 3` Standard 

    _Reason: Destination platforms does not support ES5+._

* Use HTTP protocol instead of HTTPS

    _Reason: Unsecured protocol could be sniff ex. by Wireshark._

## License

[The MIT License](http://piecioshka.mit-license.org) @ 2018
