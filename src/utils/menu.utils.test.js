import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import * as utils from './menu.utils';

describe("Menu Utils", () => {

    describe("formatMenu", () => {

        it("should return a collection with to and label keys", () => {

            const _templates = {
                code_examples: { template: "<div>html...</div>", label: "Code examples", key: 'code_examples' },
                sub_dir__index: { template: "<div>html...</div>", label: "Index", key: 'sub_dir__index' },
                sub_dir__sub_page1: { template: "<div>html...</div>", label: "Sub page 1", key: 'sub_dir__sub_page1' },
                sub_dir__sub_page2: { template: "<div>html...</div>", label: "Sub page 2", key: 'sub_dir__sub_page2' },
            };

            deepFreeze(_templates);

            let _result = utils.formatMenu(_templates);

            expect(_result[0]).to.have.property('to', '/code-examples');
            expect(_result[0]).to.have.property('label', 'Code examples');
            expect(_result[0]).to.have.property('key', 'code_examples');
            expect(_result[0]).to.not.have.property('items');

            expect(_result[1]).to.have.property('to', '/sub-dir');
            expect(_result[1]).to.have.property('label', 'Sub dir');
            expect(_result[1]).to.have.property('key', 'sub_dir__index');
            expect(_result[1]).to.have.property('items').to.be.an('array');

            expect(_result[1].items[0]).to.have.property('to', '/sub-dir/sub-page1');
            expect(_result[1].items[0]).to.have.property('label', 'Sub page 1');
            expect(_result[1].items[0]).to.have.property('key', 'sub_dir__sub_page1');
            expect(_result[1].items[0]).to.not.have.property('items');

            expect(_result[1].items[1]).to.have.property('to', '/sub-dir/sub-page2');
            expect(_result[1].items[1]).to.have.property('label', 'Sub page 2');
            expect(_result[1].items[1]).to.have.property('key', 'sub_dir__sub_page2');
            expect(_result[1].items[1]).to.not.have.property('items');
        });
    });

    describe("formatMenu", () => {

        it("should return a collection with to and label keys", () => {

            const _templates = {
                code_examples: { template: "<div>html...</div>", label: "Code examples", key: 'code_examples' },
                sub_dir__index: { template: "<div>html...</div>", label: "Index", key: 'sub_dir__index' },
                sub_dir__sub_page1: { template: "<div>html...</div>", label: "Sub page 1", key: 'sub_dir__sub_page1' },
                sub_dir__sub_page2: { template: "<div>html...</div>", label: "Sub page 2", key: 'sub_dir__sub_page2' },
            };

            deepFreeze(_templates);

            let _result = utils.formatMenu(_templates);

            expect(_result[0]).to.have.property('to', '/code-examples');
            expect(_result[0]).to.have.property('label', 'Code examples');
            expect(_result[0]).to.have.property('key', 'code_examples');
            expect(_result[0]).to.not.have.property('items');

            expect(_result[1]).to.have.property('to', '/sub-dir');
            expect(_result[1]).to.have.property('label', 'Sub dir');
            expect(_result[1]).to.have.property('key', 'sub_dir__index');
            expect(_result[1]).to.have.property('items').to.be.an('array');

            expect(_result[1].items[0]).to.have.property('to', '/sub-dir/sub-page1');
            expect(_result[1].items[0]).to.have.property('label', 'Sub page 1');
            expect(_result[1].items[0]).to.have.property('key', 'sub_dir__sub_page1');
            expect(_result[1].items[0]).to.not.have.property('items');

            expect(_result[1].items[1]).to.have.property('to', '/sub-dir/sub-page2');
            expect(_result[1].items[1]).to.have.property('label', 'Sub page 2');
            expect(_result[1].items[1]).to.have.property('key', 'sub_dir__sub_page2');
            expect(_result[1].items[1]).to.not.have.property('items');
        });
    });

    describe("formatMenuLabel", () => {

        it("should return a collection with to and label keys", () => {

            const _config = {
                label: {
                    replacements: {
                        'js': "JavaScript",
                        'es6': "ES6"
                    },
                    list_number_separator: ")",
                    number_separators: {
                        step: " :::"
                    }
                }
            };

            deepFreeze(_config);

            let _result = utils.formatMenuLabel('AAA js BBB 34 es6 js', _config);
            expect(_result).to.equal('AAA JavaScript BBB 34 ES6 JavaScript');

            _result = utils.formatMenuLabel('AAA Step 12 BBB', _config);
            expect(_result).to.equal('AAA Step 12 ::: BBB');

            _result = utils.formatMenuLabel('123 BBB 456', _config);
            expect(_result).to.equal('123) BBB 456');
        });
    });

    describe("formatRoutes", () => {

        it("should return a collection of routes", () => {

            const _templates = {
                code_examples: { template: "<div>html...</div>", label: "Code examples", key: 'code_examples' },
                sub_dir__index: { template: "<div>html...</div>", label: "Index", key: 'sub_dir__index' },
                sub_dir__sub_page1: { template: "<div>html...</div>", label: "Sub page 1", key: 'sub_dir__sub_page1' },
                sub_dir__sub_page2: { template: "<div>html...</div>", label: "Sub page 2", key: 'sub_dir__sub_page2' },
            };

            deepFreeze(_templates);

            let _result = utils.formatRoutes(_templates);

            expect(_result).to.have.length(4);

            expect(_result[0]).to.have.property('path', '/code-examples');
            expect(_result[0]).to.have.property('component');
            expect(_result[0].component).to.have.property('template', '<div>html...</div>');
        });
    });

    describe("populateCategoryIndices", () => {

        it("should return a collection of categories with page indices", () => {

            const _menu = [
                { to: '/aaa' },
                { to: '/bbb' },
                { to: '/ccc/ddd' }
            ];
            const _category_config = [
                {
                    "label": "AAA",
                    "items": [
                        "/ccc/ddd",
                        "/aaa"
                    ]
                }
            ];

            deepFreeze(_menu);
            deepFreeze(_category_config);

            let _result = utils.populateCategoryIndices(_menu, _category_config);

            expect(_result[1]).to.have.property('label', 'AAA');
            expect(_result[1]).to.have.property('menu_indices');
            expect(_result[1].menu_indices).to.include(0);
            expect(_result[1].menu_indices).to.include(2);

            expect(_result[0]).to.have.property('label', '');
            expect(_result[0]).to.have.property('menu_indices');
            expect(_result[0].menu_indices).to.include(1);
        });
    });

    describe("sortMenu", () => {

        it("should sort menu according to provided order, by specified property, with specified items preceding unspecified items", () => {

            const _menu = [
                { abc: '/aaa' },
                { abc: '/bbb' },
                { abc: '/ccc/ddd' }
            ];
            const _order_config = [ '/bbb', '/aaa' ];

            deepFreeze(_menu);
            deepFreeze(_order_config);

            let _result = utils.sortMenu(_menu, 'abc', _order_config);

            expect(_result[0]).to.have.property('abc', '/bbb');
            expect(_result[1]).to.have.property('abc', '/aaa');
            expect(_result[2]).to.have.property('abc', '/ccc/ddd');
        });
    });
});
