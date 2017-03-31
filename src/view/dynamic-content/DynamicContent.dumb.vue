<template>

    <div class="body">

        <aside class="aside aside-1">

            <ul class="nav">

                <li v-for="item in menu" class="nav-item">
                    <router-link :to="item.to">{{item.label}}</router-link>

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

    // data
    import * as templates from 'data/content/template-map';

    // utils
    import * as menu_utils from 'utils/menu.utils';

    // ----------------------------
    // VueJS
    // ----------------------------

    const _menu_order = [
        '/index',
        '/code-examples'
    ];
    const _menu = menu_utils.sortMenu(menu_utils.formatMenu(templates), 'to', _menu_order);

    export default {

        data: function () {
            return {
                menu: _menu,
                selected_item: null
            };
        },

        methods: {
            onSelect (link) {
                this.selected_item = link;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '../../styles/dynamic-content.scss';
</style>
