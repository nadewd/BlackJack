/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Build an 'original' deck of 'card' objects used to create shuffled decks
const originalDeck = buildOriginalDeck();

/*----- app's state (variables) -----*/
let shuffledDeck;
let playerScoreCount;
let dealerScoreCount;
let playerAceCount = 0;
let dealerAceCount = 0;
const playerScoreMsg = document.getElementById('player-score');
const dealerScoreMsg = document.getElementById('dealer-score');

/*----- cached element references -----*/

/*----- event listeners -----*/
document.getElementById('hit').addEventListener('click', playerHit);
document.getElementById('stay').addEventListener('click', dealerFlip);

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

if (dealerFirstCard.value === 11) {
  dealerAceCount += 1;
} 
if (dealerSecondCard.value === 11) {
  dealerAceCount += 1;
} 
if (dealerAceCount > 1) {
  dealerSecondCard.value = 1;
}


function dealPlayerCards() {

  const playerFirstDiv = document.getElementById('player-cards').appendChild(document.createElement("div"));
  const playerFirstCard = shuffledDeck.pop();
  playerFirstDiv.setAttribute('class', `card ${playerFirstCard.face}`);

  const playerSecondDiv = document.getElementById('player-cards').appendChild(document.createElement("div"));
  const playerSecondCard = shuffledDeck.pop();
  playerSecondDiv.setAttribute('class', `card ${playerSecondCard.face}`);

  if (playerFirstCard.value === 11) {
    playerAceCount += 1;
  } 
  if (playerSecondCard.value === 11) {
    playerAceCount += 1;
  } if (playerAceCount > 1) {
    playerSecondCard.value = 1;
  }

  playerScoreCount = playerFirstCard.value + playerSecondCard.value;
  
  playerScoreMsg.innerHTML = playerScoreCount;
}

dealPlayerCards();


function playerHit() {
 const playerNewDiv = document.getElementById('player-cards').appendChild(document.createElement("div"));
 const playerNewCard = shuffledDeck.pop();
 playerNewDiv.setAttribute('class', `card ${playerNewCard.face}`);

 if (playerNewCard.value === 11) {
  playerAceCount += 1;
 } 
 if (playerNewCard.value === 11 && playerAceCount > 1) {
  playerNewCard.value = 1;
 }

 playerScoreCount += playerNewCard.value;
 playerScoreMsg.innerHTML = playerScoreCount;
 getWinner();
}

function dealerFlip() {
  dealerFirstDiv.setAttribute('class', `card ${dealerFirstCard.face}`);

  if (dealerFirstCard.value === 11) {
    dealerAceCount += 1;
  } 
  if (dealerSecondCard.value === 11) {
    dealerAceCount += 1;
  } if (dealerAceCount > 1) {
    dealerSecondCard.value = 1;
  }

  dealerScoreCount = dealerFirstCard.value + dealerSecondCard.value;
  dealerScoreMsg.innerHTML = dealerScoreCount;

  getWinner();
  dealerHit();
}

function dealerHit() {
  while (dealerScoreCount < playerScoreCount && dealerScoreCount < 21) {
    const dealerNewDiv = document.getElementById('dealer-cards').appendChild(document.createElement("div"));
    const dealerNewCard = shuffledDeck.pop();
    dealerNewDiv.setAttribute('class', `card ${dealerNewCard.face}`);

    if (dealerNewCard.value === 11) {
      dealerAceCount += 1;
     } 
     if (dealerNewCard.value === 11 && dealerAceCount > 1) {
      dealerNewCard.value = 1;
     }
 
    dealerScoreCount += dealerNewCard.value;
    dealerScoreMsg.innerHTML = dealerScoreCount;
    getWinner();
  }
}

function getWinner() {
  if (playerScoreCount === 21) {
    playerScoreMsg.innerHTML = playerScoreCount;
    window.alert('You win');
    return;
  } else if (playerScoreCount > 21) {
    playerScoreMsg.innerHTML = playerScoreCount;
    window.alert('Dealer Wins');
    return;
  }
  else if (dealerScoreCount === 21) {
    playerScoreMsg.innerHTML = playerScoreCount;
    window.alert('Dealer Wins');
    return;
  } else if (dealerScoreCount > playerScoreCount && dealerScoreCount <= 21) {
    window.alert('Dealer Wins');
    return;
  } else if (dealerScoreCount > 21) {
    window.alert('You Win');
  } else {
    return false;
  }
}