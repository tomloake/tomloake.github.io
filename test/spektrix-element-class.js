class SpektrixElementClass extends HTMLElement {

    constructor() {
        super();
    }

    _generatePayload(body) {
        let bodyJson = JSON.stringify(body);
        
        let payload = {
            credentials: 'include',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            method: 'post',
            body: bodyJson
        }

        return payload;
    }

    _submitRequest(body) {

    	console.log('util class this.endpoint', this.endpoint);
    	console.log('util class this.systemName', this.systemName);
        const systemUrl = 'https://system.spektrix.com/' + this.systemName + '/api/v3/basket/donations';

        let toCheckoutStatus = this.toCheckout;

        return fetch(systemUrl, this._generatePayload(body));
        // .then(data => console.log(data))
        // .then(data => data.json());
    }
}


export default SpektrixElementClass;