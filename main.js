import {Field, Snake, Apple, Player} from './env.js';
import {BasicAi} from './ai-heuristics.js';
//import {drawField} from './draw.js';

var c = document.getElementById("snakeCanvas");
var ctx = c.getContext("2d");
var scale = 10;
var gameInterval = 500 // in milliseconds;

function drawField(field){
    var bg = '#000000';
    var p1body = '#00FF00';
    var p1head = '#FFFF00';
    var p2body = '#FFA500';
    var p2head = '#0000FF';
    var apple = '#FF0000';
    var colors = [bg, p1body, p1head, p2body, p2head, apple];
    ctx.fillStyle = colors[0]
    ctx.fillRect(0,0, field.width * scale, field.height * scale);
    //ctx.fillStyle = body;
    //ctx.fillRect(20,20, scale,scale);
    field.state = field.getFieldState();
    for (let i = 0; i < field.height; i++){
        for (let j = 0; j < field.width; j++){
            let cell = field.state[i][j];
            if (cell !== 0){
                ctx.fillStyle = colors[cell];
                ctx.fillRect(j * scale, i * scale, scale, scale );
            }
        }
    }
}

var player = new Player();
var computer = new Player();
var ai = new BasicAi();
ai.setplayer(computer);
var field = new Field(15,15);
field.reset();
player.field = field;
computer.field = field;
player.snake = field.p1;
computer.snake = field.p2;
drawField(field);
var playerResults = null;
var observations = ai.player.getObservations();
var timer;
timer = setInterval(playGame, 500);
function playGame(){
    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }

        // player.snake.direction = event.key;
        //    return;

        switch (event.key) {
            case "ArrowDown":
                player.snake.direction = event.key;
                break;
            case "ArrowUp":
                player.snake.direction = event.key;
                break;
            case "ArrowLeft":
                player.snake.direction = event.key;
                break;
            case "ArrowRight":
                player.snake.direction = event.key;
                break;
            default:
                return ; // Quit when this doesn't handle the key event.
        }
        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }, true);
    playerResults = player.makeMove(player.snake.direction);
    observations = ai.makeMove(ai.step(observations));

    //p1.moveSnake(p1.direction);
    if (player.snake.checkCollision(field)){
        //field.reset();
        window.alert("You died");
        clearInterval(timer);
        //return true;
    }
    else if (computer.snake.checkCollision(field)){
        //field.reset();
        window.alert("Opponent died");
        clearInterval(timer);
    }
    //field.placeSnake(player.snake);
    //field.placeSnake(computer.snake);
    if (player.snake.ateApple(field.apple) || computer.snake.ateApple(field.apple)){
        field.apple = new Apple(field);
    }
    drawField(field);
}
