console.log('hello world');

class Card {
	constructor(suit, value, id) {
		this.suit = suit
		this.value = value
		this.id = id
	}
}


class Player {
	constructor(hand, deck) {
		this.hand = hand
		this.deck = deck
	}

	draw() {

	}
}



const game = {
	deck: [],
	playerOneDeck: [],
	playerTwoDeck: [],
	leftPile: [],
	rightPile: [],
	generateDeck() {
		// creates 52 cards, seperated into 4 suits of 13  
		for (let i = 1; i <= 52; i++) {
			
			let suit
			let value
			let id

			if (i <= 13) {
				suit = 'club' // assigns suit
				value = i // assigns value
				id = i 
			} else if (i > 13 && i <= 26) {
				suit = 'spade'
				value = i - 13 // restarts from 1 for new suit
				id = i 
			} else if (i > 26 && i <= 39) {
				suit = 'heart'
				value = i - 26
				id = i 
			} else if (i > 39 && i <= 52) {
				suit = 'diamond'
				value = i - 39
				id = i 
			} 

			// instantiate 
			const card = new Card(suit, value, id)
			this.deck.push(card)
		}

	},
	shuffle() {
		let m = this.deck.length
		let t
		let i 
		while (m) {
			i = Math.floor(Math.random() * m--)
			t = this.deck[m]
			this.deck[m] = this.deck[i]
			this.deck[i] = t
		}
		return this.deck
	},
	dealDeck() {
		// rearranges the deck array into the gameplay setup by pushing cards into deck/pile/hand arrays
		// this.shuffle()
		this.deck.forEach((card, i) => {
			if (i < 6) {
				this.leftPile.push(card)
			} else if (i >= 6 && i < 12) {
				this.rightPile.push(card)
			} else if (i >= 12 && i < 32) {
				this.playerOneDeck.push(card)
			} else if (i >= 32 && i <= 52) {
				this.playerTwoDeck.push(card)
			}
		})
		console.log(this.leftPile);
		console.log(this.rightPile);
		console.log(this.playerOneDeck);
		console.log(this.playerTwoDeck);
	},
	startGame() {
		this.deck.forEach((card, i) => {
			// console.log(i + 1);
			console.log(card['id']);
			if (card['id'] == i + 1) {
				$('.game-screen').append(`<img src="card_images/cards_by_id/${card['id']}.png">`)

			}
		})		
	}
}

$('#start').click(() => {
	$('.menu-screen').replaceWith('<div class="game-screen"></div>')
	game.startGame()
})

// $('#start').click(() => {
// 	$('body').append('<div class="game-screen"></div>')
// 	game.startGame()
// })

game.generateDeck()
game.dealDeck()
console.log(game.deck);








