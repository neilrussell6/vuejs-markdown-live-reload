import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import * as templates from 'data/content/template-map';

function formatLinkKey (key) {
    return key.replace(/\_\_/g, "/").replace(/\_/g, "-");
}

const routes = Object.keys(templates).map(key => {
    return { path: `/${formatLinkKey(key)}`, component: { template: templates[ key ].template } };
});

Vue.use(VueRouter);

const router = new VueRouter({ routes });

new Vue({
    router,
    el: '#app',
    components: { App }
});
