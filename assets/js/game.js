alert('Please Adjust Computer Volume');

var createdTime;
var clickedTime;
var reactionTime;
var moles = ['assets/img/donald-trump.png','assets/img/stephen-miller.png','assets/img/huckabee-sanders.png','assets/img/jared-kushner.png', 'assets/img/kellyanne-conway.png', 'assets/img/don-jr.png'];
var sounds = ['assets/audio/bigchina.mp3', 'assets/audio/immigration.mp3', 'assets/audio/noconsequence.mp3', 'assets/audio/russia.mp3', 'assets/audio/alternativefacts.mp3', 'assets/audio/nonsensical.mp3'];
var carnival = new Audio('assets/audio/circustheme.mp3');

var counter;
var intervalId;

var userPoints;
var totalPoints = 0;
var roundedScore;


// Timer Function For The Whole Game (60sec)
function countdown() {
  intervalId = setInterval(decrement, 1000);
  function decrement() {
  counter--;
  document.getElementById('timer').innerHTML = counter;
    if (counter === 0) {
      clearInterval(intervalId);
      endScreen(); //make function to restart game
    }
  }
}

function startScreen() {
  roundedScore = 0;
  document.getElementById('end-menu').style.display = 'none';
  document.getElementById('start-menu').style.display = 'block';
  document.getElementById('currentScore').innerHTML = roundedScore;
  carnival.play();
  counter = 15;
  totalPoints = 0;
  
}

startScreen();

document.getElementById('start-button').onclick = function() {
  document.getElementById('start-menu').style.display = 'none';
  carnival.pause();
  shortGame();
  countdown();
}

function endScreen() {
  document.getElementById('mole').style.display = 'none';
  document.getElementById('end-menu').style.display = 'block';
}

document.getElementById('play-again').onclick = function() {
  startScreen();
}


function shortGame() {

  // setTimeout
  var x = Math.random();
  x = x * 1500;
  x = Math.floor(x);

  console.log(x);
  
  // choose random mole
  var y = Math.random();
  y = y * 6;
  y = Math.floor(y);

  console.log(moles[y]);

  var moleAudio = new Audio(sounds[y]);


  var top = Math.random();
  top = top * 390;
  top = Math.floor(top);

  var left = Math.random();
  left = left * 640;
  left = Math.floor(left);


  if (counter < 2) {
    document.getElementById('mole').style.display = 'none';

  } else {

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


document.getElementById('mole').onclick = function() {

  clickedTime = Date.now();
  reactionTime = (clickedTime - createdTime) / 10;
  userPoints = 150 - reactionTime;
  totalPoints = totalPoints + userPoints;
  roundedScore = Math.floor(totalPoints);

  document.getElementById('currentScore').innerHTML = roundedScore;
  document.getElementById('final-score').innerHTML = roundedScore;

  this.style.display = 'none';
  shortGame();
}