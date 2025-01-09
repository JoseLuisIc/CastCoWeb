<template>
  <section class="content">
    <div class="row center-block">
      <h2></h2>
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title"></h3>
            <router-link to="/admin/proyects/create" class="btn btn-primary" v-can="'create_projects'"> <i
                class="fa fa-plus"> </i> Agregar
              Nuevo</router-link>
            <input id="btnModalDelete" type="hidden" class="btn btn-primary" data-toggle="modal"
              data-target="#modalProyectDelete" />

            <div class="btn-group" style="float: right;">
              <button href="javascript:;" class="dropdown-toggle btn btn-danger" data-toggle="dropdown"
                v-can="'visible_columns_projects'" aria-haspopup="true" aria-expanded="false"> Columnas Visibles
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
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
              <div class="row">
                <div class="col-sm-6">
                  <div id="example1_length" class="dataTables_length">

                  </div>
                </div>
              </div>
            </div><!-- /.form-group -->
            <div class="row">
              <div class="col-sm-12 table-responsive">
                <table aria-describedby="example1_info" role="grid" id="tableProyects"
                  class="table table-bordered table-striped dataTable display responsive display nowrap"
                  cellspacing="0">
                  <thead>
                    <tr role="row">
                      <th aria-sort="ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0"
                        class="sorting_asc">Produccion</th>
                      <th colspan="1" rowspan="1" class="sorting" tabindex="1">Nombre</th>
                      <th colspan="1" rowspan="1" class="sorting" tabindex="2">Nombre público
                      </th>
                      <!-- <th colspan="1" rowspan="1" class="sorting" tabindex="3">Dias de casting</th>
                      <th colspan="1" rowspan="1" class="sorting" tabindex="4">Dinamica de casting</th> -->
                      <th colspan="1" rowspan="1" class="sorting" tabindex="5">Status</th>
                      <th colspan="1" rowspan="1" class="no-sort">Locación</th>
                      <!-- <th colspan="1" rowspan="1" class="no-sort">Competencia</th>
                      <th colspan="1" rowspan="1" class="no-sort">Work day</th>
                      <th colspan="1" rowspan="1" class="no-sort">Buy out GARANTIZADO</th>
                      <th colspan="1" rowspan="1" class="no-sort">Temporalidad</th>
                      <th colspan="1" rowspan="1" class="no-sort">Exclusividad</th> -->
                      <th colspan="1" rowspan="1" class="no-sort">Callback</th>
                      <th colspan="1" rowspan="1" class="no-sort">Fitting</th>
                      <th colspan="1" rowspan="1" class="no-sort">Shoot dates</th>
                      <th colspan="1" rowspan="1" class="no-sort">Status de Postulacion</th>
                      <th colspan="1" rowspan="1" class="no-sort" style="width: 207px;">Acciones</th>
                    </tr>
                  </thead>
                  <thead>
                    <tr>
                      <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                          placeholder="Productora" data-index="0"></th>
                      <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                          placeholder="Nombre" data-index="1"></th>
                      <!-- <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                          placeholder="Nombre público" data-index="2"></th>
                      <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                          placeholder="Descripción" data-index="3"></th> -->
                      <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                          placeholder="Tipo de material" data-index="2">
                      </th>
                      <th rowspan="1" colspan="1" class="sorting_disabled">
                        <select class="form-control" data-index="3" id="status">
                          <option value="">Todos</option>
                          <option value="true">Activo</option>
                          <option value="false">Inactivo</option>
                        </select>
                      </th>
                      <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                          placeholder="Locación" data-index="4"></th>
                      <!-- <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                          placeholder="Competencia" data-index="7"></th>
                      <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                          placeholder="Caracteristicas" data-index="8"></th>
                      <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                          placeholder="Uso de imagen" data-index="9"></th>
                      <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                          placeholder="Temporalidad" data-index="10"></th>
                      <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                          placeholder="Agencia" data-index="11"></th> -->
                      <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                          placeholder="Callback" data-index="5"></th>
                      <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                          placeholder="Fitting" data-index="6"></th>
                      <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                          placeholder="Shoot dates" data-index="7"></th>
                      <th rowspan="1" colspan="1" class="sorting_disabled"><select id="selectFilterStatusProject"
                          class="form-control" name="status" data-index="8">
                          <option value="1" selected="">En Entrega</option>
                          <option value="2">Callback</option>
                          <option value="3">Finalizado</option>
                        </select></th>
                      <th rowspan="1" colspan="1"></th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
          <!-- /.box-body -->
        </div>
      </div>
    </div>
    <modal v-if="showModalDelete" @close="showModalDelete = false" :iconClasses="['modal-md']">
      <h3 slot="header">Eliminar Usuario</h3>
      <div slot="body">
        <p>Esta seguro que quiere eliminar al usuario?</p>
        <input type="text" class="form-control" placeholder="Escribe el nombre del proyecto"
          v-model="confirmNameProyect">
      </div>

      <button slot="footer" type="button" class="btn btn-danger" v-on:click="deleteProyect">Eliminar</button>

    </modal>
  </section>
</template>
<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css');
</style>
<script>
import $ from 'jquery'
import api from '../../api'
import config from '../../config'
import project from '../../models/project'
import Modal from '../widgets/Modal.vue'
import commonMethods from '../../commons/commonMethods'
// Datatable Modules
// require('datatables.net-buttons/js/dataTables.buttons.js')
// require('datatables.net-buttons/js/buttons.colVis.js')
// require('datatables.net-buttons/js/buttons.flash.js')
// require('datatables.net-buttons/js/buttons.html5.js')
// require('datatables.net-buttons/js/buttons.print.js')

import esMX from '../../lang/es_mx'
$.fn.dataTable.Api.register('sum()', function () {
  return this.flatten().reduce(function (a, b) {
    if (typeof a === 'string') {
      a = a.replace(/[^\d.-]/g, '') * 1
    }
    if (typeof b === 'string') {
      b = b.replace(/[^\d.-]/g, '') * 1
    }

    return a + b
  }, 0)
})
import toastr from 'toastr'
import store from '../../store'
import util from '../../utils/util'

// Require needed datatables modules
require('datatables.net')
require('datatables.net-bs')
export default {
  name: 'Admins',
  components: {
    Modal
  },
  mixins: [commonMethods],
  data() {
    return {
      showModalDelete: false,
      table: null,
      project: project,
      error: project,
      projects: [],
      agencies: [],
      states: [],
      hiddenDefaultCol: [],
      role: 0,
      confirmNameProyect: '',
      is_active: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.callProyect()
      this.role = this.$store.state.user.role
      if (localStorage.getItem('columnVisibleProyect') === null) {
        localStorage.setItem('columnVisibleProyect', JSON.stringify(this.hiddenDefaultCol))
      }
    })
  },
  methods: {
    isAgency() {
      return this.AGENCY === store.state.user.role
    },
    openModal() {
      this.project = project
    },
    editProyect(idProject) {
      this.isNew = false
      if (this.role === util.ADMIN) {
        this.$router.push({ path: `/admin/proyects/${idProject}/edit`, params: { id: idProject, project: this.project } })
      } else {
        this.$router.push({ path: `/manager/proyects/${idProject}/edit`, params: { id: idProject, project: this.project } })
      }
    },
    callProyect() {
      const params = new URLSearchParams()
      params.append('format', 'datatables')
      var that = this
      if (that.isAgency()) {
        $('#status').val('true')
        that.is_active = true
      }
      this.table = $('#tableProyects').DataTable({
        'lengthMenu': [[10, 25, 50, 100, -1], [10, 25, 50, 100, 'All']],
        'dom': 'Blfrtip',
        'autoWidth': false,
        'responsive': true,
        'processing': true,
        'serverSide': true,
        'drawCallback': function () {
          // var api = this.api()
          // $(api.column(5).footer()).html(
          //   'Total: ' + api.column(5, { page: 'current' }).data().sum()
          // )
        },
        'ajax': {
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', that.$store.state.token)
          },
          url: config.serverURI + 'projects/?' + params,
          type: 'GET',
          data: function (d) {
            d.is_active = that.is_active
          },
          complete: function () {
            $('.delete').on('click', function () {
              that.confirmDelete(this.id)
            })
            $('.edit').on('click', function () {
              that.editProyect(this.id)
            })
            if (!that.can('edit_projects')) {
              $('.edit').hide()
            }
            if (!that.can('delete_projects')) {
              $('.delete').hide()
            }
            $('.view').on('click', function () {
              that.detailProyect(this.id)
            })
          },
          error: function (jqXHR, ajaxOptions, thrownError) {

          }
        },
        'columns': [
          { 'data': 'producer' },
          { 'data': 'name' },
          { 'data': 'public_name' },
          // { 'data': 'casting_days' },
          // { 'data': 'casting_dynamics' },
          {
            'data': 'is_active',
            render: function (data, type, row) {
              return `<select class="selectStatus" class="form-control" name="status" data-index="${row.id}">
                  <option value="true" ${row.is_active ? 'selected' : ''}>Activo</option>
                  <option value="false" ${row.is_active ? '' : 'selected'}>Inactivo</option>
              </select>
              `
            }
          },
          { 'data': 'production_place' },
          // { 'data': 'competition' },
          // { 'data': 'work_day' },
          // { 'data': 'buy_out' },
          // { 'data': 'temporality' },
          // { 'data': 'exclusiveness' },
          { 'data': 'callback_date' },
          // { 'data': 'material' },
          { 'data': 'fitting_date' },
          { 'data': 'recording_date' },
          {
            'data': 'status',
            render: function (data, type, row) {
              return `<select class="selectStatusProject" class="form-control" name="status" data-index="${row.id}">
                  <option value="1" ${row.status === 1 ? 'selected' : ''}>En Entrega</option>
                  <option value="2" ${row.status === 2 ? 'selected' : ''}>Callback</option>
                  <option value="3" ${row.status === 3 ? 'selected' : ''}>Finalizado</option>
              </select>
              `
            }
          },
          // { 'data': 'callback_date' },
          // { 'data': 'start_date' },
          // { 'data': 'end_date' },
          // { 'data': 'created_by' },
          // { 'data': 'created_at' },
          // { 'data': 'updated_at' },
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
          { 'visible': false, 'targets': JSON.parse(localStorage.getItem('columnVisibleProyect')) }
        ],
        'language': esMX
      })
      var columns = that.table.columns().header()
      for (let index = 0; index < columns.length; index++) {
        const element = columns[index]
        var title = $(element).text()
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
      // Filter event handler
      $('#tableProyects').on('keyup', 'thead input', function () {
        var col = $(this).data('index')
        console.log(col)
        that.table
          .column(col)
          .search(this.value)
          .draw()
      })
      $('#tableProyects').on('change', '#status', function () {
        var col = $(this).data('index')
        console.log(col)
        that.is_active = this.value
        that.table
          .column(col)
          .search(this.value)
          .draw()
      })
      $('#tableProyects').on('change', '#selectFilterStatusProject', function () {
        var col = $(this).data('index')
        console.log(col)
        that.table
          .column(col)
          .search(this.value)
          .draw()
      })
      $('#tableProyects').on('change', '.selectStatus', function () {
        var col = $(this).data('index')
        console.log(col, $(this).val())
        if (that.can('edit_projects')) {
          that.updateProyect({ id: col, is_active: $(this).val() })
          return
        }
        toastr.error('Permisos', 'No tienes los permisos suficientes para realizar esta accion')
      })
      $('#tableProyects').on('change', '.selectStatusProject', function () {
        var col = $(this).data('index')
        console.log(col, $(this).val())
        if (that.can('edit_projects')) {
          that.updateProyect({ id: col, status: $(this).val() })
          return
        }
        toastr.error('Permisos', 'No tienes los permisos suficientes para realizar esta accion')
      })
      $('input[type=checkbox]').on('click', function (e) {
        // Get the column API object
        var index = $(this).val()
        if (index !== '-1') {
          var column = that.table.column(index)
          var columns = JSON.parse(localStorage.getItem('columnVisibleProyect'))
          if ($(this).prop('checked')) {
            columns.push(parseInt(index))
          } else {
            columns = columns.filter(column => column !== parseInt(index))
          }
          localStorage.setItem('columnVisibleProyect', JSON.stringify(columns))

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
            <button class="btn edit" id="${id}"><i class="fa fa-edit"></i></button>
            <button class="btn view" id="${id}"><i class="fa fa-group"></i></button>
          </div>
        </td>`
    },
    confirmDelete(idProject) {
      this.confirmNameProyect = ''
      api
        .request('get', 'projects/' + idProject + '/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.project = response.data
          this.showModalDelete = true
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
    },
    updateProyect(dProyect) {
      var projectFormData = new FormData()
      Object.keys(dProyect).forEach(key => {
        projectFormData.append(key, dProyect[key])
      })
      api
        .request('patch', 'projects/' + dProyect.id + '/', projectFormData, { 'Authorization': this.$store.state.token })
        .then(response => {
          toastr.success('Estatus', 'Se ha cambiado el estatus')
        })
        .catch(error => {
          Object.keys(this.error).forEach(key => {
            this.error[key] = ''
          })
          if (error.response) {
            var errors = error.response.data
            Object.keys(errors).forEach(key => {
              this.error[key] = errors[key][0]
            })
          }
        })
    },
    deleteProyect() {
      if (this.project.name === this.confirmNameProyect) {
        api
          .request('delete', 'projects/' + this.project.id + '/', {}, { 'Authorization': this.$store.state.token })
          .then(response => {
            this.table.ajax.reload()
            this.showModalDelete = false
          })
          .catch(error => {
            if (error.response) {
              var errors = error.response.data
              console.log(errors)
            }
          })
        this.confirmNameProyect = ''
      } else {
        toastr.error('Eliminar proyecto', 'No se puede eliminar el proyecto')
        this.confirmNameProyect = ''
      }
    },
    getStates() {
      api
        .request('get', 'states/?', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.states = response.data.results
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            this.error.email = errors.email[0]
          }
        })
    },
    detailProyect(idProject) {
      if (this.role === util.ADMIN) {
        this.$router.push({ path: `/admin/proyects/detail/${idProject}`, params: this.project })
      } else if (this.role === util.MANAGER) {
        this.$router.push({ path: `/manager/proyects/detail/${idProject}`, params: this.project })
      } else {
        this.$router.push({ path: `/agency/proyects/detail/${idProject}`, params: this.project })
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
</style>
