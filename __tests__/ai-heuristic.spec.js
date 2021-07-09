const {BasicAi, reverseAction} = require('../ai-heuristics');
const {Coordinate} = require('../env');

describe("reverseAction", ()=> {
    test('ArrowDown', () => {
        expect(reverseAction("ArrowDown")).toEqual("ArrowUp");
    });
    test('ArrowUp', () => {
        expect(reverseAction("ArrowUp")).toEqual("ArrowDown");
    });
    test('ArrowLeft', () => {
        expect(reverseAction("ArrowLeft")).toEqual("ArrowRight");
    });
    test('ArrowRight', () => {
        expect(reverseAction("ArrowRight")).toEqual("ArrowLeft");
    });
});


describe("Step from observations", ()=> {
    test ("Apple at top left", () => {
        const observations = {
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
        var ai = new BasicAi();
        expect(ai.step(observations)).toEqual("ArrowUp");
    });
});