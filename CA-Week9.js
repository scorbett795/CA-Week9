//Week 9 Project
//Card Game WAR!

//"Card" class with constructors "suit" "name" and "number"
class Card {
    constructor(suit, name, number){
        this.suit = suit;
        this.name = name;
        this.number = number;
    }
}

/* 
"Deck" class defining all suits, names, and numbers 
within a 52 cards deck using arrays 
*/
class Deck {
    constructor() {
        this.cards = [];
        this.suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
        this.names = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
        this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    }   

//"buildingDeck" method of "deck" class
    buildingDeck() {
        console.log('Preparing for War...');

/* 
Adding each card combination to the "cards" array, 
listing its suit, name, and number
*/        for (let i = 0; i < this.suits.length; i++) {
            for (let n = 0; n < this.names.length; n++) {
                this.cards.push(new Card(this.suits[i], this.names[n], this.numbers[n]));
            }
        }
    }

//"shuffle" method of "deck" class
   shuffle() {
        console.log('Begin!')
        let shuffled = [];
        for (let i = 0; i < 52; i++) {
            
//Shuffling all 52 elements, (cards), from the "cards" array   
            let cardPlacement = Math.floor((this.cards.length - 1) * Math.random());
            
/*
Merging a new array "shuffled" into the original "cards" array
using spread
*/          let cardShuffled = this.cards.splice(cardPlacement, 1);
            shuffled.push(...cardShuffled)
        }
        return shuffled;
    }

/*
"deal" method of "deck" class with parameters 
"players" and "shuffledDeck"
*/  deal(players, shuffledDeck) {

/*
Using splice to split "shuffled" array into two new arrays, 
"player1Hand" and "player2Hand"

Dividing the 52 elements (cards) of array "shuffled"
to new arrays "player1Hand" and  and "player2Hand"

Merging the shuffled cards within arrays "player1Hand" and
"player2Hand" into the "hands" array from the "Player" class
using spread
*/      let player1Hand = shuffledDeck.splice(0, 26);
        players[0].hands.push(...player1Hand);
        let player2Hand = shuffledDeck.splice(0, 26);
        players[1].hands.push(...player2Hand);
    }
}

//"Player" class with constructor "name"
class Player {
    constructor (name) {
    
/*
Each player will have a "name", "score", and a "hand" using
the "hands" array
*/      this.name = name;
        this.score = 0;
        this.hands = [];
    }
}

//"Game" class with the array "players"
class Game {
    constructor() {
        this.players = [];
    }

//"start" method of "Game" class
    start() {

//Making players
        this.players.push(new Player('Spencer'));
        this.players.push(new Player('Tom'));
        console.log('This means War!', '\nSpencer VS Tom');

        let gameDeck = new Deck();
        gameDeck.buildingDeck();

//Shuffle game deck
        let shuffled = gameDeck.shuffle();

//Dealing cards
        gameDeck.deal(this.players, shuffled);

 //Starting the game
        this.playGame();

//Ending the game with winner
        this.endGame();
    }

//"playGame" method of "Game" class, actual rules and gameplay 
    playGame() {
   
/*
Defining elements of "players" array (Spencer and Tom) 
as "player1" and "player2
*/      let player1 = this.players[0];
        let player2 = this.players[1];

/*
Defining who wins each matchup, Keeping track of what turn
it is as well as how many turns are left    
*/      let matchGoesTo = '';
        let turn = 0;
        let turnsRemaining = 26; 

/*
While each player has more than 0 cards in their hand,
the game will continue
*/          while (player1.hands.length !== 0 && player2.hands.length !== 0) {
            let player1Card = player1.hands.pop();
            let player2Card = player2.hands.pop();
            
/*
If playe1 card is greater than player2 card, the match
goes to player1 (Spencer) and their score increases by 1
*/          if (player1Card.number > player2Card.number) {
                matchGoesTo = player1.name;
                player1.score += 1;
                console.log('Turn: ', (turn += 1), '\n', '\nSpencer plays: ', player1Card.name, ' of ', player1Card.suit, '\nTom plays: ', player2Card.name, ' of ', player2Card.suit, '\n', '\nMatch goes to: ', matchGoesTo, '\n', '\nScore:', '\nSpencer: ', player1.score, '\nTom: ', player2.score, '\n ', '\nTurns Remaining: ', (turnsRemaining -= 1));
            
            /*
If player1 card is less than player2 card, the match
goes to player2 (Tom) and their score increases by 1
*/          } else if (player1Card.number < player2Card.number) {
                matchGoesTo = player2.name;
                player2.score += 1;
                console.log('Turn: ', (turn += 1), '\n', '\nSpencer plays: ', player1Card.name, ' of ', player1Card.suit, '\nTom plays: ', player2Card.name, ' of ', player2Card.suit, '\n', '\nMatch goes to: ', matchGoesTo, '\n', '\nScore:', '\nSpencer: ', player1.score, '\nTom: ', player2.score, '\n ', '\nTurns Remaining: ', (turnsRemaining -= 1));
            
/*
If player1 and player2 cards are equal, neither player scores
and the game continues to the next turn
*/        } else {
                console.log('Turn: ', (turn += 1), '\n', '\nSpencer plays: ', player1Card.name, ' of ', player1Card.suit, '\nTom plays: ', player2Card.name, ' of ', player2Card.suit, '\n', '\nDraw! ', '\n', '\nScore:', '\nSpencer: ', player1.score, '\nTom: ', player2.score, '\n ', '\nTurns Remaining: ', (turnsRemaining -= 1));
            }
        }
    }

/*
"endGame" method of "Game" class
*/  endGame() {

//Defining "winner" as well as "player1" and "player2" again
        let winner = '';
        let player1 = this.players[0];
        let player2 = this.players[1];

//Will display final score of winner after the game
        let winningScore = 0;

/*
If player1 score is greater than player2 score, the winner
player1 and the final score will be displayed
*/      if (player1.score > player2.score) {
            winner = player1.name;
            winningScore = player1.score;
            alert('And the winner is... ' + winner + ' with a final score of: \n' + player1.name + ': ' + player1.score + '\n' +player2.name + ': ' + player2.score);
        
/*
If player1 score is less than player2 score, the winner
player2 and the final score will be displayed
*/        } else if (player1.score < player2.score) {
            winner = player2.name;
            winningScore = player2.score;
            alert('And the winner is... ' + winner + ' with a final score of: \n' + player1.name + ': ' + player1.score + '\n' +player2.name + ': ' + player2.score);
        
/*
If player1 score is equal to player2 score, "No Contest" and
the players final scores will be displayed
*/        } else {
            alert('No Contest \n' + '\n' + 'Final Score: \n' + player1.name + ': ' + player1.score + '\n' +player2.name + ': ' + player2.score);
        }
    }
}

//Starts the game
let game = new Game();
game.start();