<template>

    <div class="body">

        <aside class="aside aside-1">

            <ul class="nav">

                <li v-for="item in menu" class="nav-item">
                    <router-link :to="item.to">{{item.label}}</router-link>

                    <template v-if="item.hasOwnProperty('items')">

                        <ul class="nav">
                            <li v-for="subitem in item.items" class="nav-item">
                                <router-link :to="subitem.to">{{subitem.label}}</router-link>
                            </li>
                        </ul>

                    </template>

                </li>
            </ul>

        </aside>

        <main class="main">

            <div class="svg-placeholder"></div>

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

    let _menu = menu_utils.formatMenu(templates);

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
