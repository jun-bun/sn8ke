class Coordinate{
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
    takeStep(direction){
        let x = this.x;
        let y = this.y;

        if (direction === "ArrowUp") {y += -1;}
        else if (direction === "ArrowDown") {y += 1;}
        else if (direction === "ArrowLeft") {x += -1;}
        else if (direction === "ArrowRight") {x += 1;}
        return new Coordinate(x,y);
    }

    static getNewLocation(coordinate, direction){
        let x = coordinate.x;
        let y = coordinate.y;

        if (direction === "ArrowUp") {y += -1;}
        else if (direction === "ArrowDown") {y += 1;}
        else if (direction === "ArrowLeft") {x += -1;}
        else if (direction === "ArrowRight") {x += 1;}

        return new Coordinate(x,y);
    }

    isEqual(location){
    return this.x === location.x && this.y === location.y;
    }
    getDistance(coordinate){
        return Math.abs(this.x - coordinate.x) + Math.abs(this.y - coordinate.y);
    }
}

class Apple{
    constructor(field) {
        var emptyspaces = [];
        for (let i = 0; i < field.height; i++){
            for (let j = 0; j < field.width; j++){
                    emptyspaces.push([i,j]);
            }
        }
        for (const segment of field.p1.pos){
            emptyspaces.splice(segment.y * (field.width -1) + segment.x,0);
        }
        var location = emptyspaces[Math.floor(Math.random()* emptyspaces.length)];
        this.location = new Coordinate(location[1], location[0]);
    }
    getlocation(){
        return this.location;
    }
}

class Player{
    constructor() {
        this.snake = null;
        this.field = null;
        this.direction = "ArrowDown";
    }
    getObservations(){
        let field = this.field;
        const opponent = (this.snake === field.p1) ? field.p2 : field.p1;
        return {'h': field.height, 'w':field.width, 'self': this.snake, 'opponent': opponent, 'apple': field.apple};
    }
    makeMove(movement){
        this.snake.moveSnake(movement)
        return this.getObservations();
    }
}


class Field {
    constructor(h, w) {
        this.height = h;
        this.width = w;
        this.p1 = null;
        this.p2 = null;
        this.apple = null
        this.spawns = [[new Coordinate(5, 5),
                        new Coordinate(4, 5),
                        new Coordinate(3, 5),
                        new Coordinate(2, 5)],
                        [new Coordinate(this.width-5,this.height-5),
                        new Coordinate(this.width-4, this.height-4),
                        new Coordinate(this.width-3, this.height-3),
                        new Coordinate(this.width-2, this.height-2)] //location along H,W
                        ];
        // Create a 2D Array of [height][width];
        this.state = new Array(h);
        for (let i = 0; i < h; i++) {
            this.state[i] = new Array(w);
            for (let j = 0; j < w; j++) {
                this.state[i][j] = 0;
            }
        }
    }

    reset(){
        delete this.p1;
        delete this.p2;
        this.p1 = new Snake(this.spawns[0]);
        this.p2 = new Snake(this.spawns[1]);
        this.apple = new Apple(this);
        this.placeSnake(this.p1);
        this.placeSnake(this.p2);
        this.placeApple(this.apple);
    }
    getFieldState() {
        const h = this.height;
        const w = this.width;
        this.state = new Array(h);
        for (let i = 0; i < h; i++) {
            this.state[i] = new Array(w);
            for (let j = 0; j < w; j++) {
                this.state[i][j] = 0;
            }
        }
        this.placeSnake(this.p1);
        this.placeSnake(this.p2);
        this.placeApple(this.apple);
        return this.state;
    }

    placeSnake(snake) {
        // Populates our 2D Array with values for our snake;
        let [headValue, segValue] = snake === this.p1 ? [1,2] : [3,4];
        const head = snake.pos[0];
        this.state[head.y][head.x] = headValue;
        for (const segment of snake.pos.slice(1)) {
            this.state[segment.y][segment.x] = segValue;
        }
    }
    placeApple(apple){
        const [y, x] = [apple.location.y, apple.location.x]
        this.state[y][x] = 5;
    }
}

class Snake {
    constructor(pos) {
        this.size = 4;
        this.pos = pos;
        this.score = 0;
        this.direction = "ArrowRight";
        this.tail = this.pos[-1];
    }

    moveSnake(direction) {
        if (direction === "") {
            direction = this.direction
        }
        let currHead = this.pos[0];
        let newHead = currHead.takeStep(direction);
        this.pos.splice(0, 0, newHead);
        this.score -= 1;
        this.deleteTail();
    }

    deleteTail() {
        this.tail = this.pos.pop();
    }

    ateApple(apple) {
        var appleLocation = apple.getlocation();
        if (this.pos[0].isEqual(appleLocation)) {
            this.size += 1;
            this.score += 100;
            this.pos.push(this.tail);
            return true;
        }
    }

    /**
     * @param {Object} field - Field Object.
     * @param {number} field.height - height of field.
     * @param {number} field.width - The width of field.
     */

    isCollidingWithBarrier(field){
        const head = this.pos[0];
        return head.x >= field.width || head.x < 0 || head.y >= field.height || head.y < 0;

    }
    isCollidingWithItself(){
        const head = this.pos[0];
        for (let segment of this.pos.slice(1)) {
            if (head.x === segment.x && head.y === segment.y) {
                return true;
            }
        }
        return false;
    }
    isCollidingWithOpponent(field){
        const head = this.pos[0];
        const opponent = (this === field.p1) ? field.p2 : field.p1;
        for (let segment of opponent.pos) {
            if (head.x === segment.x && head.y === segment.y) {
                return true;
            }
        }
        return false;
    }

    isColliding(field){
        return (this.isCollidingWithBarrier(field)
                || this.isCollidingWithItself()
                || this.isCollidingWithOpponent(field));
    }
    checkCollision(field) {
        if (this.isColliding(field)){
            this.score += -40000;
            return true;
        }
        return false;
    }
}

export {Field, Snake, Apple, Player, Coordinate};


/*
module.exports = {Field, Snake, Player, Coordinate};
*/
