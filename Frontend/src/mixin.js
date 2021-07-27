export default {

    data(){
        return {
            filter: {},
            formData: {},
            backendFormError: {},
            dataList: [],
            optionData: [],
            backendURL: process.env.VUE_APP_BACKEND_URL,
            frontendURL: process.env.VUE_APP_FRONTEND_URL,

            //for authentication
            token: {
                'access_token': localStorage.getItem("token"),
            },
            myConfig: { headers: { Authorization: "Bearer " + localStorage.getItem("token") } },
        }
    },
    mounted(){
        //console.log(process.env);
    },
    methods:{
        login(obj, formData = this.formData) {
            const _this = this;
            _this.$store.state.pageLoader = true;
            axios.post(obj.url, formData)
            .then(response => {
                _this.formData = {};
                _this.$store.state.pageLoader = false;
                window.location = _this.frontendURL + 'dashboard';
                //set token using local storage
                localStorage.setItem("token", response.data.access_token);
            })
            .catch(function(error) {
                _this.$toastr.e(error);
                _this.$store.state.pageLoader = false;
                _this.assignValidationError(error.response.data.errors);
            });
        },
        logout() {
            const _this = this;
            _this.$store.state.pageLoader = true;
            axios.post(_this.backendURL+'/api/auth/logout' , _this.formData, _this.myConfig )
            .then(response => {
                localStorage.clear();
                _this.$router.push({ path: '/login' });
                _this.$store.state.pageLoader = false;
            })
            .catch(function(error) {
                _this.$toastr.e(error);
                _this.assignValidationError(error.response.data.errors);
            })
        },
        getDataList(url, filter = this.filter) {
            const _this = this;
            _this.$store.state.pageLoader = true;
            var dataParams = filter;
            let setMultiParams = {
                params: dataParams,
                headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            };
            axios.get(url, setMultiParams )
                .then(response => {
                    //console.log(Object.keys(response.data.bank_account).length )
                    _this.dataList = response.data;
                    _this.$store.state.pageLoader = false;
                })
                .catch(function (error) {
                    _this.$toastr.e(error);
                    _this.$store.state.pageLoader = false;
                })
        },
        openModal(modalId, urlObj) {
            const _this = this;
            if (urlObj){
                _this.$store.state.pageLoader = true;
                axios.all([_this.getOptionData(urlObj.getGroup)])
                .then(axios.spread((res_one)=>{
                    //console.log(res_one)
                    if (res_one.data){
                        var responseData = res_one.data.groups;
                        _this.optionData = [];
                        responseData.forEach(function (item) {
                            let data = { id: item.id, name: item.name };
                            _this.optionData.push(data);
                        });
                    }
                    _this.$store.state.pageLoader = false;
                })).catch(function (error){
                    _this.$toastr.e(error);
                    _this.$store.state.pageLoader = false;
                })
            }
            _this.formReset();
            $('#'+ modalId).modal('show');
        },
        getOptionData(url){
            return axios.get(url, this.myConfig);
        },
        formReset(){
            const _this = this;
            _this.filter = {};
            _this.formData = {};
            _this.backendFormError = {};
        },
        storeWithoutFile(obj, formData = this.formData) {
            const _this = this;
            _this.$store.state.pageLoader = true;
            axios.post(obj.url, formData , _this.myConfig )
            .then(response => {
                if (obj.modalId) $('#' + obj.modalId).modal('hide');
                _this.formReset();
                _this.$store.state.pageLoader = false;
                _this.getDataList(_this.backendURL+_this.setUrl);
                _this.$toastr.s(response.data.message);
            })
            .catch(function(error) {
                _this.$store.state.pageLoader = false;
                _this.backendFormError = error.response.data.errors;
                console.log(_this.backendFormError);
                _this.$toastr.e(error);
            })
        },
        editFormData(obj, callBack) {
            const _this = this;
            _this.$store.state.pageLoader = true;
            axios.get(obj.url , _this.myConfig )
            .then(response => {
                _this.formData = response.data.formData;
                if (typeof callBack === 'function') {
                    callBack(_this.formData);
                }
                if (response.data){
                    var responseData = response.data.groups;
                    responseData.forEach(function (item) {
                        let data = { id: item.id, name: item.name };
                        _this.optionData.push(data);
                    });
                }
                $('#' + obj.modalId).modal('show');
                _this.$store.state.pageLoader = false;
            })
            .catch(function(error) {
                _this.$store.state.pageLoader = false;
                _this.$toastr.e(error);
            })
        },
        deleteItem(obj) {
            const _this = this;
            _this.$store.state.pageLoader = true;
            _this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(obj.url , _this.myConfig )
                        .then(response => {
                            _this.$swal('Deleted!', 'Your data has been deleted.', 'success');
                            _this.$store.state.pageLoader = false;
                            _this.getDataList(_this.backendURL+_this.setUrl);
                        })
                        .catch(function(error) {
                            _this.$store.state.pageLoader = false;
                            _this.$toastr.e(error);
                        });
                }
                _this.$store.state.pageLoader = false;
            }).catch(function(error) {
                _this.$store.state.pageLoader = false;
                _this.$toastr.e(error);
            });
        },


    }

}