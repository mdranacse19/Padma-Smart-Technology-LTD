<template>
    <div>

        <div class="left side-menu" style="background: rgb(193, 39, 44) !important">
            <div class="slimscroll-menu" id="remove-scroll">
                <!--- Sidemenu -->
                <div id="sidebar-menu">
                    <!-- Left Menu Start -->
                    <ul class="metismenu" id="side-menu">

                        <li class="menu-title">Main</li>
                        <li><router-link :to="'/dashboard'" class="waves-effect"><i class="dripicons-meter"></i> <span>DASHBOARD</span></router-link></li>

                        <!-- <li class="menu-title">Components</li> -->
                    </ul>
                </div><!-- Sidebar -->
                <div class="clearfix"></div>
            </div><!-- Sidebar -left -->
        </div>

    </div>
</template>



