import {filterUsers} from "./filters.js";

describe('Users Filter function', () => {
    test('default array', () => {
        expect(filterUsers([{name: 'Alice'}, {name: 'John'}, {name: 'David'}], 'al')).toEqual([{name: 'Alice'}])
        expect(filterUsers([{name: 'Alice'}, {name: 'John'}, {name: 'David'}], 'jo')).toEqual([{name: 'John'}])
        expect(filterUsers([{name: 'Alice'}, {name: 'John'}, {name: 'David'}], 'a')).toEqual([{name: 'Alice'}, {name: 'David'}])
    })
    
    test('empty query', () => {
        expect(filterUsers([{name: 'Alice'}, {name: 'John'}, {name: 'David'}], '')).toEqual([{name: 'Alice'}, {name: 'John'}, {name: 'David'}])
        
    })
    
    test('empty array', () => {
        expect(filterUsers([], '')).toEqual([])
        expect(filterUsers([], 'qwe')).toEqual([])
    })
});