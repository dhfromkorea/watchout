var gameOptions = {
    height: 450,
    width: 700,
    nEnemies: 30,
    padding: 20
};


var axes = {
  x: d3.scale.linear().domain([0,1]).range([0,gameOptions.width]),
  y: d3.scale.linear().domain([0,1]).range([0,gameOptions.height])
};

var board = d3.select('.board').append('svg')
                               .attr("width", gameOptions.width)
                               .attr("height", gameOptions.height);

var scoreBoard = d3.select('.scoreboard');

var Enemy = function(enemyData){
  this.enemies = board.selectAll('.enemy').data(enemyData);
};

Enemy.prototype.createEnemies = function(){
  this.enemies.enter().append('svg:circle')
                 .attr('class','enemy')
                 .attr('cx', function(d){return axes.x(d.cx);})
                 .attr('cy', function(d){return axes.y(d.cy);})
                 .attr('r', function(d){return d.r;})
                 .attr('fill','red');
};
Enemy.prototype.moveEnemies = function(){
    this.enemies.transition()
            .duration(1000)
            .attr('cx', function(){return axes.x(Math.random());})
            .attr('cy', function(){return axes.y(Math.random());})
            .attr('r', 15)
            .transition()
            .duration(2000)
            .tween('custom', tweenWithCollision);
};

var enemyData = d3.range(0, gameOptions.nEnemies).map(function(i){
  return {
  id : i,
  cx : Math.random(),
  cy : Math.random(),
  r : 5
  };
});

var Player = function(playerData){
  this.player = board.selectAll('.player').data(playerData);
};
var playerData = [{
  cx: Math.random(),
  cy: Math.random(),
  r: 5
}];
Player.prototype.createPlayer = function(){
  this.player.enter().append('svg:circle')
                     .attr('class','player')
                     .attr('fill','green')
                     .attr('cx', function(d){return axes.x(d.cx);})
                     .attr('cy', function(d){return axes.y(d.cy);})
                     .attr('r', function(d){return d.r;});
                     // .call(drag);
};

var drag = d3.behavior.drag()
                      .on('drag',function(d,i){
                        d.cx += d3.event.dx;
                        d.cy += d3.event.dy;
                        d3.select(this).attr('transform',function(d,i){
                          return 'translate(' + [d.cx,d.cy] + ')';
                      });
                     
});


var collisionCheck = function(enemy, callback, context){
  var mousePosX = d3.mouse(this)[0];
  var mousePosY = d3.mouse(this)[1];
  console.log(mousePosX);
  enemy.each(function(d,i){
    var diffX = parseFloat(d.cx) - mousePosX;
    var diffY = parseFloat(d.cy) - mousePosY;
    var distance = Math.sqrt(Math.pow(diffX,2) + Math.pow(diffY,2));
    var sumRadi = parseFloat(d.r) + player.r;
    if (distance <= sumRadi){
      callback.call(context);
    }
  });
};

var collisionCallback = function(){
  alert('hey');
};

var tweenWithCollision = function(endData){
  var enemy = d3.select(this);
  var startPos = {
    x: parseFloat(enemy.attr('cx')),
    y: parseFloat(enemy.attr('cy'))
  };
  var endPos = {
    x: axes.x(endData.x),
    y: axes.x(endData.x)
  };
  return function(t){
    var enemyNextPos;
    collisionCheck(enemy, collisionCallback);
    enemyNextPos = {
      x: startPos.x + (endPos.x - startPos.x) * t,
      y: startPos.y + (endPos.y - startPos.y) * t
    };
    return enemy.attr('cx', enemyNextPos.x).attr('cy', enemyNextPos.y);
  };
};



var initialize = function(){
  var enemy = new Enemy(enemyData);
  enemy.createEnemies();
  setInterval(enemy.moveEnemies.bind(enemy), 1000);
  var player = new Player(playerData);
  player.createPlayer();
  // drag
  d3.selectAll('.player').call(drag);
};

initialize();