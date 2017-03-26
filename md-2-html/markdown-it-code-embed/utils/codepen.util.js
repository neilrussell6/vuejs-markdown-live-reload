'use strict';

const services_config = require('../data/services.json');
const ConfigService = require('../services/config.service');

function getEmbedCode(config) {

    // merge configs in order of preference
    let _config = Object.assign({}, services_config.codepen, ConfigService.config, config);

    // replace vars in placeholder using config
    _config.placeholder = ConfigService.populatePlaceholder(_config.placeholder, _config);

    if (ConfigService.config.hasOwnProperty('iframe') && ConfigService.config.iframe) {
        return `<iframe height="${_config.height}" scrolling="no" title="${_config.pen_title}" src="//codepen.io/${_config.user}/embed/${_config.slug_hash}/?height=${_config.height}&theme-id=${_config.theme_id}&default-tab=${_config.default_tab}&embed-version=${_config.embed_version}" frameborder="no" allowtransparency="true" allowfullscreen="true" style="width: 100%;">\n`;
    }

    return `<p data-height="${_config.height}" data-theme-id="${_config.theme_id}" data-slug-hash="${_config.slug_hash}" data-default-tab="${_config.default_tab}" data-user="${_config.user}" data-embed-version="${_config.embed_version}" data-pen-title="${_config.pen_title}" class="${_config.class}">${_config.placeholder}</p>\n`;
}

module.exports = {
    getEmbedCode
};