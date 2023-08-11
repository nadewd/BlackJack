/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const playerScoreMsg = document.getElementById('player-score');
const dealerScoreMsg = document.getElementById('dealer-score');
const playerContEl = document.getElementById('player-container');
const dealerContEl = document.getElementById('dealer-container');
const hitEl = document.getElementById('hit');
const stayEl = document.getElementById('stay');

// Build an 'original' deck of 'card' objects used to create shuffled decks
const originalDeck = buildOriginalDeck();

/*----- app's state (variables) -----*/
let shuffledDeck;
let playerScoreCount;
let dealerScoreCount;
let playerAceCount = 0;
let dealerAceCount = 0;
let whoWon;

/*----- cached element references -----*/

/*----- event listeners -----*/
document.getElementById('hit').addEventListener('click', playerHit);
document.getElementById('stay').addEventListener('click', dealerFlip);



/*----- functions -----*/
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
};

renderNewShuffledDeck();
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

const dealerFirstDiv = dealerContEl.appendChild(document.createElement("div"));
const dealerFirstCard = shuffledDeck.pop();
dealerFirstDiv.setAttribute('class', 'card back-red');

const dealerSecondDiv = dealerContEl.appendChild(document.createElement("div"));
const dealerSecondCard = shuffledDeck.pop()
dealerSecondDiv.setAttribute('class', `card ${dealerSecondCard.face}`);

if (dealerFirstCard.value === 11) {
  dealerAceCount += 1;
} 
if (dealerSecondCard.value === 11) {
  dealerAceCount += 1;
}; 
if (dealerAceCount > 1) {
  dealerSecondCard.value = 1;
};


function dealPlayerCards() {

  const playerFirstDiv = playerContEl.appendChild(document.createElement("div"));
  const playerFirstCard = shuffledDeck.pop();
  playerFirstDiv.setAttribute('class', `card ${playerFirstCard.face}`);

  const playerSecondDiv = playerContEl.appendChild(document.createElement("div"));
  const playerSecondCard = shuffledDeck.pop();
  playerSecondDiv.setAttribute('class', `card ${playerSecondCard.face}`);

  if (playerFirstCard.value === 11) {
    playerAceCount += 1;
  }; 
  if (playerSecondCard.value === 11) {
    playerAceCount += 1;
  } if (playerAceCount > 1) {
    playerSecondCard.value = 1;
  };

  playerScoreCount = playerFirstCard.value + playerSecondCard.value;
  
  playerScoreMsg.innerHTML = playerScoreCount;
}

dealPlayerCards();

function playerHit() {
 const playerNewDiv = playerContEl.appendChild(document.createElement("div"));
 const playerNewCard = shuffledDeck.pop();
 playerNewDiv.setAttribute('class', `card ${playerNewCard.face}`);

 if (playerNewCard.value === 11) {
  playerAceCount += 1;
 }; 
 if (playerNewCard.value === 11 && playerAceCount > 1) {
  playerNewCard.value = 1;
 };

 playerScoreCount += playerNewCard.value;
 playerScoreMsg.innerHTML = playerScoreCount;
 getWinner();
}

function dealerFlip() {
  dealerFirstDiv.setAttribute('class', `card ${dealerFirstCard.face}`);

  if (dealerFirstCard.value === 11) {
    dealerAceCount += 1;
  }; 
  if (dealerSecondCard.value === 11) {
    dealerAceCount += 1;
  } if (dealerAceCount > 1) {
    dealerSecondCard.value = 1;
  };

  dealerScoreCount = dealerFirstCard.value + dealerSecondCard.value;
  dealerScoreMsg.innerHTML = dealerScoreCount;

  getWinner();
  dealerHit();
};

function dealerHit() {
  while (dealerScoreCount < playerScoreCount && dealerScoreCount < 21) {
    const dealerNewDiv = dealerContEl.appendChild(document.createElement("div"));
    const dealerNewCard = shuffledDeck.pop();
    dealerNewDiv.setAttribute('class', `card ${dealerNewCard.face}`);

    if (dealerNewCard.value === 11) {
      dealerAceCount += 1;
     }; 
     if (dealerNewCard.value === 11 && dealerAceCount > 1) {
      dealerNewCard.value = 1;
     };
 
    dealerScoreCount += dealerNewCard.value;
    dealerScoreMsg.innerHTML = dealerScoreCount;

    getWinner();
  };
};

function getWinner() {
  if (playerScoreCount > 21) {
    whoWon = -1;
  } else if (playerScoreCount === dealerScoreCount) {
    whoWon = 0;
  } else if (dealerScoreCount > 21) {
    whoWon = 1;
  } else if (dealerScoreCount > playerScoreCount && dealerScoreCount <= 21) {
    whoWon = -1;
  } else if (dealerScoreCount > 21) {
    whoWon = 1;
  };
  printResult();
};

function printResult() {
  if (whoWon === -1) {
    const dealerWinsMsg = document.querySelector('body').appendChild(document.createElement("h2"));
    dealerWinsMsg.innerText = 'Dealer wins!';
    playAgain();
  } else if (whoWon === 1) {
    const playerWinsMsg = document.querySelector('body').appendChild(document.createElement("h2"));
    playerWinsMsg.innerText = 'You win!';
    playAgain();
  } else if (whoWon === 0) {
    const pushMsg = document.querySelector('body').appendChild(document.createElement("h2"));
    pushMsg.innerText = "It's a push (tie)!";
    playAgain();
  };
};

function playAgain () {
  hitEl.remove();
  stayEl.remove();
  
  const playAgainBttn = document.createElement("button")
  document.querySelector('body').appendChild(playAgainBttn)
  playAgainBttn.innerText = 'PLAY AGAIN';
  playAgainBttn.addEventListener('click', pageReload);
};

function pageReload() {
  window.location.reload()
};