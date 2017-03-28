const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const mkpath = require('mkpath');
// const markdownit = require('./markdown-it.js');
const markdownit = require('markdown-it');
const CODEPEN_CONFIG = require('./codepen-config.json');
const MD_2_HTML_CONFIG = require('./md-2-html-config.json');
const MARKDOWN_IT_CONFIG = require('./markdown-it-config.json');

const _markdownit = markdownit(MARKDOWN_IT_CONFIG)
    .use(require('markdown-it-code-embed'), CODEPEN_CONFIG)
    // .use(require('./markdown-it-code-embed/index'), CODEPEN_CONFIG)
    .use(require('markdown-it-highlightjs'));

function md2Html (src_path, src_dir, dest_dir) {

    let _path = path.parse(src_path);

    // create src & dest paths

    let _src_path = path.format(Object.assign({}, _path, {
        dir: _path.dir.replace('./', '')
    }));
    let _dest_path = path.format(Object.assign({}, _path, {
        dir: path.join(dest_dir, _path.dir.replace(src_dir, '')),
        base: _path.name + '.html'
    }));

    pathMd2Html(_src_path, _dest_path);
}

function formatResult (result, config) {

    if (!config.hasOwnProperty('wrapper') || !MD_2_HTML_CONFIG.wrapper.hasOwnProperty('tag')) {
        return result;
    }

    const _tag = MD_2_HTML_CONFIG.wrapper.tag;

    if (!config.wrapper.hasOwnProperty('class')) {
        return `<${_tag}>${result}</${_tag}>`;
    }

    const _class = config.wrapper.class;

    return `<${_tag} class="${_class}">${result}</${_tag}>`;
}

function pathMd2Html (path_in, path_out, options = {}) {

    fs.readFile(path_in, options, function (error, buffer) {

        if (error) {
            return console.error(error);
        }

        // custom render rules
        _markdownit.renderer.rules.link_open = function (tokens, idx) {
            let _link = tokens[idx].attrs.reduce((r, attr) => attr[0] === 'href' ? attr[1] : r, null);
            return `<a href="#${_link}">`;
        };

        let _result = formatResult(_markdownit.render(buffer.toString()), MD_2_HTML_CONFIG);
        let _dest_dir = require('path').dirname(path_out);

        mkdirp(_dest_dir, function (err) {

            if (error) {
                return console.error(error);
            }

            fs.writeFile(path_out, _result, function (error) {

                if (error) {
                    return console.error(error);
                }
            });
        });
    });
}

module.exports = {
    md2Html
};
