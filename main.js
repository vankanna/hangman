words = ["dog", "cat", "house", "elephant", "korea", "shirmp", "plant", "flower", "tree", "fish", "whale","human", "robot"];
word = [];
answer = '';
lives = 6;
lettersUsed = [];
gameover = false;

$(document).ready(function () {
    setup();

    $(document).on('keypress',function(e) {
        if(e.key === "Enter") {
            var pass = validate();
            if (pass && !gameover) {
                $("#error-message").text("");
                play();
            }
        }
    });
    
    $("#play").click(function (e) {
        e.preventDefault();
        var pass = validate();
        if (pass  && !gameover) {
            $("#error-message").text("");
            play();
        }
    })

    $("#play-again").click(function (e) {
        e.preventDefault();
        $("#win-message").hide();
        gameover = false;
        setup();
    })
});

function validate() {
    var guess = getInput();

    if (guess.length !== 1) {
        $("#error-message").text("Must Be A Single Letter");
        return false;
    }

    if ( lettersUsed.includes(guess) ) {
        $("#error-message").text("Letter Already Used!");
        return false;
    }

    if (!(/[a-zA-Z]/).test(guess)) {
        $("#error-message").text("Not a Letter!");
        return false;
    }

    return true;
}


function setup () {

    // pick word and prepare screen
    word = [];
    answer = getWord();
    
    for ( var i = 0; i < answer.length; i++) {
        word.push('_');
    }
    lettersUsed = [];
    $("#letter-history").text(lettersUsed.join(" "));
    outputWord();
    lives = 6;
    updatelives();
}


function getWord () {
    // puts the random number between 0 and the length of words so you can dynamicaly change the words
    return words[ Math.floor(Math.random() * words.length) ]
}

function getInput () {
    return $("#user-input").val();
}

function updateHistory(guess) {
    lettersUsed.push(guess);
    $("#letter-history").text(lettersUsed.join(" "));
}

function checkForMatch(guess) {
    var found = false;
    // check for matches 
    console.log('inside checkForMatch');
    console.log(answer.length);
    for (var i = 0; i < answer.length; i++ ) {
        console.log(answer[i]);
        if(guess === answer[i]) {
            console.log('we made it in ehre');
            word[i] = guess;
            found = true;
        }
    }

    return found;
}

function outputWord () {
   $("#word-output").text(word.join(" "));
}

function updatelives() {
    $("#lives").text(`lives: ${lives}`);
}

function play () {
    var guess = getInput();
    console.log(guess);

    if (!checkForMatch(guess)) {
        lives--;
        updatelives();
    }

    outputWord();

    updateHistory(guess);

    $("#user-input").val('')
    console.log(answer);
    console.log(word);
    if(answer === word.join("")) {
        $("#message").text("You Win!");
        $("#win-message").show();
        gameover = true;
    } else if (lives === 0) {
        //announce
        $("#message").text("You Lose!");
        $("#win-message").show();
        gameover = true;
    }

}
