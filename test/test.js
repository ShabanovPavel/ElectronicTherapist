/**
 * Created by FIRCorp on 20.03.2017.
 */
var assert = require('assert');

describe('TherapistStart', function () {
    describe('#Check job', function () {
        it('should return error', function () {
            assert.equal(4, 2);
        });
    });

    describe('#Check class Main', function () {
        it('should return true, if class create ', function () {
            assert.ok( new Main());
        });
    });
});


