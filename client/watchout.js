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
}

var axes = {
  // x: d3.scale.linear().domain([0, 100]).range([0, gameOptions.width]),
  // y: d3.scale.linear().domain([0, 100]).range([0, gameOptions.height])
};

var container = d3.select('.container');
container.style('margin', '50px');
 
var gameBoard = d3.select('.container').append('svg:svg')
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height)
  .style('background-color', 'black');


var updateScore = function() {
  container.select('.current')
    .text(gameStats.score.toString());
};

var updateBestScore = function () {
  gameStats.bestScore = gameStats.bestScore > gameStats.score ? gameStats.bestScore : gameStats.score;

  container.select('.high')
    .text(gameStats.bestScore.toString());
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

var render = function(enemy_data) {
  
  // console.log(enemy_data.length);

  var enemies = gameBoard.selectAll('circle.enemy');
  // we don't understand this::::
    // .data(enemy_data, function(d) { 
    //   // console.log(d);
    //   return d.id;
    // });

  // console.log(enemies);

  enemies.enter()
    .append('svg:circle')
    .attr('class', 'enemy')
    .transition().duration(500).attr('r', 50)
    .attr('cx', function(enemy) {
      return enemy.x;
    })
    .attr('cy', function(enemy) {
      // console.log(enemy);
      return enemy.y;
    })
    .attr('r', 20)
    .attr('fill', 'red');
    // .transition()
    // .duration(1000)
    // .attr('fill', 'green');

  // enemies.exit()
  //   .remove();

  // return enemies.transition().duration(500).tweenstyle();
};


var play = function() {

  var gameTurn = function() {
    var newEnemyPositions = createEnemies();
    render(newEnemyPositions);
  };


  gameTurn();
  // console.log('-------');
  setTimeout(gameTurn, 2000);        
  // setInterval(gameTurn, 2000);        


};

play();








