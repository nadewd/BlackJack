/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Build an 'original' deck of 'card' objects used to create shuffled decks
const originalDeck = buildOriginalDeck();

/*----- app's state (variables) -----*/
let shuffledDeck;
let playersScoreCount;
let dealersScoreCount;

/*----- cached element references -----*/

/*----- event listeners -----*/
/* document.getElementById('hit').addEventListener('click', playerHit);

/*----- functions -----*/
function getNewShuffledDeck() {
  // Create a copy of the originalDeck (leave originalDeck untouched!)
  const tempDeck = [...originalDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}

function renderNewShuffledDeck() {
  // Create a copy of the originalDeck (leave originalDeck untouched!)
  shuffledDeck = getNewShuffledDeck();
}

function renderDeckInContainer(deck, container) {
  container.innerHTML = '';
  // Let's build the cards as a string of HTML
  let cardsHtml = '';
  deck.forEach(function(card) {
    cardsHtml += `<div class="card ${card.face}"></div>`;
  });
  // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup 
  // const cardsHtml = deck.reduce(function(html, card) {
  //   return html + `<div class="card ${card.face}"></div>`;
  // }, '');
  container.innerHTML = cardsHtml;
}

function buildOriginalDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}

renderNewShuffledDeck();


function dealCards() {
  const dealersFirstDiv = document.getElementById('dealers-cards').appendChild(document.createElement("div"));
  const dealersFirstCard = shuffledDeck.pop()
  dealersFirstDiv.setAttribute('class', 'card back-red');
  
  const dealersSecondDiv = document.getElementById('dealers-cards').appendChild(document.createElement("div"));
  const dealersSecondCard = shuffledDeck.pop()
  dealersSecondDiv.setAttribute('class', `card ${dealersSecondCard.face}`);

  const playersFirstDiv = document.getElementById('players-cards').appendChild(document.createElement("div"));
  const playersFirstCard = shuffledDeck.pop()
  playersFirstDiv.setAttribute('class', `card ${playersFirstCard.face}`);

  const playersSecondDiv = document.getElementById('players-cards').appendChild(document.createElement("div"));
  const playersSecondCard = shuffledDeck.pop()
  playersSecondDiv.setAttribute('class', `card ${playersSecondCard.face}`);

  playersScoreCount = playersFirstCard.value + playersSecondCard.value;
  dealersScoreCount = dealersSecondCard.value;

}

dealCards();
