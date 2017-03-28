<!--<template>-->
    <!--<div class="wrapper">-->

        <!--<div id="app">-->
              <!--<h1>Active Links</h1>-->
              <!--<ul>-->
                <!--<li><router-link to="/">/</router-link></li>-->
                <!--<li><router-link to="/" exact>/ (exact match)</router-link></li>-->

                <!--<li><router-link to="/users">/users</router-link></li>-->
                <!--<li><router-link to="/users" exact>/users (exact match)</router-link></li>-->

                <!--<li><router-link to="/users/evan">/users/evan</router-link></li>-->
                <!--<li><router-link to="/users/evan#foo">/users/evan#foo</router-link></li>-->
                <!--<li>-->
                  <!--<router-link :to="{ path: '/users/evan', query: { foo: 'bar' }}">-->
                    <!--/users/evan?foo=bar-->
                  <!--</router-link>-->
                <!--</li>-->
                <!--<li>&lt;!&ndash; #635 &ndash;&gt;-->
                  <!--<router-link :to="{ name: 'user', params: { username: 'evan' }, query: { foo: 'bar' }}" exact>-->
                    <!--/users/evan?foo=bar (named view + exact match)-->
                  <!--</router-link>-->
                <!--</li>-->
                <!--<li>-->
                  <!--<router-link :to="{ path: '/users/evan', query: { foo: 'bar', baz: 'qux' }}">-->
                    <!--/users/evan?foo=bar&baz=qux-->
                  <!--</router-link>-->
                <!--</li>-->

                <!--<li><router-link to="/about">/about</router-link></li>-->

                <!--<router-link tag="li" to="/about">-->
                  <!--<a>/about (active class on outer element)</a>-->
                <!--</router-link>-->
              <!--</ul>-->
              <!--<router-view class="view"></router-view>-->
            <!--</div>-->
    <!--</div>-->
<!--</template>-->

<!--<script type="text/babel">-->

<!--</script>-->

<!--<style lang="scss">-->
    <!--a.router-link-active {-->
      <!--color: #f66;-->
    <!--}-->
    <!--li.router-link-active a {-->
      <!--color: #f66;-->
    <!--}-->
<!--</style>-->




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
