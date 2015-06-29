'use strict';

function GameBoard(canvas) {
    var vm = this;
    var stage = canvas;

    var activeCards = [];
    var activeCard = null;
    var cardsFlipped = 0;

    function getRandomColors() {
        var defaultColors = [
            'red', 'red',
            'orange', 'orange',
            'yellow', 'yellow',
            'green', 'green',
            'blue', 'blue',
            'indigo', 'indigo',
            'violet', 'violet'
        ];

        return _.shuffle(defaultColors);
    }

    function initCards() {
        var x = 5;
        var y = 5;

        _.each(getRandomColors(), function createCards(color, index) {
            // In the real world, we'd scale the canvas depending on the view.
            // For now, however, we're going to hard cap the resolution.
            if (index >= 5 && index % 5 === 0) {
                y += 50;
                x = 5;
            }
            var cardView = new CardView(color, x, y);
            activeCards.push(cardView);
            stage.addChild(cardView);
            cardView.addEventListener('click', function() {
                flipCard(cardView);
            });
            x += 60;
        });
    }

    function flipCard(card) {
        card.flip();
        if (activeCard === null) {
            activeCard = card;
        } else if (activeCard !== card) {
            checkMatch(activeCard, card);
            activeCard = null;
        } else {
            activeCard = null;
        }
        stage.update();
    }

    function checkMatch(firstCard, secondCard) {
        if (firstCard.getColor() === secondCard.getColor()) {
            // Match found.  Remove both cards.
            firstCard.removeAllEventListeners();
            secondCard.removeAllEventListeners();
            cardsFlipped += 2;
            checkVictory();
        } else {
            // This is not a match; reset cards.
            // Prevent further clicks while both cards are showing.
            stage.enableDOMEvents(false);
            setTimeout(function() {
                firstCard.flip();
                secondCard.flip();
                stage.enableDOMEvents(true);
                stage.update();
            }, 200);
        }
    }

    function checkVictory() {
        if (cardsFlipped === activeCards.length) {
            // I never did like a game with a clear ending.
            vm.resetBoard();
        }
    }

    vm.resetBoard = function() {
        activeCard = null;
        cardsFlipped = 0;
        initCards();
        stage.update();
    }
}