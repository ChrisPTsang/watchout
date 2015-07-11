// start slingin' some d3 here.


var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0
};

var axes = {
  x: d3.scale.linear().domain([0, 100]).range([0, gameOptions.width]),
  y: d3.scale.linear().domain([0, 100]).range([0, gameOptions.height])
};

var container = d3.select('.container');
container.style('margin', '50px');
 
var gameBoard = d3.select('.container').append('svg')
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height)
  .style('background-color', 'white');

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

//create enemies
var createEnemies = function() {

  var enemies = _.range(0, gameOptions.nEnemies);

  return _.map(enemies, function(enemy, index) {
    return {
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100
    };
  });
};

//render screen
var render = function(enemy_data) {
  
  // console.log(enemy_data.length);
  var enemies = gameBoard.selectAll('circle.enemy').data(enemy_data);

  enemies.transition()
    .duration(1500)
    .attr('cx', function(enemy) {return axes.x(enemy.x);})
    .attr('cy', function(enemy) {return axes.y(enemy.y);});
    
    
  enemies.enter()
    .append('svg:circle')
    .attr('class', 'enemy')
    .attr('cx', gameOptions.width/2)
    .attr('cy', gameOptions.height/2)
    .transition()
    .duration(500)
    .attr('cx', function(enemy) {return axes.x(enemy.x);})
    .attr('cy', function(enemy) {return axes.y(enemy.y);})
    .attr('r', 10)
    .attr('fill', 'black');



};

//render screen with enemies and player


render(createEnemies());
player.render(gameBoard);

setInterval(function(){return render(createEnemies());}, 2000);
 
//update score based on time elapsed without collision

var increaseScore = function() {
  gameStats.score += 1;
  updateScore();
};

setInterval(increaseScore, 50);









