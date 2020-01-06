console.log('hello world2');

class Card {
	constructor(suit, value, id, imgSrc, played) {
		this.suit = suit
		this.value = value
		this.id = id
		this.played = false
		this.imgSrc = imgSrc
	}

	createCards() {
		return $(`<img id="card-${this.id}"class="card value-${this.value}" src="card_images/cards_by_id/${this.id}.png">`).text(this.value)
	}
}


const game = {
	deck: [],
	playerOneDeck: [],
	playerTwoDeck: [],
	playerOneCardsInHand: [
		'none',
		'none',
		'none',
		'none',
		'none',
		],
	playerTwoCardsInHand: [
		'none',
		'none',
		'none',
		'none',
		'none',
		],
	playerOneCard: [],
	playerTwoCard: [],
	leftPile: [],
	leftPileDiscard: [],
	rightPile: [],
	rightPileDiscard: [],
	handOneIndex: 0,
	handTwoIndex: 0,

	generateDeck() {
		// creates 52 cards, seperated into 4 suits of 13  
		for (let i = 1; i <= 52; i++) {
			
			let suit
			let value
			let id
			let imgSrc = `card_images/cards_by_id/${i}.png`

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
			const card = new Card(suit, value, id, imgSrc)
			this.deck.push(card)
		}
	},
	shuffle(deck) {
		//randomizes order cards in deck 
		let m = deck.length
		let t
		let i 
		while (m) {
			i = Math.floor(Math.random() * m--)
			t = deck[m]
			deck[m] = deck[i]
			deck[i] = t
		}
		return deck
	},
	dealDeck() {
		// rearranges the deck array into the gameplay setup by pushing cards into deck/pile/hand arrays
		$('#deal-message').hide()
		this.shuffle(this.deck)
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

		$('.game-screen').append('<div class="outline b"></div>')
		$('.game-screen').append('<div class="outline c2"></div>')
		$('.game-screen').append('<div class="outline d2 highlight2"></div>')
		$('.game-screen').append('<div class="outline c highlight"></div>')
		$('.game-screen').append('<div class="outline d"></div>')
		$('.game-screen').append('<div class="outline e"></div>')
		$('.game-screen').append('<div class="outline f pOne highlight"></div>')
		$('.game-screen').append('<div class="outline g pOne"></div>')
		$('.game-screen').append('<div class="outline h pOne"></div>')
		$('.game-screen').append('<div class="outline i pOne"></div>')
		$('.game-screen').append('<div class="outline j pOne"></div>')
		$('.game-screen').append('<div class="outline k"></div>')
		$('.game-screen').append('<div class="outline l pTwo highlight2"></div>')
		$('.game-screen').append('<div class="outline m pTwo"></div>')
		$('.game-screen').append('<div class="outline n pTwo"></div>')
		$('.game-screen').append('<div class="outline o pTwo"></div>')
		$('.game-screen').append('<div class="outline p pTwo"></div>')
		
		
		this.leftPile.forEach((card) => {
			$('.e').append(card.createCards())
		})
		$('.e').append($('<img class="card-53" "id="left-card-back" src="card_images/cards_by_id/53.png">').css({'position': 'absolute'}))
		
		this.rightPile.forEach((card) => {
			$('.b').append(card.createCards())
		})
		$('.b').append($('<img class="card-53" "id="right-card-back" src="card_images/cards_by_id/53.png">').css({'position': 'absolute'}))
		
		this.playerOneDeck.forEach((card) => {
			$('.k').append(card.createCards())
		})
		$('.k').append($('<img class="card-53" id="player1-card-back" src="card_images/cards_by_id/53.png">').css({'position': 'absolute'}))
		$('.game-screen').append('<button class="flip">Flip</button>')
		$('.game-screen').append('<button class="shuffle">Shuffle</button>')
		$('.game-screen').append('<h3 class="p1-instructions">Press <span>F</span> to draw <br><br>Press D to choose card<br><br>Press S to choose pile<br><br>Press A to put card on pile</h3>')
		$('.game-screen').append('<h3 class="p2-instructions">Press K to draw <br><br>Press L to choose card<br><br>Press : to choose pile<br><br>Press \' to put card on pile</h3>')

	},

	createGameBoard() {
		$('.game-screen').append('<div class="outline a"></div>')
		$('.game-screen').append('<h1 id="deal-message">Click on the deck <br> to deal the cards</h1>')
		this.deck.forEach((card) => {
			$('.a').append(card.createCards())
		})
		$('.a').append($('<img class="card-53" id="main-card-back" src="card_images/cards_by_id/53.png">').css({'position': 'absolute'}))
	},
	flipCard() {
		if (this.leftPile.length > 0) {
			const topCardLeft = this.leftPile.pop() // removes card from end of array
			this.leftPileDiscard.push(topCardLeft)
			$('.d').append(topCardLeft.createCards()) // and puts it on the board
			const topCardRight = this.rightPile.pop()
			this.rightPileDiscard.push(topCardRight)
			$('.c').append(topCardRight.createCards())
			if (this.leftPile.length == 0){
				$('.e').remove() // removes cards from deck when its empty
				$('body').append($('.game-screen').append('<div class="outline e"></div>'))	// puts back outline
				$('.b').remove()
				$('body').append($('.game-screen').append('<div class="outline b"></div>'))	
			}
		}
	},
	shufflePile() {
		this.shuffle(this.leftPileDiscard)
		this.shuffle(this.rightPile)
		if (this.leftPile.length == 0) {
			this.leftPileDiscard.forEach((card) => {
				this.leftPile.push(card)
				$('.e').append(card.createCards())
				$('.d').children('img')[0].remove()
			})
			this.rightPileDiscard.forEach((card) => {
				this.rightPile.push(card)
				$('.b').append(card.createCards())
				$('.c').children('img')[0].remove()
			})
			this.leftPileDiscard = []
			this.rightPileDiscard = []
			$('.e').append($('<img class="card-53" "id="left-card-back" src="card_images/cards_by_id/53.png">').css({'position': 'absolute'}))
			$('.b').append($('<img class="card-53" "id="right-card-back" src="card_images/cards_by_id/53.png">').css({'position': 'absolute'}))
		}
	},
	drawCards() {
		const $playerOneHand = $('.pOne')
		for (i = 0; i < $playerOneHand.length; i++) {
			if (this.playerOneCardsInHand[i] == 'none' && this.playerOneDeck.length > 0) {
				const cardDrawn = this.playerOneDeck.pop()
				$($playerOneHand[i]).append(cardDrawn.createCards())
				this.playerOneCardsInHand[i] = cardDrawn
				return 
			} else if (this.playerOneDeck.length == 0){
				$('.k').remove()
				$('.game-screen').append('<div class="outline k"></div>')
			}
		}
	},
	drawCards2() {
		const $playerTwoHand = $('.pTwo')
		for (i = 0; i < $playerTwoHand.length; i++) {
			if (this.playerTwoCardsInHand[i] == 'none' && this.playerTwoDeck.length > 0) {
				const cardDrawn = this.playerTwoDeck.pop()
				$($playerTwoHand[i]).append(cardDrawn.createCards())
				this.playerTwoCardsInHand[i] = cardDrawn
				return 
			} else if (this.playerTwoDeck.length == 0){
				$('.a').remove()
				$('.game-screen').append('<div class="outline a"></div>')
			}
		}
	},
	selectCard() {
		const $pOneHand = $('.pOne')
		this.handOneIndex = (this.handOneIndex + 1) % $pOneHand.length 
		$pOneHand.removeClass('highlight')
		$pOneHand.eq(this.handOneIndex).addClass('highlight')
		console.log($pOneHand.eq(this.handOneIndex).children('img').length)
	},
	selectCard2() {
		const $pTwoHand = $('.pTwo')
		this.handTwoIndex = (this.handTwoIndex + 1) % $pTwoHand.length 
		$pTwoHand.removeClass('highlight2')
		$pTwoHand.eq(this.handTwoIndex).addClass('highlight2')
		console.log($pTwoHand.eq(this.handTwoIndex).children('img').length)
	},
	selectPile() {
		if ($('.c').hasClass('highlight')) {
			$('.c').removeClass('highlight')
			$('.d').addClass('highlight')
		} else if ($('.d').hasClass('highlight')) {
			$('.d').removeClass('highlight')
			$('.c').addClass('highlight')
		}
	},
	selectPile2() {
		if ($('.c2').hasClass('highlight2')) {
			$('.c2').removeClass('highlight2')
			$('.d2').addClass('highlight2')
		} else if ($('.d2').hasClass('highlight2')) {
			$('.d2').removeClass('highlight2')
			$('.c2').addClass('highlight2')
		}
	},
	whichCard() {
		const thisCard = this.playerOneCardsInHand[this.handOneIndex]
		return thisCard
	},
	whichCard2() {
		const thisCard = this.playerTwoCardsInHand[this.handTwoIndex]
		return thisCard
	},
	whichPile() {
		if ($('.d').hasClass('highlight')) {
			const leftPile = this.leftPileDiscard[this.leftPileDiscard.length - 1]
			return leftPile.value
		} else if ($('.c').hasClass('highlight')) {
			const rightPile = this.rightPileDiscard[this.rightPileDiscard.length - 1]
			return rightPile.value
		}
	},
	whichPile2() {
		if ($('.d2').hasClass('highlight2')) {
			const leftPile = this.leftPileDiscard[this.leftPileDiscard.length - 1]
			return leftPile.value
		} else if ($('.c2').hasClass('highlight2')) {
			const rightPile = this.rightPileDiscard[this.rightPileDiscard.length - 1]
			return rightPile.value
		}
	},
	checkIfCardPlays() {
		if ((this.whichCard().value) == (this.whichPile() + 1) || (this.whichCard().value) == (this.whichPile() - 1) ||
			(this.whichCard().value == 1) && (this.whichPile() == 13) || (this.whichCard().value == 13) && (this.whichPile() == 1)) {
			if ($('.d').hasClass('highlight')) {
				this.playerOneCard.push(this.playerOneCardsInHand[this.handOneIndex])
				const card = this.playerOneCard.pop()
				$('.d').append(card.createCards())
				card.played = true
				this.leftPileDiscard.push(card)
				$('.pOne')[this.handOneIndex].children[0].remove()
				this.playerOneCardsInHand[this.handOneIndex] = 'none'
			} else if ($('.c').hasClass('highlight')) {
				this.playerOneCard.push(this.playerOneCardsInHand[this.handOneIndex])
				const card = this.playerOneCard.pop()
				$('.c').append(card.createCards())
				card.played = true
				this.rightPileDiscard.push(card)
				$('.pOne')[this.handOneIndex].children[0].remove()
				this.playerOneCardsInHand[this.handOneIndex] = 'none'
			}
		}
	},
	checkIfCardPlays2() {
		if ((this.whichCard2().value) == (this.whichPile2() + 1) || (this.whichCard2().value) == (this.whichPile2() - 1) ||
			(this.whichCard2().value == 1) && (this.whichPile2() == 13) || (this.whichCard2().value == 13) && (this.whichPile2() == 1)) {
			if ($('.d2').hasClass('highlight2')) {
				this.playerTwoCard.push(this.playerTwoCardsInHand[this.handTwoIndex])
				const card = this.playerTwoCard.pop()
				$('.d').append(card.createCards())
				card.played = true
				this.leftPileDiscard.push(card)
				$('.pTwo')[this.handTwoIndex].children[0].remove()
				this.playerTwoCardsInHand[this.handTwoIndex] = 'none'
			} else if ($('.c2').hasClass('highlight2')) {
				this.playerTwoCard.push(this.playerTwoCardsInHand[this.handTwoIndex])
				const card = this.playerTwoCard.pop()
				$('.c').append(card.createCards())
				card.played = true
				this.rightPileDiscard.push(card)
				$('.pTwo')[this.handTwoIndex].children[0].remove()
				this.playerTwoCardsInHand[this.handTwoIndex] = 'none'
			}
		}
	},
	startGame() {
		game.generateDeck()
		game.createGameBoard()	
		// this.deck.forEach((card, i) => {
		// 	console.log(card['id']);
		// 	if (card['id'] == i + 1) {
		// 		$('.game-screen').append(`<img src="card_images/cards_by_id/${card['id']}.png">`)
		// 	}
		// })	
	},
	checkWin() {
		let cardsPlayed = 0
		this.deck.forEach((card) => {
			if (card.played == true) {
					cardsPlayed++
					console.log(cardsPlayed);
			}
		})
		if (this.playerOneDeck.length == 0 && cardsPlayed == 20) {
			alert('you win')
			clearInterval(this.timerId)	
		} else if (this.timer == 0) {
			clearInterval(this.timerId)
			alert('you lose')
		}
	},
}



$('.game-screen').click((e)=> {
	console.log(e.target);
	const $e = $(e.target)
	if ($e.attr('id') == 'main-card-back') {
		game.dealDeck()
		$e.attr('id', 'clicked')
	} 
}) 

$('.game-screen').click((e)=>{
	const $e = $(e.target)
	if ($e.hasClass('flip') == true) {
		game.flipCard()
	}
})

$('.game-screen').click((e)=>{
	const $e = $(e.target)
	if ($e.hasClass('shuffle') == true) {
		game.shufflePile()
	}
})

$('.game-screen').click((e)=>{
	const $e = $(e.target)
	if ($e.attr('id') == 'player1-card-back') {
		game.drawCards()
	}
})



$('body').keypress((e)=>{
	if (e.key == 'f') {
		game.drawCards()
	}
})

$('body').keypress((e)=>{
	if (e.key == 'd') {
		game.selectCard()
	}
})

$('body').keypress((e)=>{
	if (e.key == 's') {
		game.selectPile()
	}
})

$('body').keypress((e)=>{
	if (e.key == 'a') {
		game.checkIfCardPlays()
	}
})

$('body').keypress((e)=>{
	if (e.key == 'k') {
		game.drawCards2()
	}
})

$('body').keypress((e)=>{
	if (e.key == 'l') {
		game.selectCard2()
	}
})

$('body').keypress((e)=>{
	if (e.key == ';') {
		game.selectPile2()
	}
})

$('body').keypress((e)=>{
	if (e.key == "'") {
		game.checkIfCardPlays2()
	}
})


game.startGame()

