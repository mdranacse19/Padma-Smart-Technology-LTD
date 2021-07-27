<template>
    <div>

        <main class="py-4">

            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">LOGIN</div>

                            <div class="card-body">

                                <div class="row">
                                    <div class="col-12">
                                        <form method="post" @submit.prevent="login({'url' : baseUrl+'/api/auth/login'} )">
                                            <div class="form-group row">
                                                <label class="col-sm-4 col-form-label">Email</label>
                                                <div class="col-sm-8">
                                                    <input type="text" v-validate="'required|email'" name="email" v-model="formData.email" class="form-control" placeholder="Enter Email">
                                                    <span class="text-danger">{{ errors.first('email') }}</span>
                                                    <span class="text-danger" v-if="backendFormError.email">{{ backendFormError.email[0] }}</span>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-sm-4 col-form-label">Password</label>
                                                <div class="col-sm-8">
                                                    <input type="password" v-validate="'required'" name="password" v-model="formData.password" class="form-control" placeholder="Password">
                                                    <span class="text-danger">{{ errors.first('password') }}</span>
                                                    <span class="text-danger" v-if="backendFormError.password">{{ backendFormError.password[0] }}</span>
                                                </div>
                                            </div>

                                            <button type="submit" class="btn btn-primary">Sign in</button>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>

    </div>
</template>

<script>
    export default {
        mounted() {
            //console.log(this.$route)
        }
    }
</script>
