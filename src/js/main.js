/**
 * Source:
 * https://www.ostoncodecypher.com/details?id=158&title=display_random_advice_on_your__website_or__web_app_using_advice_slip_json_api
 */

// Get elements from DOM for Advice data
const adviceQuote = document.querySelector('blockquote');
const adviceNumber = document.querySelector('.advice-number');
const adviceButton = document.querySelector('.advice-button');

// Choose random number for advice number
function randomAdviceNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Retrieve data from API
function getAdviceData() {
    fetch('https://api.adviceslip.com/advice').then(response => {
        return response.json();
    }).then(adviceData => {
        const adviceObj = adviceData.slip;
        adviceQuote.classList.remove('transition');
        adviceQuote.innerHTML = `"${adviceObj.advice}"`;
        adviceNumber.classList.remove('number-transition');
        // Remove focus from button after data is retrieved
        adviceButton.blur();
        adviceNumber.innerHTML = 'Advice #' + randomAdviceNumber(1, 1000);
    }).catch(error => {
        console.log(error);
    });
}

adviceButton.addEventListener('click', () => {
    adviceQuote.classList.add('transition');
    adviceNumber.classList.add('number-transition');
    setTimeout(() => {
        getAdviceData();
    }, 800);

});

// Add transition when page loads whilst API data is being retrieved
document.onreadystatechange = () => {
    adviceQuote.classList.add('transition');
    adviceNumber.classList.add('number-transition');
    getAdviceData();
};