<template>

    <!-- Begin page -->
    <div id="wrapper"  v-if="$route.path !== '/login' && this.token.access_token">

        <!-- Top Bar Start -->
        <Header></Header>
        <!-- Top Bar End -->

        <!--  Left Sidebar Start  -->
        <Sidebar></Sidebar>
        <!-- Left Sidebar End -->


        <!-- Start right Content here -->
        <div class="content-page">

            <router-view/>

            <footer class="footer">© {{ new Date().getFullYear() }} Padma Smart Technology LTD. All rights reserved. </footer>
        </div>
        <!-- End Right content here -->

        <template v-if="$store.state.pageLoader">
            <Loader></Loader>
        </template>

    </div>

    <div v-else>
        <router-view/>


        <template v-if="$store.state.pageLoader">
            <Loader></Loader>
        </template>

    </div>


</template>

<script>
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import Loader from './components/common/Loader';



export default {
    //add app.js for all component
    mounted() {
        let recaptchaScript = document.createElement('script');
        recaptchaScript.setAttribute('src', '/backend/assets/js/app.js');
        document.head.appendChild(recaptchaScript)
    },
    components:{
        Header,Sidebar,Loader
    }
}

</script>


