const countries = [
    { name: 'United States', code: 'US' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'Italy', code: 'IT' },
    { name: 'Japan', code: 'JP' },
    { name: 'Canada', code: 'CA' },
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'India', code: 'IN' },
    { name: 'China', code: 'CN' },
    { name: 'Spain', code: 'ES' },
    { name: 'Mexico', code: 'MX' },
    { name: 'South Korea', code: 'KR' },
    { name: 'Russia', code: 'RU' }
];

let currentCountry;
let score = 0;

function getRandomCountries(count) {
    const shuffled = [...countries].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displayFlag(country) {
    const flagImage = document.getElementById('flag-image');
    flagImage.src = `https://flagcdn.com/w320/${country.code.toLowerCase()}.png`;
    currentCountry = country;
}

function createOptions(correctCountry) {
    const options = getRandomCountries(3);
    if (!options.includes(correctCountry)) {
        options[Math.floor(Math.random() * 3)] = correctCountry;
    }
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    options.sort(() => 0.5 - Math.random()).forEach(country => {
        const button = document.createElement('button');
        button.textContent = country.name;
        button.className = 'option-button';
        button.addEventListener('click', () => checkAnswer(country));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedCountry) {
    const buttons = document.querySelectorAll('.option-button');
    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === currentCountry.name) {
            button.classList.add('correct');
        }
        if (button.textContent === selectedCountry.name && selectedCountry !== currentCountry) {
            button.classList.add('incorrect');
        }
    });

    if (selectedCountry === currentCountry) {
        score++;
        document.getElementById('score').textContent = score;
    }
}

function nextRound() {
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    displayFlag(randomCountry);
    createOptions(randomCountry);
}

document.getElementById('next-btn').addEventListener('click', () => {
    nextRound();
});

// Start the game
nextRound();
