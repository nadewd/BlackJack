/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Build an 'original' deck of 'card' objects used to create shuffled decks
const originalDeck = buildOriginalDeck();

/*----- app's state (variables) -----*/
let shuffledDeck;
let playerScoreCount;
let dealerScoreCount;
let hitCounter;
const playerScoreMsg = document.getElementById('player-score');
const dealerScoreMsg = document.getElementById('dealer-score');

/*----- cached element references -----*/

/*----- event listeners -----*/
document.getElementById('hit').addEventListener('click', playerHit);
document.getElementById('stay').addEventListener('click', playerStay);

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

const dealerFirstDiv = document.getElementById('dealer-cards').appendChild(document.createElement("div"));
const dealerFirstCard = shuffledDeck.pop();
dealerFirstDiv.setAttribute('class', 'card back-red');

const dealerSecondDiv = document.getElementById('dealer-cards').appendChild(document.createElement("div"));
const dealerSecondCard = shuffledDeck.pop()
dealerSecondDiv.setAttribute('class', `card ${dealerSecondCard.face}`);


function dealPlayerCards() {

  const playerFirstDiv = document.getElementById('player-cards').appendChild(document.createElement("div"));
  const playerFirstCard = shuffledDeck.pop()
  playerFirstDiv.setAttribute('class', `card ${playerFirstCard.face}`);

  const playerSecondDiv = document.getElementById('player-cards').appendChild(document.createElement("div"));
  const playerSecondCard = shuffledDeck.pop()
  playerSecondDiv.setAttribute('class', `card ${playerSecondCard.face}`);

  playerScoreCount = playerFirstCard.value + playerSecondCard.value;
  dealerScoreCount = dealerSecondCard.value;

  
  playerScoreMsg.innerHTML = playerScoreCount;

}

dealPlayerCards();


function playerHit() {
 const playerNewDiv = document.getElementById('player-cards').appendChild(document.createElement("div"));
 const playerNewCard = shuffledDeck.pop();
 playerNewDiv.setAttribute('class', `card ${playerNewCard.face}`);

 playerScoreCount += playerNewCard.value;
 playerScoreMsg.innerHTML = playerScoreCount;
}

function playerStay() {
  dealerFirstDiv.setAttribute('class', `card ${dealerFirstCard.face}`);

  dealerScoreCount += dealerFirstCard.value;
  dealerScoreMsg.innerHTML = dealerScoreCount;

  if (dealerScoreCount === 21) {
    window.alert('Dealer Wins')
  } else if (dealerScoreCount > playerScoreCount && dealerScoreCount <= 21) {
    window.alert('Dealer Wins')
  } else {
    setTimeout(dealerHit, 3000);
  }
}

function dealerHit() {
 const dealerNewDiv = document.getElementById('dealer-cards').appendChild(document.createElement("div"));
 const dealerNewCard = shuffledDeck.pop();
 dealerNewDiv.setAttribute('class', `card ${dealerNewCard.face}`);

 dealerScoreCount += dealerNewCard.value;
 dealerScoreMsg.innerHTML = dealerScoreCount;

}