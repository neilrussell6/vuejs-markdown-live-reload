import * as collection_utils from './collection.utils';

// --------------------------
// public
// --------------------------

export function formatRoutes (templates) {
    return Object.keys(templates).map(key => {

        let _path = `/${formatLinkKey(key)}`;
        _path = /\_\_index/g.test(key) ? _path.replace('/index', '') : _path;

        return { path: _path, component: { template: templates[ key ].template } };
    });
}

export function formatMenu (templates) {

    const _groups = collection_utils.groupBy(templates, (value) => {
        return value.split(/\_\_/g)[0];
    });

    return Object.keys(_groups).map((key) => {

        // single item

        if (_groups[ key ].length === 1 && !/\_\_index/g.test(_groups[ key ])) {
            return formatMenuItem(key, templates[ _groups[ key ][0] ]);
        }

        // multiple items or nested single items

        const _index_index = collection_utils.regexIndexOf(_groups[ key ], /index/g);
        const _index_config = formatMenuIndexItem(_groups[ key ][ _index_index ], templates[ _groups[ key ][ _index_index ] ]);
        const _menu_item = formatMenuItem(_index_config.key, _index_config.data);
        const _keys_excluding_index = [
            ..._groups[ key ].slice(0, _index_index),
            ..._groups[ key ].slice(_index_index + 1)
        ];

        return Object.assign({}, _menu_item, {
            items: _keys_excluding_index.map((key) => formatMenuItem(key, templates[ key ]))
        });
    });
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

export function populateCategoryIndices (menu, category_config) {

    // build result from category_config
    let _result = category_config.map((item) => Object.assign({}, { label: item.label, menu_indices: [] }));

    // set uncategorised index
    let _uncategorised_index = _result.length;

    // add uncategorised category
    _result = [ ..._result, { label: "Uncategorised", menu_indices: [] } ];

    let _category_index;

    return menu.reduce((result, item, i) => {
        _category_index = category_config.reduce((result, category, category_i) => category.items.indexOf(item.to) > -1 ? category_i : result, null);

        if (_category_index === null) {
            _result[ _uncategorised_index ].menu_indices.push(i);
        } else {
            _result[ _category_index ].menu_indices.push(i);
        }

        return result;
    }, _result);
}

// --------------------------
// private
// --------------------------

function formatLinkKey (key) {
    return key.replace(/\_\_/g, "/").replace(/\_/g, "-");
}

function formatMenuItem (key, data) {
    return {
        to: `/${formatLinkKey(key)}`,
        label: data.label,
        key: data.key
    };
}

function formatMenuIndexItem (key, data) {

    console.log("formatMenuIndexItem ",key, data);
    // return { key, data };

    const _key = key.replace('__index', '');
    const _label = _key.replace(/_/g, ' ');

    return {
        key : _key,
        data: Object.assign({}, data, {
            label: _label.charAt(0).toUpperCase() + _label.slice(1)
        })
    };
}
