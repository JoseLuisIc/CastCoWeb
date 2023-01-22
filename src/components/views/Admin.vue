<template>
  <section class="content">
    <div class="row center-block">
      <h2></h2>
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title"></h3>
            <button id="btnModalCreate" v-on:click="openModal" type="button" class="btn btn-primary" data-toggle="modal"
              data-target="#modalUserCreate"><i class="fa fa-user-plus"> </i> Agregar Nuevo</button>
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
                  <table aria-describedby="example1_info" role="grid" id="tableUsers"
                    class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th aria-sort="ascending" colspan="1" rowspan="1" aria-controls="example1"
                          tabindex="0" class="sorting_asc">Email</th>
                        <th colspan="1" rowspan="1" aria-controls="example1" tabindex="0"
                          class="sorting">Nombres</th>
                        <th colspan="1" rowspan="1" aria-controls="example1" tabindex="0"
                          class="sorting">Apellidos
                        </th>
                        <th colspan="1" rowspan="1" aria-controls="example1" tabindex="0"
                          class="sorting">Instagram</th>
                        <th colspan="1" rowspan="1" aria-controls="example1" tabindex="0"
                          class="sorting">Rol</th>
                        <th style="width: 101px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0"
                          class="sorting">Acciones</th>
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

    <div class="modal fade" id="modalUserCreate" tabindex="-1" role="dialog" aria-labelledby="modalUserCreateLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalUserCreateLabel">Nuevo Usuario</h5>
            <button type="button" class="close" id="closeCreate" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group" v-bind:class="error.email !== '' ? 'has-error' : ''">
                <label for="email" class="col-form-label">Email:</label>
                <input type="text" class="form-control" id="email" v-model="user.email" @blur="validateEmail">
                <span v-if=error.email class="help-block">{{ error.email }}</span>
              </div>
              <div class="form-group">
                <label for="first_name" class="col-form-label">Nombres:</label>
                <input class="form-control" id="first_name" v-model="user.first_name">
              </div>
              <div class="form-group">
                <label for="last_name" class="col-form-label">Apellidos:</label>
                <input class="form-control" id="last_name" v-model="user.last_name" />
              </div>
              <div class="form-group">
                <label for="instagram" class="col-form-label">Instagram:</label>
                <input class="form-control" id="instagram" v-model="user.instagram" />
              </div>
              <div class="form-group">
                <input class="form-control" id="id" type="hidden" v-model="user.id" />
                <input class="form-control" id="role" type="hidden" v-model="user.role" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" v-on:click="saveUser">Guardar</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="modalUserEdit" tabindex="-1" role="dialog" aria-labelledby="modalUserEditLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalUserEditLabel">Actualizar Usuario</h5>
            <button type="button" class="close" id="closeEdit" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group" v-bind:class="error.email !== '' ? 'has-error' : ''">
                <label for="email" class="col-form-label">Email:</label>
                <input type="text" class="form-control" id="email" v-model="user.email" @blur="validateEmail">
                <span v-if=error.email class="help-block">{{ error.email }}</span>
              </div>
              <div class="form-group">
                <label for="first_name" class="col-form-label">Nombres:</label>
                <input class="form-control" id="first_name" v-model="user.first_name" />
              </div>
              <div class="form-group">
                <label for="last_name" class="col-form-label">Apellidos:</label>
                <input class="form-control" id="last_name" v-model="user.last_name" />
              </div>
              <div class="form-group">
                <label for="instagram" class="col-form-label">Instagram:</label>
                <input class="form-control" id="instagram" v-model="user.instagram" />
              </div>
              <div class="form-group">
                <input class="form-control" id="id" type="hidden" v-model="user.id" />
                <input class="form-control" id="role" type="hidden" v-model="user.role" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" v-on:click="updateUser(user)">Actualizar</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="modalUserDelete" tabindex="-1" role="dialog" aria-labelledby="modalUserDeleteLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalUserDeleteLabel">Eliminar Usuario</h5>
            <button type="button" class="close" id="closeDelete" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Esta seguro que quiere eliminar al usuario?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger" v-on:click="deleteUser">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import $ from 'jquery'
import api from '../../api'
import util from '../../utils/util'
import config from '../../config'
import admin from '../../models/admin'

// Require needed datatables modules
require('datatables.net')

export default {
  name: 'Admins',
  data() {
    return {
      user: admin,
      error: admin,
      table: null,
      users: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.callUser()
    })
  },
  methods: {
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
          this.table.ajax.reload()
          $('#closeEdit').trigger('click')
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
          this.table.ajax.reload()
          $('#closeCreate').trigger('click')
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
          this.user = response.data
          $('#btnModalEdit').trigger('click')
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
    },
    callUser() {
      const params = new URLSearchParams()
      params.append('format', 'datatables')
      var that = this
      this.table = $('#tableUsers').DataTable({
        'processing': true,
        'serverSide': true,
        'ajax': {
          url: config.serverURI + 'users/?' + params,
          type: 'GET',
          complete: function () {
            $('.delete').on('click', function () {
              that.confirmDelete(this.id)
            })
            $('.edit').on('click', function () {
              that.editUser(this.id)
            })
          }
        },
        'searchCols': [
          null,
          null,
          null,
          null,
          { 'search': util.MANAGER },
          null
        ],
        'columns': [
          { 'data': 'email' },
          { 'data': 'first_name' },
          { 'data': 'last_name' },
          { 'data': 'instagram' },
          { 'data': 'role' },
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
        },
        'columnDefs': [
          { 'visible': false, 'targets': [3, 4] }
        ]
      })
      // $('#tableProyects tfoot th').each(function (i) {
      //  var title = $('#tableProyects thead th').eq($(this).index()).text()
      //  if (title !== 'Acciones') {
      //    $(this).html('<input type="text" placeholder="' + title + '" data-index="' + i + '" />')
      //  }
      // })
      // Filter event handler
      $('#tableUsers').on('keyup', 'thead input', function () {
        this.table
          .column($(this).data('index'))
          .search(this.value)
          .draw()
      })
    },
    renderView(data, row) {
      return `<td><button class="btn delete" id="${data}"><i class="fa fa-trash"></i></button><button class="btn edit" id="${data}"><i class="fa fa-edit"></i></button></td>`
    },
    confirmDelete(idUser) {
      api
        .request('get', 'users/' + idUser + '/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.user = response.data
          $('#btnModalDelete').trigger('click')
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
    },
    deleteUser() {
      $('#closeDelete').trigger('click')
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
</style>
