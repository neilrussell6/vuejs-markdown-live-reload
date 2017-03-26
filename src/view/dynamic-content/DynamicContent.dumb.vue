<template>

    <div class="body">

        <aside class="aside aside-1">

            <ul class="nav">
                <li v-for="item in menu" class="nav-item">
                    <router-link :to="item.to">{{item.label}}</router-link>
                </li>
            </ul>

        </aside>

        <main class="main">

            <div class="svg-placeholder"></div>
            <!--<jagged-box-bg class="jagged-box-bg"></jagged-box-bg>-->

            <div class="content">
                <router-view></router-view>
            </div>

        </main>

    </div>

</template>

<script type="text/babel">

    // data
    import * as templates from 'data/content/template-map';

    // view
    import JaggedBoxBg from '../jagged-box-bg/JaggedBoxBg.dumb';

    function formatLinkKey (key) {
        return key.replace(/\_\_/g, "/").replace(/\_/g, "-");
    }

    const menu = Object.keys(templates).map(key => {
        return { to: `/${formatLinkKey(key)}`, label: templates[ key ].label };
    });

    // ----------------------------
    // VueJS
    // ----------------------------

    export default {

        components: {
            JaggedBoxBg
        },

        data: function () {
            return {
                menu
            };
        }
    };
</script>

<style lang="scss" scoped>
    @import '../../styles/dynamic-content.scss';
</style>