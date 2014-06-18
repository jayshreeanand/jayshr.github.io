var Game = function(){

  this.timerElement  = document.getElementById("timer");
  var game = this;
// $("#myModal").modal('show');
  this.initTimer = function() {
    if (game.startTime) {
      var diff = Math.floor( ( new Date().getTime() - game.startTime) / 1000);
      var mins = "0" + String( Math.floor(diff / 60) );
      var secs = "0" + String(diff % 60);
      document.getElementById("timer").innerHTML = 
      mins.substring(mins.length - 2) + ":" + secs.substring(secs.length - 2);
      setTimeout(game.initTimer, 1000);
    }
  }
};

Game.prototype.start = function(){


  this.options = this.getUserOptions();
  this.startTime = null;
  this.timerElement.innerHTML = "00:00";
  // this.movesArray = new Array();
  this.board = new Board( this.options);
  // this.startTimer();
  this.enableClickListener();
};

Game.prototype.startTimer = function(){
  this.startTime = new Date().getTime();
  this.initTimer();
};

Game.prototype.stopTimer = function(){

  this.startTime = null;

}

Game.prototype.updateLocalStorage = function(){

  var data ={};
  data.timeElapsed = new Date().getTime() - this.startTime;
  data.rows = this.board.rows;
  data.cols = this.board.cols;
  data.mineCount = this.board.mineCount;

  data.board = {};
  data.board.FlagCount = this.board.flagCount;
  data.board.field = new Array(this.rows);
  for(var i=1; i<=this.board.rows; i++){
  data.board.field[i] = new Array(this.cols);

    for(var j=1; j<= this.board.cols; j++){
  data.board.field[i][j] = {};

      data.board.field[i][j].mine = this.board.field[i][j].mine;
      data.board.field[i][j].status = this.board.field[i][j].status;
      data.board.field[i][j].symbol = this.board.field[i][j].symbol;
      data.board.field[i][j].id = this.board.field[i][j].id;
      data.board.field[i][j].row = this.board.field[i][j].row;
      data.board.field[i][j].col = this.board.field[i][j].col;
      data.board.field[i][j].mineCount = this.board.field[i][j].mineCount;
      data.board.field[i][j].classdetails = document.getElementById(this.board.field[i][j].id).className;
      data.board.field[i][j].htmlContent = document.getElementById(this.board.field[i][j].id).text;
    }

  }
  localStorage.setItem("game-data",JSON.stringify(data));
  console.log("data saved is "+ JSON.stringify(data));
};

Game.prototype.restart = function(){
  this.board.element.empty();
  this.board.element.unbind();

  this.start();
};

Game.prototype.endGame =function(){
  this.stopTimer();
  this.disableClickListener();
}

Game.prototype.enableClickListener = function() {
  var id, typeofButton;
  var $game = this;
    this.board.element.contextmenu(function(e) {
    console.log("right click button pressed on id "+ e.target.id + "and button is " +e.which);
    id = e.target.id;
    typeofButton = 3; //this is a right mouse button
    e.preventDefault();
    $game.board.clickField(id, typeofButton);
    // $game.logMoves(id, typeofButton);
    return; 
});


  this.board.element.click(function(event) {
    if(!$game.startTime){
      $game.startTimer();
    }


if(event.which ==1){ //eliminates case for middle mouse button click
  var target_el = event.target;
  console.log("the id of the element being cicked is "+ target_el.id +" mouse button is" + event.which);
  id = target_el.id;
  typeofButton = event.which;
  $game.board.clickField(id, typeofButton);
  // $game.logMoves(id, typeofButton);

}

});

// this.board.clickField(id, typeofButton);

};


Game.prototype.disableClickListener = function() {


  this.board.element.unbind();
};



Game.prototype.getUserOptions = function(){
  var difficulty = document.getElementById("difficulty-level").value;

  switch(difficulty){

    case "easy":
    return [10,10,10];
    break;

    case "medium":
    return [15,15,50];

    break;

    case "hard":
    return [20,20,70];

    break;

    default:
    return  [10,10,10];

    break;

  }

};





/*Game.prototype.logMoves = function(id, typeofButton){
  this.movesArray.push([id,typeofButton]);
  console.log("the element inserted is with id"+ this.movesArray[this.movesArray.length -1][0] + " and with type of click as "+ this.movesArray[this.movesArray.length -1][1] );

};

Game.prototype.deleteLastMove = function(){

  this.movesArray.pop();
};
*/