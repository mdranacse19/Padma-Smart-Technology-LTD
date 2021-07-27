<template>
  <div>

    <!-- Start content -->
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12">
            <div class="page-title-box">
              <div class="row align-items-center">
                <div class="col-md-8">
                  <h4 class="page-title mb-0">Dashboard</h4>
                </div>
                <div class="col-md-4">
                  <div class="float-right d-none d-md-block">
                    <ol class="breadcrumb m-0">
                      <li class="breadcrumb-item"><router-link to="dashboard">Dashboard</router-link></li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div><!-- end row -->


        <div class="card" >
          <div class="card-header">
            <div class="row">
              <div class="col-2">
                CONTACTS
              </div>
              <div class="col-6">
                <div class="row">
                  <div class="col">
                    <input type="text" name="searchValue" v-model="filter.searchValue" class="form-control" placeholder="Search value">
                  </div>
                  <div class="col">
                    <button @click="getDataList(backendURL+'/api/contact/search')" type="button" class="btn btn-primary">Search</button>
                  </div>
                </div>
              </div>
              <div class="col-md-4 text-right">
                <button type="button" class="btn btn-primary"
                        @click="openModal('openForm',{getGroup:backendURL+'/api/contact/create'}, initData() )" >
                  Add New</button>
              </div>
            </div>
          </div>

          <div class="card-body">
            <div class="table-responsive">
              <table class="table ">
                <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Contact Name</th>
                  <th scope="col">IS Favourite</th>
                  <th scope="col">Phones</th>
                  <th scope="col">Emails</th>
                  <th scope="col">Groups</th>
                  <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>

                <tr v-for="(list, index) in dataList.contacts" v-if="Object.keys(dataList.contacts).length > 0">
                  <th scope="row">{{ index+1 }}</th>
                  <td>{{ list.name }}</td>
                  <td>{{ list.is_favourite ? 'Yes' : 'No' }}</td>

                  <td v-if="list.contact_details">
                    <span v-for="li in list.contact_details"><span class="badge badge-primary ml-2">{{ li.phone }}</span></span>
                  </td>
                  <td v-else>N/A</td>

                  <td v-if="list.contact_details">
                    <span v-for="li in list.contact_details"><span class="badge badge-success ml-2">{{ li.email }}</span></span>
                  </td>
                  <td v-else>N/A</td>

                  <td v-if="list.groups">
                    <span v-for="li in list.groups"><span class="badge badge-danger ml-2">{{ li.name }}</span></span>
                  </td>
                  <td v-else>N/A</td>

                  <td class="text-center">
                    <button @click="editFormData({'modalId':'openForm', 'url':backendURL+'/api/contact/'+list.id+'/edit'}, formatFormData )"
                            type="button" class="btn btn-info btn-sm"> Edit
                    </button> ||
                    <button @click="deleteItem({'url':backendURL+'/api/contact/'+list.id})"
                            type="button" class="btn  btn-primary btn-sm"> Delete
                    </button>
                  </td>
                </tr>

                <tr v-else>
                  <td colspan="7" class="text-center font-weight-bold">No data found !!</td>
                </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>


      </div><!-- container-fluid -->
    </div>
    <!-- content -->


    <!-- modal -->
    <div class="modal fade" id="openForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog modal-lg" role="document">
        <form class="form-horizontal" @submit.prevent="insertContact()">

          <div class="modal-content">
            <div class="modal-header card-header">
              <h4 class="modal-title card-title" id="myModalLabel">Contact {{ formData.id ? 'Update': 'Create' }} </h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">

              <div class="row">
                <div class="col">
                  <label>Contact Name <span class="text-primary">*</span> </label>
                  <input type="text" v-validate="'required'" name="name" v-model="formData.name" class="form-control" placeholder="Enter Your Value">
                  <span class="text-primary">{{ errors.first('name') }}</span>
                  <span class="text-primary" v-if="backendFormError.name">{{ backendFormError.name[0] }}</span>
                </div>
                <div class="col">
                  <label>IS Favourite <span class="text-primary">*</span> </label>
                  <select v-validate="'required'" class="form-control" name="is_favourite" v-model="formData.is_favourite"  >
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                  <span class="text-primary">{{ errors.first('is_favourite') }}</span>
                  <span class="text-primary" v-if="backendFormError.is_favourite">{{ backendFormError.is_favourite[0] }}</span>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label>Phones <span class="text-primary">*</span> </label>
                  <div class="tags-input-container">
                    <div
                        class="tag"
                        :key="index"
                        v-for="(tag, index) in inputTagsForPhones"
                    >
                      {{ tag }}
                      <span @click="removeTag(index,'inputTagForPhones')" style="cursor: pointer; padding-left: 10px;">X</span>
                    </div>
                    <input
                        name="phone"
                        class="form-control"
                        v-model="inputTagForPhones"
                        @keyup.enter="addTag('inputTagForPhones')"
                        @keydown.delete="backspaceDelete($event,'inputTagForPhones')"
                    />
                  </div>
                  <span class="text-primary" v-if="backendFormError.phone">{{ backendFormError.phone[0] }}</span>
                </div>
                <div class="col">
                  <label>Emails <span class="text-primary">*</span> </label>
                  <div class="tags-input-container">
                    <div
                        class="tag"
                        :key="index"
                        v-for="(tag, index) in inputTagsForEmails"
                    >
                      {{ tag }}
                      <span @click="removeTag(index,'inputTagForEmails')" style="cursor: pointer; padding-left: 10px;">X</span>
                    </div>
                    <input
                        name="email"
                        class="form-control"
                        v-model="inputTagForEmails"
                        @keyup.enter="addTag('inputTagForEmails')"
                        @keydown.delete="backspaceDelete($event,'inputTagForEmails')"
                    />
                  </div>
                  <span class="text-primary" v-if="backendFormError.phone">{{ backendFormError.email[0] }}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <label>Groups<span class="text-primary">*</span> </label>
                  <multiselect v-validate="'required'" v-model="groups_option" :options="optionData" :multiple="true"
                               :close-on-select="false" :clear-on-select="false" :preserve-search="true"
                               placeholder="Pick some" label="name" track-by="id" :preselect-first="true">
                  </multiselect>
                  <span class="text-primary" v-if="backendFormError.group_id">{{ backendFormError.group_id[0] }}</span>
                </div>
              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">{{ formData.id ? 'Update' : 'Save' }}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- modal -->


  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  components:{
    Multiselect
  },
  data() {
    return {
      setUrl: '/api/contact',
      inputTagsForPhones: [],
      inputTagForPhones: "",
      inputTagsForEmails: [],
      inputTagForEmails: "",
      groups_option: [],
    }
  },
  mounted(){
    const _this = this;
    _this.getDataList(_this.backendURL+_this.setUrl);

    //on press input field stop enter key
    window.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        e.preventDefault();
      }
    });
  },
  methods:{
    initData(){
      const _this = this;
      _this.formData = {
          'is_favourite': 1,
      }
      _this.inputTagsForPhones = [];
      _this.inputTagsForEmails = [];
    },
    removeTag(index,name) {
      const _this = this;
      if (name == "inputTagForPhones") {
        _this.inputTagsForPhones.splice(index, 1);
      } else if (name == "inputTagForEmails") {
        _this.inputTagsForEmails.splice(index, 1);
      }
    },
    //for vue input tag
    addTag(name) {
      const _this = this;
      if (name == "inputTagForPhones") {
        let exists = _this.inputTagsForPhones.some(function (field) {
          return field === _this.inputTagForPhones;
        });
        if (exists) {
          _this.inputTagForPhones = "";
        }
        if (!_this.inputTagForPhones == "" && !exists) {
          _this.inputTagsForPhones.push(_this.inputTagForPhones);
          _this.inputTagForPhones = "";
        }
      } else if (name == "inputTagForEmails") {
        let exists = _this.inputTagsForEmails.some(function (field) {
          return field === _this.inputTagForEmails;
        });
        if (exists) {
          _this.inputTagForEmails = "";
        }
        if (!_this.inputTagForEmails == "" && !exists) {
          _this.inputTagsForEmails.push(_this.inputTagForEmails);
          _this.inputTagForEmails = "";
        }
      }
    },
    backspaceDelete(event,name) {
      if (name == "inputTagForPhones") {
        event.keyCode == 8 &&
        this.inputTagForPhones === "" &&
        this.inputTagsForPhones.splice(this.inputTagsForPhones.length - 1);
      } else if (name == "inputTagForEmails") {
        event.keyCode == 8 &&
        this.inputTagForEmails === "" &&
        this.inputTagsForEmails.splice(this.inputTagsForEmails.length - 1);
      }
    },
    insertContact(){
      this.formData.phone = this.inputTagsForPhones;
      this.formData.email = this.inputTagsForEmails;
      let groups = [];
      this.groups_option.forEach(function (item) {
        groups.push(item.id);
      });
      this.formData.group_id = groups;

      this.storeWithoutFile({'url':this.backendURL+'/api/contact', 'modalId':'openForm'} )
    },
    formatFormData(formData){
      if (formData.groups){
        let groups = [];
        let groupResponse = formData.groups;
        groupResponse.forEach(function (item) {
          groups.push({ id: item.id, name: item.name })
        });
        this.groups_option = groups
      }
      if (formData.contact_details){
        let phones = [];
        let emails = [];
        let detailsResponse = formData.contact_details;
        detailsResponse.forEach(function (item) {
          phones.push(item['phone'])
          emails.push(item['email'])
        });
        this.inputTagsForPhones = phones
        this.inputTagsForEmails = emails
      }

    }
  }
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scope>

.card p{
  font-size:16px !important;
  font-weight: bold !important;
}

/*vue-tags-input*/
 .tags-input-container {
   width: 100%;
   border: 1px solid #ccc;
   min-height: 34px;
   display: flex;
   flex-wrap: wrap;
   align-content: space-between;
 }

.tags-input-container input {
  flex: 1 1 auto;
  width: 30px;
  border: none;
  outline: none;
  padding: 4px;
}
.tags-input-container .tag {
  margin: 4px;
  background: #e0e0e0;
  padding: 0px 4px;
  border: 1px solid #ccc;
  border-radius: 3px;
  display: flex;
  align-items: center;
}
.tags-input-container .tag i {
  cursor: pointer;
  margin-left: 8px;
  font-size: 18px;
}

</style>
