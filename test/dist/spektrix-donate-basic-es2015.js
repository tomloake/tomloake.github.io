/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/spektrix-element-class.js":
/*!***************************************!*\
  !*** ./lib/spektrix-element-class.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass SpektrixElementClass extends HTMLElement {\r\n\r\n    constructor() {\r\n        super();\r\n    }\r\n\r\n    _submitRequest(body, method, endpoint) {\r\n        const systemUrl = 'https://system.spektrix.com/' + this.systemName + '/api/v3/' + endpoint;\r\n\r\n        let bodyJson = JSON.stringify(body);\r\n\r\n        let payload = {\r\n            credentials: 'include',\r\n            headers: {\r\n                \"Content-type\": \"application/json; charset=UTF-8\"\r\n            },\r\n            method: method,\r\n            body: bodyJson\r\n        }\r\n\r\n        return fetch(systemUrl, payload);\r\n    }\r\n\r\n    // To be used to handle inputs where just clicking on them isn't enough to trigger the input amount (eg - dropdowns, text, number inputs)\r\n//     _customInputHandler(inputs, callBack) {\r\n//         const customInputs = this._getElementFromSlot(inputs);\r\n\r\n//         if (customInputs) {\r\n//             //set initial value - to handle default amounts\r\n//             // this._updateDonationTotal(customInputs[0].value)\r\n\r\n//             for (let customInput of customInputs) {\r\n\r\n//                 //get amount when changed\r\n//                 customInput.addEventListener('input', e => {\r\n//                     callBack(customInput);\r\n//                 });\r\n//             }\r\n//         }\r\n//     }\r\n// }\r\n\r\n\r\n    _customInputHandler(inputs, callBack) {\r\n        this.shadowRoot.addEventListener('input', e => {\r\n            let clickedElement = e.srcElement || e.target;\r\n            let clickedElementAttributes = clickedElement.attributes;\r\n\r\n            if (clickedElementAttributes.getNamedItem(inputs) !== null) {\r\n                callBack(clickedElement);\r\n            }\r\n        });\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (SpektrixElementClass);\n\n//# sourceURL=webpack:///./lib/spektrix-element-class.js?");

/***/ }),

/***/ "./spektrix-donate-basic/spektrix-donate-basic.js":
/*!********************************************************!*\
  !*** ./spektrix-donate-basic/spektrix-donate-basic.js ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_spektrix_element_class_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/spektrix-element-class.js */ \"./lib/spektrix-element-class.js\");\n\r\n\r\n\r\nlet spektrixDonateBasicTemplate = document.createElement('template');\r\nspektrixDonateBasicTemplate.innerHTML = getTemplateString();\r\nif (window.ShadyCSS)\r\n    window.ShadyCSS.prepareTemplate(spektrixDonateBasicTemplate, 'native-web-component');\r\n\r\n\r\n\r\n// Define the element prototype.\r\nclass spektrixDonateBasic extends _lib_spektrix_element_class_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    constructor() {\r\n        super();\r\n\r\n        // This is needed for the Shady DOM polyfill, since it's not\r\n        // available on all browsers.\r\n        if (window.ShadyCSS) {\r\n            window.ShadyCSS.styleElement(this);\r\n        }\r\n\r\n        // Attach a shadow root to the elseement, so that the \r\n        // implementation is hidden in a 🎁.\r\n        let shadowRoot = this.attachShadow({ mode: 'open' });\r\n\r\n        // Put the content of the template inside the shadow DOM.\r\n        this.shadowRoot.appendChild(document.importNode(spektrixDonateBasicTemplate.content, true));\r\n\r\n        // Set up interaction handler - this really needs to go in connectedCallback\r\n        this.interactionHandler();\r\n    }\r\n\r\n    connectedCallback() {\r\n        this._customInputHandler('data-custom-donation-input', (input) => {\r\n            this._updateDonationTotal(input.value)\r\n        })\r\n        this._customInputHandler('data-custom-donation-input2', (input) => {\r\n            console.log(\"blahdeblah\");\r\n        })\r\n\r\n    }\r\n\r\n    // Set up properties and attributes\r\n\r\n    set donationAmount(value) {\r\n        if (this._donationAmount === value) return;\r\n        this._donationAmount = value;\r\n        this._donationAmountChanged(value);\r\n        console.log('set donation');\r\n    }\r\n\r\n    get donationAmount() {\r\n        return this._donationAmount ? this._donationAmount : 0;\r\n    }\r\n\r\n    set NextStep(url) {\r\n        if (this._nextStep === url) return;\r\n        if (typeof url === 'string') {\r\n            this._nextStep = url;\r\n        }\r\n    }\r\n\r\n    get NextStep() {\r\n        return this._nextStep ? this._nextStep : null;\r\n    }\r\n\r\n    set fundId(id) {\r\n        if (this._fundId === id) return;\r\n        if (typeof id === 'string') {\r\n            this._fundId = id;\r\n        }\r\n    }\r\n\r\n    get fundId() {\r\n        return this._fundId ? this._fundId : null;\r\n    }\r\n\r\n    set systemName(name) {\r\n        if (this._systemName === name) return;\r\n        if (typeof name === 'string') {\r\n            this._systemName = name;\r\n        }\r\n    }\r\n\r\n    get systemName() {\r\n        return this._systemName ? this._systemName : null;\r\n    }\r\n\r\n    // End properties and attributes set up \r\n\r\n\r\n    postDonation(amount) {\r\n\r\n        let body = [{\r\n            amount: amount,\r\n            fundId: this.fundId\r\n        }];\r\n\r\n        this._submitRequest(body, 'post', 'basket/donations')\r\n            .then((response) => {\r\n                if (response.ok) {\r\n                    response.json().then((response => this._handleSuccessResponse(response)));\r\n                } else {\r\n                    response.json().then((response => this._handleFailureResponse(response)));\r\n                }\r\n            })\r\n            .catch(error => {\r\n                this._handleFailureResponse(error);\r\n            })\r\n    }\r\n\r\n    _handleSuccessResponse(data) {\r\n        let success = new CustomEvent('success', { detail: data });\r\n        this.dispatchEvent(success);\r\n\r\n        if (this.nextStep) {\r\n            window.location.href = this.nextStep;\r\n        }\r\n\r\n        //move this check higher? would be great not to execute this after firing the event if we don't need to\r\n        let responseContainers = this._getElementFromSlot('[data-success-container]');\r\n        if (responseContainers.length > 0) {\r\n            for (let responseContainer of responseContainers) {\r\n                responseContainer.setAttribute('style', '')\r\n            }\r\n        } else {\r\n            data.json().then((successText => console.log(successText)));\r\n        }\r\n\r\n    }\r\n\r\n    _handleFailureResponse(data) {\r\n        let fail = new CustomEvent('fail', { detail: data });\r\n        this.dispatchEvent(fail);\r\n\r\n        if (data instanceof Error) {\r\n            console.log('Error: ', data);\r\n        } else {\r\n            let responseContainers = this._getElementFromSlot('[data-fail-container]');\r\n            if (responseContainers.length > 0) {\r\n                for (let responseContainer of responseContainers) {\r\n                    responseContainer.textContent = data.message + ' ' + data.problems.toString();\r\n                    responseContainer.setAttribute('style', '');\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    _updateDonationTotal(amount) {\r\n        this.donationAmount = Number(amount);\r\n    }\r\n\r\n    _donationAmountChanged(newValue, oldValue) {\r\n        this._displayDonationAmount(newValue);\r\n    }\r\n\r\n    _displayDonationAmount() {\r\n        let donationDisplayElements = this._getElementFromSlot('[data-display-donation-amount]');\r\n\r\n\r\n        if (donationDisplayElements) {\r\n            for (let donationDisplayElement of donationDisplayElements) {\r\n                donationDisplayElement.textContent = this.donationAmount || 0;\r\n            }\r\n        }\r\n    }\r\n\r\n    _getElementFromSlot(selector) {\r\n        const slot = this.shadowRoot.querySelector('#slot');\r\n        const slotChildNodes = slot.assignedNodes({ flatten: true });\r\n        let returnedElements = [];\r\n\r\n        function isElement(node) {\r\n            return node.nodeType === 1;\r\n        }\r\n\r\n        for (let childNode of slotChildNodes.filter((node) => isElement(node))) {\r\n            if (childNode.matches && childNode.matches(selector) || childNode.msMatchesSelector && childNode.msMatchesSelector(selector)) {\r\n                returnedElements.push(childNode)\r\n            }\r\n\r\n            if (childNode.children) {\r\n                let allNodesDescendents = childNode.querySelectorAll(selector);\r\n                returnedElements.push(...allNodesDescendents);\r\n            }\r\n        }\r\n        return returnedElements;\r\n    }\r\n\r\n\r\n    interactionHandler() {\r\n        this.shadowRoot.addEventListener('click', e => {\r\n            let clickedElement = e.srcElement || e.target;\r\n            let clickedElementAttributes = clickedElement.attributes\r\n\r\n            if (clickedElementAttributes.getNamedItem('data-submit-donation') !== null) {\r\n                this.postDonation(this.donationAmount);\r\n            } \r\n        });\r\n    }\r\n\r\n\r\n\r\n    // Which attributes we care about when they change. This makes sure\r\n    // the internal property is synced when the HTML attribute changes.\r\n    static get observedAttributes() { return ['system-name', 'fund-id', 'next-step']; }\r\n    attributeChangedCallback(attr, oldValue, newValue) {\r\n\r\n        function toCamelCase(str) {\r\n            return str.replace(/-([a-z])/g, function(g) { return g[1].toUpperCase(); });\r\n        }\r\n\r\n        let camelCasedAttr = toCamelCase(attr);\r\n\r\n        if (oldValue !== newValue) {\r\n            this[camelCasedAttr] = newValue;\r\n        }\r\n\r\n    }\r\n}\r\n\r\nwindow.customElements.define('spektrix-donate-basic', spektrixDonateBasic);\r\n\r\nfunction getTemplateString() {\r\n    return `\r\n<div class=\"thing\" id=\"spektrix-donate-basic\">\r\n  <slot name=\"slot\" id=\"slot\">\r\n</div>\r\n`\r\n}\n\n//# sourceURL=webpack:///./spektrix-donate-basic/spektrix-donate-basic.js?");

/***/ }),

/***/ 0:
/*!**************************************************************!*\
  !*** multi ./spektrix-donate-basic/spektrix-donate-basic.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./spektrix-donate-basic/spektrix-donate-basic.js */\"./spektrix-donate-basic/spektrix-donate-basic.js\");\n\n\n//# sourceURL=webpack:///multi_./spektrix-donate-basic/spektrix-donate-basic.js?");

/***/ })

/******/ });