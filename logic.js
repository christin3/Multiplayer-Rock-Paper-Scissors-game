
var config = {
    apiKey: "AIzaSyDb_TvUIkT6tlt8SR63KUEudxIxUPM0qYI",
    authDomain: "rock-paper-scissors-bf211.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-bf211.firebaseio.com",
    storageBucket: "rock-paper-scissors-bf211.appspot.com",
};
firebase.initializeApp(config);

var database = firebase.database();

// Declares the tallies to 0
var wins1 = 0;
var losses1 = 0;
var ties1 = 0;

var wins2 = 0;
var losses2 = 0;
var ties2 = 0;
var player2;
var player1;
var player1name;
var player2name;

database.ref().on("value", function (snapshot) {
    if (snapshot.child("player1").exists() && snapshot.child("player2").exists()) {
        player1 = snapshot.val().player1.selection;
        player2 = snapshot.val().player2.selection;
        checkWinner();
    }

});


$("#submitBid").on("click", function () {
    player1name = $('#player1name').val().trim();
    player2name = $('#player2name').val().trim();

    document.querySelector('#playerUno').innerHTML = player1name;
    document.querySelector('#playerDos').innerHTML = player2name;
    document.getElementById("myForm").reset();



    database.ref('player1').set({
        name: player1name,

    });

    database.ref('player2').set({
        name: player2name,

    });

    return false;
});


$("#submitComment").click(function () {
    $('#chosentwo').html(", you have chosen Scissors");

    database.ref("player1").child("comment").set();

});


$("#rock1").click(function () {

    $('#chosenOne').html(", you have chosen Rock");
    database.ref("player1").child("selection").set("r");

});

$("#paper1").click(function () {

    $('#chosenOne').html(", you have chosen Paper");
    database.ref("player1").child("selection").set("p");

});

$("#scissors1").click(function () {
    $('#chosenOne').html(", you have chosen Scissors");
    database.ref("player1").child("selection").set("s");

});

$("#rock2").click(function () {
    $('#chosentwo').html(", you have chosen Rock");
    database.ref("player2").child("selection").set("r");

});

$("#paper2").click(function () {
    $('#chosentwo').html(", you have chosen Paper");
    database.ref("player2").child("selection").set("p");

});

$("#scissors2").click(function () {
    $('#chosentwo').html(", you have chosen Scissors");
    database.ref("player2").child("selection").set("s");

});


function checkWinner() {
    console.log(player1 + player2);

    if (player1 && player2) {
        if ((player1 == 'r') && (player2 == 's')) {


            $('#gameStatus').html(player1name + " wins with Rock!");


            wins1++;
            losses2++;

        } else if ((player1 == 'r') && (player2 == 'p')) {

            $('#gameStatus').html(player2name + " wins with Paper!");

            losses1++;
            wins2++;

        } else if ((player1 == 's') && (player2 == 'r')) {

            $('#gameStatus').html(player2name + " wins with Rock!");

            losses1++;
            wins2++;

        } else if ((player1 == 's') && (player2 == 'p')) {

            $('#gameStatus').html(player1name + " wins with Scissors!");

            wins1++;
            losses2++;

        } else if ((player1 == 'p') && (player2 == 'r')) {

            $('#gameStatus').html(player1name + " wins with Paper!");

            wins1++;
            losses2++;

        } else if ((player1 == 'p') && (player2 == 's')) {

            $('#gameStatus').html(player2name + " wins with Scissors!");

            losses1++;
            wins2++;

        } else if (player1 == player2) {
            $('#gameStatus').html("It's a Tie!");

            ties1++;
            ties2++;
        }

        database.ref("player1").child("selection").set(null);
        database.ref("player2").child("selection").set(null);
        $('#chosenOne').html("");
        $('#chosentwo').html("");


        var player1score =

            "<p>wins: " + wins1 + " " + "losses: " + losses1 + " " + "ties: " + ties1 + "</p>";

        document.querySelector('#score1').innerHTML = player1score;


        var player2score =

            "<p>wins: " + wins2 + " " + "losses: " + losses2 + " " + "ties: " + ties2 + "</p>";

        document.querySelector('#score2').innerHTML = player2score;


    }


}


