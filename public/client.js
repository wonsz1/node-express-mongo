console.log('Client side ok');

const button = document.getElementById('myButton');
const checkClicksButton = document.getElementById('checkClicks');
const submitButton = document.getElementById('submit');
const getQuotesButton = document.getElementById('getQuotes');

button.addEventListener('click', () => {
    console.log('button clicked');

    fetch('/clicked', { method: 'POST'})
    .then(function(response) {
        if(response.ok) {
            console.log('click was recorded');
            return;
        }
        throw new Error('Request failed');
    })
    .catch(function(err) {
        console.log(err);
    })
});

checkClicksButton.addEventListener('click', e => {
    console.log('check clicked');

    fetch('/clicks', {method: 'GET'})
    .then(function(response) {
        if(response.ok) return response.json();
        throw new Error('Request failed');
    })
    .then(function(data) {
        document.getElementById('counter').innerHTML = `Button clicked ${data.length} times`;
    })
    .catch(function(err) {
        console.log(err);
    });
});

getQuotesButton.addEventListener('click', e => {
    fetch('/quotes', {method: 'GET'})
    .then(function(response) {
        if(response.ok) return response.json();
        throw new Error('Request failed');
    })
    .then(function(data) {
        var quotes = '';
        for(var key in data) {
            quotes += '<br/>name: ' + data[key].name + '<br/>quote: ' + data[key].quote + '<br/>';
        }
        document.getElementById('quotes').innerHTML = `list: <br/> ${quotes}`;
    })
    .catch(function(err) {
        console.log(err);
    });
});