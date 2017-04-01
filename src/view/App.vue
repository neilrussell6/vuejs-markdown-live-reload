<template>
    <div class="wrapper">

        <header class="header">
            <div class="content-wrapper">
                <div class="content">
                    <h3 class="logo">
                        <i class="fa fa-smile-o" aria-hidden="true"></i>
                        <span class="primary"><span>Neil</span> Russell</span>
                        <span class="secondary">:: web developer</span>
                    </h3>
                </div>
            </div>
        </header>

        <div class="page">
            <dynamic-content></dynamic-content>
        </div>

        <footer class="footer content">neilrussell6@gmail.com</footer>

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
