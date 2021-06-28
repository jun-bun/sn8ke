import {Field, Snake, Apple} from './env.js';
//import {drawField} from './draw.js';

var c = document.getElementById("snakeCanvas");
var ctx = c.getContext("2d");
var scale = 10;
var gameInterval = 500 // in milliseconds;

function drawField(field){
    var bg = '#000000';
    var p1body = '#00FF00';
    var p1head = '#FFFF00';
    var p2body = '#00FF00';
    var p2head = '#FFFF00';
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

var field = new Field(20,20);
field.reset();
drawField(field);
var timer;
timer = setInterval(playGame, 500);
function playGame(){
    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }
        switch (event.key) {
            case "ArrowDown":
                p1.direction = event.key;
                break;
            case "ArrowUp":
                p1.direction = event.key;
                break;
            case "ArrowLeft":
                p1.direction = event.key;
                break;
            case "ArrowRight":
                p1.direction = event.key;
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }, true);
    var p1 = field.p1;
    p1.moveSnake(p1.direction);
    field.placeSnake(p1);
    if (p1.ateApple(field.apple)){
        field.apple = new Apple(field);
    }
    drawField(field);
    if (p1.checkCollision(field)){
        field.reset();
        window.alert("You died");
        //return true;
    }
}

//p1.moveSnake("ArrowDown");
//field.placeSnake(p1);
//drawField(field);