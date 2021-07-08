import {Coordinate, Snake, Field, Player} from "./env.js";

function objectsToCoordinate(objects) {
    let coordinates = []

    for (let item in objects) {
        let coordinate = new Coordinate(item.x, item.y);
        coordinates.push(coordinate);
    }
    return (coordinates);
}

class BasicAi{
    constructor(){
        this.player = null;
        this.actions = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]
    }
    setplayer(player){this.player = player};

    makeMove(direction){
        return this.player.makeMove(direction);
    }
    step(observations){
        if (!observations) {
            return this.actions[2];
        }
        else {
            const apple = observations["apple"];
            const self = observations["self"];
            const opponent = observations["opponent"];
            const field = new Field(observations["h"], observations["w"]);
            let closest = null; // lowest distance from the apple
            let validActions = [];
            let newSnake = new Snake(self.pos.map((x) => x));
            field.p1 = newSnake;
            field.p2 = opponent;
            newSnake.pos.unshift(null);
            for (let action of this.actions){
                let newHead = newSnake.pos[1].takeStep(action);
                newSnake.pos[0] = newHead;
                if (!newSnake.isColliding(field)){
                    let distanceFromApple = newHead.getDistance(apple.location);
                    if (!closest || distanceFromApple <= closest) {
                        validActions.push(action);
                        closest = distanceFromApple;
                    }
                }
                console.log(newSnake.isColliding(field), action, validActions, closest);
            }
            return validActions[Math.floor(Math.random()*validActions.length)];
        }
    }
}

export {BasicAi}


/*
module.exports = {BasicAi, reverseAction};
*/
