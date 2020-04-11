var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = -1;
var ad;

function nextSequence() {
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#" + randomChosenColour).fadeOut().fadeIn();
    playSound(randomChosenColour);
    userClickedPattern = [];
}

// Event handler
$(".btn").click(function () {
    var userChosenColour = ($(this).attr("id"));
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    //$("#"+userChosenColour).fadeOut(100).fadeIn(100);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkResult(userClickedPattern.length);
});

function playSound(name) {
    ad = new Audio("sounds/" + name + ".mp3");
    ad.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

$(document).keydown(function (event) {
    if ((event.key == "a" || event.key=="A") && level == -1) {
        level = 0;
        $("h1").text("Level 0");
        nextSequence();
    }

});

function checkResult(currentLevel) {
    if (currentLevel <= level) {
        if (gamePattern[currentLevel - 1] != userClickedPattern[currentLevel - 1]) {
            ad = new Audio("sounds/wrong.mp3");
            ad.play();
            level = -1;
            gamePattern = [];
            userClickedPattern = [];
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            $("h1").text("Game Over! Press a to restart");
            //setTimeout(nextSequence, 1000);
            return;
        }
    }
    if(currentLevel == level) {
        setTimeout(nextSequence, 500);
    }


}