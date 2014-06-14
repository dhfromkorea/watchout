// start slingin' some d3 here.

// basic config.
var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  radius: 10,
  padding: 20
};

var axes = {
  x: d3.scale.linear().domain([0,1]).range([0, gameOptions.width]),
  y: d3.scale.linear().domain([0,1]).range([0, gameOptions.height])
};

// set up the boundaries in which players and enemies can move
var gameBoard = d3.select(".awesomeBoard")
            .append("svg")
            .attr("width", gameOptions.width)
            .attr("height", gameOptions.height);


// create an enemy class (TBD)
var enemiesData = d3.range(0, gameOptions.nEnemies).map(function(i){
  return{
    id : i,
    cx: Math.random(),
    cy: Math.random()
  };
});

var enemyCircles = gameBoard.selectAll('circle.enemy').data(enemiesData, function(d){
  return d.id;
});

enemyCircles.enter()
          .append('svg:circle')
          .attr('class', 'enemy')
          .attr('cx', function(d){ return axes.x(d.cx);})
          .attr('cy', function(d){ return axes.y(d.cy);})
          .attr('r',0)
          .attr('fill', 'black');

enemyCircles.transition()
            .duration(1000)
            .attr('r',gameOptions.radius);

var moveEnemyCircles = function(){
  enemyCircles.transition()
            .duration(1000)
            .attr('cx', function(){return axes.x(Math.random());})
            .attr('cy', function(){return axes.y(Math.random());});
};

setInterval(function(){
  return moveEnemyCircles();
}, 2000);


// create a Player class (TBD)
var playerData = [{
  x: .5,
  y: .5,
  width: 20,
  height: 20
}];

var player = gameBoard.selectAll('rect.player').data(playerData);

player.enter()
      .append('svg:rect')
      .attr('class','player')
      .attr('x', function(d){ return axes.x(d.x);})
      .attr('y', function(d){ return axes.y(d.y);})
      .attr('width', function(d){return d.width;})
      .attr('height', function(d){return d.height;})
      .attr('fill', 'lightgreen');

// click event as a trigger for drag event
var drag = d3.behavior.drag()
      .origin(function(d){return d;})
      .on("drag", dragmove);

function setX(x){
  if (x  > gameOptions.width/2 - gameOptions.padding){
    return gameOptions.width/2 - gameOptions.padding;
  }
  else if (x  < -(gameOptions.width/2) + gameOptions.padding){
    return -(gameOptions.width/2) + gameOptions.padding;
  }
  else {
    return x;
  }
}
function setY(y){
  if (y  > gameOptions.height/2 - gameOptions.padding){
    return gameOptions.height/2 - gameOptions.padding;
  }
  else if (y  < -(gameOptions.height/2) + gameOptions.padding){
    return -(gameOptions.height/2) + gameOptions.padding;
  }
  else {
    return y;
  }
}
function dragmove(d) {
  console.log(d3.event.x);
  console.log(gameOptions.width);
  var x = setX(d3.event.x);
  var y = setY(d3.event.y);
  d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
}
// var drag = d3.behavior.drag()
//     .on("drag", function(){
//       // locate the mouse pointer
//       // initialize an array of coordinates


//       this.transform();
//     });
d3.selectAll(".player").call(drag);

