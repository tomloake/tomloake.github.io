import SpektrixElementClass from './spektrix-element-class.js';
// import "babel-polyfill";
// import 'whatwg-fetch';

// First we need to do a little bit of work and 
// prepare the template for the element, so that the 
// polyfill can scope it correctly. If you only 
// want your stuff to work on browsers with native Shadow DOM
// (chrome & safari), you can skip this step!
let nativeWebComponentTemplate = document.createElement('template');
nativeWebComponentTemplate.innerHTML = getTemplateString();
if (window.ShadyCSS)
    window.ShadyCSS.prepareTemplate(nativeWebComponentTemplate, 'native-web-component');



// Define the element prototype.
class NativeWebComponent extends SpektrixElementClass {
    constructor() {
        super();

        // This is needed for the Shady DOM polyfill, since it's not
        // available on all browsers.
        if (window.ShadyCSS) {
            window.ShadyCSS.styleElement(this);
        }

        // Attach a shadow root to the elseement, so that the 
        // implementation is hidden in a 🎁.
        let shadowRoot = this.attachShadow({ mode: 'open' });

        // Put the content of the template inside the shadow DOM.
        this.shadowRoot.appendChild(document.importNode(nativeWebComponentTemplate.content, true));

        // Set up interaction handle - this really needs to go in connectedCallback
        this.interactionHandler();

        //Displays initial donation amount
        this._displayDonationAmount()
    }

    // Set up properties and attributes

    set donationAmount(value) {
        if (this._donationAmount === value) return;
        this._donationAmount = value;
        this._donationAmountChanged(value);
    }

    get donationAmount() {
        return this._donationAmount ? this._donationAmount : 0;
    }

    set nextStep(url) {
        // Does not reflect attribute
        if (this._nextStep === url) return;
        if (typeof url === 'string') {
            this._nextStep = url;
        }
    }

    get nextStep() {
        return this._nextStep ? this._nextStep : null;
    }

    set fundId(id) {
        // Does not reflect attribute
        if (this._fundId === id) return;
        if (typeof id === 'string') {
            this._fundId = id;
        }
    }

    get fundId() {
        return this._fundId ? this._fundId : null;
    }

    set systemName(name) {
        // Does not reflect attribute
        if (this._systemName === name) return;
        if (typeof name === 'string') {
            this._systemName = name;
        }
    }

    get systemName() {
        return this._systemName ? this._systemName : null;
    }

    // End properties and attributes set up 


    postDonation(amount) {
        console.log('this.systemName', this.systemName);

        let body = [{
            amount: amount,
            fundId: this.fundId
        }];

        this._submitRequest(body)
            .then((response) => {
                if (response.ok) {
                    response.json().then((response => this._handleSuccessResponse(response)));
                } else {
                    response.json().then((response => this._handleFailureResponse(response)));
                }
            })
            .catch(error => {
                this._handleFailureResponse(error);
            })
    }

    _handleSuccessResponse(data) {
        let success = new CustomEvent('success', { detail: data });
        this.dispatchEvent(success);

        if (this.nextStep) {
            window.location.href = this.nextStep;
        }

        //move this check higher? would be great not to execute this after firing the event if we don't need to
        let responseContainers = this._getElementFromSlot('[success-container]');
        if (responseContainers.length > 0) {
            for (let responseContainer of responseContainers) {
                responseContainer.setAttribute('style', '')
            }
        } else {
            data.json().then((successText => console.log(successText)));
        }

    }

    _handleFailureResponse(data) {
        let fail = new CustomEvent('fail', { detail: data });
        this.dispatchEvent(fail);

        if (data instanceof Error) {
            console.log('Error: ', data);
        } else {
            let responseContainers = this._getElementFromSlot('[fail-container]');
            if (responseContainers.length > 0) {
                for (let responseContainer of responseContainers) {
                    responseContainer.textContent = data.message + ' ' + data.problems.toString();
                    responseContainer.setAttribute('style', '');
                }
            }
        }
    }

    _updateDonationTotal(amount) {
        this.donationAmount = Number(amount);
    }

    _donationAmountChanged(newValue, oldValue) {
        this._displayDonationAmount(newValue);
    }

    _displayDonationAmount() {
        let donationDisplayElements = this._getElementFromSlot('[data-display-donation-amount]');

        if (donationDisplayElements) {
            for (let donationDisplayElement of donationDisplayElements) {
                donationDisplayElement.textContent = this.donationAmount || 0;
            }
        }
    }

    //to be used to find elements to display in or take values from, NOT get actions from
    _getElementFromSlot(selector) {

        const slot = this.shadowRoot.querySelector('#slot');
        const slotChildNodes = slot.assignedNodes({ flatten: true });

        const returnedElements = [...document.querySelectorAll(selector)];
        // console.log('slotChildNodes', slotChildNodes);
        // let returnedElements = [];

        // function isElement(node) {
        //     return node.nodeType === 1;
        // }

        // for (let childNode of slotChildNodes.filter((node) => isElement(node))) {
        //     if (childNode.matches(selector)) {
        //         returnedElements.push(childNode)
        //     }

        //     if (childNode.children) {
        //         let allNodesDescendents = childNode.querySelectorAll(selector);
        //         returnedElements.push(...allNodesDescendents);
        //     }
        // }
        return returnedElements;
    }

    interactionHandler() {

        this.shadowRoot.addEventListener('click', e => {
            let clickedElement = e.srcElement || e.target;
            let clickedElementAttributes = clickedElement.attributes

            if (clickedElementAttributes.getNamedItem('data-donate-amount') !== null) {
                let amount = clickedElementAttributes.getNamedItem('data-donate-amount').value;
                this._updateDonationTotal(amount);
            } else if (clickedElementAttributes.getNamedItem('data-submit-donation')) {
                this.postDonation(this.donationAmount);

            }

        });
    }


    // Which attributes we care about when they change. This makes sure
    // the internal property is synced when the HTML attribute changes.
    static get observedAttributes() { return ['data-system-name', 'data-fund-id', 'data-next-step']; }
    attributeChangedCallback(attr, oldValue, newValue) {
        // if (oldValue !== newValue)
        //     this[attr] = newValue;

        if (attr === 'data-next-step') {
            console.log('hit');
            this.nextStep = newValue;
        }


        if (attr === 'data-system-name') {
            this.systemName = newValue;
        } else if (attr === 'data-fund-id') {
            this.fundId = newValue;
        }
    }
}

window.customElements.define('native-web-component', NativeWebComponent);

function getTemplateString() {
    return `
<div class="thing" id="spektrix-donate-predefined">
  <slot name="slot" id="slot">
</div>
`
}