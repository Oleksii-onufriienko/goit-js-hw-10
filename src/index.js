import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries';

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener('input', debounce(search, DEBOUNCE_DELAY));

function search(event) {
  const searchCountryName = event.target.value.trim();
  if (searchCountryName === '') {
    resetMarkup();
    return;
  }

  fetchCountries(searchCountryName)
    .then(countryArray => {
      //   if (countryArray.length === 0) throw new Error(countryArray.status);
      if (countryArray.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        resetMarkup();
        return;
        // throw new Error(countryArray.status);
      }
      if (countryArray.length > 2) {
        renderCountriesList(countryArray);
        return;
      }
      renderOneCoutry(countryArray[0]);
    })
    .catch(() => {
      Notify.failure('Oops, there is no country with that name');
      resetMarkup();
    });
}

function renderCountriesList(countries) {
  const markup = countries
    .map(country => {
      return `<li class="list-item">
      <img class="country-list-flag" src="${country.flags.svg}" alt="">
      <p class="countries-name">${country.name.common}</p>
    </li>
`;
    })
    .join('');
  refs.countryList.innerHTML = markup;
}

function renderOneCoutry(country) {
  const languages = Object.values(country.languages).join(',');

  const markup = `<li>
        <div class="countryBox-name-flag">
          <img class="country-flag" src="${country.flags.svg}" alt="" />
          <p class="country-name">${country.name.common}</p>
        </div>
        <p class="country-info"><b>Capital: </b>${country.capital}</p>
        <p class="country-info"><b>Population: </b>${country.population}</p>
        <p class="country-info"><b>Languages: </b>${languages}</p>
      </li>`;

  refs.countryList.innerHTML = markup;
}

const resetMarkup = () => {
  refs.countryList.innerHTML = '';
};
