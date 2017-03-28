import * as collection_utils from './collection.utils';

// --------------------------
// public
// --------------------------

export function formatMenu (templates) {

    const _groups = collection_utils.groupBy(templates, (value) => {
        return value.split(/\_\_/g)[0];
    });

    return Object.keys(_groups).map((key) => {

        // single item

        if (_groups[ key ].length === 1) {
            return formatMenuItem(key, templates[ _groups[ key ][0] ]);
        }

        // multiple items

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

// --------------------------
// private
// --------------------------

function formatLinkKey (key) {
    return key.replace(/\_\_/g, "/").replace(/\_/g, "-");
}

function formatMenuItem (key, data) {
    return { to: `/${formatLinkKey(key)}`, label: data.label };
}

function formatMenuIndexItem (key, data) {

    const _key = key.replace('__index', '');
    const _label = _key.replace('_', ' ');

    return {
        key : _key,
        data: Object.assign({}, data, {
            label: _label.charAt(0).toUpperCase() + _label.slice(1)
        })
    };
}
