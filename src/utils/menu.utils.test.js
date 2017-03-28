import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import * as utils from './menu.utils';

describe("Menu Utils", () => {

    describe("formatMenu", () => {

        it("should return a collection with to and label keys", () => {

            const _templates = {
            	code_examples: { template: "<div>html...</div>", label: "Code examples" },
            	sub_dir__index: { template: "<div>html...</div>", label: "Index" },
            	sub_dir__sub_page1: { template: "<div>html...</div>", label: "Sub page 1" },
            	sub_dir__sub_page2: { template: "<div>html...</div>", label: "Sub page 2" }
            };

            deepFreeze(_templates);

            let _result = utils.formatMenu(_templates);

            expect(_result[0]).to.have.property('to', '/code-examples');
            expect(_result[0]).to.have.property('label', 'Code examples');
            expect(_result[0]).to.not.have.property('items');

            expect(_result[1]).to.have.property('to', '/sub-dir');
            expect(_result[1]).to.have.property('label', 'Sub dir');
            expect(_result[1]).to.have.property('items').to.be.an('array');

            expect(_result[1].items[0]).to.have.property('to', '/sub-dir/sub-page1');
            expect(_result[1].items[0]).to.have.property('label', 'Sub page 1');
            expect(_result[1].items[0]).to.not.have.property('items');

            expect(_result[1].items[1]).to.have.property('to', '/sub-dir/sub-page2');
            expect(_result[1].items[1]).to.have.property('label', 'Sub page 2');
            expect(_result[1].items[1]).to.not.have.property('items');
        });
    });
});
