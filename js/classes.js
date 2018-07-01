/*jshint esversion: 6 */

class CurrencyL {

    constructor() {
        this.apiAddress= 'https://free.currencyconverterapi.com/api/v5/currencies';
        // this.converterApi = 'https://free.currencyconverterapi.com/api/v5/convert?q=USD_PHP&compact=ultra';
    }

    async getCurrencyList() {

        const currencyResponse = await fetch(this.apiAddress);
        const currencyList= await currencyResponse.json();

        return {
            currencyList
        };
    }

    async getValue(from, to) {

        const currencyResponse = await fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${from}_${to}&compact=ultra`);
        const value= await currencyResponse.json();

        return {
            value
        };
    }

}