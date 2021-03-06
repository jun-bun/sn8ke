import {Field, Snake, Apple} from './env.js';

describe("Main tests", ()=>{
    test('Create Field 1x1 ', () => {
        var field = new Field(1, 1);
        var output = [[0]];
        expect(field.getFieldState()).toEqual(output);
    });
    test('Create Field 2x2 ', () => {
        var field = new Field(2, 2);
        var output = [[0,0],[0,0]];
        expect(field.getFieldState()).toEqual(output);
    });
});