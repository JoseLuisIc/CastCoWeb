<template>
  <section class="content">
    <loading :isLoading="isLoading"></loading>
    <div class="row center-block">
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title"></h3>
            <button id="btnModalCreate" v-on:click="openModal" type="button" class="btn btn-success"><i
                class="fa fa-user-plus"> </i> Agregar Nuevo</button>

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
                        <th style="width: 167px;">Usuario</th>
                        <th aria-sort="ascending" style="width: 167px;">Email</th>
                        <th style="width: 101px;">Edad</th>
                        <th style="width: 182px;">Instagram</th>
                        <th style="width: 101px;">Acciones</th>
                      </tr>
                    </thead>
                    <thead>
                      <tr>
                        <th rowspan="1" colspan="1" class="sorting_disabled"><input class="form-control" type="text"
                            placeholder="Usuario" data-index="1" v-model="filters.first_name" v-on:keyup="searchInput">
                        </th>
                        <th rowspan="1" colspan="1" class="sorting_disabled"><input class="form-control" type="text"
                            placeholder="Email" data-index="0" v-model="filters.email" v-on:keyup="searchInput"></th>
                        <th rowspan="1" colspan="1" class="sorting_disabled"><input class="form-control" type="text"
                            placeholder="Edad" data-index="3" v-model="filters.age" v-on:keyup="searchInput"></th>
                        <th rowspan="1" colspan="1" class="sorting_disabled"><input class="form-control" type="text"
                            placeholder="Instagram" data-index="4" v-model="filters.instagram" v-on:keyup="searchInput">
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="user in users">
                        <td>
                          <div class="widget-user-image">
                            <img class="img-circle" :src="user.extras.photo" alt="Avatar">
                          </div>{{ user.first_name }} {{ user.last_name }}
                        </td>
                        <td>{{ user.email }} </td>
                        <td>{{ user.extras.age }} </td>
                        <td>{{ user.instagram }} </td>
                        <td>
                          <div class="btn-group">
                            <button class="btn delete" v-on:click=confirmDelete(user.id)><i
                                class="fa fa-trash"></i></button>
                            <button class="btn edit" v-on:click=editUser(user.id)><i class="fa fa-edit"></i></button>
                            <button v-if="getRol() === roles.MANAGER" class="btn reset"
                              v-on:click=modalResetPwd(user.id)><i class="fa fa-refresh"></i></button>

                            <button class="btn reset" v-on:click=postulate(user.id)><i class="fa fa-eye"></i></button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                    <div v-if="users.length === 0">
                      <center>
                        <h3>No hay registros</h3>
                      </center>
                    </div>
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
    <modal v-if="showModal" @close="showModal = false" :iconClasses="['modal-lg']">
      <h3 slot="header">Nuevo Usuario</h3>
      <div slot="body" style="overflow-y: scroll; overflow-x: hidden; height: 500px;">

        <form>
          <div v-if="isNew">
            <div class="form-group" v-bind:class="error.email !== '' ? 'has-error' : ''">
              <label for="email" class="col-form-label">Email:</label>
              <input type="text" class="form-control" id="email" v-model="user.email" @blur="validateEmail">
              <div v-if=error.email class="text-red">
                <p>{{ error.email }}</p>
              </div>
            </div>
            <div class="form-group" v-bind:class="error.instagram !== '' ? 'has-error' : ''">
              <label for="instagram" class="col-form-label">Instagram:</label>
              <input class="form-control" id="instagram" v-model="user.instagram" @blur="validateInstagram" />
              <div v-if=error.instagram class="text-red">
                <p>{{ error.instagram }}</p>
              </div>
            </div>
            <div class="form-group">
              <input class="form-control" id="id" type="hidden" v-model="user.id" />
              <input class="form-control" id="role" type="hidden" v-model="user.role" />
            </div>
          </div>

          <div class="row" v-if="!isNew">

            <div class="col-md-6">
              <div class="form-group" v-bind:class="error.photo !== '' ? 'has-error' : ''">
                <label for="photo" class="col-form-label">Foto:</label>
                <div>
                  <span class="mailbox-attachment-icon has-img">
                    <img style="border-radius: 50%" v-show="isPreviewFile" :src='previewSrc' alt="" width="200px">
                  </span>
                  <div class="mailbox-attachment-info">
                    <!-- <a class="btn btn-default btn-xs pull-left deleteFile"><i class="fa fa-trash"></i>
                Eliminar</a> -->
                    <span class="mailbox-attachment-size">
                      &nbsp;
                      <div class="btn btn-default btn-file">
                        <i class="fa fa-file-o"></i> Cambiar Foto
                        <input type="file" name="materials" class="form-control btn btn-default btn-xs pull-right"
                          id="materials" @change="onFileChange" accept="image/*">
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              <div class="form-group" v-bind:class="error.email !== '' ? 'has-error' : ''">
                <label for="email" class="col-form-label">Email:</label>
                <input type="text" class="form-control" id="email" v-model="user.email" @blur="validateEmail">
                <div v-if=error.email class="text-red">
                  <p>{{ error.email }}</p>
                </div>
              </div>
              <div class="form-group">
                <label for="first_name" class="col-form-label">Nombres:</label>
                <input class="form-control" id="first_name" v-model="user.first_name" />
                <div v-if=error.first_name class="text-red"></div>
                <p>{{ error.first_name }}</p>
              </div>
              <div class="form-group">
                <label for="last_name" class="col-form-label">Apellidos:</label>
                <input class="form-control" id="last_name" v-model="user.last_name" />
              </div>
              <div class="form-group" v-bind:class="error.age !== '' ? 'has-error' : ''">
                <label for="age" class="col-form-label">Edad:</label>
                <input type="number" class="form-control" id="age" v-model="user.age" max="100" min="18" />
                <div v-if=error.age class="text-red">
                  <p>{{ error.age }}</p>
                </div>
              </div>

              <div class="form-group" v-bind:class="error.state !== '' ? 'has-error' : ''">
                <label for="state" class="col-form-label">Estado:</label>
                <select name="state" class="form-control" id="state" v-model="user.state.id">
                  <option value="0" selected>Elegir Estado</option>
                  <option v-for="(state, index) in states" :key="index" :value="state.id">{{ state.name }}</option>
                </select>
                <div v-if=error.state class="text-red">
                  <p>{{ error.state }}</p>
                </div>
              </div>
              <div class="form-group" v-bind:class="error.agency !== '' ? 'has-error' : ''">
                <label for="agency" class="col-form-label">Agencia:</label>
                <select name="agency" class="form-control" id="agency" v-model="user.agency.user">
                  <option value="0" selected>Elegir Agencia</option>
                  <option v-for="(agency, index) in agencies" :key="index" :value="agency.id">{{ agency.name }}
                  </option>
                </select>
                <div v-if=error.agency class="text-red">
                  <p>{{ error.agency }}</p>
                </div>
              </div>
              <div class="form-group" v-bind:class="error.gender !== '' ? 'has-error' : ''">
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
              <div class="form-group" v-bind:class="error.instagram !== '' ? 'has-error' : ''">
                <label for="instagram" class="col-form-label">Instagram:</label>
                <input class="form-control" id="instagram" v-model="user.instagram" @blur="validateInstagram" />
                <div v-if=error.instagram class="text-red">
                  <p>{{ error.instagram }}</p>
                </div>
              </div>
              <div class="form-group">
                <label for="phone" class="col-form-label">Telefono:</label>
                <input type="text" @blur=validateNumber class="form-control" id="phone" v-model="user.phone" />
                <div v-if=error.phone class="text-red">
                  <p>{{ error.phone }}</p>
                </div>
              </div>
              <div class="form-group" v-bind:class="error.height !== '' ? 'has-error' : ''">
                <label for="height" class="col-form-label">Altura:</label>
                <input type="number" class="form-control" id="height" v-model="user.height" />
                <div v-if=error.height class="text-red">
                  <p>{{ error.height }}</p>
                </div>
              </div>
              <div class="form-group" v-bind:class="error.shoe_size !== '' ? 'has-error' : ''">
                <label for="shoe_size" class="col-form-label"># Calzado:</label>
                <input type="number" class="form-control" id="shoe_size" v-model="user.shoe_size" />
                <div v-if=error.shoe_size class="text-red">
                  <p>{{ error.shoe_size }}</p>
                </div>
              </div>
              <div class="form-group" v-bind:class="error.pant_size !== '' ? 'has-error' : ''">
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
              <div class="form-group" v-bind:class="error.shirt_size !== '' ? 'has-error' : ''">
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
        </form>
      </div>
      <button v-if="isNew" slot="footer" type="button" class="btn btn-primary" v-on:click="saveUser"
        :disabled='isDisabled'>Guardar</button>
      <button v-if="!isNew" slot="footer" type="button" class="btn btn-primary" v-on:click="updateUser(user)"
        :disabled='isDisabled'>Actualizar</button>
    </modal>
    <modal v-if="showModalDelete" @close="showModalDelete = false" :iconClasses="['modal-md']">
      <h3 slot="header">Eliminar Usuario</h3>
      <div slot="body">
        <p>Esta seguro que quiere eliminar al usuario?</p>
      </div>

      <button slot="footer" type="button" class="btn btn-danger" v-on:click="deleteUser">Eliminar</button>

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
import modelUser from '../../models/user'
import Pagination from '../widgets/Pagination.vue'
import Loading from '../widgets/Loading.vue'
import Modal from '../widgets/Modal.vue'
// Require needed datatables modules
require('datatables.net')

export default {
  name: 'Admins',
  components: {
    Pagination,
    Modal,
    Loading
  },
  data() {
    return {
      showModal: false,
      showModalDelete: false,
      showModalReset: false,
      isNew: true,
      isLoading: false,
      roles: util,
      reset: {
        password: '',
        confirm_password: '',
        error: ''
      },
      isDisabled: false,
      idProject: 0,
      totalPage: 1,
      start: 0,
      length: 10,
      page: 1,
      count: 0,
      currentPage: 1,
      table: null,
      user: {
        id: 0,
        email: '',
        first_name: '',
        last_name: '',
        instagram: '',
        photo: null,
        age: 0,
        state: { id: 0, code: '', name: '' },
        agency: { user: 0, name: '', booker_name: '', phone: '', city: '' },
        gender: 0,
        lgtbq: false,
        phone: null,
        height: 0,
        shoe_size: 0,
        pant_size: 0,
        shirt_size: 0,
        job_occupation: '',
        skills: '',
        role: util.TALENT,
        name: '',
        booker_name: ''
      },
      error: modelUser.error,
      users: [],
      agencies: [],
      states: [],
      previewSrc: '',
      isPreviewFile: false,
      file: null,
      filters: {
        search: '',
        email: '',
        first_name: '',
        last_name: '',
        instagram: '',
        age: '',
        city: ''
      },
      agencyId: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$route.params.hasOwnProperty('id')) {
        this.agencyId = this.$route.params.id
      }
      this.callUser()
      this.getStates()
      this.getAgencies()
      this.getRol()
    })
  },
  methods: {
    clearParams() {
      Object.keys(this.user).forEach(key => {
        if (key !== 'role') {
          this.user[key] = ''
        }
        if (key === 'agency') {
          this.user[key] = { user: 0, name: '', booker_name: '', phone: '', city: '' }
        }
      })
      Object.keys(this.error).forEach(key => {
        this.error[key] = ''
      })
    },
    onPageChange(page) {
      this.currentPage = page
      console.log(page)
      this.callUser()
    },
    openModal() {
      this.clearParams()
      this.showModal = true
      this.isNew = true
      this.isDisabled = false
    },
    updateUser(dUser) {
      var userFormData = new FormData()
      Object.keys(this.user).forEach(key => {
        if (key !== 'role' && key !== 'extras') {
          switch (key) {
            case 'state':
              var state = this.user[key]
              userFormData.append(key, state.id)
              break
            case 'photo':
              if (this.file !== null) {
                userFormData.append(key, this.file)
              }
              break
            case 'agency':
              var agency = this.user[key]
              if (agency.user !== null && agency.user !== '' && agency.user !== undefined) {
                userFormData.append(key, agency.user)
              }
              break
            case 'email':
              console.log(key)
              break
            default:
              userFormData.append(key, this.user[key])
              break
          }
        }
      })
      this.isLoading = true
      api
        .request('patch', 'users/' + dUser.id + '/', userFormData, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.showModal = false
          this.callUser()
          this.clearParams()
          toastr.success('Actualización', 'Se ha actualizado el usuario')
          this.isLoading = false
        })
        .catch(error => {
          this.resetErrors()
          if (error.response) {
            var errors = error.response.data
            Object.keys(errors).forEach(key => {
              this.error[key] = errors[key][0]
            })
            this.isLoading = false
          }
        })
    },
    saveUser() {
      this.isLoading = true
      api
        .request('post', 'users/', this.user, { 'Authorization': this.$store.state.token })
        .then(response => {
          var user = response.data
          this.showModal = false
          this.editUser(user.id)
          toastr.success('Guardado', 'Se ha guardado el usuario')
          this.isLoading = false
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            this.error.email = errors.email[0]
          }
          this.isLoading = false
        })
    },
    editUser(idUser) {
      var that = this
      this.isNew = false
      this.resetErrors()
      this.isLoading = true
      this.isDisabled = false
      api
        .request('get', 'users/' + idUser + '/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          var userData = response.data
          var state = userData.extras.state === null ? { id: 0, code: '', name: '' } : userData.extras.state
          var agency = userData.extras.agency === null || userData.extras.agency === undefined ? { id: 0, code: '', name: '' } : userData.extras.agency
          userData.extras.state = state
          userData.extras.agency = agency
          Object.assign(this.user, userData)
          Object.assign(this.user, userData.extras)
          if (that.user.photo !== null) {
            that.isPreviewFile = true
            that.previewSrc = that.user.photo
            console.log(that.previewSrc)
          }
          this.showModal = true
          this.isLoading = false
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
          this.isLoading = false
        })
    },
    callUser() {
      const params = new URLSearchParams()
      params.append('role', util.TALENT)
      // params.append('search', this.filters.search)
      params.append('email', this.filters.email)
      params.append('first_name', this.filters.first_name)
      params.append('age', this.filters.age)
      params.append('instagram', this.filters.instagram)
      params.append('ordering', 'email')
      params.append('page', this.currentPage)
      params.append('page_size', this.length)
      params.append('ordering', 'first_name')
      params.append('agency', this.agencyId)
      this.isLoading = true
      api
        .request('get', 'users/?' + params.toString(), {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          var json = response.data
          this.users = json.results
          this.count = json.count
          this.totalPage = Math.ceil(this.count / this.length)
          this.isLoading = false
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
          this.isLoading = false
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
      this.isLoading = true
      api
        .request('delete', 'users/' + this.user.id + '/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.showModalDelete = false
          this.callUser()
          this.isLoading = false
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
          this.isLoading = false
        })
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files
      if (files.length) {
        this.createImage(files[0])
      }
    },
    createImage(file) {
      var that = this
      var reader = new FileReader()
      reader.onload = function (e) {
        that.file = file
        that.previewSrc = e.target.result
        that.isPreviewFile = true
      }
      reader.readAsDataURL(file)
      that.user.photo = file
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
        .request('get', 'states/?' + params, {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          console.log(response.data)
          this.states = response.data.results
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            this.error.email = errors.email[0]
          }
        })
    },
    getAgencies() {
      const params = new URLSearchParams()
      params.append('pagination', false)
      api
        .request('get', 'agencies/?' + params.toString(), {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.agencies = response.data
          this.agencies.unshift({id: null, name: 'Particular'})
        })
        .catch(console.log)
    },
    validateEmail(e) {
      var email = e.target.value
      if (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        this.error.email = ''
      } else {
        this.error.email = 'Ingrese un correo valido'
      }
      this.validateForm()
    },
    validateNumber(e) {
      var number = e.target.value
      if (/^\d{10}$/.test(number)) {
        this.error.phone = ''
      } else {
        this.error.phone = 'Ingrese su numero de celular'
      }
      this.validateForm()
    },
    validateInstagram(e) {
      var instagram = e.target.value
      if (/@([A-Za-z._])\w+/.test(instagram)) {
        this.error.instagram = ''
      } else {
        this.error.instagram = 'No corresponde a un usuario de instagram'
      }
      this.validateForm()
    },
    modalResetPwd(idUser) {
      this.isLoading = true
      api
        .request('get', 'users/' + idUser + '/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.user = response.data
          this.showModalReset = true
          this.showModal = false
          this.reset.password = ''
          this.reset.confirm_password = ''
          this.isLoading = false
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
          this.isLoading = false
        })
    },
    resetPassword() {
      var that = this
      var json = {
        id: this.user.id,
        password: this.reset.password,
        confirm_password: this.reset.confirm_password
      }
      this.isLoading = true
      api
        .request('post', 'reset/password/', json, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.reset.password = ''
          this.reset.confirm_password = ''
          this.reset.error = ''
          this.showModalDelete = false
          toastr.success('Guardado', 'Se ha guardado correctamente la contrseña')
          this.showModalReset = false
          this.isLoading = false
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            that.reset.error = errors.password[0]
          }
          this.isLoading = false
        })
    },
    resetErrors() {
      Object.keys(this.error).forEach(key => {
        this.error[key] = ''
      })
    },
    search(e) {
      this.callUser()
    },
    searchInput(e) {
      this.filters.search = e.target.value
      this.callUser()
    },
    postulate(id) {
      this.$router.push({ path: `/agency/talents/${id}` })
    },
    getRol() {
      return this.$store.state.user.role
    },
    validateForm() {
      var values = Object.values(this.error).filter(value => {
        return value.length > 0
      })
      console.log(values)
      if (values.length > 0) {
        this.isDisabled = true
      } else {
        this.isDisabled = false
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

.img-circle {
  width: 36px;
  height: 36px;
}
</style>
