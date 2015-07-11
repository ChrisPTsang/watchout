// start slingin' some d3 here.

var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20,
  canCollide: true
};

var gameStats = {
  score: 0,
  bestScore: 0,
  collisions: 0
};


var container = d3.select('.container');
container.style('margin', '50px');
 
var gameBoard = d3.select('.container').append('svg')
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height)
  .style('background-color', 'black');

var player = new Player(gameOptions.width, gameOptions.height);

var updateScore = function() {
  container.select('.current span')
    .text(gameStats.score.toString());
};

var updateBestScore = function () {
  gameStats.bestScore = gameStats.bestScore > gameStats.score ? gameStats.bestScore : gameStats.score;

  container.select('.high span')
    .text(gameStats.bestScore.toString());
};

var updateCollisions = function() {
  container.select('.collisions span')
    .text(gameStats.collisions.toString());
};

//create enemies
var createEnemies = function() {

  var enemies = _.range(0, gameOptions.nEnemies);

  return _.map(enemies, function(enemy, index) {
    return {
      id: index,
      x: Math.random() * gameOptions.width,
      y: Math.random() * gameOptions.height
    };
  });
};

//render screen
var render = function(enemy_data) {
  
  // console.log(enemy_data.length);
  var enemies = gameBoard.selectAll('image.enemy').data(enemy_data, function(d) { return d.id; });

  enemies.transition()
    .duration(1500)
    .attr('x', function(enemy) {return enemy.x;})
    .attr('y', function(enemy) {return enemy.y;});
    
  enemies.enter()
    .append('svg:image')
    .attr('class', 'enemy')
    .attr('xlink:href', 'asteroid.png')
    .attr('height', 20)
    .attr('width', 20)
    .attr('x', gameOptions.width/2)
    .attr('y', gameOptions.height/2)
    .transition()
    .duration(500)
    .attr('x', function(enemy) {return enemy.x;})
    .attr('y', function(enemy) {return enemy.y;});
    // .attr('r', 0)
    // .append('svg:image')
    // .attr('fill', 'black');

};

//collision detection
var collisionDetect = function() {

  var enemies = gameBoard.selectAll('image.enemy')
    .each(function(d, i) {

      var playerPosX = player.x + 10;
      var playerPosY = player.y + 10;

      var enPosX = d.x + 6;
      var enPoxY = d.y + 6;

      var distance = Math.sqrt(((playerPosX - enPosX) * (playerPosX - enPosX)) + ((playerPosY - enPoxY) * (playerPosY - enPoxY)));
      
      if(distance < 22) {
        updateBestScore();
        gameStats.score = 0;
       
        if(gameOptions.canCollide === true) {
          console.log('collision!');
          gameStats.collisions++;
          updateCollisions();
          gameOptions.canCollide = false;
          setTimeout(function() {
            gameOptions.canCollide = true;
          }, 800);
        }

      }
    });
};

//render screen with enemies and player
render(createEnemies());
player.render(gameBoard);

setTimeout(function(){
  render(createEnemies());
}, 2000);
 
//update score based on time elapsed without collision

var increaseScore = function() {
  gameStats.score += 1;
  updateScore();
};

setInterval(function() {
  increaseScore();
  collisionDetect();
}, 50);






