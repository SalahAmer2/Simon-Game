
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(".btn").click(function(){
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound(userChosenColour);
  //-----  You did step 6 in a way different than his but still worked
  var thisBtn = $(this);
  //$(this).addClass("pressed");
  thisBtn.addClass("pressed");
  setTimeout(function(){
    thisBtn.removeClass("pressed");
  }, 100);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  //while(true){
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //}

  //console.log(buttonChosen);
    //console.log(userClickedPattern);
  playSound(randomChosenColour);

  level++;
  $("#level-title").text("Level "+level);
  //$("h1").text("Level "+level); //Works too
}
//nextSequence();
var started = false;

$(document).keypress(function(){
  if(!started){ //Semantically, it should be a conditional(like the if statement here) not a loop to avoid confusion
  nextSequence();
  started = true;
  }
});

/*$(document).keypress(function(){
  while(!started){ //This works but isn't preferred
  nextSequence();
  started = true;
}
});*/

//console.log(started);//After pressing a key started is now true globally not just locally

function playSound(name){  //function declaration so it hoists
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
      nextSequence();
      userClickedPattern = [];
      },1000);
    }
  }else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    //$("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = []; //You need this here because in your code you put this line after nextSequence(line 68) instead of inside it(line 23)
}

//$(".btn").click(function animatePress(currentColour){

//});
//alert("hello");
/*var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

//var randomNumber = Math.floor((Math.random() * 3) + 1);//This is wrong because since you're adding 1 it'll never have the chance to be zero or rounded down to zero the least result is 1(when the result is 0, 0+1=1)

function nextSequence(){
    //randomNumber = Math.floor((Math.random() * 3) + 1);//This is wrong because since you're adding 1 it'll never have the chance to be zero or rounded down to zero the least result is 1(when the result is 0, 0+1=1)

    console.log(randomNumber);
}
console.log(randomNumber);
//nextSequence();

var randomChosenColour = buttonColours[randomNumber];
console.log(randomChosenColour);
gamePattern.push(randomChosenColour);
*/
