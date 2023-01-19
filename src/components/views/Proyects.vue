<template>
  <section class="content">
    <div class="row center-block">
      <h2></h2>
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title"></h3>
            <router-link to="/proyects/create" class="btn btn-primary"> <i class="fa fa-plus"> </i> Agregar
              Nuevo</router-link>
            <input id="btnModalDelete" type="hidden" class="btn btn-primary" data-toggle="modal"
              data-target="#modalProyectDelete" />
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
                    class="table table-bordered table-striped dataTable">
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
                        <th colspan="1" rowspan="1" class="no-sort">Acciones</th>
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

// Require needed datatables modules
require('datatables.net')

export default {
  name: 'Admins',
  data() {
    return {
      table: null,
      project: {
        id: 0,
        name: '',
        producer: '',
        material_type: '',
        production_place: '',
        temporality: '',
        budget: '',
        fitting_date: '',
        recording_date: '',
        created_at: '',
        public_name: '',
        competition: '',
        agency_budget: '',
        use_of_image: '',
        callback_date: '',
        start_date: '',
        end_date: '',
        updated_at: '',
        is_active: false,
        characteristics: '',
        description: ''
      },
      error: {
        id: 0,
        name: '',
        producer: '',
        material_type: '',
        production_place: '',
        temporality: '',
        budget: '',
        fitting_date: '',
        recording_date: '',
        created_at: '',
        public_name: '',
        competition: '',
        agency_budget: '',
        use_of_image: '',
        callback_date: '',
        start_date: '',
        end_date: '',
        updated_at: '',
        is_active: false,
        characteristics: '',
        description: ''
      },
      projects: [],
      agencies: [],
      states: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.callProyect()
    })
  },
  methods: {
    openModal() {
      this.project = {
        id: 0,
        name: '',
        producer: '',
        material_type: '',
        production_place: '',
        temporality: '',
        budget: '',
        fitting_date: '',
        recording_date: '',
        created_at: '',
        public_name: '',
        competition: '',
        agency_budget: '',
        use_of_image: '',
        callback_date: '',
        start_date: '',
        end_date: '',
        updated_at: '',
        is_active: false,
        characteristics: '',
        description: ''
      }
    },
    editProyect(idProject) {
      this.isNew = false
      this.$router.push({ path: `/proyects/${idProject}/edit`, params: { id: idProject } })
    },
    callProyect() {
      const params = new URLSearchParams()
      params.append('format', 'datatables')
      var that = this
      this.table = $('#tableProyects').DataTable({
        'lengthMenu': [10, 25, 50, 75, 100, 'All'],
        'responsive': true,
        'processing': true,
        'serverSide': true,
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
        'language': {
          'url': 'https://cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json'
        }
      })
      // $('#tableProyects tfoot th').each(function (i) {
      //  var title = $('#tableProyects thead th').eq($(this).index()).text()
      //  if (title !== 'Acciones') {
      //    $(this).html('<input type="text" placeholder="' + title + '" data-index="' + i + '" />')
      //  }
      // })
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
    },
    renderView(id, row) {
      return `<td><button class="btn delete" id="${id}"><i class="fa fa-trash"></i>
        </button><button class="btn edit" id="${id}"><i class="fa fa-edit"></i></button></td> `
    },
    confirmDelete(idProject) {
      api
        .request('get', 'projects/' + idProject + '/', {}, { 'Authorization': localStorage.getItem('token') })
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
        .request('patch', 'projects/' + dProyect.id + '/', projectFormData, { 'Authorization': localStorage.getItem('token') })
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
        .request('delete', 'projects/' + this.project.id + '/', {}, { 'Authorization': localStorage.getItem('token') })
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
        .request('get', 'states/?', {}, { 'Authorization': localStorage.getItem('token') })
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
    validateEmail(e) {
      var email = e.target.value
      if (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        this.error.email = ''
      } else {
        this.error.email = 'Ingrese un correo valido'
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
</style>
