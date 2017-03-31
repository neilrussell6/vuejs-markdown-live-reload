<template>
    <div class="wrapper">

        <div class="header content-wrapper">
            <div class="content">
                <h3 class="logo">
                    <i class="fa fa-smile-o" aria-hidden="true"></i>
                    <span>Neil Russell</span>
                    <span class="secondary">:: full stack web developer</span>
                </h3>
            </div>
        </div>

        <div class="page">

            <dynamic-content></dynamic-content>

            <div class="footer content">neilrussell6@gmail.com</div>

        </div>
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
