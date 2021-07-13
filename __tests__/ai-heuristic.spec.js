/*
import {Field, Player} from "../env";
*/

const {BasicAi, objectsToCoordinate} = require('../ai-heuristics');
const {Field, Snake, Player, Apple, Coordinate} = require('../env');

function setup(observations) {
    var player = new Player();
    var computer = new Player();
    var ai = new BasicAi();
    ai.setplayer(computer);
    var field = new Field(observations['h'], observations['w']);
    field.p1 = new Snake(objectsToCoordinate(observations['opponent'].pos));
    field.p2 = new Snake(objectsToCoordinate(observations['self'].pos));
    field.apple = new Apple(field);
    field.apple.setlocation((objectsToCoordinate([observations['apple'].location]))[0]);
    player.field = field;
    computer.field = field;
    player.snake = field.p1;
    computer.snake = field.p2;
    return {'apple': field.apple, 'self': field.p2, 'opponent': field.p1, 'h': observations['h'], 'w' : observations['w']};
}

describe("Step from observations", ()=> {
    test ("ObjectsToCoordinate function", ()=> {
        let observations = {
            "h": 20,
            "w": 20,
            "self": {
                "size": 4,
                "pos": [
                    {
                        "x": 14,
                        "y": 15
                    },
                    {
                        "x": 15,
                        "y": 15
                    },
                    {
                        "x": 16,
                        "y": 15
                    },
                    {
                        "x": 17,
                        "y": 15
                    }
                ],
                "score": -1,
                "direction": "ArrowRight",
                "tail": {
                    "x": 18,
                    "y": 15
                }
            },
            "opponent": {
                "size": 4,
                "pos": [
                    {
                        "x": 7,
                        "y": 5
                    },
                    {
                        "x": 6,
                        "y": 5
                    },
                    {
                        "x": 5,
                        "y": 5
                    },
                    {
                        "x": 4,
                        "y": 5
                    }
                ],
                "score": -2,
                "direction": "ArrowRight",
                "tail": {
                    "x": 3,
                    "y": 5
                }
            },
            "apple": {
                "location": {
                    "x": 0,
                    "y": 0
                }
            }
        };
        let coordinates = objectsToCoordinate([{x:1, y:2}])[0];
        expect(coordinates).toEqual(new Coordinate(1,2));
        expect(observations['self']['pos']).toEqual(objectsToCoordinate(
            [{"x": 14, "y": 15}, {"x": 15, "y": 15}, {"x": 16, "y": 15}, {"x": 17, "y": 15}]
        ))
    });

    test ("Apple at top left", () => {
        let observations = {
            "h": 20,
            "w": 20,
            "self": {
                "size": 4,
                "pos": [
                    {
                        "x": 14,
                        "y": 15
                    },
                    {
                        "x": 15,
                        "y": 15
                    },
                    {
                        "x": 16,
                        "y": 15
                    },
                    {
                        "x": 17,
                        "y": 15
                    }
                ],
                "score": -1,
                "direction": "ArrowRight",
                "tail": {
                    "x": 18,
                    "y": 15
                }
            },
            "opponent": {
                "size": 4,
                "pos": [
                    {
                        "x": 7,
                        "y": 5
                    },
                    {
                        "x": 6,
                        "y": 5
                    },
                    {
                        "x": 5,
                        "y": 5
                    },
                    {
                        "x": 4,
                        "y": 5
                    }
                ],
                "score": -2,
                "direction": "ArrowRight",
                "tail": {
                    "x": 3,
                    "y": 5
                }
            },
            "apple": {
                "location": {
                    "x": 0,
                    "y": 0
                }
            }
        };
        let ai = new BasicAi();
        let newobservations = setup(observations);
        expect(newobservations.apple.location).toEqual(new Coordinate(0,0));
        expect(["ArrowUp", "ArrowLeft"]).toContain(ai.step(newobservations));
    });
    test ("Apple at Bottom right", () => {
        let observations = {
            "h": 20,
            "w": 20,
            "self": {
                "size": 4,
                "pos": [
                    {
                        "x": 14,
                        "y": 15
                    },
                    {
                        "x": 15,
                        "y": 15
                    },
                    {
                        "x": 16,
                        "y": 15
                    },
                    {
                        "x": 17,
                        "y": 15
                    }
                ],
                "score": -1,
                "direction": "ArrowRight",
                "tail": {
                    "x": 18,
                    "y": 15
                }
            },
            "opponent": {
                "size": 4,
                "pos": [
                    {
                        "x": 7,
                        "y": 5
                    },
                    {
                        "x": 6,
                        "y": 5
                    },
                    {
                        "x": 5,
                        "y": 5
                    },
                    {
                        "x": 4,
                        "y": 5
                    }
                ],
                "score": -2,
                "direction": "ArrowRight",
                "tail": {
                    "x": 3,
                    "y": 5
                }
            },
            "apple": {
                "location": {
                    "x": 19,
                    "y": 19
                }
            }
        };
        let ai = new BasicAi();
        let newobservations = setup(observations);
        expect(newobservations.apple.location).toEqual(new Coordinate(19,19));
        expect(["ArrowDown", "ArrowRight"]).toContain(ai.step(newobservations));
    });
    test ("Move Left if Apple left of head", () => {
        let observations = {
            "h": 20,
            "w": 20,
            "self": {
                "size": 4,
                "pos": [
                    {
                        "x": 14,
                        "y": 15
                    },
                    {
                        "x": 15,
                        "y": 15
                    },
                    {
                        "x": 16,
                        "y": 15
                    },
                    {
                        "x": 17,
                        "y": 15
                    }
                ],
                "score": -1,
                "direction": "ArrowRight",
                "tail": {
                    "x": 18,
                    "y": 15
                }
            },
            "opponent": {
                "size": 4,
                "pos": [
                    {
                        "x": 7,
                        "y": 5
                    },
                    {
                        "x": 6,
                        "y": 5
                    },
                    {
                        "x": 5,
                        "y": 5
                    },
                    {
                        "x": 4,
                        "y": 5
                    }
                ],
                "score": -2,
                "direction": "ArrowRight",
                "tail": {
                    "x": 3,
                    "y": 5
                }
            },
            "apple": {
                "location": {
                    "x": 13,
                    "y": 15
                }
            }
        };
        let ai = new BasicAi();
        let newobservations = setup(observations);
        expect(ai.step(newobservations)).toBe("ArrowLeft");
    });
});