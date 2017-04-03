<template>
    <div class="wrapper">

        <header class="header">
            <div class="content-wrapper">
                <div class="content">
                    <h3 class="logo">
                        <span class="primary"><span>VueJS</span> :: Markdown to HTML</span>
                        <span class="secondary">with Live Reload</span>
                    </h3>
                </div>
            </div>
        </header>

        <div class="page">
            <dynamic-content></dynamic-content>
        </div>

        <footer class="footer content">&nbsp;</footer>

    </div>
</template>

<script type="text/babel">

    // view
    import DynamicContent from './dynamic-content/DynamicContent.dumb';

    export default {

        components: {
            DynamicContent
        }
    };
</script>

<style lang="scss">
    @import '../styles/app.scss';
    @import '../styles/dynamic-content.scss';
</style>
