<template>
  <section class="content">
    <div class="row center-block">
      <h2></h2>
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title"></h3>

            <input id="btnModalEdit" type="hidden" class="btn btn-primary" data-toggle="modal"
              data-target="#modalUserEdit" />
            <input id="btnModalDelete" type="hidden" class="btn btn-primary" data-toggle="modal"
              data-target="#modalUserDelete" />
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
              <div class="row">
                <div class="col-sm-6">
                  <div id="example1_length" class="dataTables_length">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table aria-describedby="example1_info" role="grid" id="tableProyects"
                    class="table table-bordered table-striped dataTable display responsive nowrap">
                    <thead>
                      <tr role="row">
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Personaje</th>
                        <th>Materiales</th>

                      </tr>
                    </thead>

                    <tbody>
                      <tr v-for="application in applications">
                        <td>{{ application.project.name }} </td>
                        <td>{{ application.project.desciption }} </td>
                        <td>{{ application.character.name }}</td>
                        <td><span @click="viewMaterial(application)"><i class="fa fa-file-image-o fa-3x"
                              aria-hidden="true"></i></span><br>Archivos</td>

                      </tr>
                    </tbody>
                  </table>
                  <div>
                    <pagination :totalPages="totalPage" :perPage="length" :currentPage="currentPage"
                      @pagechanged="onPageChange" />
                  </div>
                </div>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </div>
    <modal v-if="showModalMaterial" @close="showModalMaterial = false" :iconClasses="['modal-lg']">
      <h3 slot="header">Material</h3>
      <div slot="body">
        <div class="box-footer">
          <ul class="mailbox-attachments clearfix">
            <li v-for="(material, index) in materials">
              <div v-show="['jpg', 'png', 'jpeg', 'mp4', 'avi', 'PNG'].includes(material.type)" class="gallery center">

                <img v-show="['jpg', 'png', 'jpeg', 'PNG'].includes(material.type)" :src='material.file' alt="">
                <video v-show="['mp4', 'avi'].includes(material.type)" :src='material.file' controls
                  width="200px"></video>

                <!-- <div class="mailbox-attachment-info">
                      <a class="btn btn-default btn-xs pull-left deleteFile" :id="material.id" @click="deleteFile"><i
                          class="fa fa-trash"></i> Eliminar</a>
                      <span class="mailbox-attachment-size">
                        &nbsp;
                        <a :href="material.file" class="btn btn-default btn-xs pull-right downloadFile" @click="downloadFile"
                          :id="material.id"><i class="fa fa-cloud-download"></i> Descargar</a>
                      </span>
                    </div> -->
              </div>
            </li>
          </ul>

          <div v-if="materials.length == 0">
            <center>
              <h3>El usuario aun no carga su material</h3>
            </center>
          </div>
        </div>
      </div>
    </modal>

  </section>
</template>

<script>
import api from '../../api'
import util from '../../utils/util'
import Pagination from '../widgets/Pagination.vue'
import Modal from '../widgets/Modal.vue'

// Require needed datatables modules
require('datatables.net')

export default {
  name: 'Admins',
  components: {
    Pagination,
    Modal
  },
  data() {
    return {
      idProject: 0,
      idPostulation: '',
      totalPage: 1,
      start: 0,
      length: 10,
      page: 1,
      count: 0,
      currentPage: 1,
      applications: [],
      project: [],
      characters: [],
      deliveries: [],
      showModalMaterial: false,
      materials: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$route.params.hasOwnProperty('id')) {
        this.idPostulation = this.$route.params.id
        // this.fetchProyect(this.$route.params.id)
      }
      this.fetchApplications()
    })
  },
  methods: {
    onPageChange(page) {
      this.currentPage = page
    },
    openModal() {
      this.user = {
        id: 0,
        email: '',
        first_name: '',
        last_name: '',
        instagram: '',
        role: util.MANAGER
      }
    },
    updateUser(dUser) {
      api
        .request('put', 'users/' + dUser.id + '/', this.user, { 'Authorization': this.$store.state.token })
        .then(response => {
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            this.error.email = errors.email[0]
          }
        })
    },
    saveUser() {
      api
        .request('post', 'users/', this.user, { 'Authorization': this.$store.state.token })
        .then(response => {
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            this.error.email = errors.email[0]
            this.error.nombres = errors.nombres[1]
          }
        })
    },
    editUser(idUser) {
      console.log(idUser)
      this.isNew = false
      api
        .request('get', 'users/' + idUser + '/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          // this.user = response.data
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
    },
    fetchApplications() {
      var params = new FormData()
      // ?search=&project=7829&character&delivery&user&page_size=10&page=1
      params.append('search', '')
      params.append('project', '')
      params.append('character', '')
      params.append('delivery', '')
      params.append('user', this.idPostulation)
      params.append('page_size', this.length)
      params.append('page', this.currentPage)
      api
        .request('get', `applications/?` + new URLSearchParams(params).toString(), {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          console.log(response)
          var json = response.data
          this.count = json.count
          this.applications = json.results
          this.totalPage = Math.ceil(this.count / this.length)
        })
        .catch(error => {
          if (error.response) {

          }
        })
    },
    confirmDelete(idUser) {
      api
        .request('get', 'users/' + idUser + '/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          // this.user = response.data
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
    },
    deleteUser() {
      console.log(this.user)
      api
        .request('delete', 'users/' + this.user.id + '/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.callUser()
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            this.error.email = errors.email[0]
          }
        })
    },
    viewMaterial(application) {
      this.materials = application.material
      this.showModalMaterial = true
    }
  }
}
</script>

<style>
/* Using the bootstrap style, but overriding the font to not draw in
  the Glyphicons Halflings font as an additional requirement for sorting icons.

  An alternative to the solution active below is to use the jquery style
  which uses images, but the color on the images does not match adminlte.

@import url('/static/js/plugins/datatables/jquery.dataTables.min.css');
*/

@import url('/static/js/plugins/datatables/dataTables.bootstrap.css');

table.dataTable thead .sorting:after,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_desc:after {
  font-family: 'FontAwesome';
}

table.dataTable thead .sorting:after {
  content: '\f0dc';
}

table.dataTable thead .sorting_asc:after {
  content: '\f0dd';
}

table.dataTable thead .sorting_desc:after {
  content: '\f0de';
}
</style>
