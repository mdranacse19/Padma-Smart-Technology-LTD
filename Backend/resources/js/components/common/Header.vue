<template>
    <div>

        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <router-link v-if="$route.name != 'Login'" class="navbar-brand" :to="'/home'">
                    HOME
                </router-link>
                <a v-else class="navbar-brand">
                    Laravel
                </a>
                <a style="cursor: pointer" v-if="$route.name != 'Login'" @click="logout()" class="navbar-brand">
                    LOGOUT
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->

                </div>
            </div>
        </nav>

    </div>
</template>

<script>
    export default {
        mounted() {
            //console.log('Component mounted.')
        }
    }
</script>
