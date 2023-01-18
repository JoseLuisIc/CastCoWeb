<template>
  <section class="content">
    <div class="row center-block">
      <h2></h2>
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title"></h3>
            <button id="btnModalCreate" v-on:click="openModal" type="button" class="btn btn-primary" data-toggle="modal"
              data-target="#modalUserCreate"><i class="fa fa-plus"> </i> Agregar Nuevo</button>
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
                    class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th aria-sort="ascending" style="width: 167px;" colspan="1" rowspan="1" aria-controls="example1"
                          tabindex="0" class="sorting_asc">Email</th>
                        <th aria-sort="ascending" style="width: 167px;" colspan="1" rowspan="1" aria-controls="example1"
                          tabindex="0" class="sorting_asc">Nombre</th>
                        <th aria-sort="ascending" style="width: 167px;" colspan="1" rowspan="1" aria-controls="example1"
                          tabindex="0" class="sorting_asc">Apellidos</th>
                        <th aria-sort="ascending" style="width: 167px;" colspan="1" rowspan="1" aria-controls="example1"
                          tabindex="0" class="sorting_asc">Foto</th>
                        <th style="width: 207px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0"
                          class="sorting">Ciudad</th>
                        <th style="width: 182px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0"
                          class="sorting">Instagram</th>
                        <th style="width: 182px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0"
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
              <div class="form-group">
                <label for="email" class="col-form-label">Email:</label>
                <input type="text" class="form-control" id="email" v-model="user.email" @blur="validateEmail">
                <div v-if=error.email class="text-red">
                  <p>{{ error.email }}</p>
                </div>
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
            <button type="button" class="btn btn-primary" v-on:click="saveUser">Guardar</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="modalUserEdit" tabindex="-1" role="dialog" aria-labelledby="modalUserEditLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalUserEditLabel">Actualizar Usuario</h5>
            <button type="button" class="close" id="closeEdit" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row">

                <div class="col-md-6">
                  <div class="form-group">
                    <label for="email" class="col-form-label">Email:</label>
                    <input type="text" class="form-control" id="email" v-model="user.email" @blur="validateEmail">
                    <div v-if=error.email class="text-red">
                      <p>{{ error.email }}</p>
                    </div>
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
                    <label for="age" class="col-form-label">Edad:</label>
                    <input type="number" class="form-control" id="age" v-model="user.age" max="100" min="18" />
                    <div v-if=error.age class="text-red">
                      <p>{{ error.age }}</p>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="photo" class="col-form-label">Foto:</label>
                    <input type="file" class="form-control" id="file" @change="onFileChange" />
                  </div>
                  <div class="form-group">
                    <label for="state" class="col-form-label">Estado:</label>
                    <select name="state" class="form-control" id="state" v-model="user.state.id">
                      <option value="0" selected>Elegir Estado</option>
                      <option v-for="(state, index) in states" :key="index" :value="state.id">{{ state.name }}</option>
                    </select>
                    <div v-if=error.state class="text-red">
                      <p>{{ error.state }}</p>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="agency" class="col-form-label">Agencia:</label>
                    <select name="agency" class="form-control" id="agency" v-model="user.agency">
                      <option value="0" selected>Elegir Agencia</option>
                      <option v-for="(agency, index) in agencies" :key="index" :value="agency.id">{{ agency.name }}
                      </option>
                    </select>
                    <div v-if=error.agency class="text-red">
                      <p>{{ error.agency }}</p>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="gender" class="col-form-label">Genero:</label>
                    <select name="gender" class="form-control" id="gender" v-model="user.gender">
                      <option value="0" selected>Elegir Genero</option>
                      <option value="1">Hombre</option>
                      <option value="2">Mujer</option>
                      <option value="3">No binario</option>
                    </select>
                    <div v-if=error.gender class="text-red">
                      <p>{{ error.gender }}</p>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="lgtbq" class="col-form-label">LGTBQ:</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" v-model="user.lgtbq">
                    <label class="form-check-label" for="flexCheckChecked">
                      Pertenesco a la comunidad
                    </label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="instagram" class="col-form-label">Instagram:</label>
                    <input class="form-control" id="instagram" v-model="user.instagram" />
                  </div>
                  <div class="form-group">
                    <label for="phone" class="col-form-label">Telefono:</label>
                    <input class="form-control" id="phone" v-model="user.phone" />
                    <div v-if=error.phone class="text-red">
                      <p>{{ error.phone }}</p>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="height" class="col-form-label">Altura:</label>
                    <input class="form-control" id="height" v-model="user.height" />
                    <div v-if=error.height class="text-red">
                      <p>{{ error.height }}</p>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="shoe_size" class="col-form-label"># Calzado:</label>
                    <input class="form-control" id="shoe_size" v-model="user.shoe_size" />
                    <div v-if=error.shoe_size class="text-red">
                      <p>{{ error.shoe_size }}</p>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="pant_size" class="col-form-label"># Pantalon:</label>
                    <select name="pant_size" class="form-control" id="pant_size" v-model="user.pant_size">
                      <option value="0" selected>Elegir Talla</option>
                      <option value="1">XCH</option>
                      <option value="2">CH</option>
                      <option value="3">MD</option>
                      <option value="4">GD</option>
                      <option value="5">XGD</option>
                    </select>
                    <div v-if=error.pant_size class="text-red">
                      <p>{{ error.pant_size }}</p>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="shirt_size" class="col-form-label"># Camisa:</label>
                    <select name="shirt_size" class="form-control" id="shirt_size" v-model="user.shirt_size">
                      <option value="0" selected>Elegir Talla</option>
                      <option value="1">XCH</option>
                      <option value="2">CH</option>
                      <option value="3">MD</option>
                      <option value="4">GD</option>
                      <option value="5">XGD</option>
                    </select>
                    <div v-if=error.shirt_size class="text-red">
                      <p>{{ error.shirt_size }}</p>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="job_occupation" class="col-form-label">Ocupacion:</label>
                    <input class="form-control" id="job_occupation" v-model="user.job_occupation" />
                    <div v-if=error.job_occupation class="text-red">
                      <p>{{ error.job_occupation }}</p>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="skills" class="col-form-label">Skills:</label>
                    <textarea class="form-control" id="skills" v-model="user.skills"></textarea>
                    <div v-if=error.skills class="text-red">
                      <p>{{ error.skills }}</p>
                    </div>
                  </div>
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
import session from '../../utils/session'
import config from '../../config'

// Require needed datatables modules
require('datatables.net')

export default {
  name: 'Admins',
  data() {
    return {
      reset: {
        password: '',
        confirm_password: ''
      },
      user: {
        id: 0,
        email: '',
        first_name: '',
        last_name: '',
        instagram: '',
        photo: null,
        age: 18,
        state: { id: 0, code: '', name: '' },
        agency: 0,
        gender: 0,
        lgtbq: false,
        phone: null,
        height: 0,
        shoe_size: 0,
        pant_size: 0,
        shirt_size: 0,
        job_occupation: '',
        skills: '',
        role: util.TALENT
      },
      error: {
        id: 0,
        email: '',
        first_name: '',
        last_name: '',
        instagram: '',
        photo: null,
        age: 0,
        state: '',
        agency: 0,
        gender: 0,
        lgtbq: false,
        phone: null,
        height: 0,
        shoe_size: 0,
        pant_size: 0,
        shirt_size: 0,
        job_occupation: '',
        skills: '',
        role: util.TALENT
      },
      users: [],
      agencies: [],
      states: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.callUser()
      this.getStates()
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
        photo: null,
        age: 0,
        state: 0,
        agency: 0,
        gender: 0,
        lgtbq: false,
        phone: null,
        height: 0,
        shoe_size: 0,
        pant_size: 0,
        shirt_size: 0,
        job_occupation: '',
        skills: '',
        role: util.TALENT
      }
    },
    updateUser(dUser) {
      var userFormData = new FormData()
      Object.keys(this.user).forEach(key => {
        if (key !== 'role' && key !== 'extras') {
          userFormData.append(key, this.user[key])
        }
      })
      api
        .request('patch', 'users/' + dUser.id + '/', userFormData, { 'Authorization': localStorage.getItem('token') })
        .then(response => {
          location.reload(true)
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
    saveUser() {
      api
        .request('post', 'users/', this.user, { 'Authorization': localStorage.getItem('token') })
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
      this.isNew = false
      const params = new URLSearchParams()
      console.log(idUser)
      params.append('format', 'json')
      params.append('length', 100)
      api
        .request('get', 'agencies/?' + params.toString(), {}, { 'Authorization': localStorage.getItem('token') })
        .then(response => {
          this.agencies = response.data.results
        })
        .catch(console.log)
      api
        .request('get', 'users/' + idUser + '/', {}, { 'Authorization': localStorage.getItem('token') })
        .then(response => {
          var userData = response.data
          Object.assign(this.user, userData)
          Object.assign(this.user, userData.extras)
          console.log(this.user)
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
      if (session.user.role === util.AGENCY) {
        // params.append('agency', session.user.id)
      }
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
          null,
          null,
          { 'search': util.TALENT },
          null
        ],
        'columns': [
          { 'data': 'email' },
          { 'data': 'first_name', 'name': 'first_name' },
          { 'data': 'last_name', 'name': 'last_name' },
          {
            'data': 'extras',
            render: function (data, type, row) {
              return ` <div class="widget-user-image">
                <img class="img-circle" src="${row.extras.photo}" alt="Avatar">
              </div> ${row.first_name + ' ' + row.last_name}`
            }
          },
          {
            'data': 'extras',
            render: function (data, type, row) {
              if (Object.keys(row.extras).length === 0 || row.extras.state == null) {
                return 'S/A'
              }
              return row.extras.state.name
            }
          },
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
        'columnDefs': [
          {
            'targets': [1, 2, 6],
            'visible': false,
            'searchable': false
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
      $('#tableUsers').on('keyup', 'thead input', function () {
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
        .request('get', 'users/' + idUser + '/', {}, { 'Authorization': localStorage.getItem('token') })
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
        .request('delete', 'users/' + this.user.id + '/', {}, { 'Authorization': localStorage.getItem('token') })
        .then(response => {
          this.callUser()
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
      console.log(file)
      var vm = this
      vm.user.photo = file
    },
    removeImage: function (e) {
      this.photo = ''
    },
    getStates() {
      const params = new URLSearchParams()
      params.append('search', '')
      params.append('ordering', '')
      params.append('length', 32)
      api
        .request('get', 'states/?' + params, {}, { 'Authorization': localStorage.getItem('token') })
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
    },
    modalResetPwd(idUser) {
      api
        .request('get', 'users/' + idUser + '/', {}, { 'Authorization': localStorage.getItem('token') })
        .then(response => {
          this.user = response.data
          $('#btnModalPwd').trigger('click')
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
    },
    resetPassword() {
      var json = {
        id: this.user.id,
        password: this.reset.password,
        confirm_password: this.reset.confirm_password
      }
      api
        .request('post', 'reset/password/', json, { 'Authorization': localStorage.getItem('token') })
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

.img-circle {
  width: 36px;
  height: 36px;
}
</style>
