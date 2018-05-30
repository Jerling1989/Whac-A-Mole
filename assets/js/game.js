// ALERT TO TELL USER TO ADJUST DEVICE VOLUME
// alert('Please Adjust Computer Volume');

// VARIABLES FOR TRACKING USER SCORE
var createdTime;
var clickedTime;
var reactionTime;
var userPoints;
var totalPoints = 0;
var roundedScore;

// VARIABLES FOR GAME TIMER
var counter;
var intervalId;

// VARIABLES FOR MOLE CREATION AND SOUND EFFECTS
var moles = ['assets/img/donald-trump.png','assets/img/stephen-miller.png','assets/img/huckabee-sanders.png','assets/img/jared-kushner.png', 'assets/img/kellyanne-conway.png', 'assets/img/don-jr.png'];
var sounds = ['assets/audio/bigchina.mp3', 'assets/audio/immigration.mp3', 'assets/audio/noconsequence.mp3', 'assets/audio/russia.mp3', 'assets/audio/alternativefacts.mp3', 'assets/audio/nonsensical.mp3'];
var carnival = new Audio('assets/audio/circustheme.mp3');
var cheering = new Audio('assets/audio/cheering.mp3');


// TIMER FUNCTION FOR THE GAME (45 SEC)
function countdown() {
  intervalId = setInterval(decrement, 1000);
  function decrement() {
  counter--;
  document.getElementById('timer').innerHTML = counter;
    if (counter === 0) {
      clearInterval(intervalId);
      endScreen(); // LAUNCHES FINAL DISPLAY AT END OF GAME
    }
  }
}


function soundWarning() {
  roundedScore = 0;
  document.getElementById('end-menu').style.display = 'none';
  document.getElementById('start-menu').style.display = 'none';
  document.getElementById('sound-warning').style.display = 'block';
  document.getElementById('currentScore').innerHTML = roundedScore;
  // carnival.play();
  counter = 45;
  totalPoints = 0;
}

soundWarning();

document.getElementById('sound-button').onclick = function() {
  document.getElementById('sound-warning').style.display = 'none';
  carnival.play();
  startScreen();
}


// USER INSTRUCTION DISPLAY AT START OF GAME
// RESET USER POINTS AND GAME TIMER
function startScreen() {
  roundedScore = 0;
  document.getElementById('end-menu').style.display = 'none';
  document.getElementById('start-menu').style.display = 'block';
  document.getElementById('currentScore').innerHTML = roundedScore;
  carnival.play();
  counter = 45;
  totalPoints = 0;
}

// LAUNCH INSTRUCTION DISPLAY AT PAGE LOAD
// startScreen();

// LAUNCHES GAME AND HIDES INSTRUCTION DISPLAY ON BUTTON CLICK
document.getElementById('start-button').onclick = function() {
  document.getElementById('start-menu').style.display = 'none';
  carnival.pause();
  shortGame();
  countdown();
}

// FINAL DISPLAY AT END OF GAME
function endScreen() {
  document.getElementById('mole').style.display = 'none';
  document.getElementById('end-menu').style.display = 'block';
  cheering.play();
}

// LAUNCHES INSTRUCTION DISPLAY AT START OF GAME TO PLAY AGAIN
document.getElementById('play-again').onclick = function() {
  startScreen();
}

// FUNCTION THAT CONTROLS MAJOR OPERATIONS OF THE GAME
function shortGame() {

  // CREATES RANDOM INTERVAL FOR MOLE TO DISPLAY
  var x = Math.random();
  x = x * 1500;
  x = Math.floor(x);

  // CHOOSES RANDOM MOLE IMAGE FROM ARRAY
  var y = Math.random();
  y = y * 6;
  y = Math.floor(y);

  // ADD CORRESPONDING AUDIO TO MOLE IMAGE
  var moleAudio = new Audio(sounds[y]);

  // CREATES RANDOM NUMBER ON Y AXIS FOR MOLE TO DISPLAY
  var top = Math.random();
  top = top * 390;
  top = Math.floor(top);

  // CREATES RANDOM NUMBER ON X AXIS FOR MOLE TO DISPLAY
  var left = Math.random();
  left = left * 640;
  left = Math.floor(left);

  // IF STATEMENT TO STOP NEW MOLE CREATION NEAR END OF GAME
  if (counter < 2) {
    document.getElementById('mole').style.display = 'none';

  } else {
    // FUNCTION TO CREATE MOLE IMAGE AND LOCATION
    setTimeout(function() {
      document.getElementById('mole').style.top = top + 'px';
      document.getElementById('mole').style.left = left + 'px';
      document.getElementById('mole').style.content = "url('" + moles[y] + "')";
      document.getElementById('mole').style.display = 'block';
      moleAudio.play();
      createdTime = Date.now();
    }, x);
  } 

}

// KEEPS SCORE WHEN USER CLICKS ON MOLE
// TRIGGERS FUNCTION TO CREATE A NEW MOLE
document.getElementById('mole').onclick = function() {

  // CALCULATES SCORE
  clickedTime = Date.now();
  reactionTime = (clickedTime - createdTime) / 10;
  userPoints = 150 - reactionTime;
  totalPoints = totalPoints + userPoints;
  roundedScore = Math.floor(totalPoints);

  // DISPLAYS SCORE TO USER
  document.getElementById('currentScore').innerHTML = roundedScore;
  document.getElementById('final-score').innerHTML = roundedScore;

  // MAKE MOLE DISAPPEAR
  this.style.display = 'none';
  // LAUNCHES FUNCTION TO CREATE NEW MOLE
  shortGame();
}
