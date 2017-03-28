export function groupBy (source, iteratee) {

    let key;
    const _collection = source instanceof Array ? source : Object.keys(source);

    return _collection.reduce((result, value) => {

        key = iteratee(value);

        if (result.hasOwnProperty(key)) {
            return Object.assign({}, result, {
                [ key ]: [ ...result[ key ], value ]
            });
        }

        return Object.assign(result, { [ key ]: [ value ] });
    }, {});
}

export function regexIncludes (arr, regex) {
    return arr.filter((item) => item.match(regex)).length > 0;
}

export function regexIndexOf (arr, regex) {
    return arr.reduce((result, item, i) => item.match(regex) ? i : result, -1);
}
