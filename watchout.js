
// // start slingin' some d3 here.
var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  radius: 10,
  padding: 20
}

var axes = {
  x: d3.scale.linear().domain([0,1]).range([0, gameOptions.width]),
  y: d3.scale.linear().domain([0,1]).range([0, gameOptions.height])
}
var randomLocation = function(maxW, maxH){
  return [Math.random()*maxW,Math.random()*maxH];
};

var dataset = [ 5, 10, 15, 20, 25 ];


var gameBoard = d3.select(".awesomeBoard")
            .append("svg")
            .attr("width", gameOptions.width)   // <-- Here
            .attr("height", gameOptions.height);

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

// for (var i = 0; i< enemies.length; i++){
//   svg.append("circle").attr("cx", enemies[i].cx).attr("cy", enemies[i].cy).attr("r", 0);
// }


// enter enemies
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
// update them
//
//
// exit them

// svg.selectAll("circle")
//     .data(dataset)
//     .enter()
//     .append("circle");


var moveEnemies = function(){
circles.attr("cx", function(d, i) {
            return (i * 50) + 25;
        })
       .attr("cy", 50/2)
       .attr("r", function(d) {
            return d;
       });


}
