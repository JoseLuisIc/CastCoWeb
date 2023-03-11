<template>
  <section class="content">
    <div class="row center-block">
      <h2></h2>
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title"></h3>
            <button id="btnModalCreate" v-on:click="openModal" type="button" class="btn btn-success"><i class="fa fa-user-plus"> </i> Agregar Nuevo</button>
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
                  Mostrar <select name="pant_size" class="form-control" id="pant_size" v-model="length" @change="search">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select> entradas
                  <table aria-describedby="example1_info" role="grid" id="tableUsers"
                    class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th aria-sort="ascending" style="width: 167px;" colspan="1" rowspan="1" aria-controls="example1"
                          tabindex="0" class="sorting_asc">Email</th>
                        <th>Nombres</th>
                        <th>Apellidos
                        </th>
                        <th style="width: 101px;">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="user in users">
                        <td>{{ user.email }} </td>
                        <td>{{ user.first_name }} </td>
                        <td>{{ user.last_name }} </td>
                        <td>
                          <div class="btn-group">
                            <button class="btn delete" v-on:click=confirmDelete(user.id)><i class="fa fa-trash"></i></button>
                            <button class="btn edit" v-on:click=editUser(user.id)><i class="fa fa-edit"></i></button>
                            <button class="btn reset" v-on:click=modalResetPwd(user.id)><i class="fa fa-refresh"></i></button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                    <pagination :totalPages="totalPage" :perPage="parseInt(length)" :currentPage="currentPage"
                      @pagechanged="onPageChange" />
                  </div>
                </div>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </div>
    <modal v-if="showModalDelete" @close="showModalDelete = false">
      <h3 slot="header">Eliminar Usuario</h3>
      <div slot="body">
        <p>Esta seguro que quiere eliminar al usuario?</p>
      </div>

      <button slot="footer" type="button" class="btn btn-danger" v-on:click="deleteUser">Eliminar</button>

    </modal>
    <modal v-if="showModal" @close="showModal = false">
      <h3 v-if="isNew" slot="header">Nuevo Usuario</h3>
      <h3 v-if="!isNew" slot="header">Actualizar Usuario</h3>
      <div slot="body">
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
        <button v-if="isNew" slot="footer" type="button" class="btn btn-primary" v-on:click="saveUser">Guardar</button>
        <button v-if="!isNew" slot="footer" type="button" class="btn btn-primary" v-on:click="updateUser(user)">Actualizar</button>
    </modal>
    <modal v-if="showModalReset" @close="showModalReset = false" :iconClasses="['modal-md']">
      <h3 slot="header">¿Cuál es mi contraseña?</h3>
      <div slot="body">
        <p>Si ha olvidado su contraseña, puede restablecerla aquí.</p>
        <fieldset>
          <div class="form-group">
            <label for="password">Contraseña:</label>
            <input class="form-control" name="password" type="password" v-model="reset.password">
          </div>
          <div class="form-group">

            <label for="confirm_password">Contraseña:</label>
            <input class="form-control" name="confirm_password" type="password" v-model="reset.confirm_password">
          </div>
          <div v-if=reset.error class="text-red">
            <p>{{ reset.error }}</p>
          </div>
        </fieldset>
      </div>

      <button slot="footer" class="btn btn-primary" v-on:click="resetPassword" aria-hidden="true">Guardar</button>

    </modal>

  </section>

</template>
<script>
import toastr from 'toastr'
import api from '../../api'
import util from '../../utils/util'
import admin from '../../models/admin'
import Pagination from '../widgets/Pagination.vue'
import Modal from '../widgets/Modal.vue'

// Require needed datatables modules
require('datatables.net')

export default {
  name: 'Admins',
  components: {
    Pagination,
    Modal
  },
  data() {
    return {
      totalPage: 1,
      start: 0,
      length: 10,
      page: 1,
      count: 0,
      currentPage: 1,
      user: admin,
      error: admin,
      table: null,
      users: [],
      showModal: false,
      showModalDelete: false,
      showModalReset: false,
      isNew: true,
      reset: {
        password: '',
        confirm_password: '',
        error: ''
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.callUser()
    })
  },
  methods: {
    onPageChange(page) {
      this.currentPage = page
      this.callUser()
    },
    openModal() {
      this.showModal = true
      this.isNew = true
      this.user = {
        id: 0,
        email: '',
        first_name: '',
        last_name: '',
        instagram: '',
        role: util.MANAGER,
        users: []
      }
    },
    updateUser(dUser) {
      api
        .request('put', 'users/' + dUser.id + '/', this.user, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.showModal = false
          this.callUser()
          toastr.success('Actualización', 'Se ha actualizado el usuario')
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
          this.showModal = false
          this.callUser()
          toastr.success('Creación', 'Se ha creado el usuario')
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
          this.showModal = true
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
      params.append('role', util.MANAGER)
      params.append('ordering', 'email')
      params.append('page', this.currentPage)
      params.append('page_size', this.length)
      api
        .request('get', 'users/?' + params.toString(), {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          var json = response.data
          this.users = json.results
          this.count = json.count
          this.totalPage = Math.ceil(this.count / this.length)
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
    },
    confirmDelete(idUser) {
      api
        .request('get', 'users/' + idUser + '/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.user = response.data
          this.showModalDelete = true
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
    },
    deleteUser() {
      api
        .request('delete', 'users/' + this.user.id + '/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.showModalDelete = false
          toastr.error('Eliminación', 'Se ha eliminado el usuario')
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
      api
        .request('get', 'users/' + idUser + '/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.user = response.data
          this.showModalReset = true
          this.showModal = false
          this.reset.password = ''
          this.reset.confirm_password = ''
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
    },
    resetPassword() {
      var that = this
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
          this.showModalDelete = false
          toastr.success('Guardado', 'Se ha guardado correctamente la contrseña')
          this.showModalReset = false
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
            that.reset.error = errors.password[0]
          }
        })
    },
    search() {
      this.callUser()
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
@import url('https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css');

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
