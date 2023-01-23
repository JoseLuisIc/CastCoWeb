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
            <input id="btnModalPwd" type="hidden" data-target="#pwdModal" data-toggle="modal" />
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
                    class="table table-bordered table-striped dataTable display responsive nowrap">
                    <thead>
                      <tr role="row">
                        <th aria-sort="ascending" style="width: 167px;" colspan="1" rowspan="1" aria-controls="example1"
                          tabindex="0" class="sorting_asc">Email</th>
                        <th style="width: 207px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0"
                          class="sorting">Nombre agencia</th>
                        <th style="width: 142px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0"
                          class="sorting">Encargado
                        </th>
                        <th style="width: 182px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0"
                          class="sorting">Telefono</th>
                        <th style="width: 101px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0"
                          class="sorting">Rol</th>
                        <th style="width: 182px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0"
                          class="sorting">Ciudad</th>
                        <th style="width: 101px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0"
                          class="sorting">Acciones</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr role="row">
                        <th rowspan="1" colspan="1"><input class="form-control" type="text" placeholder="Email"
                            data-index="0" autocomplete="off"></th>
                        <th rowspan="1" colspan="1"><input class="form-control" type="text" placeholder="Nombre agencia"
                            data-index="1" autocomplete="off"></th>
                        <th rowspan="1" colspan="1"><input class="form-control" type="text" placeholder="Encargado"
                            data-index="2" autocomplete="off"></th>
                        <th rowspan="1" colspan="1"><input class="form-control" type="text" placeholder="Telefono"
                            data-index="3" autocomplete="off"></th>
                        <th rowspan="1" colspan="1"><input class="form-control" type="text" placeholder="Ciudad"
                            data-index="5" autocomplete="off"></th>
                        <th rowspan="1" colspan="1"><input class="form-control" type="text" placeholder="Ciudad"
                            data-index="6" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');"></th>
                        <th rowspan=" 1" colspan="1"></th>
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
                <div v-if=error.email class="text-red">
                  <p>{{ error.email }}</p>
                </div>
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
                <div v-if=error.email class="text-red">
                  <p>{{ error.email }}</p>
                </div>
              </div>

              <div class="form-group">
                <label for="instagram" class="col-form-label">Instagram:</label>
                <input class="form-control" id="instagram" v-model="user.instagram" />
                <div v-if=error.instagram class="text-red">
                  <p>{{ error.instagram }}</p>
                </div>
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
    <div id="pwdModal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" id="closePwd" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h1 class="text-center">¿Cuál es mi contraseña?</h1>
          </div>
          <div class="modal-body">

            <div class="text-center">
              <p>Si ha olvidado su contraseña, puede restablecerla aquí.</p>
              <fieldset>
                <div class="form-group">
                  <label for="password" class="col-form-label">Contraseña:</label>
                  <input class="form-control input-lg" name="password" type="password" v-model="reset.password">
                </div>
                <div class="form-group">

                  <label for="confirm_password" class="col-form-label">Contraseña:</label>
                  <input class="form-control input-lg" name="confirm_password" type="password"
                    v-model="reset.confirm_password">
                </div>
                <div v-if=reset.error class="text-red">
                  <p>{{ reset.error }}</p>
                </div>
              </fieldset>
            </div>
          </div>
          <div class="modal-footer">
            <div class="col-md-12">
              <button class="btn btn-primary" v-on:click="resetPassword" aria-hidden="true">Guardar</button>
              <button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>
            </div>
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
import agency from '../../models/agency'
import esMX from '../../lang/es_mx'
// Require needed datatables modules
require('datatables.net')

export default {
  name: 'Admins',
  data() {
    return {
      reset: {
        password: '',
        confirm_password: '',
        error: ''
      },
      user: agency,
      error: {
        email: '',
        first_name: '',
        last_name: '',
        instagram: ''
      },
      users: [],
      table: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.callUser()
    })
  },
  methods: {
    openModal() {
      this.user = agency
    },
    updateUser(dUser) {
      api
        .request('patch', 'users/' + dUser.id + '/', this.user, { 'Authorization': this.$store.state.token })
        .then(response => {
          console.log(response.data)
          $('#closeEdit').trigger('click')
          this.table.ajax.reload()
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
          var user = response.data
          $('#closeCreate').trigger('click')
          this.editUser(user.id)
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            this.error.email = errors.email[0]
          }
        })
    },
    editUser(idUser) {
      console.log(idUser)
      Object.keys(this.error).forEach(key => {
        this.error[key] = ''
      })
      this.isNew = false
      api
        .request('get', 'users/' + idUser + '/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          var userData = response.data
          Object.assign(this.user, userData)
          Object.assign(this.user, userData.extras)
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
      var table = $('#tableUsers').DataTable({
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
            $('.reset').on('click', function () {
              that.modalResetPwd(this.id)
            })
          }
        },
        'searchCols': [
          null,
          null,
          null,
          null,
          { 'search': util.AGENCY },
          null
        ],
        'columns': [
          { 'data': 'email' },
          { 'data': 'extras.name', 'name': 'name' },
          { 'data': 'extras.booker_name', 'name': 'booker_name' },
          { 'data': 'extras.phone', 'name': 'phone' },
          { 'data': 'role' },
          { 'data': 'extras.city', 'name': 'city' },
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
        columnDefs: [
          {
            targets: [4],
            visible: false,
            searchable: false
          }
        ],
        'language': esMX
      })
      // $('#tableUsers tfoot th').each(function (i) {
      //   var title = $('#tableUsers thead th').eq($(this).index()).text()
      //   if (title !== 'Acciones') {
      //     $(this).html('<input type="text" placeholder="' + title + '" data-index="' + i + '" />')
      //   }
      // })
      // Filter event handler
      $('#tableUsers').on('keyup', 'tfoot input', function () {
        table
          .column($(this).data('index'))
          .search(this.value)
          .draw()
      })
    },
    renderView(data, row) {
      return `
      <td>
        <button class="btn delete" id="${data}">
          <i class="fa fa-trash"></i>
        </button>
        <button class="btn edit" id="${data}">
          <i class="fa fa-edit"></i>
        </button>
        <button class="btn reset" id="${data}">
          <i class="fa fa-key"></i>
        </button>
      </td>`
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
    },
    modalResetPwd(idUser) {
      this.user.id = idUser
      $('#btnModalPwd').trigger('click')
    },
    resetPassword() {
      var json = {
        id: this.user.id,
        password: this.reset.password,
        confirm_password: this.reset.confirm_password
      }
      api
        .request('post', 'reset/password/', json, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.reset.password = ''
          this.reset.confirm_password = ''
          this.reset.error = ''
          $('#closePwd').trigger('click')
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            this.reset.error = errors.password[0]
          }
        })
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
