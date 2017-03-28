import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import * as utils from './collection.utils';

describe("Collection utils", () => {

    describe("groupBy", () => {

        it("should correctly group given array", () => {

            const _arr = [ 6.1, 4.2, 6.3 ];

            deepFreeze(_arr);

            let _result = utils.groupBy(_arr, Math.floor);

            expect(_result).to.have.property('4').that.is.an('array');
            expect(_result).to.have.property('6').that.is.an('array');
            expect(_result['4']).to.include(4.2);
            expect(_result['6']).to.include(6.1);
            expect(_result['6']).to.include(6.3);
        });

        it("should correctly group given array", () => {

            const _arr = [ 'aaa__a1', 'aaa__a2_a3', 'bbb_b1' ];

            deepFreeze(_arr);

            let _result = utils.groupBy(_arr, (value) => {
                return value.split(/\_\_/g)[0];
            });

            expect(_result).to.have.property('aaa').that.is.an('array');
            expect(_result).to.have.property('bbb_b1').that.is.an('array');
            expect(_result['aaa']).to.include('aaa__a1');
            expect(_result['aaa']).to.include('aaa__a2_a3');
            expect(_result['bbb_b1']).to.include('bbb_b1');
        });

        it("should correctly group given object", () => {

            const _obj = { 'aaa__a1': 111, 'aaa__a2_a3': 222, 'bbb_b1': 333 };

            deepFreeze(_obj);

            let _result = utils.groupBy(_obj, (value) => {
                return value.split(/\_\_/g)[0];
            });

            expect(_result).to.have.property('aaa').that.is.an('array');
            expect(_result).to.have.property('bbb_b1').that.is.an('array');
            expect(_result['aaa']).to.include('aaa__a1');
            expect(_result['aaa']).to.include('aaa__a2_a3');
            expect(_result['bbb_b1']).to.include('bbb_b1');
        });
    });

    describe("regexIncludes", () => {

        it("should return true", () => {

            const _arr = [ "aaabbbccc", "aaaccc", "cccddd" ];

            deepFreeze(_arr);

            let _result = utils.regexIncludes(_arr, /bbb/g);

            expect(_result).to.be.true;
        });

        it("should return false", () => {

            const _arr = [ "aaabbbccc", "aaaccc", "cccddd" ];

            deepFreeze(_arr);

            let _result = utils.regexIncludes(_arr, /eee/g);

            expect(_result).to.be.false;
        });
    });

    describe("regexIndexOf", () => {

        it("should return 0", () => {

            const _arr = [ "aaabbbccc", "aaaccc", "cccddd" ];

            deepFreeze(_arr);

            let _result = utils.regexIndexOf(_arr, /bbb/g);

            expect(_result).to.be.equal(0);
        });

        it("should return -1", () => {

            const _arr = [ "aaabbbccc", "aaaccc", "cccddd" ];

            deepFreeze(_arr);

            let _result = utils.regexIndexOf(_arr, /eee/g);

            expect(_result).to.be.equal(-1);
        });
    });
});
