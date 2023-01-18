<template>
  <section class="content">
    <div class="row center-block">
      <h2></h2>
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title"></h3>
            <button id="btnModalCreate" v-on:click="openModal" type="button" class="btn btn-primary" data-toggle="modal"
              data-target="#modalProyectCreate"><i class="fa fa-plus"> </i> Agregar Nuevo</button>
            <input id="btnModalEdit" type="hidden" class="btn btn-primary" data-toggle="modal"
              data-target="#modalProyectEdit" />
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
                        <th colspan="1" rowspan="1" class="sorting">Nombre</th>
                        <th colspan="1" rowspan="1" class="sorting">Nombre público
                        </th>
                        <th colspan="1" rowspan="1" class="sorting">Descripción</th>
                        <th colspan="1" rowspan="1" class="sorting">Tipo de material</th>
                        <th colspan="1" rowspan="1" class="no-sort">Acciones</th>
                      </tr>
                      <tr>
                        <th rowspan="1" colspan="1"><input type="text" placeholder="Productora" data-index="0"></th>
                        <th rowspan="1" colspan="1"><input type="text" placeholder="Nombre" data-index="1"></th>
                        <th rowspan="1" colspan="1"><input type="text" placeholder="Nombre público" data-index="2"></th>
                        <th rowspan="1" colspan="1"><input type="text" placeholder="Descripción" data-index="3"></th>
                        <th rowspan="1" colspan="1"><input type="text" placeholder="Tipo de material" data-index="4">
                        </th>
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
    </div>

    <div class="modal fade" id="modalProyectCreate" tabindex="-1" role="dialog"
      aria-labelledby="modalProyectCreateLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalProyectCreateLabel">Nuevo Proyecto</h5>
            <button type="button" class="close" id="closeCreate" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="name" class="col-form-label">Nombre:</label>
                    <input type="text" class="form-control" id="name" v-model="project.name">
                    <div v-if=error.name class="text-red">
                      <p>{{ error.name }}</p>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="producer" class="col-form-label">Productora:</label>
                    <input class="form-control" id="producer" v-model="project.producer" />
                  </div>
                  <div class="form-group">
                    <label for="production_place" class="col-form-label">Lugar de produccion:</label>
                    <input class="form-control" id="production_place" v-model="project.production_place" />
                  </div>
                  <div class="form-group">
                    <label for="temporality" class="col-form-label">Temporalidad:</label>
                    <input class="form-control" id="temporality" v-model="project.temporality" />
                  </div>
                  <div class="form-group">
                    <label for="budget" class="col-form-label">Presuspueto:</label>
                    <input class="form-control" id="budget" v-model="project.budget" />
                  </div>
                  <div class="form-group">
                    <label for="material_type" class="col-form-label">Tipo de material:</label>
                    <input class="form-control" id="material_type" v-model="project.material_type" />
                  </div>
                  <div class="form-group">
                    <label for="recording_date" class="col-form-label">Fechas de grabación:</label>
                    <input class="form-control" type="date" id="recording_date" v-model="project.recording_date" />
                  </div>
                  <div class="form-group">
                    <label for="fitting_date" class="col-form-label">Fechas de fitting:</label>
                    <input class="form-control" type="date" id="fitting_date" v-model="project.fitting_date" />
                  </div>
                  <div class="form-group">
                    <label for="created_at" class="col-form-label">Fecha creación:</label>
                    <input class="form-control" type="date" id="created_at" v-model="project.created_at" />
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="is_active"
                        v-model="project.is_active">
                      <label class="form-check-label" for="is_active">
                        Activo
                      </label>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="public_name" class="col-form-label">Nombre publico:</label>
                    <input class="form-control" id="public_name" v-model="project.public_name" />
                  </div>
                  <div class="form-group">
                    <label for="description" class="col-form-label">Descripción del proyecto:</label>
                    <input class="form-control" id="description" v-model="project.description" />
                  </div>
                  <div class="form-group">
                    <label for="competition" class="col-form-label">Competencia:</label>
                    <input class="form-control" id="competition" v-model="project.competition" />
                  </div>

                  <div class="form-group">
                    <label for="use_of_image" class="col-form-label">Uso de imagen:</label>
                    <input class="form-control" id="use_of_image" v-model="project.use_of_image" />
                  </div>
                  <div class="form-group">
                    <label for="agency_budget" class="col-form-label">Presuspueto Agencia:</label>
                    <input class="form-control" id="agency_budget" v-model="project.agency_budget" />
                  </div>
                  <div class="form-group">
                    <label for="characteristics" class="col-form-label">Caracteristicas:</label>
                    <input class="form-control" id="characteristics" v-model="project.characteristics" />
                  </div>
                  <div class="form-group">
                    <label for="callback_date" class="col-form-label">Fecha de callback:</label>
                    <input class="form-control" type="date" id="callback_date" v-model="project.callback_date" />
                  </div>
                  <div class="form-group">
                    <label for="start_date" class="col-form-label">Fecha de inicio:</label>
                    <input class="form-control" type="date" id="start_date" v-model="project.start_date" />
                  </div>
                  <div class="form-group">
                    <label for="end_date" class="col-form-label">Fecha de fin:</label>
                    <input class="form-control" type="date" id="end_date" v-model="project.end_date" />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <input class="form-control" id="id" type="hidden" v-model="project.id" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" v-on:click="saveProyect">Guardar</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="modalProyectEdit" tabindex="-1" role="dialog" aria-labelledby="modalProyectEditLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalProyectEditLabel">Actualizar Usuario</h5>
            <button type="button" class="close" id="closeEdit" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="name" class="col-form-label">Nombre:</label>
                    <input type="text" class="form-control" id="name" v-model="project.name">
                    <div v-if=error.name class="text-red">
                      <p>{{ error.name }}</p>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="producer" class="col-form-label">Productora:</label>
                    <input class="form-control" id="producer" v-model="project.producer" />
                  </div>
                  <div class="form-group">
                    <label for="production_place" class="col-form-label">Lugar de produccion:</label>
                    <input class="form-control" id="production_place" v-model="project.production_place" />
                  </div>
                  <div class="form-group">
                    <label for="temporality" class="col-form-label">Temporalidad:</label>
                    <input class="form-control" id="temporality" v-model="project.temporality" />
                  </div>
                  <div class="form-group">
                    <label for="budget" class="col-form-label">Presuspueto:</label>
                    <input class="form-control" id="budget" v-model="project.budget" />
                  </div>
                  <div class="form-group">
                    <label for="material_type" class="col-form-label">Tipo de material:</label>
                    <input class="form-control" id="material_type" v-model="project.material_type" />
                  </div>

                  <div class="form-group">
                    <label for="recording_date" class="col-form-label">Fechas de grabación:</label>
                    <input class="form-control" type="date" id="recording_date" v-model="project.recording_date" />
                  </div>
                  <div class="form-group">
                    <label for="fitting_date" class="col-form-label">Fechas de fitting:</label>
                    <input class="form-control" type="date" id="fitting_date" v-model="project.fitting_date" />
                  </div>
                  <div class="form-group">
                    <label for="created_at" class="col-form-label">Fecha creación:</label>
                    <input class="form-control" type="date" id="created_at" v-model="project.created_at" />
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="is_active"
                        v-model="project.is_active">
                      <label class="form-check-label" for="is_active">
                        Activo
                      </label>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="public_name" class="col-form-label">Nombre publico:</label>
                    <input class="form-control" id="public_name" v-model="project.public_name" />
                  </div>
                  <div class="form-group">
                    <label for="description" class="col-form-label">Descripción del proyecto:</label>
                    <input class="form-control" id="description" v-model="project.description" />
                  </div>
                  <div class="form-group">
                    <label for="competition" class="col-form-label">Competencia:</label>
                    <input class="form-control" id="competition" v-model="project.competition" />
                  </div>

                  <div class="form-group">
                    <label for="use_of_image" class="col-form-label">Uso de imagen:</label>
                    <input class="form-control" id="use_of_image" v-model="project.use_of_image" />
                  </div>
                  <div class="form-group">
                    <label for="agency_budget" class="col-form-label">Presuspueto Agencia:</label>
                    <input class="form-control" id="agency_budget" v-model="project.agency_budget" />
                  </div>
                  <div class="form-group">
                    <label for="characteristics" class="col-form-label">Caracteristicas:</label>
                    <input class="form-control" id="characteristics" v-model="project.characteristics" />
                  </div>
                  <div class="form-group">
                    <label for="callback_date" class="col-form-label">Fecha de callback:</label>
                    <input class="form-control" type="date" id="callback_date" v-model="project.callback_date" />
                  </div>
                  <div class="form-group">
                    <label for="start_date" class="col-form-label">Fecha de inicio:</label>
                    <input class="form-control" type="date" id="start_date" v-model="project.start_date" />
                  </div>
                  <div class="form-group">
                    <label for="end_date" class="col-form-label">Fecha de fin:</label>
                    <input class="form-control" type="date" id="end_date" v-model="project.end_date" />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <input class="form-control" id="id" type="hidden" v-model="project.id" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" v-on:click="updateProyect(project)">Actualizar</button>
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
    updateProyect(dProyect) {
      var projectFormData = new FormData()
      Object.keys(this.project).forEach(key => {
        if (key !== 'role' && key !== 'extras') {
          projectFormData.append(key, this.project[key])
        }
      })
      api
        .request('patch', 'projects/' + dProyect.id + '/', projectFormData, { 'Authorization': localStorage.getItem('token') })
        .then(response => {
          this.table.ajax.reload()
          $('#closeEdit').trigger('click')
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
    saveProyect() {
      api
        .request('post', 'projects/', this.project, { 'Authorization': localStorage.getItem('token') })
        .then(response => {
          this.table.ajax.reload()
          $('#closeCreate').trigger('click')
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            this.error.email = errors.email[0]
          }
        })
    },
    editProyect(idProject) {
      this.isNew = false
      this.$router.push({ path: `/proyects/${idProject}/edit`, params: { id: idProject } })
      // api
      // .request('get', 'projects/' + idProject + '/', {}, { 'Authorization': localStorage.getItem('token') })
      // .then(response => {
      //   this.project = response.data
      //   $('#btnModalEdit').trigger('click')
      // })
      // .catch(error => {
      //   if (error.response) {
      //     var errors = error.response.data
      //     console.log(errors)
      //   }
      // })
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
          'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        }
      })
      // $('#tableProyects tfoot th').each(function (i) {
      //  var title = $('#tableProyects thead th').eq($(this).index()).text()
      //  if (title !== 'Acciones') {
      //    $(this).html('<input type="text" placeholder="' + title + '" data-index="' + i + '" />')
      //  }
      // })
      // Filter event handler
      $('#tableProyects').on('keyup', 'thead input', function () {
        this.table
          .column($(this).data('index'))
          .search(this.value)
          .draw()
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
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files
      if (files.length) {
        this.createImage(files[0])
      }
    },
    createImage(file) {
      var vm = this
      vm.project.photo = file
    },
    removeImage: function (e) {
      this.photo = ''
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
</style>
