<template>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box">
          <div class="box-header with-border">
            <h3 class="box-title">Informacion</h3>
            <div class="box-tools pull-right">
              <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div>
          </div><!-- /.box-header -->
          <!-- /.box-header -->
          <div class="box-body">
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
                    <label for="description" class="col-form-label">Descripcion:</label>
                    <input class="form-control" id="description" v-model="project.description" />
                  </div>
                  <div class="form-group">
                    <label for="producer" class="col-form-label">Producción:</label>
                    <input class="form-control" id="producer" v-model="project.producer" />
                  </div>
                  <div class="form-group">
                    <label for="production_place" class="col-form-label">Location:</label>
                    <input class="form-control" id="production_place" v-model="project.production_place" />
                  </div>
                  <div class="form-group">
                    <label for="casting_days" class="col-form-label">Dias de casting:</label>
                    <input class="form-control" id="casting_days" v-model="project.casting_days" />
                  </div>
                  <div class="form-group">
                    <label for="casting_dynamics" class="col-form-label">Dinamica de casting:</label>
                    <input class="form-control" id="casting_dynamics" v-model="project.casting_dynamics" />
                  </div>
                  <div class="form-group">
                    <label for="temporality" class="col-form-label">Temporalidad:</label>
                    <input class="form-control" id="temporality" v-model="project.temporality" />
                  </div>
                  <div class="form-group">
                    <label for="covid_test" class="col-form-label">Covid Test:</label>
                    <input type="text" class="form-control" id="covid_test" v-model="project.covid_test" />
                  </div>

                  <div class="form-group" v-bind:class="error.recording_date !== '' ? 'has-error' : ''">
                    <label for="recording_date" class="col-form-label">Shoot dates:</label>
                    <input class="form-control" type="text" id="recording_date" v-model="project.recording_date" />
                    <span v-if=error.recording_date class="help-block">{{ error.recording_date }}</span>
                  </div>
                  <div class="form-group" v-bind:class="error.fitting_date !== '' ? 'has-error' : ''">
                    <label for="fitting_date" class="col-form-label">Fitting:</label>
                    <input class="form-control" type="text" id="fitting_date" v-model="project.fitting_date" />
                    <span v-if=error.fitting_date class="help-block">{{ error.fitting_date }}</span>
                  </div>
                  <div class="form-group" v-bind:class="error.callback_date !== '' ? 'has-error' : ''">
                    <label for="callback_date" class="col-form-label">Callback:</label>
                    <input class="form-control" type="text" id="callback_date" v-model="project.callback_date" />
                    <span v-if=error.callback_date class="help-block">{{ error.callback_date }}</span>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="is_active" v-model="project.is_active">
                      <label class="form-check-label" for="is_active">
                        Activo
                      </label>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="payment_condition" class="col-form-label">Condiciones de pago:</label>
                    <input class="form-control" id="payment_condition" v-model="project.payment_condition" />
                  </div>
                  <div class="form-group">
                    <label for="public_name" class="col-form-label">Nombre publico:</label>
                    <input class="form-control" id="public_name" v-model="project.public_name" />
                  </div>
                  <div class="form-group">
                    <label for="temporality" class="col-form-label">Temporalidad:</label>
                    <input class="form-control" id="temporality" v-model="project.temporality" />
                  </div>
                  <div class="form-group">
                    <label for="competition" class="col-form-label">Competencia:</label>
                    <input class="form-control" id="competition" v-model="project.competition" />
                  </div>

                  <div class="form-group">
                    <label for="use_of_image" class="col-form-label">Exclusividad:</label>
                    <input class="form-control" id="use_of_image" v-model="project.exclusiveness" />
                  </div>
                  <div class="form-group">
                    <label for="work_day" class="col-form-label">Work day:</label>
                    <input type="text" class="form-control" id="work_day" v-model="project.work_day" />
                  </div>
                  <div class="form-group">
                    <label for="buy_out" class="col-form-label">Buy out GARANTIZADO:</label>
                    <input class="form-control" id="buy_out" v-model="project.buy_out" />
                  </div>
                  <div class="form-group">
                    <label for="territory" class="col-form-label">Territorio:</label>
                    <input class="form-control" id="territory" v-model="project.territory" />
                  </div>
                  <div class="form-group">
                    <label for="notes" class="col-form-label">Notas:</label>
                    <textarea class="form-control" name="notes" id="notes" cols="30" rows="5"
                      v-model="project.notes"></textarea>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <input class="form-control" id="id" type="hidden" v-model="project.id" />
              </div>
            </form>
            <div class="modal-footer">
              <router-link to="/admin/proyects" class="btn btn-default">Regresar</router-link>
              <button v-if="project.id !== 0" type="button" class="btn btn-primary"
                v-on:click="updateProyect(project)">Actualizar</button>
              <button v-if="project.id === 0" type="button" class="btn btn-primary"
                v-on:click="saveProyect">Guardar</button>
            </div>
          </div>
          <!-- /.box-body -->
        </div>
      </div>
    </div>
    <!-- Main row -->
    <div class="row" v-if="project.id !== 0">
      <!-- Left col -->
      <div class="col-md-6">
        <!-- MAP & BOX PANE -->
        <div class="box box-success collapsed-box">
          <div class="box-header with-border">
            <h3 class="box-title">Material de ejemplos</h3>
            <div class="box-tools pull-right">
              <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div>
          </div><!-- /.box-header -->
          <div class="box-body">
            <div class='col-sm-6'>
              <div id="preview" v-show="isPreviewFile">
                <form id="upload">
                  <img v-show="['jpg', 'png', 'jpeg', 'PNG'].includes(previewSrc.type)" class='img-responsive'
                    :src='previewSrc.src' alt='Photo'>
                  <video v-show="['mp4', 'avi'].includes(previewSrc.type)" :src='previewSrc.src' controls
                    width="500px"></video>
                </form>
                <br>
              </div>
            </div><!-- /.col -->
            <div class="box-footer clearfix">
              <div class="form-group">
                <div class="form-group">
                  <label for="name" class="col-form-label">Nombre:</label>
                  <input type="text" class="form-control" id="nameMaterial" v-model="nameMaterial">
                </div>
                <div class="form-group" v-if="!isEditMaterial">
                  <input type="file" name="materials" class="form-control" id="materials" @change="onFileChange"
                    accept="image/*,video/mp4">

                  <p class="help-block">Max. 30MB</p>
                </div>
                <button type="button" class="btn btn-primary" v-on:click="uploadFile" v-if="!isEditMaterial">Agregar</button>
                <div class="form-group">
                  <button type="button" class="btn btn-primary" v-on:click="updateMaterial" v-if="isEditMaterial">Actualizar</button>
                  <button type="button" class="btn btn-default" v-on:click="cancelMaterial" v-if="isEditMaterial">Cancelar</button>
                </div>
              </div>
            </div><!-- /.box-footer -->
            <div class="box-footer">
              <ul class="mailbox-attachments clearfix">
                <li v-for="(material, index) in materials">
                  <div v-show="['jpg', 'png', 'jpeg', 'mp4', 'avi', 'PNG'].includes(material.type)">
                    <span class="mailbox-attachment-icon has-img">
                      <img v-show="['jpg', 'png', 'jpeg', 'PNG'].includes(material.type)" :src='material.file' alt="">
                      <video v-show="['mp4', 'avi'].includes(material.type)" :src='material.file' controls
                        width="200px"></video>
                    </span>
                    <div class="mailbox-attachment-info">
                      <p>{{ material.name }}</p>
                      <a class="btn btn-default btn-xs pull-left deleteFile" :id="material.id" @click="deleteFile"><i
                          class="fa fa-trash"></i> Eliminar</a>
                      <span class="mailbox-attachment-size">
                        <a class="btn btn-default btn-xs pull-left editFile" :id="material.id" @click="editFile"><i
                          class="fa fa-edit"></i> Editar</a>
                        &nbsp;
                        <a :href="material.file" class="btn btn-default btn-xs pull-right downloadFile"
                          @click="downloadFile" :id="material.id"><i class="fa fa-cloud-download"></i> Descargar</a>
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div><!-- /.box-body -->
        </div><!-- /.box -->
      </div><!-- /.col -->

      <module-personaje :idProject="this.$route.params.id"></module-personaje>
      <module-delivery :idProject="this.$route.params.id"></module-delivery>
    </div><!-- /.row -->
  </section>
</template>
<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css');
</style>
<script>
import moment from 'moment'
import api from '../../api'
import project from '../../models/project'
import ModulePersonaje from './project/ModulePersonaje.vue'
import ModuleDelivery from './project/ModuleDelivery.vue'
import toastr from 'toastr'

export default {
  name: 'Admins',
  components: {
    ModulePersonaje,
    ModuleDelivery
  },
  data() {
    return {
      table: null,
      materials: [],
      file: null,
      previewSrc: { src: '', type: '' },
      isPreviewFile: false,
      project: project,
      error: project,
      projects: [],
      agencies: [],
      states: [],
      isAlert: false,
      type: '',
      message: '',
      title: '',
      iconClass: '',
      namePersonaje: '',
      nameMaterial: '',
      idMaterial: 0,
      isEditMaterial: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$route.params.hasOwnProperty('id')) {
        this.project.id = this.$route.params.id
        this.fetchProyect(this.$route.params.id)
      }
    })
  },
  methods: {
    fetchProyect(idProject) {
      api
        .request('get', 'projects/' + idProject + '/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.project = response.data
          this.fetchMaterial(this.project.id)
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
    },
    updateProyect(dProyect) {
      api
        .request('patch', 'projects/' + dProyect.id + '/', this.project, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.alertShow('Actualizacion', 'Se guardo correctamente los datos', 'success', 'fa fa-check')
        })
        .catch(error => {
          this.alertShow('Actualizacion', 'No se pudo guardar intente nuevamente', 'error', 'fa fa-ban')
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
        .request('post', 'projects/', this.project, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.alertShow('Guardar', 'Se guardo correctamente los datos', 'success', 'fa fa-check')
        })
        .catch(error => {
          this.alertShow('Guardar', 'No se pudo actualizar intente nuevamente', 'error', 'fa fa-ban')
          if (error.response) {
            var errors = error.response.data
            Object.keys(errors).forEach(key => {
              this.error[key] = errors[key][0]
            })
          }
        })
    },
    renderView(data, row) {
      return `<td><button class="btn delete" id="${data}"><i class="fa fa-trash"></i></button><button class="btn edit" id="${data}"><i class="fa fa-edit"></i></button></td>`
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files
      if (files.length) {
        this.previewSrc.src = ''
        this.previewSrc.type = ''
        console.log(this.previewSrc)
        this.createImage(files[0])
      }
    },
    createImage(file) {
      var that = this
      var reader = new FileReader()
      reader.onload = function (e) {
        that.file = file
        that.previewSrc.src = e.target.result
        that.previewSrc.type = file.type.split('/').pop()
        that.isPreviewFile = true
        console.log(that.previewSrc)
      }
      reader.readAsDataURL(file)
    },
    removeImage: function (e) {
      this.file = ''
    },
    alertShow(title, message, type, iconClass) {
      this.message = message
      this.type = type
      this.title = title
      this.iconClass = iconClass
      toastr[type](message, title)
    },
    uploadFile() {
      console.log(this.materials)
      if (this.materials.length > 5) {
        this.alertShow('Limite', 'Se alcanzo el limite permitido', 'error', 'fa fa-check')
        return false
      }
      var formData = new FormData()
      formData.append('file', this.file)
      formData.append('name', this.nameMaterial)
      api
        .request('post', 'projects/' + this.project.id + '/material/', formData, { 'Authorization': this.$store.state.token })
        .then(response => {
          var material = response.data
          this.materials.push({ id: material['id'], file: material['file'], type: material['file'].split('.').pop() })
          document.getElementById('materials').value = ''
          this.previewSrc.src = ''
          this.previewSrc.type = ''
          this.isPreviewFile = false
          this.alertShow('Guardar', 'Se guardo el material', 'success', 'fa fa-check')
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
    },
    fetchMaterial(idProject) {
      var that = this
      api
        .request('get', 'projects/' + idProject + '/material/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          that.materials = response.data.map(function (elem) {
            return { id: elem['id'], name: elem['name'], file: elem['file'], type: elem['file'].split('.').pop() }
          })
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
    },
    validatePresupuestoAgencia(e) {
      var number = e.target.value
      if (/^(?!0+\.00)(?=.{1,9}(\.|$))(?!0(?!\.))\d{1,3}(,\d{3})*(\.\d+)?$/.test(number)) {
        this.error.agency_budget = ''
        console.log(number)
      } else {
        console.log(number)
        this.project.agency_budget = ''
      }
    },
    deleteFile(e) {
      e.preventDefault()
      console.log(e.target)
      var materialId = e.target.id
      var that = this
      api
        .request('delete', `projects/${this.project.id}/material/${materialId}/`, {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          that.materials = that.materials.filter(el => el.id !== parseInt(materialId))
          this.alertShow('Eliminacion', 'Se elimino el material', 'success', 'fa fa-check')
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
    },
    downloadFile(e) {
      e.preventDefault()
      const link = e.target
      console.log(link.href)
      this.download(link.href, moment(new Date()).format('YYYY-MM-DD'))
    },
    download(url, filename) {
      fetch(url)
        .then(response => response.blob())
        .then(blob => {
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = filename
          link.click()
        })
        .catch(console.error)
    },
    editFile(e) {
      e.preventDefault()
      console.log(e.target)
      var materialId = e.target.id
      var that = this
      api
        .request('get', `projects/${this.project.id}/material/${materialId}/`, {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          that.idMaterial = response.data.id
          that.nameMaterial = response.data.name
          that.isEditMaterial = true
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
    },
    updateMaterial(e) {
      e.preventDefault()
      console.log(e.target)
      var that = this
      api
        .request('patch', `projects/${this.project.id}/material/${this.idMaterial}/`, {name: this.nameMaterial}, { 'Authorization': this.$store.state.token })
        .then(response => {
          that.cancelMaterial()
          that.fetchMaterial(this.project.id)
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
    },
    cancelMaterial() {
      this.idMaterial = 0
      this.isEditMaterial = false
      this.nameMaterial = ''
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

div.gallery {
  margin: 5px;
  border: 1px solid #ccc;
  float: left;
  width: auto;
}

div.gallery:hover {
  border: 1px solid #777;
}

div.gallery img {
  width: 100%;
  height: auto;
}

div.desc {
  padding: 15px;
  text-align: center;
}

.box-footer {
  background-color: transparent !important;
}
.mailbox-attachments li {
    float: left;
    width: 240px;
    border: 1px solid #eee;
    margin-bottom: 10px;
    margin-right: 10px;
}
</style>
