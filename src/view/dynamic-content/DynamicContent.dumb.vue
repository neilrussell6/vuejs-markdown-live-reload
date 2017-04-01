<template>

    <div class="body">

        <aside class="aside aside-1">

            <ul class="nav">

                <li v-for="item in menu" class="nav-item" :class="{'selected': selected_item_key === item.key}">

                    <router-link :to="item.to" v-on:click.native="_onSelect(item)">{{item.label}}</router-link>

                    <template v-if="item.hasOwnProperty('items')">

                        <ul class="nav sub-nav">
                            <li v-for="subitem in item.items" class="nav-item">
                                <router-link :to="subitem.to">{{subitem.label}}</router-link>
                            </li>
                        </ul>

                    </template>

                </li>
            </ul>

        </aside>

        <main class="main content-wrapper">
            <div class="content content-main">
                <router-view></router-view>
            </div>
        </main>

    </div>

</template>

<script type="text/babel">

    import { router } from '../main';

    // data
    import * as templates from 'data/content/template-map';

    // utils
    import * as menu_utils from 'utils/menu.utils';
    import * as collection_utils from 'utils/collection.utils';

    // ----------------------------
    // VueJS
    // ----------------------------

    const _menu_order = [
        '/index',
        '/sub-dir',
        '/code-examples',
        '/sub-dir-2'
    ];
    const _menu = menu_utils.sortMenu(menu_utils.formatMenu(templates), 'to', _menu_order);

    export default {

        data: function () {
            return {
                menu: _menu,
                selected_item_key: null
            };
        },

        methods: {
            _onSelect (link) {
                this.selected_item_key = link.key;
            }
        },

        mounted: function () {
            const _selected_item = collection_utils.findByKeyValue(_menu, 'to', router.currentRoute.path);
            this.selected_item_key = _selected_item.key;
        }
    };
</script>

<style lang="scss" scoped>
    @import '../../styles/dynamic-content.scss';
</style>
