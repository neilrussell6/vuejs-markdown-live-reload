import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import * as templates from 'data/content/template-map';
import * as menu_utils from 'utils/menu.utils';

Vue.use(VueRouter);

const _routes = menu_utils.formatRoutes(templates);

const router = new VueRouter({
    // mode: 'history',
    routes: _routes
});

new Vue({
    router,
    el: '#app',
    components: { App }
});
