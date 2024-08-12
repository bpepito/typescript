"use strict";
const cities = loadCitiesFromLocalStorage();
function renderCityTable(cities) {
    const tbody = document.querySelector('#cityTable tbody');
    if (!tbody)
        return;
    tbody.innerHTML = '';
    cities.forEach(city => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${city.name}</td>
            <td>${city.country}</td>
            <td>${city.population.toLocaleString()}</td>
        `;
        tbody.appendChild(row);
    });
}
function filterCities(query) {
    const filteredCities = cities.filter(city => city.name.toLowerCase().includes(query.toLowerCase()) ||
        city.country.toLowerCase().includes(query.toLowerCase()));
    renderCityTable(filteredCities);
}
function saveCitiesToLocalStorage(cities) {
    localStorage.setItem('cities', JSON.stringify(cities));
}
function loadCitiesFromLocalStorage() {
    const citiesJson = localStorage.getItem('cities');
    if (citiesJson) {
        try {
            return JSON.parse(citiesJson);
        }
        catch (e) {
            console.error('Failed to parse cities from localStorage', e);
            return [];
        }
    }
    return [];
}
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cityForm');
    const searchInput = document.getElementById('search');
    if (!form || !searchInput) {
        console.error('Form or search input not found');
        return;
    }
    renderCityTable(cities);
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const cityName = document.getElementById('cityName').value;
        const country = document.getElementById('country').value;
        const population = Number(document.getElementById('population').value);
        cities.push({ name: cityName, country: country, population: population });
        form.reset();
        saveCitiesToLocalStorage(cities);
        renderCityTable(cities);
    });
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value;
        filterCities(query);
    });
});
// Exercise 2: Change It Up!
function transformString() {
    const input = document.getElementById('inputString').value;
    const result = document.getElementById('result');
    result.textContent = processString(input);
}
function processString(str) {
    return str.split('').map(char => {
        let nextChar = char;
        if (/[a-zA-Z]/.test(char)) {
            if (char === 'z') {
                nextChar = 'a';
            }
            else if (char === 'Z') {
                nextChar = 'A';
            }
            else {
                nextChar = String.fromCharCode(char.charCodeAt(0) + 1);
            }
        }
        if ('aeiou'.includes(nextChar.toLowerCase())) {
            return nextChar.toUpperCase();
        }
        else if (/[a-zA-Z]/.test(nextChar)) {
            return nextChar.toLowerCase();
        }
        else {
            return nextChar;
        }
    }).join('');
}
// Exercise 3: ISBN
function isValidISBN(isbn) {
    if (isbn.length !== 10) {
        return false;
    }
    let sum = 0;
    for (let i = 0; i < 10; i++) {
        const char = isbn[i];
        let value;
        if (char === 'X' && i === 9)
            value = 10;
        else if (char >= '0' && char <= '9')
            value = parseInt(char, 10);
        else
            return false;
        sum += value * (i + 1);
    }
    return (sum % 11 === 0);
}
console.log('Exercise 3:');
console.log(isValidISBN('1112223339'));
console.log(isValidISBN('111222333'));
console.log(isValidISBN('1112223339X'));
console.log(isValidISBN('1234554321'));
console.log(isValidISBN('1234512345'));
console.log(isValidISBN('048665088X'));
console.log(isValidISBN('X123456788'));
// Exercise 4 Moving zeroes
function moveZeroes(array) {
    const nonZeroes = [];
    let zeroCount = 0;
    array.forEach((item) => {
        if (item === 0) {
            zeroCount++;
        }
        else {
            nonZeroes.push(item);
        }
    });
    for (let i = 0; i < zeroCount; i++) {
        nonZeroes.push(0);
    }
    return nonZeroes;
}
console.log('Exercise 4:');
console.log(moveZeroes([false, 1, 0, 1, 2, 0, 1, 3, "a"]));
