

var createdTime;
var clickedTime;
var reactionTime;
var moles = ['assets/img/donald-trump.png','assets/img/stephen-miller.png','assets/img/huckabee-sanders.png','assets/img/jared-kushner.png', 'assets/img/kellyanne-conway.png', 'assets/img/don-jr.png'];
var sounds = ['assets/audio/bigchina.mp3', 'assets/audio/immigration.mp3', 'assets/audio/noconsequence.mp3', 'assets/audio/russia.mp3', 'assets/audio/alternativefacts.mp3', 'assets/audio/nonsensical.mp3']

function runGame() {

  // setTimeout
  var x = Math.random();
  x = x * 3000;
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

  setTimeout(function() {
    document.getElementById('mole').style.top = top + 'px';
    document.getElementById('mole').style.left = left + 'px';
    document.getElementById('mole').style.content = "url('" + moles[y] + "')";
    document.getElementById('mole').style.display = 'block';
    moleAudio.play();
    createdTime = Date.now();
  }, x);

}

runGame();

document.getElementById('mole').onclick = function() {

  clickedTime = Date.now();
  reactionTime = (clickedTime - createdTime) / 1000;

  // document.getElementById('userTime').innerHTML = reactionTime;

  this.style.display = 'none';
  runGame();
}