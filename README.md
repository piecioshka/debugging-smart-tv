# debugging-smart-tv

> :hammer: Tool for debugging Smart TV applications

## Features

* :white_check_mark: Display logs in regular Console in DevTools
* :white_check_mark: Display logs in HTTP Traffic
* :white_check_mark: Display logs on Debug Screen
* :white_check_mark: Debug Screen:
    - **Logs are prefixed** with current time
    - AutoScroll is enabled
    - Visibility is toggleable (show / hide after pressing `SPECIAL_BUTTON`)
    - Wrap lines
* :white_check_mark: HTTP Traffic:
    - **Logs are not prefixed**
    - Logs are [slugify](https://blog.tersmitten.nl/slugify/) (remove special chars)
* :white_check_mark: DevTools Console
    - **Logs are prefixed** with constant string
* :bulb: Read HTTP Traffic in server-side part

## Getting started

Attach code below into main HTML file in your app, ex. `index.html`:

```html
<script src="src/client/debugging.js"></script>
<link rel="stylesheet" href="src/client/debugging.css"/>
```

When browser execute `debugging.js` file, in window namespace will be available
`DebuggingSmartTV` object with API which is described below.

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

Default value: :three: (keyCode: `51`)

## Code & Project Rules

* `ECMAScript 3` Standard 

    _Reason: Destination platforms does not support ES5+._

* Use HTTP protocol instead of HTTPS

    _Reason: Unsecured protocol could be sniff ex. by Wireshark._

## License

[The MIT License](http://piecioshka.mit-license.org) @ 2018
