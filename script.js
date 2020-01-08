const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');

quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span');
  const arrayValue = quoteInputElement.value.split('');
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct');
      characterSpan.classList.remove('incorrect');
    } else {
      characterSpan.classList.remove('correct');
      characterSpan.classList.add('incorrect');
    }
  });
});

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content);
}

async function renderNextQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = '';
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span');
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null;
}

renderNextQuote();
