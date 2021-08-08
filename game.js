//Instructions
alert ("Correctly repeat a longer and longer sequence of signals.");

// create an empty log for the color pattern
let gamePattern = [];
let userClickedPattern = [];
// storing the audio files
let colorPick;
let dir = "sounds/";
let ext = ".mp3";


function playSound(arg) {
  const audio = new Audio(dir + arg + ext);
  audio.play();
}

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let buttonColours = ["red", "yellow", "blue", "green"];
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
  userClickedPattern = [];
}

//start the game
let level = 0;
let currentLevel = 0;
$(document).keypress(function() {
  nextSequence();
  checkAnswer();
});



// record user clicks
$(".btn").on("click", function() {
  var t = (this.id);
  let userChosenColour = t;
  userClickedPattern.push(t);
  playSound(t);
  $("#" + userChosenColour).addClass("pressed").fadeIn(100).fadeOut(100).fadeIn(100);
  setTimeout(function() {
    $("#" + userChosenColour).removeClass("pressed");
  }, 100);

  currentLevel = level;
  checkAnswer();
  compareAnswers();

  if (checkAnswer() === 1) {// verify that all inputs have been logged
    if (compareAnswers() === true) {// compare user input with game inputs
      setTimeout(function() {
        nextSequence();
      }, 1000);
      $("h1").text("Level " + level);


    } else {
      gameOver();
      userClickedPattern = [];
      gamePattern = [];
    }
  }else  if (checkByItem() !== true) {// check that all inputs match.
    gameOver();
    userClickedPattern = [];
    gamePattern = [];
  }
});


function checkByItem() {
  let comparison;
  for (let i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] != gamePattern[i]) {
      comparison = false
    } else {
      comparison = true;
    }
  }
  return comparison;
}
//playing

function compareAnswers() {
  let comparison = 0;
  //check lenght

  if (userClickedPattern.length != gamePattern.length) {
    return false;
  } else {
    let comparison = false;

    for (let i = 0; i < userClickedPattern.length; i++) {
      if (userClickedPattern[i] != gamePattern[i]) {
        return false
      } else {
        comparison = true;

      }
    }
    return comparison;
  }
}



function checkAnswer() {
  let result = 0;
  let amountOfInput = 0
  amountOfInput = gamePattern.length;
  let numberOfInputLeft = 0;
  numberOfInputLeft = amountOfInput - userClickedPattern.length
  if (numberOfInputLeft > 0) {

    console.log("please add " + numberOfInputLeft);
    result = 0

  } else {

    console.log("ready to go");
    result = 1
  }

  return result;
}

function gameOver() {
  level = 0;
  $("h1").text("Game Over, Press Any Key to Restart");
  playSound("wrong");
  $("body").addClass("gameOver").fadeOut(100).fadeIn(100);
  setTimeout(function() {
    $("body").removeClass("gameOver");
  }, 100);

}
