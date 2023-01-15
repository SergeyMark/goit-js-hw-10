// Запит на бекенд fetch
export function fetchCountries(name) {
    const API_URL = 'https://restcountries.com/v3.1/name/';

    return fetch(`${API_URL}${name}?fields=name,capital,population,flags,languages`).then(response => {
        
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    });
}


