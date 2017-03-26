<template>
    <div class="wrapper">

        <div class="page">

            <div class="header content">
                <h3>
                    <i class="fa fa-smile-o" aria-hidden="true"></i>
                    <span class="highlight">Neil Russell</span>
                </h3>
            </div>

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
