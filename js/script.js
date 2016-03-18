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
        var diff = $(this).val();
        if (diff == 'easy') { // 5 x 2
            rowSize = 5;
            gridSize = rowSize * 2;

        } else if (diff == 'medium') { // 5 x 4
            rowSize = 5;
            gridSize = rowSize * 4;
        } else if (diff == 'hard') { //7 x 4
            rowSize = 7;
            gridSize = rowSize * 4;
        }

        $('#button-bucket').toggle();
        //only need 1/2 grid's worth of cards. there must be mates.
        gameTiles = cards.slice(0, (gridSize / 2));

        //merge so we'll have the match for each card.
        gridArray = $.merge(gameTiles, gameTiles);
        // console.log(gridArray);

        //shuffle the images/cards
        shuffleDeck(gridArray);
        //now create html to populate the game board
        putCardsOnTheBoard(gridArray);
        //remove ".flipped" so back of cards show.  Now ready for play!
        setTimeout(function() {
            $('.mg-tile-inner').removeClass('flipped');
        }, 2000);
        //Register click function for each tile/card
        $('.mg-tile').click(function() {
            $(this).find('.mg-tile-inner').addClass('flipped');
            //now see if two are flipped
            var flippedTiles = $('.flipped.unmatched');
            console.log(flippedTiles.length);
            if (flippedTiles.length === 2) {
                checkMatch(flippedTiles);
            }
        });
    });

});

function checkMatch(flippedTiles) {

    var img1 = $(flippedTiles[0]).find('.mg-tile-inside img').attr('src');
    var img2 = $(flippedTiles[1]).find('.mg-tile-inside img').attr('src');
    if (img1 === img2) { 
        alert("You found a match"); 
         $(flippedTiles[0]).removeClass('unmatched');
         $(flippedTiles[1]).removeClass('unmatched');
         $(flippedTiles[0]).addClass('matched');
         $(flippedTiles[1]).addClass('matched');
    } else {
        alert("Sorry try again");
        $(flippedTiles[0]).removeClass('flipped');
        $(flippedTiles[1]).removeClass('flipped');
    }
    // var img1 = 
    // console.log(flippedTiles[i].)
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
