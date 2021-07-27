<template>
    <div>

        <main class="py-4">

            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <div class="row">
                                    <div class="col-6">
                                        Products list
                                    </div>
                                    <div class="col-md-6 text-right">
                                        <button @click="openModal('openForm')" type="button" class="btn btn-primary btn-sm">
                                            <i class="fas fa-plus"></i> Add New</button>
                                    </div>
                                </div>
                            </div>

                            <div class="card-body">

                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">title</th>
                                                <th scope="col">price</th>
                                                <th scope="col">description</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(list, index) in dataList.products" v-if="Object.keys(dataList.products).length > 0">
                                                <th scope="row">{{ index+1 }}</th>
                                                <td>{{ list.title }}</td>
                                                <td>{{ list.price }}</td>
                                                <td>{{ list.description }}</td>

                                                <td class="text-center">
                                                    <button @click="editFormData({'modalId':'openForm', 'url':baseUrl+'/api/products/'+list.id+'/edit'}, {}, )" type="button" class="btn btn-primary btn-sm"> <i class="fas fa-edit"></i> Edit</button>
                                                    <button @click="deleteItem({'url':baseUrl+'/api/products/'+list.id})" type="button" class="btn  btn-danger btn-sm"> <i class="fas fa-trash"></i> Delete</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <!-- modal -->
            <div class="modal fade" id="openForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog modal-lg" role="document">
                    <form class="form-horizontal" @submit.prevent="storeWithFile({'url':baseUrl+'/api/products', 'modalId':'openForm'} )">

                        <div class="modal-content card-primary" >
                            <div class="modal-header card-header">
                                <h4 class="modal-title card-title" id="myModalLabel">Product add </h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            </div>
                            <div class="modal-body">

                                <div class="row">
                                    <div class="col">
                                        <label>Title</label>
                                        <input type="text" v-validate="'required'" name="title" v-model="formData.title" class="form-control" placeholder="Enter Your Value">
                                        <span class="text-danger">{{ errors.first('title') }}</span>
                                        <span class="text-danger" v-if="backendFormError.title">{{ backendFormError.title[0] }}</span>
                                    </div>
                                    <div class="col">
                                        <label>Price</label>
                                        <input type="number" v-validate="'required|numeric'" name="price" v-model="formData.price" class="form-control" placeholder="Enter Your Value">
                                        <span class="text-danger">{{ errors.first('price') }}</span>
                                        <span class="text-danger" v-if="backendFormError.price">{{ backendFormError.price[0] }}</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <label>Description</label>
                                        <textarea type="text" v-validate="'required'" name="description" v-model="formData.description" class="form-control" placeholder="Enter Your Value"></textarea>
                                        <span class="text-danger">{{ errors.first('description') }}</span>
                                        <span class="text-danger" v-if="backendFormError.description">{{ backendFormError.description[0] }}</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <label>Image</label>
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span v-if="imageData['image']" style="cursor: pointer" class="input-group-text" id="basic-addon1" @click="removeFile('image')">X</span>
                                            </div>
                                            <input type="file" @change="onFileChange($event, 'image')" class="form-control">
                                        </div>
                                        <span class="text-danger" v-if="backendFormError.image">{{ backendFormError.image[0] }}</span>
                                    </div>
                                </div>


                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <!-- modal -->


        </main>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                setUrl: '/api/products',
            }
        },
        created() {
            const _this = this;
            _this.getDataList(_this.baseUrl+_this.setUrl);
        }
    }
</script>
