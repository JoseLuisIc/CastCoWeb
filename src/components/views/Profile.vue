<template>
  <section class="content">
    <div class="row">
      <div class="col-md-3" v-if="role === TALENT">
        <!-- Profile Image -->
        <div class="box box-primary">
          <div class="box-body box-profile">
            <img class="profile-user-img img-responsive img-circle" v-bind:src="previewSrc" alt="User profile picture">
            <h3 class="profile-username text-center">{{ user.first_name }} {{ user.last_name }}</h3>
            <p class="text-muted text-center">{{ user.job_occupation }}</p>

            <!--<ul class="list-group list-group-unbordered">
              <li class="list-group-item">
                <b>Followers</b> <a class="pull-right">1,322</a>
              </li>
              <li class="list-group-item">
                <b>Following</b> <a class="pull-right">543</a>
              </li>
              <li class="list-group-item">
                <b>Friends</b> <a class="pull-right">13,287</a>
              </li>
            </ul>

            <a href="#" class="btn btn-primary btn-block"><b>Follow</b></a>-->
          </div><!-- /.box-body -->
        </div><!-- /.box -->

        <!-- About Me Box -->
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">Acerca de mí</h3>
          </div><!-- /.box-header -->
          <div class="box-body">

            <strong><i class="fa fa-map-marker margin-r-5"></i> Estado</strong>
            <p class="text-muted">{{ user.state.name }}</p>

            <hr>

            <strong><i class="fa fa-pencil margin-r-5"></i> Skills</strong>
            <p>{{ user.skills }}</p>
            <!--<p>
              <span class="label label-danger">UI Design</span>
              <span class="label label-success">Coding</span>
              <span class="label label-info">Javascript</span>
              <span class="label label-warning">PHP</span>
              <span class="label label-primary">Node.js</span>
            </p>-->

            <hr>

          </div><!-- /.box-body -->
        </div><!-- /.box -->
      </div><!-- /.col -->
      <div class="col-md-9">
        <alert v-if="isAlert" :type="type" :title="title" :iconClasses="iconClass" :dismissible="false">{{ message }}
        </alert>
        <div class="nav-tabs-custom">
          <ul class="nav nav-tabs">
            <li class="active"><a href="#settings" data-toggle="tab">Informacion del perfil</a></li>
          </ul>
          <div class="tab-content">
            <div class="tab-pane active" id="settings">
              <form class="">
                <div class="row">

                  <div class="col-md-6">
                    <div class="form-group" v-if="role === TALENT">
                      <label for="photo" class="col-form-label">Foto:</label>
                      <div>
                        <span class="mailbox-attachment-icon has-img">
                          <img style="border-radius: 50%" v-show="isPreviewFile" :src='previewSrc' alt="" width="400px">
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
                    <div class="form-group" v-if="role === TALENT">
                      <label for="lgtbq" class="col-form-label">LGTBQ:</label>
                    </div>
                    <div class="form-check" v-if="role === TALENT">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"
                        v-model="user.lgtbq">
                      <label class="form-check-label" for="flexCheckChecked">
                        Pertenesco a la comunidad
                      </label>
                    </div>
                  </div>
                  <div class="col-md-6" v-if="role === TALENT">
                    <div class="form-group">
                      <label for="age" class="col-form-label">Edad:</label>
                      <input type="number" class="form-control" id="age" v-model="user.age" max="100" min="18" />
                      <div v-if=error.age class="text-red">
                        <p>{{ error.age }}</p>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="state" class="col-form-label">Estado:</label>
                      <select name="state" class="form-control" id="state" v-model="user.state.id">
                        <option value="0" selected>Elegir Estado</option>
                        <option v-for="(state, index) in states" :key="index" :value="state.id">{{ state.name }}
                        </option>
                      </select>
                      <div v-if=error.state class="text-red">
                        <p>{{ error.state }}</p>
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
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" v-on:click="updateUser(user)">Actualizar</button>
              </div>
            </div><!-- /.tab-pane -->
          </div><!-- /.tab-content -->
        </div><!-- /.nav-tabs-custom -->
      </div>
    </div>
  </section>
</template>
<script>
import moment from 'moment'
import { timeline } from '../../demo'
import api from '../../api'
import user from '../../models/user'
import Alert from '../widgets/Alert.vue'
import util from '../../utils/util'

export default {
  name: 'Tasks',
  components: {
    Alert
  },
  mounted() {
    this.$nextTick(() => {
      this.fetchProfile()
      this.getStates()
    })
  },
  data() {
    return {
      MANAGER: util.MANAGER,
      AGENCY: util.AGENCY,
      TALENT: util.TALENT,
      isAlert: false,
      type: '',
      message: '',
      title: '',
      iconClass: [],
      user: user.user,
      error: user.error,
      agencies: [],
      states: [],
      previewSrc: '',
      isPreviewFile: false,
      role: 3
    }
  },
  computed: {
    today() {
      return moment().format('MMM Do YY')
    },
    timeline() {
      return timeline
    }
  },
  methods: {
    fetchProfile() {
      var that = this
      this.role = this.$store.state.user.role
      api
        .request('get', 'me/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          var userData = response.data
          Object.assign(that.user, userData)
          Object.assign(that.user, userData.extras)
          if (that.user.photo !== null) {
            that.isPreviewFile = true
            that.previewSrc = that.user.photo
            console.log(that.previewSrc)
          }
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
    },
    getStates() {
      const params = new URLSearchParams()
      params.append('search', '')
      params.append('ordering', '')
      params.append('length', 32)
      api
        .request('get', 'states/?' + params, {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.states = response.data.results
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
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
    updateUser(dUser) {
      var userFormData = new FormData()
      Object.keys(this.user).forEach(key => {
        if (key !== 'role' && key !== 'extras') {
          if (key === 'state') {
            var state = this.user[key]
            userFormData.append(key, state.id)
          } else {
            if (key === 'photo') {
              if (this.user[key] instanceof File) {
                userFormData.append(key, this.user[key])
              }
            } else {
              userFormData.append(key, this.user[key])
            }
          }
        }
      })
      Object.keys(this.error).forEach(key => {
        this.error[key] = ''
      })
      api
        .request('patch', 'users/' + dUser.id + '/', userFormData, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.alertShow('Exito', 'Se guardo correctamente los datos', 'success', ['fa fa-check'])
        })
        .catch(error => {
          this.alertShow('Error', 'No se pudo guardar intente nuevamente', 'error', ['fa fa-ban'])
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
    alertShow(title, message, type, iconClass) {
      this.message = message
      this.type = type
      this.title = title
      this.iconClass = iconClass
      this.isAlert = true
    }
  }
}
</script>

<style>
.timeline-footer a.btn {
  margin-right: 10px;
}
</style>

