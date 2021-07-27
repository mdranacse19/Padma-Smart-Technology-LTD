export default {
    data() {
        return{
            baseUrl: 'http://127.0.0.1:1111',
            formData: {},
            backendFormError: {},
            dataList: [],
            imageData: {},

            //for authentication
            token: {
                'access_token': localStorage.getItem("token"),
            },
            myConfig: {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            },
        }
    },
    methods:{
        login(obj, formData = this.formData) {
            const _this = this;
            _this.$store.state.pageLoader = true;
            _this.$validator.validate().then(valid => {
                if (valid){
                    axios.post(obj.url, formData)
                    .then(response => {
                        _this.$store.state.pageLoader = false;
                        _this.$router.push({ path: 'home' });
                        //set token using local storage
                        localStorage.setItem("token", response.data.access_token);
                        formData = {};
                    })
                    .catch(function(error) {
                        _this.$store.state.pageLoader = false;
                        _this.assignValidationError(error.response.data.errors);
                    });
                }
            });
        },
        logout() {
            const _this = this;
            axios.post(_this.baseUrl + '/api/auth/logout' , _this.formData, _this.myConfig )
            .then(response => {
                localStorage.clear();
                _this.$router.push({ path: '/' });

            })
            .catch(function(error) {
                _this.assignValidationError(error.response.data.errors);
            })
        },
        assignValidationError: function (errors) {
            const _this = this;
            $.each(errors, function (index, errorValue) {
                _this.$validator.errors.add({
                    id: index,
                    field: index,
                    name: index,
                    msg: errorValue[0],
                });
            })
        },
        getDataList(url, filter = this.filter) {
            const _this = this;
            _this.$store.state.pageLoader = true;
            var dataParams = filter;

            axios.get(url, _this.myConfig, {params: dataParams} )
            .then(response => {
                //console.log(response)
                _this.dataList = response.data;
                _this.$store.state.pageLoader = false;

            })
            .catch(function (error) {
                _this.$store.state.pageLoader = false;
            })
        },
        openModal(modalId) {
            const _this = this;
            _this.formReset();
            $('#'+ modalId).modal('show');
        },
        storeWithoutFile(obj, formData = this.formData) {
            const _this = this;
            _this.$store.state.pageLoader = true;
            axios.post(obj.url, formData , _this.myConfig )
            .then(response => {
                if (obj.modalId) $('#' + obj.modalId).modal('hide');
                _this.$store.state.pageLoader = false;
                _this.formReset();
                _this.getDataList(_this.baseUrl+_this.setUrl, {});
                _this.$toast.info(response.data.message);
            })
            .catch(function(error) {
                _this.$store.state.pageLoader = false;
                _this.backendFormError = error.response.data.errors;
                console.log(_this.backendFormError);
                _this.$toast.error(error);
            })
        },
        storeWithFile(obj, formData = this.formData) {
            const _this = this;
            _this.$store.state.pageLoader = true;
            var formReqData = new FormData();
            Object.keys(_this.imageData).forEach(key => {
                formReqData.append(key, _this.imageData[key]);
            });
            Object.keys(formData).forEach(key => {
                formReqData.append(key, formData[key]);
            });
            let config = {
                header: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            axios.post(obj.url, formReqData , _this.myConfig, config )
            .then(response => {
                if (obj.modalId) $('#' + obj.modalId).modal('hide');
                _this.$store.state.pageLoader = false;
                _this.formReset();
                _this.getDataList(_this.baseUrl+_this.setUrl, {});
                _this.$toast.info(response.data.message);
            })
            .catch(function(error) {
                _this.$store.state.pageLoader = false;
                _this.backendFormError = error.response.data.errors;
                console.log(_this.backendFormError);
                _this.$toast.error(error);
            })
        },
        editFormData(obj, options = {}, callBack) {
            const _this = this;
            _this.$store.state.pageLoader = true;
            axios.get(obj.url , _this.myConfig )
                .then(response => {
                    _this.formData = response.data.formData;
                    if (typeof callBack === 'function') {
                        callBack(_this.formData);
                    }
                    $('#' + obj.modalId).modal('show');
                    _this.$store.state.pageLoader = false;
                    if (response.data.status != 1){
                        _this.$toast.info(response.data.message);
                    }
                })
                .catch(function(error) {
                    _this.$store.state.pageLoader = false;
                    _this.$toast.error(error);
                })
        },
        deleteItem(obj) {
            const _this = this;
            _this.$store.state.pageLoader = true;
            _this.$swal.fire({
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
                        _this.$swal.fire('Deleted!', 'Your data has been deleted.', 'success');
                        _this.$store.state.pageLoader = false;
                        _this.getDataList(_this.baseUrl+_this.setUrl, {});
                    })
                    .catch(function(error) {
                        _this.$store.state.pageLoader = false;
                        _this.$toast.error(error);
                    });
                }
                _this.$store.state.pageLoader = false;
            }).catch(function(error) {
                _this.$store.state.pageLoader = false;
                _this.$toast.error(error);
            });
        },
        onFileChange(e, fieldIndex){
            const _this = this;
            var  file = e.target.files[0];
            _this.$set(_this.imageData, fieldIndex, file);
            //console.log(_this.imageData)
        },
        formReset(){
            const _this = this;
            _this.formData = {};
            _this.backendFormError = {};
            _this.imageData = {};
            Object.keys(_this.imageData).forEach((key) => {
                _this.imageData[key] = '';
            });
        },
        removeFile(fieldIndex){
            console.log('click')
            var _this = this;
            _this.imageData[fieldIndex] = {};
        },


    },


}
