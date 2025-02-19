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
                  <button class="btn btn-default" v-on:click="downloadReport" v-if="applications.length > 0"
                    v-can="'download_report'">Descargar Reporte <i class="fa fa-download"></i></button>
                  <div class="btn-group" style="float: right;">
                    <button href="javascript:;" class="dropdown-toggle btn btn-danger" data-toggle="dropdown"
                      v-can="'visible_columns_postulations'" aria-haspopup="true" aria-expanded="false"> Columnas
                      Visibles
                    </button>
                    <ul class="dropdown-menu" id="hiddenColumns">
                      <li>
                        <!-- Task item -->
                        <div class="form-group" style="margin-bottom: 0px !important;">
                          <div class="form-check" style="padding-left: 5px;">
                            <input id="checkAll" class="form-check-input" type="checkbox" value="-1">
                            <label class="form-check-label">
                              Ver Todos
                            </label>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                  <div class="row">
                    <div class="col-sm-12 table-responsive">
                      <table aria-describedby="example1_info" role="grid" id="tableProyects"
                        class="table table-bordered table-striped dataTable display responsive nowrap">
                        <thead>
                          <tr role="row">
                            <th data-index="0" v-can="'view_column'">Personaje</th>
                            <th data-index="1">Postulante</th>
                            <th data-index="2">Instagram</th>
                            <th data-index="3">Edad</th>
                            <th data-index="4">Agencia</th>
                            <th data-index="5">Material</th>
                            <th data-index="6" v-can="'view_column'"># Entrega</th>
                            <th data-index="7" v-can="'view_column'">Status Postulacion</th>
                            <th data-index="8">Status Proyecto</th>
                            <th data-index="9">Dispositivo</th>
                            <th>Acciones</th>
                          </tr>
                          <tr role="row">
                            <th v-can="'view_column'">
                              <select2 :id="selectedCharacter" :options="filterCharacters" v-model="filters.character"
                                @onChangeSelected="search">
                              </select2>
                            </th>
                            <th><input type="search" name="" id="" class="form-control"
                                placeholder="Nombre del postulante" v-model="filters.name" v-on:keyup="search"></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th v-can="'view_column'">
                              <select2 :id="selectedDelivery" :options="filterDeliveries" v-model="filters.delivery"
                                @onChangeSelected="search">
                              </select2>
                            </th>
                            <th v-can="'view_column'">
                              <select2 :id="selectedPostulation" :options="filterPostulations"
                                v-model="filters.postulation" @onChangeSelected="search">
                              </select2>
                            </th>
                            <th></th>
                            <th></th>
                            <th></th>
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
            <li v-for="(material, index) in materials"
              v-show="['jpg', 'png', 'jpeg', 'heic', 'mp4', 'avi', 'mov'].includes(String(material.type).toLowerCase())">
              <span class="mailbox-attachment-icon has-img">
                <img v-show="['jpg', 'png', 'jpeg', 'heic'].includes(String(material.type).toLowerCase())"
                  :src='material.file' alt="">
                <video v-show="['mp4', 'avi', 'mov'].includes(String(material.type).toLowerCase())" :src='material.file'
                  controls width="200px"></video>
              </span>
              <div class="mailbox-attachment-info">
                <a class="btn btn-default btn-xs pull-left deleteFile" :id="material.id" @click="deleteFile"
                  v-can="'delete_postulation'"><i class="fa fa-trash"></i> Eliminar</a>
                <span class="mailbox-attachment-size">
                  &nbsp;
                  <a :href="material.file" class="btn btn-default btn-xs pull-right downloadImage"
                    @click="downloadImage" :id="material.id" :name="material.name" :type="material.type"><i
                      class="fa fa-cloud-download"></i> Descargar</a>
                </span>
              </div>
              <!--<div
                v-show="['jpg', 'png', 'jpeg', 'heic', 'mp4', 'avi', 'mov'].includes(String(material.type).toLowerCase())"
                class="gallery center">

                <img v-show="['jpg', 'png', 'jpeg', 'heic'].includes(String(material.type).toLowerCase())"
                  :src='material.file' alt="">
                <video v-show="['mp4', 'avi', 'mov'].includes(String(material.type).toLowerCase())" :src='material.file'
                  controls width="200px"></video>
                <p style="text-align: center;">{{ material.name }}</p>
                <div class="mailbox-attachment-info">
                  <a class="btn btn-default btn-xs pull-left deleteFile" :id="material.id" @click="deleteFile"><i
                      class="fa fa-trash"></i> Eliminar</a>
                  <span class="mailbox-attachment-size">
                    &nbsp;
                    <a :href="material.file" class="btn btn-default btn-xs pull-right downloadImage"
                      @click="downloadImage" :id="material.id" :name="material.name" :type="material.type"><i
                        class="fa fa-cloud-download"></i> Descargar</a>
                  </span>
                </div>
              </div>-->
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
    <modal v-if="showModalDelete" @close="showModalDelete = false" :iconClasses="['modal-md']">
      <h3 slot="header">Eliminar Postulación</h3>
      <div slot="body">
        <p>Esta seguro que quiere eliminar la postulación?</p>
      </div>

      <button slot="footer" type="button" class="btn btn-danger" v-on:click="deletePostulation">Eliminar</button>

    </modal>

    <modal v-if="showModalDetail" @close="showModalDetail = false" :iconClasses="['modal-lg']">
      <h3 slot="header">Detalle de Postulación</h3>
      <div slot="body">
        <div class="box-body">
          <div class="row">
            <div class="col-md-6">
              <strong class="subtitle"><i class="fa fa-user margin-r-5"></i> Talento</strong>
              <div class="box-body box-profile">
                <img class="profile-user-img img-responsive img-circle" :src="postulation.user.photo">
              </div>
              <div class="user-block">

                <span class="username">
                  {{ postulation.user.first_name }} {{ postulation.user.last_name }}
                </span>
                <span class="description"><strong> Correo: </strong> {{ postulation.user.email }}</span>
                <span class="description"><strong> Instagram: </strong> {{ postulation.user.instagram }}</span>
                <span class="description"><strong> Telefono: </strong> {{ postulation.user.phone }}</span>
                <span class="description"><strong> Edad: </strong> {{ postulation.user.age }}</span>
                <span class="description"><strong> Skills: </strong> {{ postulation.user.skills }}</span>
              </div>
            </div>
            <div class="col-md-6">
              <strong class="subtitle"><i class="fa fa-building-o margin-r-5"></i> Agencia</strong>
              <div class="user-block">
                <span class="description"><strong> Nombre de Agencia: </strong> {{ postulation.user.agency.name
                  }}</span>
                <span class="description"><strong> Nombre de encargado: </strong> {{ postulation.user.agency.booker_name
                  }}</span>
                <span class="description"><strong> Telefono: </strong> {{ postulation.user.agency.phone }}</span>
                <span class="description"><strong> Ciudad: </strong> {{ postulation.user.agency.city }}</span>
              </div>
              <br>
              <div class="user-block">
                <strong class="subtitle"><i class="fa fa-arrows-h margin-r-5"></i> Sizes</strong>
                <span class="description"><strong> Height: </strong>{{ postulation.user.height }} cm</span>
                <span class="description"><strong> Shirts: </strong> {{ postulation.user.shirt_size }}</span>
                <span class="description"><strong> Pants: </strong>{{ postulation.user.pant_size }}</span>
                <span class="description"><strong> Shoes: </strong> {{ postulation.user.shoe_size }} cm (MX)</span>
              </div>
            </div>
          </div>
          <hr>
          <strong class="subtitle"><i class="fa fa-list-alt margin-r-5"></i> Proyecto</strong>
          <div class="user-block">
            <span class="description"><strong> Nombre del Proyecto: </strong> {{ postulation.project.public_name
              }}</span>
            <span class="description"><strong> Descripción: </strong> {{ postulation.project.description }}</span>
          </div>
          <hr>
          <strong class="subtitle"><i class="fa fa-male margin-r-5"></i> Personaje</strong>
          <div class="user-block">
            <span class="description"><strong> Nombre: </strong>{{ postulation.character.name }}</span>
            <span class="description"><strong> Descripción: </strong> {{ postulation.character.description }}</span>
            <span class="description"><strong> Genero: </strong> {{ postulation.character.gender }}</span>
            <span class="description"><strong> Etnia: </strong> {{ postulation.character.ethnic_group }}</span>
            <span class="description"><strong> Edad Aparente: </strong> {{ postulation.character.apparent_age }}</span>
          </div>
        </div>
      </div>
    </modal>

    <modal v-if="showModalDeleteMaterial" @close="showModalDeleteMaterial = false" :iconClasses="['modal-md']">
      <h3 slot="header">Eliminar Postulación</h3>
      <div slot="body">
        <p>Esta seguro que quiere eliminar la imagen?</p>
      </div>

      <button slot="footer" type="button" class="btn btn-danger" v-on:click="deleteMaterial">Eliminar</button>

    </modal>
    <modal v-if="showModalReport" @close="showModalReport = false" :iconClasses="['modal-md']">
      <h3 slot="header">Descargar Reporte</h3>
      <div slot="body">
        <button class="btn btn-danger" v-on:click="exportPDF" v-if="applications.length > 0"
          v-can="'exported_postulations'">Exportar PDF <i class="fa fa-file-pdf-o"></i></button>
        <button class="btn btn-success" v-on:click="exportDocument('xlsx')" v-if="applications.length > 0"
          v-can="'exported_postulations'">Exportar XLSX <i class="fa fa-file-excel-o"></i></button>
        <button class="btn btn-info" v-on:click="exportDocument('numbers')" v-if="applications.length > 0"
          v-can="'exported_postulations'">Exportar Numbers <i class="fa fa-file-excel-o"></i></button>

        <br>
        <div class="form-group" style="margin-bottom: 0px !important;">
          <div class="form-check" style="padding-left: 5px;">
            <input class="form-check-input" type="checkbox" value="0" v-on:change="checkedAll">
            <label class="form-check-label">
              Todos
            </label>
          </div>
        </div>
        <br>
        <ul>
          <li>
            <!-- Task item -->
            <div class="form-group" style="margin-bottom: 0px !important;">
              <div class="form-check" style="padding-left: 5px;">
                <input class="form-check-input" type="checkbox" value="name" v-model="checkedNames">
                <label class="form-check-label">
                  Nombre
                </label>
              </div>
            </div>
          </li>
          <li>
            <!-- Task item -->
            <div class="form-group" style="margin-bottom: 0px !important;">
              <div class="form-check" style="padding-left: 5px;">
                <input class="form-check-input" type="checkbox" value="photo" v-model="checkedNames">
                <label class="form-check-label">
                  Foto
                </label>
              </div>
            </div>
          </li>
          <li>
            <!-- Task item -->
            <div class="form-group" style="margin-bottom: 0px !important;">
              <div class="form-check" style="padding-left: 5px;">
                <input class="form-check-input" type="checkbox" value="age" v-model="checkedNames">
                <label class="form-check-label">
                  Edad
                </label>
              </div>
            </div>
          </li>
          <li>
            <!-- Task item -->
            <div class="form-group" style="margin-bottom: 0px !important;">
              <div class="form-check" style="padding-left: 5px;">
                <input class="form-check-input" type="checkbox" value="agency" v-model="checkedNames">
                <label class="form-check-label">
                  Agencia
                </label>
              </div>
            </div>
          </li>
          <li>
            <!-- Task item -->
            <div class="form-group" style="margin-bottom: 0px !important;">
              <div class="form-check" style="padding-left: 5px;">
                <input class="form-check-input" type="checkbox" value="city" v-model="checkedNames">
                <label class="form-check-label">
                  Ciudad
                </label>
              </div>
            </div>
          </li>
          <li>
            <!-- Task item -->
            <div class="form-group" style="margin-bottom: 0px !important;">
              <div class="form-check" style="padding-left: 5px;">
                <input class="form-check-input" type="checkbox" value="instagram" v-model="checkedNames">
                <label class="form-check-label">
                  Instagram
                </label>
              </div>
            </div>
          </li>
          <li>
            <!-- Task item -->
            <div class="form-group" style="margin-bottom: 0px !important;">
              <div class="form-check" style="padding-left: 5px;">
                <input class="form-check-input" type="checkbox" value="dropbox" v-model="checkedNames">
                <label class="form-check-label">
                  Dropbox
                </label>
              </div>
            </div>
          </li>
          <li>
            <!-- Task item -->
            <div class="form-group" style="margin-bottom: 0px !important;">
              <div class="form-check" style="padding-left: 5px;">
                <input class="form-check-input" type="checkbox" value="casting_notes" v-model="checkedNames">
                <label class="form-check-label">
                  Casting Notes
                </label>
              </div>
            </div>
          </li>
          <li>
            <!-- Task item -->
            <div class="form-group" style="margin-bottom: 0px !important;">
              <div class="form-check" style="padding-left: 5px;">
                <input class="form-check-input" type="checkbox" value="director_notes" v-model="checkedNames">
                <label class="form-check-label">
                  Director Notes
                </label>
              </div>
            </div>
          </li>
          <li>
            <!-- Task item -->
            <div class="form-group" style="margin-bottom: 0px !important;">
              <div class="form-check" style="padding-left: 5px;">
                <input class="form-check-input" type="checkbox" value="production_node" v-model="checkedNames">
                <label class="form-check-label">
                  Production Node
                </label>
              </div>
            </div>
          </li>
          <li>
            <!-- Task item -->
            <div class="form-group" style="margin-bottom: 0px !important;">
              <div class="form-check" style="padding-left: 5px;">
                <input class="form-check-input" type="checkbox" value="sizes" v-model="checkedNames">
                <label class="form-check-label">
                  Sizes
                </label>
              </div>
            </div>
          </li>
          <li>
            <!-- Task item -->
            <div class="form-group" style="margin-bottom: 0px !important;">
              <div class="form-check" style="padding-left: 5px;">
                <input class="form-check-input" type="checkbox" value="skills" v-model="checkedNames">
                <label class="form-check-label">
                  Skills
                </label>
              </div>
            </div>
          </li>
        </ul>
        {{ checkedNames }}
        <div class="progress progress-sm active" v-if="isShowDownload">
          <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar"
            :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100" :style="percent">
            <span class="sr-only">{{ progress }}% Complete</span>
          </div>
        </div>
      </div>

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
import util from '../../utils/util'
import commonMethods from '../../commons/commonMethods'
// Datatable Modules
// require('datatables.net-buttons/js/dataTables.buttons.js')
// require('datatables.net-buttons/js/buttons.colVis.js')
// require('datatables.net-buttons/js/buttons.flash.js')
// require('datatables.net-buttons/js/buttons.html5.js')
// require('datatables.net-buttons/js/buttons.print.js')
export default {
  name: 'Admins',
  mixins: [commonMethods],
  components: {
    Modal,
    Select2
  },
  data() {
    return {
      columnsVisibles: ['Personaje', 'Postulante', 'Instagram', 'Edad', 'Agencia', 'Material', '# Entrega', 'Status Postulacion', 'Status Proyecto', 'Dispositivo', 'Acciones'],
      showModalMaterial: false,
      showModalDelete: false,
      showModalDetail: false,
      showModalReport: false,
      showModalDeleteMaterial: false,
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
      postulation: null,
      idPostulation: 0,
      idMaterial: 0,
      role: 0,
      hiddenDefaultCol: [],
      hiddenDefaultColAgency: [0, 6, 7],
      checkedNamesDefault: ['name', 'photo', 'age', 'agency', 'city', 'instagram', 'dropbox', 'casting_notes', 'director_notes', 'production_node', 'skills', 'sizes'],
      checkedNames: [],
      progress: 0,
      percent: 'width: 0%',
      isShowDownload: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.role = this.$store.state.user.role
      if (this.$route.params.hasOwnProperty('id')) {
        this.idProject = this.$route.params.id
        this.fetchProject()
      }
      console.log(this.role)
      if (this.role === util.ADMIN || this.role === util.MANAGER) {
        if (localStorage.getItem('columnVisibleProyectDetail') === null || localStorage.getItem('columnVisibleProyectDetail').length === 0) {
          localStorage.setItem('columnVisibleProyectDetail', JSON.stringify(this.hiddenDefaultCol))
        }
      } else {
        this.columnsVisibles = ['Postulante', 'Instagram', 'Edad', 'Agencia', 'Material', '# Entrega', 'Dispositivo', 'Acciones']
        if (localStorage.getItem('columnVisibleProyectDetailAgency') === null) {
          localStorage.setItem('columnVisibleProyectDetailAgency', JSON.stringify(this.hiddenDefaultColAgency))
        }
      }
    })
  },
  methods: {
    getStatus(idStatus) {
      var status = ''
      switch (idStatus) {
        case 1:
          status = `<span class="label label-default">En Entrega</span>`
          break
        case 2:
          status = `<span class="label label-info">Callback</span>`
          break
        case 3:
          status = `<span class="label label-success">Finalizado</span>`
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
        'ordering': false,
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
            console.log(that.role)

            if (!that.can('delete_postulation')) {
              $('.delete').hide()
            }
            $('.delete').on('click', function () {
              that.confirmDelete(this.id)
            })
            $('.viewMaterial').on('click', function () {
              that.viewMaterial(this.id)
            })
            $('.selectDelivery').on('change', function () {
              if (that.can('edit_postulation')) {
                that.onChangeDelivery({ value: this.value, id: this.id })
                return
              }
              that.alertShow('Permisos', 'No tienes los permisos suficientes para realizar esta accion', 'error', 'fa fa-error')
            })
            $('.selectCharacter').on('change', function () {
              if (that.can('edit_postulation')) {
                that.onChangeCharacter({ value: this.value, id: this.id })
                return
              }
              that.alertShow('Permisos', 'No tienes los permisos suficientes para realizar esta accion', 'error', 'fa fa-error')
            })
            $('.selectPostulation').on('change', function () {
              if (that.can('edit_postulation')) {
                that.onChangeStatus({ value: this.value, id: this.id })
                return
              }
              that.alertShow('Permisos', 'No tienes los permisos suficientes para realizar esta accion', 'error', 'fa fa-error')
            })
            $('.detail').on('click', function () {
              that.detail(this.id)
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
              return `<div class="widget-user-image"><img src="${row.user.photo}"
                                  class="img-circle"> ${row.user.first_name} ${row.user.last_name}</div> ${row.user.email}`
            }
          },
          {
            'data': 'user',
            render: function (data, type, row) {
              return `<div>${row.user.instagram !== null ? row.user.instagram : ''}</div>`
            }
          },

          {
            'data': 'user',
            render: function (data, type, row) {
              return `<div>${row.user.age !== null ? row.user.age : ''}</div>`
            }
          },
          {
            'data': 'user',
            render: function (data, type, row) {
              return `<div>${row.user.agency.name !== undefined ? row.user.agency.name : ''}</div>`
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
              return that.getStatus(row.project.status)
            }
          },
          {
            'data': 'device',
            render: function (data, type, row) {
              var view = `<span class="label label-info">Desconocido</span>`
              if (row.device === 'android') {
                view = `<span class="label label-info"> <i class="fa fa-android"/> Android</span>`
              }
              if (row.device === 'ios') {
                view = `<span class="label label-info"> <i class="fa fa-apple"/> iOS</span>`
              }
              return view
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
        'columnDefs': [
          { 'visible': false, 'targets': JSON.parse((that.role === util.ADMIN && that.role === util.ADMIN) ? localStorage.getItem('columnVisibleProyectDetail') : localStorage.getItem('columnVisibleProyectDetailAgency')) }
        ],
        'language': esMX
      })
      // var columns = that.table.columns().header()
      // var elements = $('#tableProyects > thead > tr:nth-child(1) th')
      // const arrayOfStrings = Array.from(elements).map(element => element.textContent.trim())

      // console.log(JSON.stringify(arrayOfStrings))
      for (let index = 0; index < that.columnsVisibles.length; index++) {
        const title = that.columnsVisibles[index]
        var checked = !that.table.column(index).visible() ? 'checked' : ''
        $('#hiddenColumns').append(`
        <li>
          <!-- Task item -->
          <div class="form-group" style="margin-bottom: 0px !important;">
            <div class="form-check" style="padding-left: 5px;">
              <input class="form-check-input" type="checkbox" value="${index}" ${checked}>
              <label class="form-check-label">
                ${title}
              </label>
            </div>
          </div>
        </li>`)
      }
      this.table.on('page.dt', function (d) {
        var info = that.table.page.info()
        console.log(info)
        that.currentPage = info.page === 0 ? 1 : info.page + 1
        that.length = info.length
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
        params.append('page_size', len)
        params.append('page', that.currentPage)
        that.table.ajax.url(config.serverURI + 'applications/?' + params)
      })
      $('#hiddenColumns input[type=checkbox]').on('click', function (e) {
        // Get the column API object
        var index = $(this).val()
        if (index !== '-1') {
          var column = that.table.column(index)
          var columns
          if (this.role === util.ADMIN && that.role === util.MANAGER) {
            columns = JSON.parse(localStorage.getItem('columnVisibleProyectDetail'))
          } else {
            columns = JSON.parse(localStorage.getItem('columnVisibleProyectDetailAgency'))
          }

          if ($(this).prop('checked')) {
            columns.push(parseInt(index))
          } else {
            columns = columns.filter(column => column !== parseInt(index))
          }
          if (this.role === util.ADMIN || that.role === util.MANAGER) {
            localStorage.setItem('columnVisibleProyectDetail', JSON.stringify(columns))
          } else {
            localStorage.setItem('columnVisibleProyectDetailAgency', JSON.stringify(columns))
          }

          // Toggle the visibility
          column.visible(!column.visible())
        }
      })
      $('#checkAll').click(function () {
        $('input:checkbox').not(this).trigger('click')
      })
    },
    renderView(id, row) {
      return `
        <td>
          <div class="btn-group">
            <button class="btn delete" id="${id}"><i class="fa fa-trash"></i></button>
            <button class="btn detail" id="${id}"><i class="fa fa-info-circle"></i></button>
          </div>
        </td>`
    },
    fetchProject() {
      api
        .request('get', 'projects/' + this.idProject + '/', {}, { 'Authorization': this.$store.state.token }, 'view_postulations')
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
          this.filterDeliveries.unshift({ id: '0', text: 'Sin asignación' })
          this.filterDeliveries.unshift({ id: '', text: 'Todos' })
          this.characters = Object.assign([], tmpCharacters)
          this.deliveries = Object.assign([], tmpDeliveries)
          this.deliveries.unshift({ id: '', text: 'Sin asignación' })
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
        .request('delete', 'applications/' + this.idPostulation + '/', {}, { 'Authorization': this.$store.state.token }, 'delete_postulation')
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
      this.idPostulation = id
      this.materials = []
      api
        .request('get', 'applications/' + id + '/', {}, { 'Authorization': this.$store.state.token }, 'view_postulations')
        .then(response => {
          this.showModalMaterial = true
          console.log(response)
          this.materials = response.data.material
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
    },
    onChangeDelivery({ value, id }) {
      var deliveryId = value
      var applicationId = id
      api
        .request('patch', 'applications/' + applicationId + '/', { delivery: deliveryId }, { 'Authorization': this.$store.state.token }, 'edit_postulation')
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
        .request('patch', 'applications/' + applicationId + '/', { character: characterId }, { 'Authorization': this.$store.state.token }, 'edit_postulation')
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
        .request('patch', 'applications/' + applicationId + '/', { status: status }, { 'Authorization': this.$store.state.token }, 'edit_postulation')
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
    exportPDF() {
      var that = this
      var url = `${config.serverURI}projects/${this.idProject}/export/`
      console.log(this.filters)
      var data = new FormData()
      data.append('character', this.filters.character)
      data.append('delivery', this.filters.delivery)
      data.append('status', this.filters.postulation)
      this.isShowDownload = true
      this.checkedNamesDefault.forEach(element => {
        var check = that.checkedNames.find(e => e === element)
        if (check) {
          data.append(element, true)
        } else {
          data.append(element, false)
        }
      })
      var oReq = new XMLHttpRequest()
      oReq.timeout = 72000
      oReq.open('post', url, true)
      oReq.setRequestHeader('Authorization', this.$store.state.token)
      oReq.responseType = 'blob'
      oReq.onprogress = function (ev) {
        that.progress = ev.total / ev.loaded * 100
        that.percent = `width: ${ev.total / ev.loaded * 100}%`
      }
      oReq.onload = function (oEvent) {
        if (this.status === 200) {
          var filename = `${that.project.name}.pdf`
          that.downloadFile(oReq.response, filename, null)
          that.isShowDownload = false
        } else {
          that.isShowDownload = false
        }
      }
      oReq.send(data)
    },
    exportDocument(ext) {
      var that = this
      var url = `${config.serverURI}projects/${this.idProject}/document/`
      console.log(this.filters)
      var data = new FormData()
      data.append('character', this.filters.character)
      data.append('delivery', this.filters.delivery)
      data.append('status', this.filters.postulation)
      this.checkedNamesDefault.forEach(element => {
        var check = that.checkedNames.find(e => e === element)
        if (check) {
          data.append(element, true)
        } else {
          console.log(check)
          data.append(element, false)
        }
      })
      data.append('ext', ext)
      var oReq = new XMLHttpRequest()
      oReq.timeout = 72000
      oReq.open('post', url, true)
      oReq.setRequestHeader('Authorization', this.$store.state.token)
      oReq.responseType = 'blob'
      oReq.onprogress = function (ev) {
        that.progress = ev.total / ev.loaded * 100
        that.percent = `width: ${ev.total / ev.loaded * 100}%`
      }
      oReq.onload = function (oEvent) {
        if (this.status === 200) {
          var filename = `${that.project.name}.${ext}`
          that.downloadFile(oReq.response, filename, null)
          that.isShowDownload = false
        } else {
          that.isShowDownload = false
        }
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
    },
    detail(id) {
      api
        .request('get', 'applications/' + id + '/', {}, { 'Authorization': this.$store.state.token }, 'view_postulations')
        .then(response => {
          this.showModalDetail = true
          console.log(response)
          this.postulation = response.data
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
    },
    closeDetail() {
      this.showModalDetail = false
    },
    downloadImage(e) {
      e.preventDefault()
      const link = e.target
      console.log(link.href)
      this.download(link.href, link.name + '.' + link.type)
    },
    download(url, filename) {
      fetch(url)
        .then(response => response.blob())
        .then(blob => {
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = filename
          link.click()
        })
        .catch(console.error)
    },
    deleteFile(e) {
      e.preventDefault()
      const link = e.target
      this.idMaterial = link.id
      this.modalDeleteMaterial()
    },
    modalDeleteMaterial() {
      this.showModalMaterial = false
      this.showModalDeleteMaterial = true
    },
    deleteMaterial() {
      this.showModalMaterial = true
      this.showModalDeleteMaterial = false
      api
        .request('delete', `applications/${this.idPostulation}/material/${this.idMaterial}/`, {}, { 'Authorization': this.$store.state.token }, 'delete_postulation')
        .then(response => {
          this.alertShow('Estatus', 'Se elimino la imagen', 'success', 'fa fa-check')
          this.viewMaterial(this.idPostulation)
          this.onChangeStatus({ value: 1, id: this.idPostulation })
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
    },
    downloadReport() {
      this.checkedNames = []
      this.showModalReport = true
    },
    checkedAll(e) {
      if (e.target.checked) {
        this.checkedNames = this.checkedNamesDefault
      } else {
        this.checkedNames = []
      }
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

#app>div>div>section.content>div.modal-mask.modal>div>div>div.modal-body>div>div {
  overflow-y: scroll;
  max-height: 500px;
}

video {
  width: 100%;
  height: 175px;
}

.center {
  display: contents;
  align-items: center;
  justify-content: center;
  border: 3px solid #dbe4ed;
  /* Border color is optional */
}

.description {
  color: #000000 !important;
  font-size: 15px !important;
}

.subtitle {
  font-size: medium !important;
}

.box-profile>.img-circle {
  width: 200px;
  height: 200px;
}

.user-block .username,
.user-block .description,
.user-block .comment {
  display: block;
  margin-left: 0px !important;
}

#app>div>div>section.content>div.modal-mask.modal>div>div>div.modal-body>div>div {
  overflow-y: scroll;
  max-height: 500px;
  overflow-x: hidden;
}

.mailbox-attachment-icon.has-img>img {
  max-width: 100%;
  height: 200px;
}
</style>
