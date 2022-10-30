export { fetchCountries };

const BASE_URL = 'https://restcountries.com/v3.1/name/';

function fetchCountries(searchName) {
  const searchString = `${BASE_URL}${searchName}?fields=name,capital,population,flags,languages`;
  return fetch(searchString).then(result => {
    if (!result.ok) {
      throw Error();
    }
    return result.json();
  });
}
