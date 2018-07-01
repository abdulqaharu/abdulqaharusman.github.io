/*jshint esversion: 6 */

//init class from classes.js
const currency = new CurrencyL();

const ddb1 = 'dropdown-icon-1';
const ddb2 = 'dropdown-icon-2';
const adjDdb1 = document.querySelector(`.${ddb1}`);
const adjDdb2 = document.querySelector(`.${ddb2}`);
const fromCurrency = document.querySelector('.from-currency');
const toCurrency = document.querySelector('.to-currency');


const fromOptions = document.getElementById('from-options');
const toOptions = document.getElementById('to-options');

// get result output element
// let fromInput = document.getElementById('from-input').value;
let output = document.getElementById('value');



// Choose currency from and to
document.addEventListener("click", e => {

    const target = e.target;
    const targetClass = target.className;

    if (target.classList.contains(ddb1)) {

        removeAdjActiveClass(adjDdb2);
        toggleActiveClass(target);

    } else if (target.classList.contains(ddb2)) {

        removeAdjActiveClass(adjDdb1);
        toggleActiveClass(target);

    } else {

        removeActiveClass();

    }

});


/// collect currency options value and change the inner text of the currency field

document.addEventListener('click', e => {

    const clicked = e.target;
  

    if (clicked.classList.contains('options')) {

        const Input = document.getElementById('from-input').value;
        // collect inner Text and data attribute of the clicked currency option
        const clickedText = clicked.innerHTML;
        const clickedData = clicked.getAttribute('data');

        // set inner Text and data attribute value of clicked element's parent element
        //Its parent element holds data to be passed to the currency class method.
        const getDataAttr = clicked.parentElement.getAttribute('data');
        const currency = document.querySelector(`.${getDataAttr}`);


        currency.innerHTML = clickedText;
        currency.setAttribute('data', clickedData);


        currencyValue(Input);
        

    }

});



const fromText = document.getElementById('from-input');
const errorMsg = document.querySelector('.error-msg');

// this event fires up when user type into the input field
fromText.addEventListener('keyup', e => {

    //remove any visible error msg
    errorMsg.classList.remove('display-err');

    //collect value from input field 
    const fromTextVal = e.target.value;

    // check if value in input field is not number
    if (isNaN(fromTextVal)) {

        //show error message 
        errorMsg.classList.add('display-err');

        //reset the input field
        fromText.value = '';

    } else {

        errorMsg.classList.remove('display-err');
        currencyValue(fromTextVal);
    
    }


});

// fetch data from api and polupate the currency options UI with currency names and Id
currency.getCurrencyList()
    .then(data => {

        const CurrencyList = data;
        let moneys = Array.from(Object.getOwnPropertyNames(CurrencyList.currencyList.results));
        moneys = moneys.sort();
        moneys.forEach(money => {

            const countryName = CurrencyList.currencyList.results[money].currencyName;


            const toOptionsElement = document.createElement('div');
            toOptionsElement.classList = 'options';
            toOptionsElement.setAttribute('data', money);
            toOptionsElement.innerHTML = `${money} <span class="country-name countries">${countryName}</span>`;

            toOptions.appendChild(toOptionsElement);

            const optionsElement = document.createElement('div');
            optionsElement.classList = 'options';
            optionsElement.setAttribute('data', money);
            optionsElement.innerHTML = `${money} <span class="country-name countries">${countryName}</span>`;

            fromOptions.appendChild(optionsElement);

        });

    });





// functions


const currencyValue = (input) => {

    let outputValue;
    const fromCurrencyText = fromCurrency.getAttribute('data');
    const toCurrencyText = toCurrency.getAttribute('data');
    const toAccessValues = `${fromCurrencyText}_${toCurrencyText}`;

    const finalValue = currency.getValue(fromCurrencyText, toCurrencyText).then(data => {

        const value = data;
        const preciseValue = value.value[toAccessValues];
        outputValue = (input * preciseValue).toFixed(2);

        output.innerHTML = outputValue;
    });

    
    
};


const toggleActiveClass = t => {
    const addClassTo = t.parentElement.parentElement.nextElementSibling;
    addClassTo.classList.toggle('active');
};

const removeActiveClass = () => {

    const activeElement = document.querySelector('.active');
    if (activeElement) {
        activeElement.classList.remove('active');
    }


};

const removeAdjActiveClass = (t) => {

    const rmvClassfrom = t.parentElement.parentElement.nextElementSibling;
    if (rmvClassfrom) {
        rmvClassfrom.classList.remove('active');
    }


};