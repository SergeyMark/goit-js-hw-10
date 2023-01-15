import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


// Пошук в input
searchBox.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));

function onSearchInput(event){ 
    
    let inputValue = event.target.value.trim();
    
    if(!inputValue) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        return;
    }

    fetchCountries(inputValue).then(countryFetch => {

        if(countryFetch.length > 10){
            Notify.info('Too many matches found. Please enter a more specific name.');
            countryList.innerHTML = '';
            countryInfo.innerHTML = '';
        }

        if (countryFetch.length >= 2 && countryFetch.length <= 10) {
            createCountryMarkUp(countryFetch);
            countryInfo.innerHTML = '';
        }

        if (countryFetch.length === 1) {
            createCountryMarUpAll(countryFetch);
            countryList.innerHTML = '';
        }
    }).catch(error => {
        Notify.failure('Oops, there is no country with that name')
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
    });
};

// верстка пошуку країн
function createCountryMarkUp(arr) {
    countryList.innerHTML = arr.map(({flags: {svg}, name: {official}}) => 
        `<li class="item">
            <img class="item-img" src="${svg}" alt="${official}" width="100">
            <h2 class="item-header">${official}</h2>
        </li>`
).join('')};

//  верстка однієї країни
function createCountryMarUpAll(arr) {
    countryInfo.innerHTML = arr.map(({flags: {svg}, name:{official}, capital, population, languages}) => 
    `
    <div class="container-header">
        <img class="flag-img" src="${svg}" alt="${official}" width="50">
        <h2 class="text">${official}</h2>
    </div>
    <div class="container">
      <span class="container-text">Capital: </span>
      <span>${capital}</span>
    </div>
    <div class="container">
      <span class="container-text">Population: </span>
      <span>${population}</span>
    </div>
    <div class="container">
      <span class="container-text">Languages: </span>
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
