# debugging-smart-tv

> :hammer: Use `new Image` to debug Smart TV applications

## Installation

1. Attach file `src/index.js`

    ```html
    <script src="src/index.js"></script>
    ```

2. Use function:

    ```js
    void SmartTVDebugging.attachWindowEvents()
    ```

    to listen on DOM events:

    - `window.onload`
    - `window.onerror`

3. Use function:

    ```js
    void SmartTVDebugging.log( message /** @type string **/)
    ```

    to log any message.

## Rules

* `ECMAScript 3` Standard 

    _Reason: Destination platforms does not support ES5+._

* Use HTTP protocol instead of HTTPS

    _Reason: Unsecured protocol could be sniff ex. by Wireshark._

## License

[The MIT License](http://piecioshka.mit-license.org) @ 2018
