console.log('hello world');

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
	timer: 90,
	timerOn: false,
	timerId: 0,
	cardsPlayed: 0,
	playerOneDeck: [],
	playerTwoDeck: [],
	playerOneCardsInHand: [
		'none',
		'none',
		'none',
		'none',
		'none',
		],
	playerOneCard: [],
	leftPile: [],
	leftPileDiscard: [],
	rightPile: [],
	rightPileDiscard: [],
	handOneIndex: 0,
	startTimer() {
		let timerId = setInterval(() =>{
			this.printTimer()
			this.timer--
		}, 1000)
		this.timerId = timerId
	},
	startTimer2() {
		setInterval(() =>{
			this.checkWin()
			this.changeCardCount()
		}, 100)
	},
	changeCardCount() {
		$('#card-count').text(this.playerOneDeck.length)
	},
	printTimer() {
			$('#new-time').text(this.timer)		
	},
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
		$('#deal-message').fadeOut()
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
		$('.game-screen').append('<div class="outline c highlight"></div>')
		$('.game-screen').append('<div class="outline d"></div>')
		$('.game-screen').append('<div class="outline e"></div>')
		$('.game-screen').append('<div class="outline f pOne highlight"></div>')
		$('.game-screen').append('<div class="outline g pOne"></div>')
		$('.game-screen').append('<div class="outline h pOne"></div>')
		$('.game-screen').append('<div class="outline i pOne"></div>')
		$('.game-screen').append('<div class="outline j pOne"></div>')
		$('.game-screen').append('<div class="outline k"></div>')
		$('.game-screen').append(`<h2 id="timer"><span id="new-time"></span></h2>`)
		
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
		$('.game-screen').append('<button class="timer">Start Timer</button>')
		$('.game-screen').append('<h3 id="instructions">Press F to draw <br><br>Press D to choose card<br><br>Press S to choose pile<br><br>Press A to put card on pile</h3>')
		$('.game-screen').append('<h3 id="begin">Press start timer to begin</h4>')
		$('.game-screen').append('<h4 id="card-count"></h4>')
		$('.a').hide()

	},
	displayInstructions() {
		$('.inst').fadeIn()
	},
	hideInstructions() {
		$('.inst').fadeOut()
	},
	selectGameMode(choice) {
		if ($(choice).hasClass('game-mode')) {
			$('.game-mode').removeClass('select')
			$(choice).addClass('select')
		}
	},
	startGame() {
		this.deck.forEach((card, i) => {
			console.log(card['id']);
			if (card['id'] == i + 1) {
				$('.game-screen').append(`<img src="card_images/cards_by_id/${card['id']}.png">`)

			}
		})		
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
		if (this.leftPile.length > 0 && this.timerOn == true) {
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
				$('#card-count').hide()
				$('.game-screen').append('<div class="outline k"></div>')
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
	selectPile() {
		if ($('.c').hasClass('highlight')) {
			$('.c').removeClass('highlight')
			$('.d').addClass('highlight')
		} else if ($('.d').hasClass('highlight')) {
			$('.d').removeClass('highlight')
			$('.c').addClass('highlight')
		}
	},
	whichCard() {
		const thisCard = this.playerOneCardsInHand[this.handOneIndex]
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
	checkWin() {
		let cardsPlayed = 0
		this.deck.forEach((card) => {
			if (card.played == true) {
					cardsPlayed++
					console.log(cardsPlayed);
			}
			this.cardsPlayed = cardsPlayed
		})
		if (cardsPlayed == 20) {
			$('.game-screen').append('<h3 class="end">You Win!</h3>')
			clearInterval(this.timerId)	
		} else if (this.timer == 0) {
			clearInterval(this.timerId)
			$('.game-screen').append('<h3 class="end">You Lose!</h3>')
		}
	},
	stopTimer() {
		clearInterval(this.timerId)
	},
	chooseTwoPlayer() {
		$('#start').html($('<a href="index2.html">Start Game</a>'))
	},
	chooseOnePlayer() {
		$('#start').text('Start Game')
	},
	checkKey(key) {
		if (this.cardsPlayed < 20 && this.timer != 0) {
			if (key == 'f') {
				this.drawCards()
			} else if (key == 'd') {
				this.selectCard()
			} else if (key == 's') {
				this.selectPile()
			} else if (key == 'a') {
				this.checkIfCardPlays()
			}
		} else {
			$('.shuffle').hide()
			$('.flip').hide()
			$('#new-time').text('0')
		}
	},
	// restart() {
	// 	$('.end').remove()
	// 	$('.game-screen').remove()
	// 	$('body').append($('<div class="game-screen">g</div>'))

	// }
}

$('#start').click(() => {
	if ($('.one').hasClass('select')) {
		$('.game-screen').addClass('on')
		$('.menu-screen').replaceWith($('.game-screen'))
		game.generateDeck()
		game.createGameBoard()
	} else if ($('.two').hasClass('select')) {
		game.chooseTwoPlayer()
	}
})

$('.two').click(() => {
	game.chooseTwoPlayer()
})

$('.one').click(() => {
	game.chooseOnePlayer()
})


$('.menu-screen').click((e) => {
	console.log(e.target);
	game.selectGameMode(e.target)
})

$('#instruction-text').click(() => {
	game.displayInstructions()
})

$('.inst').click(() => {
	game.hideInstructions()
})

$('.game-screen').click((e)=> {
	console.log(e.target);
	const $e = $(e.target)
	if ($e.attr('id') == 'main-card-back') {
		game.startTimer2()
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
	if ($e.attr('class') == 'timer') {
		game.startTimer()
		$('#begin').fadeOut()
		$('.timer').hide()
		// $('#timer').hide()
		game.timerOn = true
	}
})

$('body').keypress((e)=>{
	game.checkKey(e.key)
})

$('.game-screen').click((e)=>{
	const $e = $(e.target)
	if ($e.hasClass('restart') == true) {
		game.restart()
	}
})








