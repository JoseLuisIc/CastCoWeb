<template>
  <section class="content">
    <div class="row center-block">
      <h2></h2>
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title"></h3>
            <router-link to="/admin/proyects/create" class="btn btn-primary"> <i class="fa fa-plus"> </i> Agregar
              Nuevo</router-link>
            <input id="btnModalDelete" type="hidden" class="btn btn-primary" data-toggle="modal"
              data-target="#modalProyectDelete" />

            <div class="btn-group" style="float: right;">
              <button href="javascript:;" class="dropdown-toggle btn btn-danger" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false"> Columnas Visibles
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
                        class="sorting_asc">Productora</th>
                      <th colspan="1" rowspan="1" class="sorting" tabindex="1">Nombre</th>
                      <th colspan="1" rowspan="1" class="sorting" tabindex="2">Nombre público
                      </th>
                      <th colspan="1" rowspan="1" class="sorting" tabindex="3">Descripción</th>
                      <th colspan="1" rowspan="1" class="sorting" tabindex="4">Tipo de material</th>
                      <th colspan="1" rowspan="1" class="sorting" tabindex="5">Status</th>
                      <th colspan="1" rowspan="1" class="no-sort">Lugar de producción</th>
                      <th colspan="1" rowspan="1" class="no-sort">Competencia</th>
                      <th colspan="1" rowspan="1" class="no-sort">Caracteristicas</th>
                      <th colspan="1" rowspan="1" class="no-sort">Uso de imagen</th>
                      <th colspan="1" rowspan="1" class="no-sort">Temporalidad</th>
                      <th colspan="1" rowspan="1" class="no-sort">Agencia</th>
                      <th colspan="1" rowspan="1" class="no-sort">Presupuesto Agencia</th>
                      <th colspan="1" rowspan="1" class="no-sort">Fecha producción</th>
                      <th colspan="1" rowspan="1" class="no-sort">Fecha de montaje</th>
                      <th colspan="1" rowspan="1" class="no-sort">Fecha de llamada</th>
                      <th colspan="1" rowspan="1" class="no-sort" style="width: 207px;" >Acciones</th>
                    </tr>
                  </thead>
                  <tfoot>
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
                      <th rowspan="1" colspan="1" class="sorting_disabled">
                        <select class="form-control" data-index="5" id="status">
                          <option value="">Todos</option>
                          <option value="true">Activo</option>
                          <option value="false">Inactivo</option>
                        </select>
                      </th>
                      <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                          placeholder="Lugar de producción" data-index="6"></th>
                      <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                          placeholder="Competencia" data-index="7"></th>
                      <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                          placeholder="Caracteristicas" data-index="8"></th>
                      <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                          placeholder="Uso de imagen" data-index="9"></th>
                      <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                          placeholder="Temporalidad" data-index="10"></th>
                      <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                          placeholder="Agencia" data-index="11"></th>
                      <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                          placeholder="Presupuesto Agencia" data-index="12"></th>
                      <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                          placeholder="Fecha producción" data-index="13"></th>
                      <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                          placeholder="Fecha de montaje" data-index="14"></th>
                      <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                          placeholder="Fecha de llamada" data-index="15"></th>
                      <th rowspan="1" colspan="1"></th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
          <!-- /.box-body -->
        </div>
      </div>
    </div>
    <div class="modal fade" id="modalProyectDelete" tabindex="-1" role="dialog"
      aria-labelledby="modalProyectDeleteLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalProyectDeleteLabel">Eliminar Usuario</h5>
            <button type="button" class="close" id="closeDelete" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Esta seguro que quiere eliminar al usuario?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger" v-on:click="deleteProyect">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import $ from 'jquery'
import api from '../../api'
import config from '../../config'
import project from '../../models/project'
// Datatable Modules
import 'datatables.net'
import 'datatables.net-buttons/js/dataTables.buttons.js'
import 'datatables.net-buttons/js/buttons.colVis.js'
import 'datatables.net-buttons/js/buttons.flash.js'
import 'datatables.net-buttons/js/buttons.html5.js'
import 'datatables.net-buttons/js/buttons.print.js'
import moment from 'moment'
import settings from '../../config/settings'
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

// Require needed datatables modules
export default {
  name: 'Admins',
  data() {
    return {
      table: null,
      project: project,
      error: project,
      projects: [],
      agencies: [],
      states: [],
      hiddenDefaultCol: [6, 7, 8, 9, 10, 11]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.callProyect()
      if (localStorage.getItem('columnVisibleProyect') === null) {
        localStorage.setItem('columnVisibleProyect', JSON.stringify(this.hiddenDefaultCol))
      }
    })
  },
  methods: {
    openModal() {
      this.project = project
    },
    editProyect(idProject) {
      this.isNew = false
      this.$router.push({ path: `/admin/proyects/${idProject}/edit`, params: { id: idProject } })
    },
    callProyect() {
      const params = new URLSearchParams()
      params.append('format', 'datatables')
      var that = this
      this.table = $('#tableProyects').DataTable({
        'lengthMenu': [[10, 25, 50, 100, -1], [10, 25, 50, 100, 'All']],
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
        'drawCallback': function () {
          // var api = this.api()
          // $(api.column(5).footer()).html(
          //   'Total: ' + api.column(5, { page: 'current' }).data().sum()
          // )
        },
        'ajax': {
          url: config.serverURI + 'projects/?' + params,
          type: 'GET',
          complete: function () {
            $('.delete').on('click', function () {
              that.confirmDelete(this.id)
            })
            $('.edit').on('click', function () {
              that.editProyect(this.id)
            })
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
          { 'data': 'description' },
          { 'data': 'material_type' },
          {
            'data': 'is_active',
            render: function (data, type, row) {
              return `<select id="selectStatus" class="form-control" name="status" data-index="${row.id}">
                  <option value="true" ${row.is_active ? 'selected' : ''}>Activo</option>
                  <option value="false" ${row.is_active ? '' : 'selected'}>Inactivo</option>
              </select>
              `
            }
          },
          { 'data': 'production_place' },
          { 'data': 'competition' },
          { 'data': 'characteristics' },
          { 'data': 'use_of_image' },
          { 'data': 'temporality' },
          { 'data': 'budget' },
          { 'data': 'agency_budget' },
          // { 'data': 'material' },
          { 'data': 'recording_date' },
          { 'data': 'fitting_date' },
          { 'data': 'callback_date' },
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
      $('#tableProyects').on('keyup', 'tfoot input', function () {
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
        that.table
          .column(col)
          .search(this.value)
          .draw()
      })
      $('#tableProyects').on('change', '#selectStatus', function () {
        var col = $(this).data('index')
        console.log(col, $(this).val())
        that.updateProyect({ id: col, is_active: $(this).val() })
      })
      $(this).ajaxError(function (event, request, settings) {
        console.log(event, request, settings)
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
            <button class="btn view" id="${id}"><i class="fa fa-eye"></i></button>
          </div>
        </td>`
    },
    confirmDelete(idProject) {
      api
        .request('get', 'projects/' + idProject + '/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.project = response.data
          $('#btnModalDelete').trigger('click')
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
      api
        .request('delete', 'projects/' + this.project.id + '/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.table.ajax.reload()
          $('#closeDelete').trigger('click')
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
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
      this.$router.push({ path: `/admin/proyects/detail/${idProject}`, params: { id: idProject } })
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
