<template>
  <section class="content">
    <div class="row center-block">
      <h2></h2>
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title"></h3>
            <button id="btnModalCreate" v-on:click="openModal" type="button" class="btn btn-success"><i class="fa fa-user-plus"> </i> Agregar
              Nuevo</button>
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

                        <th style="width: 182px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0"
                          class="sorting">Ciudad</th>
                        <th style="width: 101px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0"
                          class="sorting">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="user in users">
                        <td>{{ user.email }} </td>
                        <td>{{ user.extras.name }} </td>
                        <td>{{ user.extras.booker_name }} </td>
                        <td>{{ user.extras.phone }} </td>
                        <td>{{ user.extras.city }} </td>
                        <td>
                          <div class="btn-group">
                            <button class="btn delete" v-on:click=confirmDelete(user.id)><i
                                class="fa fa-trash"></i></button>
                            <button class="btn edit" v-on:click=editUser(user.id)><i class="fa fa-edit"></i></button>
                            <button class="btn reset" v-on:click=modalResetPwd(user.id)><i class="fa fa-refresh"></i></button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <!-- <tfoot>
                      <tr role="row">
                        <th rowspan="1" colspan="1"><input class="form-control" type="text" placeholder="Email"
                            data-index="0" autocomplete="off"></th>
                        <th rowspan="1" colspan="1"><input class="form-control" type="text" placeholder="Nombre agencia"
                            data-index="1" autocomplete="off"></th>
                        <th rowspan="1" colspan="1"><input class="form-control" type="text" placeholder="Encargado"
                            data-index="2" autocomplete="off"></th>
                        <th rowspan="1" colspan="1"><input class="form-control" type="text" placeholder="Telefono"
                            data-index="3" autocomplete="off"></th>
                        <th rowspan="1" colspan="1"><input class="form-control" type="text" placeholder="Rol"
                            data-index="5" autocomplete="off"></th>
                        <th rowspan="1" colspan="1"><input class="form-control" type="text" placeholder="Ciudad"
                            data-index="6" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');"></th>
                        <th rowspan=" 1" colspan="1"></th>
                      </tr>
                    </tfoot> -->
                  </table>
                  <div>
                    <pagination :totalPages="totalPage" :perPage="length" :currentPage="currentPage"
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
      <h3 slot="header">Nuevo Usuario</h3>
      <div slot="body">
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
      <button v-if="isNew" slot="footer" type="button" class="btn btn-primary" v-on:click="saveUser">Guardar</button>
      <button v-if="!isNew" slot="footer" type="button" class="btn btn-primary"
        v-on:click="updateUser(user)">Actualizar</button>
    </modal>

    <modal v-if="showModalReset" @close="showModalReset = false">
      <h3 slot="header">¿Cuál es mi contraseña?</h3>
      <div slot="body">
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

      <button slot="footer" class="btn btn-primary" v-on:click="resetPassword" aria-hidden="true">Guardar</button>

    </modal>
  </section>

</template>

<script>
import api from '../../api'
import util from '../../utils/util'
import agency from '../../models/agency'
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
      showModalReset: false,
      showModalDelete: false,
      showModal: false,
      isNew: true,
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
      users: []
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
      this.user = agency
    },
    updateUser(dUser) {
      api
        .request('patch', 'users/' + dUser.id + '/', this.user, { 'Authorization': this.$store.state.token })
        .then(response => {
          console.log(response.data)
          this.showModal = false
          this.callUser()
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
          // var user = response.data
          this.showModal = false
          this.callUser()
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
          this.showModal = true
          this.callUser()
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
      params.append('role', util.AGENCY)
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
      console.log(this.user)
      api
        .request('delete', 'users/' + this.user.id + '/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.callUser()
          this.showModalDelete = false
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
      this.showModalReset = true
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
