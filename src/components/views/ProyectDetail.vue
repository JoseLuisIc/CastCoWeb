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
                        </tbody>
                      </table>
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
              <div
                v-show="['jpg', 'png', 'jpeg', 'heic', 'mp4', 'avi', 'mov'].includes(String(material.type).toLowerCase())"
                class="gallery center">

                <img v-show="['jpg', 'png', 'jpeg', 'heic'].includes(String(material.type).toLowerCase())"
                  :src='material.file' alt="">
                <video v-show="['mp4', 'avi', 'mov'].includes(String(material.type).toLowerCase())" :src='material.file'
                  controls width="200px"></video>
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
import $ from 'jquery'
import api from '../../api'
import toastr from 'toastr'
import Modal from '../widgets/Modal.vue'
import config from '../../config'
import Select2 from '../widgets/Selet2.vue'
import esMX from '../../lang/es_mx'
import moment from 'moment'
import settings from '../../config/settings'
// Datatable Modules
// require('datatables.net-buttons/js/dataTables.buttons.js')
// require('datatables.net-buttons/js/buttons.colVis.js')
// require('datatables.net-buttons/js/buttons.flash.js')
// require('datatables.net-buttons/js/buttons.html5.js')
// require('datatables.net-buttons/js/buttons.print.js')
export default {
  name: 'Admins',
  components: {
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
        { id: 1, text: 'En proceso' },
        { id: 2, text: 'Postulado' }
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
    statusIdPostulate(id) {
      return `postulate_${id}`
    },
    onPageChange(page) {
      this.currentPage = page
      this.fetchProject()
    },
    fetchApplications() {
      var params = new URLSearchParams()
      params.append('format', 'datatables')
      params.append('search', this.filters.name)
      params.append('project', this.idProject)
      params.append('character', this.filters.character)
      params.append('delivery', this.filters.delivery)
      params.append('status', this.filters.postulation)
      params.append('user', '')
      params.append('page_size', this.length)
      params.append('page', this.currentPage)
      var that = this
      this.table = $('#tableProyects').DataTable({
        'lengthMenu': [[10, 25, 50, 100, -1], [10, 25, 50, 100, '']],
        'dom': 'Blfrtip',
        'autoWidth': false,
        'buttons': [
          {
            'extend': 'copy',
            'className': 'btn btn-default',
            'text': '<i class="fa  fa-copy"></i> Copiar',
            'titleAttr': 'Copiar',
            'exportOptions': {
              'columns': ':visible',
              'hiddenDefaultCol': 'visible'
            }
          },
          {
            'extend': 'csv',
            'title': settings.name + 'Proyectos_' + moment(new Date()).format('YYYYMMDD'),
            'className': 'btn btn-success',
            'text': '<i class="fa fa-file-excel-o"></i> CSV',
            'titleAttr': 'CSV',
            'exportOptions': {
              'columns': ':visible'
            }
          },
          {
            'extend': 'print',
            'title': settings.name + 'Proyectos_' + moment(new Date()).format('YYYYMMDD'),
            'className': 'btn btn-info',
            'text': '<i class="fa fa-print"></i> Imprimir',
            'titleAttr': 'Imprimir',
            'exportOptions': {
              'columns': ':visible'
            }
          }
        ],
        'responsive': true,
        'processing': true,
        'serverSide': true,
        'ajax': {
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', that.$store.state.token)
          },
          url: config.serverURI + 'applications/?' + params,
          type: 'GET',
          complete: function (response) {
            console.log('tableProyects')
            that.applications = response['responseJSON'].data
            $('.delete').on('click', function () {
              that.confirmDelete(this.id)
            })
            $('.viewMaterial').on('click', function () {
              that.viewMaterial(this.id)
            })
            $('.selectDelivery').on('change', function () {
              that.onChangeDelivery({ value: this.value, id: this.id })
            })
            $('.selectCharacter').on('change', function () {
              that.onChangeCharacter({ value: this.value, id: this.id })
            })
            $('.selectPostulation').on('change', function () {
              that.onChangeStatus({ value: this.value, id: this.id })
            })
          },
          error: function (jqXHR, ajaxOptions, thrownError) {
          }
        },
        'columns': [
          {
            'data': 'character',
            render: function (data, type, row) {
              var options = ''
              for (let index = 0; index < that.characters.length; index++) {
                options += `<option value='${that.characters[index].id}'  ${row.character === null ? 0 : row.character.id === that.characters[index].id ? 'selected' : ''}>${that.characters[index].text}</option>`
              }
              return `<select id="${row.id}" class="selectCharacter form-control" name="character" data-index="${row.character === null ? 0 : row.character.id}">
                ${options}
              </select>
              `
            }
          },
          {
            'data': 'user',
            render: function (data, type, row) {
              return `<div class="widget-user-image"><img src="${row.user.photo}" alt="Avatar"
                                  class="img-circle"></div>${row.user.first_name}`
            }
          },
          {
            'data': 'material',
            render: function (data, type, row) {
              return `<span id="${row.id}" class="viewMaterial"><i class="fa fa-file-image-o fa-3x"
                                  aria-hidden="true"></i></span><br>Archivos`
            }
          },
          {
            'data': 'delivery',
            render: function (data, type, row) {
              var options = ''
              for (let index = 0; index < that.deliveries.length; index++) {
                options += `<option value='${that.deliveries[index].id}'  ${row.delivery === null ? 0 : row.delivery.id === that.deliveries[index].id ? 'selected' : ''}>${that.deliveries[index].text}</option>`
              }
              return `<select id="${row.id}" class="selectDelivery form-control" name="delivery" data-index="${row.delivery === null ? 0 : row.delivery.id}">
                ${options}
              </select>
              `
            }
          },
          {
            'data': 'status',
            render: function (data, type, row) {
              return `<select id="${row.id}" class="selectPostulation form-control" name="status" data-index="${row.status}">
                  <option value="1" ${row.status === 1 ? 'selected' : ''}>En proceso</option>
                  <option value="2" ${row.status === 2 ? 'selected' : ''}>Postulado</option>
              </select>
              `
            }
          },
          {
            'data': 'project',
            render: function (data, type, row) {
              return `<td><span class="label label-default">${that.getStatus(row.project.status)}</span>`
            }
          },
          {
            'data': 'id',
            className: 'dt-center editor-edit',
            defaultContent: '',
            orderable: false,
            'render': (data, type, row, meta) => {
              return this.renderView(data, row)
            }
          }
        ],
        'language': esMX
      })
      this.table.on('page.dt', function (d) {
        var info = that.table.page.info()
        console.log(info)
        that.currentPage = info.page === 0 ? 1 : info.page + 1

        var params = new URLSearchParams()
        params.append('format', 'datatables')
        params.append('search', that.filters.name)
        params.append('project', that.idProject)
        params.append('character', that.filters.character)
        params.append('delivery', that.filters.delivery)
        params.append('status', that.filters.postulation)
        params.append('user', '')
        params.append('page_size', that.length)
        params.append('page', that.currentPage)
        that.table.ajax.url(config.serverURI + 'applications/?' + params)
      })
      this.table.on('length.dt', function (e, settings, len) {
        var params = new URLSearchParams()
        params.append('format', 'datatables')
        params.append('search', that.filters.name)
        params.append('project', that.idProject)
        params.append('character', that.filters.character)
        params.append('delivery', that.filters.delivery)
        params.append('status', that.filters.postulation)
        params.append('user', '')
        params.append('page_size', len)
        params.append('page', that.currentPage)
        that.table.ajax.url(config.serverURI + 'applications/?' + params)
      })
    },
    renderView(id, row) {
      return `
        <td>
          <div class="btn-group">
            <button class="btn delete" id="${id}"><i class="fa fa-trash"></i></button>
          </div>
        </td>`
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
    viewMaterial(id) {
      api
        .request('get', 'applications/' + id + '/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          console.log(response)
          this.materials = response.data.material
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
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
      var params = new URLSearchParams()
      params.append('format', 'datatables')
      params.append('search', this.filters.name)
      params.append('project', this.idProject)
      params.append('character', this.filters.character)
      params.append('delivery', this.filters.delivery)
      params.append('status', this.filters.postulation)
      params.append('user', '')
      params.append('page_size', this.length)
      params.append('page', this.currentPage)
      this.table.ajax.url(config.serverURI + 'applications/?' + params).load()
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
      oReq.timeout = 72000
      oReq.open('post', url, true)
      oReq.setRequestHeader('Authorization', this.$store.state.token)
      oReq.responseType = 'blob'
      oReq.onprogress = function (ev) {
        console.log(ev)
      }
      oReq.onload = function (oEvent) {
        var filename = `${that.project.name}.pdf`
        that.downloadFile(oReq.response, filename, null)
      }
      oReq.send(data)
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
