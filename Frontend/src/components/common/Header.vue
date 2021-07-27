<template>
    <div>

        <div class="topbar">
            <!-- LOGO -->
            <div class="topbar-left">
                <router-link style="color: white; text-transform: uppercase" :to="'dashboard'" class="logo">Padma Smart Technology LTD.</router-link>
            </div>
            <nav class="navbar-custom">

                <ul class="navbar-right d-flex list-inline float-right mb-0">


                    <li class="list-inline-item dropdown notification-list">
                        <a class="nav-link dropdown-toggle arrow-none waves-effect nav-user" data-toggle="dropdown" href="#"
                            role="button" aria-haspopup="false" aria-expanded="false">
                            <span class="d-none d-md-inline-block ml-1">Admin
                                <i class="mdi mdi-chevron-down"></i>
                            </span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-animated profile-dropdown">
                            <a @click="logout()" class="dropdown-item" href="#"><i class="dripicons-exit text-muted"></i> Logout</a>
                        </div>
                    </li>
                </ul>
                <ul class="list-inline menu-left mb-0">
                    <li class="float-left">
                        <button class="button-menu-mobile open-left waves-effect"><i class="mdi mdi-menu"></i></button>
                    </li>
                </ul>
            </nav>
        </div>

    </div>
</template>
