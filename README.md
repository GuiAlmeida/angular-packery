# angular-packery
[AngularJS](http://angularjs.org/) Directive for Packery Layout by [David DeSandro](http://packery.metafizzy.co/)

## Usage
### Browserify
install from npm
```npm
npm install --save ng-packery 
```
require module
```js
var ngPackery = require('ngPackery')
```
attach module to application
```js
var app = angular.module('app', [ngPackery]);
```

### Manually
include in HTML
```html
<script src="angular.js"></script>
<script src="angular-packery.js"></script>
```
attach to application
```js
var app = angular.module('app', ['ngPackery']);
```

## Example
Any options listed in [Packery](http://packery.metafizzy.co/options.html) website can be used in the 'data-packery-options' attribute
```html
<div data-packery data-packery-options='{ "columnWidth": 200 }'>
    <div data-packery-item data-ng-repeat="item in list">
        {{ item }}
    </div>
</div>
```

## Credits
This directive is created based on Packery Layout by [David DeSandro](http://packery.metafizzy.co/)