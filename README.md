# uib-dialog

This service lets you display messages to the user using 'ui-bootstrap' modals for better responsiveness.
You can use options such as `uibDialog.alert('Hello, World')` to display text to the user, as well as other functions.
Each of these service functions returns a promise so that interaction from the user can be tracked, and acted upon.

## Installation

There is currently no method of installing this module automatically.
Alternatively, grab the dist/uib.dialog.js and include it in your project.

In your application, declare the angular-google-analytics module dependency.

```html
<script src="<path-to-file>/uib.dialog.js"></script>
```

As soon as you've got all the files downloaded and included in your page you just need to declare a dependency on the uib.dialog module:

You need to make sure to include ui.bootstrap into your dependencies.

Also, be sure to include ngAnimate as well if you plan on using animations.

```javascript
angular.module('myModule', ['ui.bootstrap', 'uib.dialog']);
```

## Config

This object can be passed in as the second parameter of any of these calls to change various configurations of the message such as button text, size, etc., and will only be applied to that instance of the dialog.

```javascript
uibDialog.alert(message, config);
```

Contrarily, an identical object can be passed into a call to change the global configuration of all dialogs in the app.

```javascript
uibDialog.config(config)
```

Each of the configurations can be set at a global level to affect every type of message, or they can be set in a nested object within the configuration object which has the key of the message type, i.e. to set the 'OK' button text for only the confirm dialogs to 'Yes',

```javascript
uibDialog.config({confirm:{ok: 'Yes'}});
```

### config parameter

 - `animation` (Type: `boolean`, Default: `true`) - Set to `false` to disable animations on new modal/backdrop. Does not toggle animations for modals/backdrops that are already displayed.

 - `backdrop` (Type: `boolean|string`, Default: `true`) - Controls presence of a backdrop. Allowed values: `true` (default), `false` (no backdrop), `'static'` (disables modal closing by click on the backdrop).

 - `size` (Type: `string`, Example: `'lg'`) - Optional suffix of modal window class. The value used is appended to the `modal-` class, i.e. a value of `sm` gives `modal-sm`.

 - `keyboard` (Type: `boolean`, Default: `true`) - Indicates whether the dialog should be closable by hitting the ESC key.

 - `close` (Type: `boolean`, Default: `true`) - Indicates whether the dialog should display the close icon in the top-right corner, which can be pressed to _dismiss_ the modal, triggering the error function of the promise.

 - `ok` (Type: `boolean|string`, Default: `'OK'`) - When the value is a `boolean`, controls presence of the 'OK' button, which can be pressed to _close_ the modal, triggering the success function of the promise. When the value is a `string`, controls the button text.

 - `cancel` (Type: `boolean|string`, Default: `'Cancel'`) - When the value is a boolean, controls presence of the 'Cancel' button, which can be pressed to _dismiss_ the modal, triggering the error function of the promise. When the value is a `string`, controls the button text.

 - `autoclose` (Type: `boolean|number`, Default: `false`) - Controls the time until the modal dismisses on its own. If `false`, modal never dismisses on its own.

 - `html` (Type: `boolean`, Default: `true` if ngSanitize is included, otherwise `false`) - Controls whether or not to allow html to be passed in as either the message value or any configurations. *ngSanitize module is required for ng-bind-html to be used, so this will throw an error when the config is set to `true`, and this module is not included in the index.*
