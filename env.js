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
        return [x,y];
    }
        isEqual(location){
        return this.x === location.x && this.y === location.y;
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

class Field {
    constructor(h, w) {
        this.height = h;
        this.width = w;
        this.p1 = null;
        this.apple = null;
        this.state = new Array(h);
        for (let i = 0; i < h; i++) {
            this.state[i] = new Array(w);
            for (let j = 0; j < w; j++) {
                this.state[i][j] = 0;
            }
        }
    }

    reset(){
        this.p1 = new Snake();
        this.apple = new Apple(this);
        this.placeSnake(this.p1);
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
        this.placeApple(this.apple);
        return this.state;
    }

    placeSnake(snake) {
        let head = snake.pos[0];
        this.state[head.y][head.x] = 2;
        for (const segment of snake.pos.slice(1)) {
            this.state[segment.y][segment.x] = 1;
        }
    }
    placeApple(apple){
        const [y, x] = [apple.location.y, apple.location.x]
        this.state[y][x] = 5;
    }
}

class Snake{
    constructor() {
        this.size = 4;
        this.pos = [new Coordinate(5,5),
                    new Coordinate(4,5),
                    new Coordinate(3, 5),
                    new Coordinate(2,5)]; //location along H,W
        this.score = 0;
        this.direction = "ArrowRight"
        this.tail = this.pos[-1];
    }
    moveSnake(direction){
        if (direction === "") {direction = this.direction}
        let currHead = this.pos[0];
        let [newx, newy] = currHead.takeStep(direction);
        let newHead = new Coordinate(newx,newy);
        this.pos.splice(0,0,newHead);
        this.score -= 1;
        this.deleteTail();
    }
    deleteTail(){
        this.tail = this.pos.pop();
    }
    ateApple(apple){
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
     * @param {number} field.height -
     * @param {number} field.width - The employee's department.
     */
    checkCollision(field){
        let head = this.pos[0];
            if (head.x >= field.width || head.x < 0 || head.y >= field.height || head.y < 0) {
                this.score -= 40000;
                return true;
            }
        for (const segment of this.pos.slice(1)){
            if (head.x == segment.x && head.y == segment.y) {
                this.score -= 40000;
                return true;
            }
        }
        return false;
    }
}
export {Field, Snake, Apple};
