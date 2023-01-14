import './css/styles.css';
// import fetchCountries from "./fetchCountries";
// import debounce from 'lodash.debounce';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


// Запит на бекенд fetch
function fetchCountries(name) {
    const API_URL = 'https://restcountries.com/v3.1/name/';

    return fetch(`${API_URL}${name}?fields=name,capital,population,flags,languages`).then(response => {
        
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    });
}

// Пошук в input
// debounce(onSearchInput, DEBOUNCE_DELAY) 
searchBox.addEventListener('input', onSearchInput);

function onSearchInput(event){ 
    
    let inputValue = event.target.value.trim();
    
    if(!inputValue) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        return;
    }

    fetchCountries(inputValue).then(countryFetch => {
        console.log(countryFetch);

        if(countryFetch.length > 10){
            // Notify.info();
            console.log('info')
        }

        if (countryFetch.length >= 2 && countryFetch.length <= 10) {
            // список країн
            createCountryMarkUp(countryFetch);
            countryInfo.innerHTML = '';
        }

        if (countryFetch.length === 1) {
            createCountryMarUpAll(countryFetch);
            countryList.innerHTML = '';
        }
    });
};

// верстка пошуку країн
function createCountryMarkUp(arr) {
    countryList.innerHTML = arr.map(({flags: {svg}, name: {official}}) => 
        `<li>
            <img src="${svg}" alt="${official}" width="100">
            <h2>${official}</h2>
        </li>`
).join('')};

//  верстка однієї країни
function createCountryMarUpAll(arr) {
    countryInfo.innerHTML = arr.map(({flags: {svg}, name:{official}, capital, population, languages}) => 
    `<img src="${svg}" alt="${official}" width="50">
    <span>${official}</span>
    <div>
      <span>Capital:</span>
      <span>${capital}</span>
    </div>
    <div>
      <span>Population:</span>
      <span>${population}</span>
    </div>
    <div>
      <span>Languages:</span>
      <span>${Object.values(languages).join(', ')}</span>
    </div>`
).join('')};















































































// функция фетч возрощяет апи стран
// function fetchCountries(name){
//     const BASE_URL = 'https://restcountries.com/v3.1/name';
//     const fields = '?fields=name,capital,population,flags,languages';

//   return fetch(`${BASE_URL}${name}${fields}`)
//     .then(response => {
//         console.log(response);
 
        
//         if (!response.ok) {
//             throw new Error(response.statusText);
//         }

//         return response.json();
//     });
// };

// fetchCountries('peru');











// // Создание верстки карточки страны
// function cardCountry({name, capital, population, flags, languages}) {
//     return `<ul>
//                 <li>
//                   <img src="${flags.svg}" alt="${name.official}">
//                   <h2>${name.official}</h2>
//                 </li>
//                 <li>
//                   <p>Capital:</p>
//                   <p>${capital}</p>
//                 </li>
//                 <li>
//                   <p>Population:</p>
//                   <p>${population}</p>
//                 </li>
//                 <li>
//                   <p>Languages:</p>
//                   <p>${languages}</p>
//                 </li>    
//             </ul>`
// };
