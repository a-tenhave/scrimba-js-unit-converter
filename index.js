const METER_TO_FEET_FACTOR = 3.281;
const LITER_TO_GALLON_FACTOR = 0.264;
const KG_TO_POUND_FACTOR = 2.204;

const containerEl = document.querySelector('.container');
const conversionEl = document.querySelectorAll('.conversion');
const conversionHeadingEl = document.querySelectorAll('.conversion-heading');
const conversionTextEl = document.querySelectorAll('.conversion-text');

const convertBtn = document.querySelector('#convert-btn');
const toggleModeBtn = document.querySelector('.mode-toggle-btn');

const meterFeetEl = document.querySelector("#meter-feet-el");
const literGallonEl = document.querySelector('#liter-gallon-el');
const kgPoundEl = document.querySelector('#kg-pound-el');

const numberToConvertEl = document.querySelector('#number-input');
const validationTextEl = document.querySelector('#validation-text');

let isLightMode = true;

toggleModeBtn.addEventListener("click", function() {
    isLightMode = !isLightMode;
    if (isLightMode) {
        toggleModeBtn.textContent = 'Switch to dark mode';
    } else {
        toggleModeBtn.textContent = 'Switch to light mode';
    }
    toggleModeBtn.classList.toggle("mode-toggle-btn-dark-mode");
    containerEl.classList.toggle("container-dark-mode");
    conversionEl.forEach(el => {
        el.classList.toggle('conversion-dark-mode');
    });
    conversionHeadingEl.forEach(el => {
        el.classList.toggle('conversion-heading-dark-mode');
    });
    conversionTextEl.forEach(el => {
        el.classList.toggle('conversion-text-dark-mode');
    });
})


let numberToConvert = 0;
numberToConvertEl.value = numberToConvert;
render();

convertBtn.addEventListener("click", function() {
    numberToConvert = numberToConvertEl.value;
    render();
});

numberToConvertEl.addEventListener("input", function() {
    validationTextEl.textContent = validateEntry(numberToConvertEl.value);
});

function validateEntry(input) {
    if (input < 0) {
        return 'Number needs to be positive';
    }
    if (input > 999) {
        return 'Number needs to be smaller than 1000';
    }
    if (isNaN(input)) {
        return 'You need to enter a number';
    }
}

function render() {
    meterFeetEl.innerHTML = 
    `${numberToConvert} meters = ${convertAtoB(METER_TO_FEET_FACTOR)} feet |
     ${numberToConvert} feet = ${convertBtoA(METER_TO_FEET_FACTOR)} meters`;
    literGallonEl.innerHTML = 
    `${numberToConvert} liters = ${convertAtoB(LITER_TO_GALLON_FACTOR)} gallons |
     ${numberToConvert} gallons = ${convertBtoA(LITER_TO_GALLON_FACTOR)} liters`;
    kgPoundEl.innerHTML = 
    `${numberToConvert} kg = ${convertAtoB(KG_TO_POUND_FACTOR)} pounds |
     ${numberToConvert} pounds = ${convertBtoA(KG_TO_POUND_FACTOR)} kg`;
}

function convertAtoB(factor) {
    return (numberToConvert * factor).toFixed(3);
}

function convertBtoA(factor) {
    return (numberToConvert * (1 / factor)).toFixed(3);
}