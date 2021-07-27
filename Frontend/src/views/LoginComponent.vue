<template>

    <div>

        <!-- Begin page -->
        <div class="accountbg" style="background: #C1272C !important;"></div>

        <div class="wrapper-page" style="background: #C1272C !important;">
            <div class="card">
                <div class="card-body">
                    <div class="p-3">
                        <div class="float-right text-right">
                            <h4 class="font-18 mt-3 m-b-5">Welcome to Padma Smart Technology LTD. </h4>
                            <p class="text-muted">Please enter your credentials below</p>
                        </div>
                    </div>
                    <div class="p-3 mt-5">
                        <form class="form-horizontal m-t-10" @submit.prevent="login({'url': backendURL+'/api/auth/login'})" method="post">

                            <div class="form-group">
                                <label>Email <span class="text-primary">*</span> </label>
                                <input type="text" v-validate="'required|email'" name="email" v-model="formData.email" class="form-control" placeholder="Enter Email">
                                <span class="text-primary">{{ errors.first('email') }}</span>
                            </div>
                            <div class="form-group">
                                <label>Password <span class="text-primary">*</span> </label>
                                <input type="password" v-validate="'required'" name="password" v-model="formData.password" class="form-control" placeholder="Password">
                                <span class="text-primary">{{ errors.first('password') }}</span>
                            </div>
                            <div class="form-group row m-t-30">
                                <div class="col-sm-12 text-right">
                                    <button style=" background-color: #C1272C; border: 1px solid #C1272C;" class="btn btn-primary w-md waves-effect waves-light" type="submit">Log In</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            <div class="m-t-40 text-center text-white-50" >
                <p style="color: white;">© {{ new Date().getFullYear() }} Padma Smart Technology LTD. All rights reserved.</p>
            </div>
        </div>

    </div>

</template>

<script>

export default {

    created() {

    },
    methods:{
        showAlert(){

            this.$swal('Are you sure?');
        }
    }

}

</script>
