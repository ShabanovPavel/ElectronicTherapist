/**
 * Created by FIRCorp on 20.03.2017.
 */
var assert = require('assert');

describe('TherapistStart', () => {
    describe('#Check job', () => {
        it('should return error', () => {
            assert.equal(4, 2);
        });
    });

    describe('#Check class Main', () => {
        it('should return true, if class create ', () => {
            assert.ok(new Main());
        });
    });

    describe('#Check class Question', () => {
        it('should return true, if class create ', () => {
            assert.ok(new Question());
        });
    });

    describe('#Check class Catalog', () => {
        it('should return true, if class create ', () => {
            assert.ok(new Catalog());
        });
    });
});


class Main {

}

class Question {

}