import * as collection_utils from './collection.utils';

// --------------------------
// public
// --------------------------

export function formatMenu (templates, config = {}) {

    const _groups = collection_utils.groupBy(templates, (value) => {
        return value.split(/\_\_/g)[0];
    });

    return Object.keys(_groups).map((key) => {

        // single item

        if (_groups[ key ].length === 1 && !/\_\_index/g.test(_groups[ key ])) {
            return formatMenuItem(key, templates[ _groups[ key ][0] ], config);
        }

        // multiple items or nested single items

        const _index_index = collection_utils.regexIndexOf(_groups[ key ], /index/g);
        const _index_config = formatMenuIndexItem(_groups[ key ][ _index_index ], templates[ _groups[ key ][ _index_index ] ]);
        const _menu_item = formatMenuItem(_index_config.key, _index_config.data, config);
        const _keys_excluding_index = [
            ..._groups[ key ].slice(0, _index_index),
            ..._groups[ key ].slice(_index_index + 1)
        ];

        return Object.assign({}, _menu_item, {
            items: _keys_excluding_index.map((key) => formatMenuItem(key, templates[ key ], config))
        });
    });
}

export function formatMenuLabel (label, config) {

    if (!config.hasOwnProperty('label')) {
        return label;
    }

    // index

    // if (config.label.hasOwnProperty('index') && /^Index/.test(label)) {
    //     label = label.replace(/^Index/, 'Home');
    // }

    // separators

    // list number separator
    if (config.label.hasOwnProperty('list_number_separator') && /^\d+/.test(label)) {
        label = label.replace(/^(\d+)/, `$1${config.label.list_number_separator}`);
    }

    // number separators
    if (config.label.hasOwnProperty('number_separators')) {

        label = Object.keys(config.label.number_separators).reduce((result, key) => {
            const _reg_exp = new RegExp(`(${key}\\s\\d+)`, 'gi');
            return result.replace(_reg_exp, `$1${config.label.number_separators[ key ]}`);
        }, label);
    }

    // replacements

    if (!config.label.hasOwnProperty('replacements')) {
        return label;
    }

    return Object.keys(config.label.replacements).reduce((result, key) => {
        const _reg_exp = new RegExp(`${key}`, 'gi');
        return result.replace(_reg_exp, config.label.replacements[ key ]);
    }, label);
}

export function formatRoutes (templates) {
    return Object.keys(templates).map(key => {

        let _path = `/${formatLinkKey(key)}`;
        _path = /\_\_index/g.test(key) ? _path.replace('/index', '') : _path;

        return { path: _path, component: { template: templates[ key ].template } };
    });
}

export function populateCategoryIndices (menu, category_config) {

    // build result from category_config
    let _result = category_config.map((item) => Object.assign({}, { label: item.label, menu_indices: [] }));

    // set uncategorised index
    let _uncategorised_index = 0;//_result.length;

    // add uncategorised category
    _result = [ { label: "", menu_indices: []}, ..._result ];
    let _category_config = [ { label: "", items: []}, ...category_config ];

    let _category_index;

    return menu.reduce((result, item, i) => {
        _category_index = _category_config.reduce((result, category, category_i) => {
            return category.items.indexOf(item.to) > -1 ? category_i : result
        }, null);

        if (_category_index === null) {
            _result[ _uncategorised_index ].menu_indices.push(i);
        } else {
            _result[ _category_index ].menu_indices.push(i);
        }

        return result;
    }, _result);
}

export function sortMenu (menu, prop, order) {

    return [ ...menu ].sort((a, b) => {

        const _a_i = order.indexOf(a[ prop ]);
        const _b_i = order.indexOf(b[ prop ]);

        if (_a_i === -1 || _b_i === -1) {
            return 0;
        }

        return _a_i - _b_i;
    });
}

// --------------------------
// private
// --------------------------

function formatLinkKey (key) {
    return key.replace(/\_\_/g, "/").replace(/\_/g, "-");//.replace(/^index/, "");
}

function formatMenuItem (key, data, config = {}) {
    return {
        to: `/${formatLinkKey(key)}`,
        label: formatMenuLabel(data.label, config),
        key: data.key
    };
}

function formatMenuIndexItem (key, data) {

    const _key = key.replace('__index', '');
    const _label = _key.replace(/_/g, ' ');

    return {
        key : _key,
        data: Object.assign({}, data, {
            label: _label.charAt(0).toUpperCase() + _label.slice(1)
        })
    };
}
