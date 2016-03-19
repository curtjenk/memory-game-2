var moves = 0;
var wins = 0;
var games = 0;
var cards = [
    "<img src='img/monsters-01.png'>",
    "<img src='img/monsters-02.png'>",
    "<img src='img/monsters-03.png'>",
    "<img src='img/monsters-04.png'>",
    "<img src='img/monsters-05.png'>",
    "<img src='img/monsters-06.png'>",
    "<img src='img/monsters-07.png'>",
    "<img src='img/monsters-08.png'>",
    "<img src='img/monsters-09.png'>",
    "<img src='img/monsters-11.png'>",
    "<img src='img/monsters-13.png'>",
    "<img src='img/monsters-14.png'>",
    "<img src='img/monsters-15.png'>",
    "<img src='img/monsters-16.png'>"
];

var gridSize;
var gameTiles;
var gridArray;
var rowSize;


$(document).ready(function() {
    $('input').click(function() {
        var difficulty = $(this).val();
        prepareGame(difficulty);

        //Register click function for each tile/card
        $('.mg-tile').click(function() {
            //turnover "this" card/tile
            $(this).find('.mg-tile-inner').addClass('flipped');
            //now see if two tiles are flipped
            var flippedTiles = $('.mg-tile-inner.flipped.unmatched');

            if (flippedTiles.length === 2) {
                checkMatch(flippedTiles);
                moves++;
                $('#move-counter').html(moves);
                $('#wins-counter').html(wins);
            }
        });
        $('#matched-all').click(function() {
            newGame();
        });
    });

});

function newGame() {
    moves = 0;
     $('#button-bucket').toggle();
     //Clear mg-contents
     $('.mg-tile').remove();
      $('#matched-all').removeClass('move');
}
function prepareGame(difficulty) {

    setGridSize(difficulty);
    //only need 1/2 grid's worth of cards. there must be mates.
    gameTiles = cards.slice(0, (gridSize / 2));

    //merge so we'll have a match for each card.
    gridArray = $.merge(gameTiles, gameTiles);

    //shuffle the images/cards
    shuffleDeck(gridArray);
    //now create html to populate the game board
    putCardsOnTheBoard(gridArray);

    $('#button-bucket').toggle();

    //remove ".flipped" so back of cards show.  Now ready for play!
    setTimeout(function() {
        $('.mg-tile-inner').removeClass('flipped');
    }, 2000);
}

function setGridSize(difficulty) {
    if (difficulty == 'easy') { // 5 x 2
        rowSize = 5;
        gridSize = rowSize * 2;
    } else if (difficulty == 'med') { // 5 x 4
        rowSize = 5;
        gridSize = rowSize * 4;
    } else if (difficulty == 'hard') { //7 x 4
        rowSize = 7;
        gridSize = rowSize * 4;
    }
}

function checkMatch(flippedTiles) {

    var imgSrc1 = $(flippedTiles[0]).find('.mg-tile-inside img').attr('src');
    var imgSrc2 = $(flippedTiles[1]).find('.mg-tile-inside img').attr('src');
    if (imgSrc1 === imgSrc2) {
        $(flippedTiles[0]).removeClass('unmatched');
        $(flippedTiles[1]).removeClass('unmatched');
        $(flippedTiles[0]).addClass('matched');
        $(flippedTiles[1]).addClass('matched');
        checkWin();
    } else {

        setTimeout(function() {
            $(flippedTiles[0]).removeClass('flipped');
            $(flippedTiles[1]).removeClass('flipped');
        }, 2000);

    }
}

function checkWin() {
    if ($('.flipped.matched').length == gridArray.length) {
        $('#matched-all').addClass('move');
        wins++;
    }
}

function putCardsOnTheBoard(gridArray) {
    //place
    for (i = 0; i < gridArray.length; i++) {
        var html = '<div class="mg-tile">';
        html += '<div class="mg-tile-inner unmatched flipped">';
        html += '<div class="mg-tile-outside"></div>';
        html += '<div class="mg-tile-inside">' + gridArray[i] + '</div>';
        html += '</div>';
        html += '</div>';
        $('#mg-contents').append(html);
    }
}

// https://github.com/coolaj86/knuth-shuffle
function shuffleDeck(cardDeck) {
    var currentIndex = cardDeck.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        //Now swap
        temporaryValue = cardDeck[currentIndex];
        cardDeck[currentIndex] = cardDeck[randomIndex];
        cardDeck[randomIndex] = temporaryValue;

    }

    return cardDeck;
}