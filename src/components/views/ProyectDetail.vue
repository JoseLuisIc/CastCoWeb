<template>
  <section class="content">
    <div class="row center-block">
      <h2></h2>
      <div class="col-md-12">
        <!-- Custom Tabs -->
        <div class="nav-tabs-custom">
          <ul class="nav nav-tabs">
            <li class="active"><a href="#tab_1" data-toggle="tab"><i class="fa fa-user fa-lg"></i> Postulaciones</a>
            </li>
            <!-- <li><a href="#tab_2" data-toggle="tab"><i class="fa fa-star-o fa-lg"></i> Castings</a></li> -->
            <!-- <li><a href="#tab_3" data-toggle="tab"><i class="fa fa-fa-users fa-lg"> Personajes</a></li> -->
            <li class="pull-right"><a href="#" class="text-muted"><i class="fa fa-gear"></i></a></li>
          </ul>
          <div class="tab-content">
            <div class="tab-pane active" id="tab_1">
              <div class="box">
                <div class="box-header">
                  <h3 class="box-title"></h3>
                  <button class="btn btn-success" v-on:click="exportPdf" v-if="applications.length > 0">Exportar PDF <i
                      class="fa fa-file-pdf-o"></i></button>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                  <div class="row">
                    <div class="col-sm-12 table-responsive">
                      <table aria-describedby="example1_info" role="grid" id="tableProyects"
                        class="table table-bordered table-striped dataTable display responsive nowrap">
                        <thead>
                          <tr role="row">
                            <th>Personaje</th>
                            <th>Postulante</th>
                            <!-- <th>Nombre</th>
                        <th>Nombre público
                        </th>
                        <th>Descripción</th> -->
                            <th>Material
                            </th>
                            <th># Entrega</th>
                            <th>Status Postulacion</th>
                            <th>Status Proyecto</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <thead>
                          <tr role="row">
                            <td>
                              <select2 :id="selectedCharacter" :options="filterCharacters" v-model="filters.character"
                                @onChangeSelected="search">
                              </select2>
                            </td>
                            <td><input type="search" name="" id="" class="form-control"
                                placeholder="Nombre del postulante" v-model="filters.name" v-on:keyup="search"></td>
                            <td></td>
                            <!-- <td></td>
                        <td></td>
                        <td></td> -->
                            <td>
                              <select2 :id="selectedDelivery" :options="filterDeliveries" v-model="filters.delivery"
                                @onChangeSelected="search">
                              </select2>
                            </td>
                            <td>
                              <select2 :id="selectedPostulation" :options="filterPostulations"
                                v-model="filters.postulation" @onChangeSelected="search">
                              </select2>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="application in applications">
                            <td>
                              <select2 :id="application.id" :options="characters" v-model="application.character.id"
                                @onChangeSelected="onChangeCharacter">
                              </select2>
                            </td>
                            <td>
                              <div class="widget-user-image"><img :src="application.user.photo" alt="Avatar"
                                  class="img-circle"></div>{{ application.user.first_name }}
                            </td>
                            <!-- <td>{{ application.project.name }} </td>
                        <td>{{ application.project.public_name }} </td>
                        <td>{{ application.project.description }} </td> -->
                            <td><span @click="viewMaterial(application)"><i class="fa fa-file-image-o fa-3x"
                                  aria-hidden="true"></i></span><br>Archivos</td>
                            <td>
                              <select2 :id="application.id" :options="deliveries" v-model="deliveryDefault"
                                v-if="application.delivery === null" @onChangeSelected="onChangeDelivery">
                              </select2>
                              <select2 :id="application.id" :options="deliveries" v-model="application.delivery.id" v-else
                                @onChangeSelected="onChangeDelivery">
                              </select2>
                            </td>
                            <td>
                              <select2 :id="application.id" :options="statusPostulate" v-model="application.status"
                                @onChangeSelected="onChangeStatus">
                              </select2>
                            </td>

                            <td><span class="label label-default">{{ getStatus(application.project.status) }}</span> </td>
                            <td>
                              <div class="btn-group">
                                <button class="btn delete" v-on:click=confirmDelete(application.id)><i
                                    class="fa fa-trash"></i></button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <!-- <tfoot>
                              <tr>
                                <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                                    placeholder="Productora" data-index="0"></th>
                                <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                                    placeholder="Nombre" data-index="1"></th>
                                <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                                    placeholder="Nombre público" data-index="2"></th>
                                <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                                    placeholder="Descripción" data-index="3"></th>
                                <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                                    placeholder="Tipo de material" data-index="4">
                                </th>

                              </tr>
                            </tfoot> -->
                      </table>
                      <div v-if="applications.length === 0"> <center><h3>No hay registros</h3></center></div>
                      <pagination v-if="applications.length > 0" :totalPages="totalPage" :perPage="length" :currentPage="currentPage"
                        @pagechanged="onPageChange" />
                    </div>
                  </div>
                </div>
                <!-- /.box-body -->
              </div>

            </div><!-- /.tab-pane -->
            <div class="tab-pane" id="tab_2">
            </div><!-- /.tab-pane -->
            <!--<div class="tab-pane" id="tab_3">
                    </div> /.tab-pane -->
          </div><!-- /.tab-content -->
        </div><!-- nav-tabs-custom -->
      </div>
    </div>
    <modal v-if="showModalMaterial" @close="showModalMaterial = false" :iconClasses="['modal-lg']">
      <h3 slot="header">Material</h3>
      <div slot="body">
        <div class="box-footer">
          <ul class="mailbox-attachments clearfix">
            <li v-for="(material, index) in materials">
              <div v-show="['jpg', 'png', 'jpeg', 'heic', 'mp4', 'avi', 'mov'].includes(String(material.type).toLowerCase())" class="gallery center">

                <img v-show="['jpg', 'png', 'jpeg', 'heic'].includes(String(material.type).toLowerCase())" :src='material.file' alt="">
                <video v-show="['mp4', 'avi', 'mov'].includes(String(material.type).toLowerCase())" :src='material.file' controls
                  width="200px"></video>
                <p style="text-align: center;">{{ material.name }}</p>
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
    <modal v-if="showModalDelete" @close="showModalDelete = false">
      <h3 slot="header">Eliminar Postulación</h3>
      <div slot="body">
        <p>Esta seguro que quiere eliminar la postulación?</p>
      </div>

      <button slot="footer" type="button" class="btn btn-danger" v-on:click="deletePostulation">Eliminar</button>

    </modal>
  </section>
</template>

<script>
import api from '../../api'
import toastr from 'toastr'
import Pagination from '../widgets/Pagination.vue'
import Modal from '../widgets/Modal.vue'
import config from '../../config'
import Select2 from '../widgets/Selet2.vue'
// Datatable Modules
export default {
  name: 'Admins',
  components: {
    Pagination,
    Modal,
    Select2
  },
  data() {
    return {
      showModalMaterial: false,
      showModalDelete: false,
      totalPage: 1,
      idProject: 0,
      start: 0,
      length: 10,
      page: 1,
      count: 0,
      applications: [],
      currentPage: 1,
      project: [],
      filterCharacters: [],
      filterDeliveries: [],
      characters: [],
      deliveries: [],
      materials: [],
      deliveryDefault: '',
      statusPostulate: [
        { id: '1', text: 'En proceso' },
        { id: '2', text: 'Postulado' }
      ],
      filterPostulations: [
        { id: '', text: 'Todos' },
        { id: '1', text: 'En proceso' },
        { id: '2', text: 'Postulado' }
      ],
      selectedCharacter: '',
      selectedDelivery: '',
      selectedPostulation: '',
      optionDefault: { id: '', text: 'Todos' },
      filters: {
        name: '',
        character: '',
        delivery: '',
        postulation: ''
      },
      idPostulation: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$route.params.hasOwnProperty('id')) {
        this.idProject = this.$route.params.id
        this.fetchProject()
      }
    })
  },
  methods: {
    getStatus(idStatus) {
      var status = ''
      switch (idStatus) {
        case 1:
          status = 'En Entrega'
          break
        case 2:
          status = 'Callback'
          break
        case 3:
          status = 'Finalizado'
          break
        default:
          break
      }
      return status
    },
    onPageChange(page) {
      this.currentPage = page
      this.fetchApplications()
    },
    fetchApplications() {
      var params = new FormData()
      // ?search=&project=7829&character&delivery&user&page_size=10&page=1
      params.append('search', this.filters.name)
      params.append('project', this.idProject)
      params.append('character', this.filters.character)
      params.append('delivery', this.filters.delivery)
      params.append('status', this.filters.postulation)
      params.append('user', '')
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
    fetchProject() {
      api
        .request('get', 'projects/' + this.idProject + '/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          var json = response.data
          this.project = json
          var tmpCharacters = json.characters.map(e => {
            return { id: e.id, text: e.name }
          })
          var tmpDeliveries = json.deliveries.map(e => {
            return { id: e.id, text: e.name }
          })

          this.filterCharacters = Object.assign([], tmpCharacters)
          this.filterCharacters.unshift({ id: '', text: 'Todos' })
          this.filterDeliveries = Object.assign([], tmpDeliveries)
          this.filterDeliveries.unshift({ id: '', text: 'Todos' })
          this.characters = Object.assign([], tmpCharacters)
          this.deliveries = Object.assign([], tmpDeliveries)
          this.deliveries.unshift({ id: '', text: 'Sin asingancion' })
          this.fetchApplications()
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
    },
    deletePostulation() {
      api
        .request('delete', 'applications/' + this.idPostulation + '/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.showModalDelete = false
          this.fetchProject()
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
    },
    confirmDelete(id) {
      this.showModalDelete = true
      this.idPostulation = id
    },
    viewMaterial(application) {
      this.materials = application.material
      this.showModalMaterial = true
    },
    onChangeDelivery({ value, id }) {
      var deliveryId = value
      var applicationId = id
      api
        .request('patch', 'applications/' + applicationId + '/', { delivery: deliveryId }, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.alertShow('Entrega', 'Se modifico la entrega', 'success', 'fa fa-check')
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            this.alertShow('Error', errors.detail, 'error', 'fa fa-error')
          }
        })
    },
    onChangeCharacter({ value, id }) {
      var characterId = value
      var applicationId = id
      api
        .request('patch', 'applications/' + applicationId + '/', { character: characterId }, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.alertShow('Personaje', 'Se modifico el personaje', 'success', 'fa fa-check')
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
    },
    onChangeStatus({ value, id }) {
      var status = value
      var applicationId = id
      api
        .request('patch', 'applications/' + applicationId + '/', { status: status }, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.alertShow('Estatus', 'Se actualizo el estatus', 'success', 'fa fa-check')
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
    },
    alertShow(title, message, type, iconClass) {
      this.message = message
      this.type = type
      this.title = title
      this.iconClass = iconClass
      toastr[type](message, title)
    },
    search(e) {
      this.fetchApplications()
    },
    exportPdf() {
      var that = this
      var url = `${config.serverURI}projects/${this.idProject}/export/`
      console.log(this.filters)
      var data = new FormData()
      data.append('character', this.filters.character)
      data.append('delivery', this.filters.delivery)
      data.append('status', this.filters.postulation)
      var oReq = new XMLHttpRequest()
      oReq.open('post', url, true)
      oReq.setRequestHeader('Authorization', this.$store.state.token)
      oReq.responseType = 'blob'

      oReq.onload = function (oEvent) {
        var filename = `${that.project.name}.pdf`
        that.downloadFile(oReq.response, filename, null)
      }
      oReq.send(data)
      // api
      //   .request('post', `projects/${this.idProject}/export/`, {}, { 'Authorization': this.$store.state.token })
      //   .then(res => {
      //     // console.log(res.data)
      //     that.downloadFile(res.data, `${that.project.name}.pdf`, null)
      //   })
      //   .catch(error => {
      //     if (error.response) {
      //       var errors = error.response.data
      //       console.log(errors)
      //     }
      //   })
    },
    downloadFile(data, filename, mime) {
      const blob = new Blob([data], { type: mime || 'application/octet-stream' })
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(blob, filename)
        return
      }
      const blobURL = window.URL.createObjectURL(blob)
      const tempLink = document.createElement('a')
      tempLink.style.display = 'none'
      tempLink.href = blobURL
      tempLink.setAttribute('download', filename)
      if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank')
      }
      document.body.appendChild(tempLink)
      tempLink.click()
      document.body.removeChild(tempLink)
      setTimeout(() => {
        window.URL.revokeObjectURL(blobURL)
      }, 100)
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

div#tableProyects_filter {
  display: none;
}

th.dt-center,
td.dt-center {
  text-align: center;
}

div.dt-buttons {
  position: relative;
  float: right;
}

li {
  list-style: none;
}

a.disable {
  pointer-events: none;
}

div.gallery {
  margin: 5px;
  border: 1px solid #ccc;
  float: left;
  width: auto;
}

div.gallery:hover {
  border: 1px solid #777;
}

div.gallery img {
  width: 100%;
  object-fit: contain;
  height: 200px !important;
}

div.desc {
  padding: 15px;
  text-align: center;
}

.box-footer {
  background-color: transparent !important;
  border: none;
}

video {
  width: 100%;
  height: 200px;
}

.center {
  display: contents;
  align-items: center;
  justify-content: center;
  border: 3px solid #dbe4ed;
  /* Border color is optional */
}
</style>
