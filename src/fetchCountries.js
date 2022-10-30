export default function fetchCountries(name) {
  const inPoint = 'https://restcountries.com/v3.1/name/';
  const searchString =
    inPoint + name + '?fields=name,capital,population,flags,languages';

  return fetch(searchString)
    .then(result => result.json())
    .catch(result => {
      console.log('Это ошибка!', result);
      return result.status;
    });
}
