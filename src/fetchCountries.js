export { fetchCountries };

const IN_POINT = 'https://restcountries.com/v3.1/name/';
const FIELDS_REQUEST = '?fields=name,capital,population,flags,languages';

function fetchCountries(searchName) {
  const searchString = IN_POINT + searchName + FIELDS_REQUEST;

  return fetch(searchString).then(result => {
    if (!result.ok) {
      throw Error();
    }
    return result.json();
  });
}
