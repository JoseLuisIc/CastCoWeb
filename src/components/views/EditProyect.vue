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
                    <textarea class="form-control" name="notes" id="notes" cols="30" rows="5"
                      v-model="project.description"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="producer" class="col-form-label">Producción:</label>
                    <input class="form-control" id="producer" v-model="project.producer" />
                  </div>
                  <div class="form-group">
                    <label for="production_place" class="col-form-label">Locación:</label>
                    <input class="form-control" id="production_place" v-model="project.production_place" />
                  </div>
                  <div class="form-group">
                    <label for="casting_days" class="col-form-label">Dias de casting:</label>
                    <input class="form-control" id="casting_days" v-model="project.casting_days" />
                  </div>
                  <div class="form-group">
                    <label for="casting_dynamics" class="col-form-label">Dinamica de casting:</label>
                    <textarea class="form-control" name="casting_dynamics" id="casting_dynamics" cols="30" rows="5"
                      v-model="project.casting_dynamics"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="temporality" class="col-form-label">Temporalidad:</label>
                    <input class="form-control" id="temporality" v-model="project.temporality" />
                  </div>
                  <!-- <div class="form-group">
                    <label for="covid_test" class="col-form-label">Covid Test:</label>
                    <input type="text" class="form-control" id="covid_test" v-model="project.covid_test" />
                  </div> -->

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
                      <input class="form-check-input" type="checkbox" value="" id="is_active"
                        v-model="project.is_active" @change="changeStatus" :disabled="isDisable">
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
                    <label for="work_day" class="col-form-label">Medios:</label>
                    <textarea class="form-control" name="work_day" id="work_day" cols="30" rows="5"
                      v-model="project.work_day"></textarea>
                  </div>
                  <div class="form-group">
                    <!-- <label for="buy_out" class="col-form-label">Buy out GARANTIZADO:</label> -->
                    <label for="buy_out" class="col-form-label">Presupuesto:</label>
                    <textarea class="form-control" name="buy_out" id="buy_out" cols="30" rows="5"
                      v-model="project.buy_out"></textarea>
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
                  <div class="form-group">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="multi_character"
                        v-model="project.multi_character">
                      <label class="form-check-label" for="multi_character">
                        Permitir multiples postulaciones por personaje
                      </label>
                    </div>
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
      <div class="col-md-12 col-lg-12 col-sm-12">
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
              <div class="box-footer clearfix">
                <div class="form-group">
                  <div class="form-group">
                    <label for="name" class="col-form-label">Nombre:</label>
                    <input type="text" class="form-control" id="nameMaterial" v-model="nameMaterial">
                  </div>
                  <div class="form-group" v-if="!isEditMaterial">
                    <input type="file" name="materials" class="form-control" id="materials" @change="onFileChange"
                      accept="image/*,video/*">

                    <p class="help-block">Max. 50MB</p>
                  </div>
                  <!-- Barra de progreso -->
                  <div v-if="uploadProgress > 0" class="progress-container" :style="{ width: customWidth + 'px' }">
                    <div class="progress-fill" :style="{ width: uploadProgress + '%' }"></div>
                    <span class="progress-text">{{ uploadProgress }}%</span>
                  </div>
                  <br>
                  <button type="button" class="btn btn-primary" v-on:click="uploadFile"
                    v-if="!isEditMaterial">Agregar</button>
                  <div class="form-group">
                    <button type="button" class="btn btn-primary" v-on:click="updateMaterial"
                      v-if="isEditMaterial">Actualizar</button>
                    <button type="button" class="btn btn-default" v-on:click="cancelMaterial"
                      v-if="isEditMaterial">Cancelar</button>
                  </div>
                </div>
              </div><!-- /.box-footer -->
            </div>
            <div class="box-footer clearfix col-sm-3">
              <div id="preview" v-show="isPreviewFile" height="200px">
                <form id="upload">
                  <img v-show="['jpg', 'png', 'jpeg'].includes(previewSrc.type.toLowerCase())" class='img-responsive'
                    :src='previewSrc.src' alt='Photo' style="height: 200px">
                  <video v-show="['mp4', 'avi', 'mov', 'wmv', 'mkv'].includes(previewSrc.type.toLowerCase())"
                    :src='previewSrc.src' controls width="500px"></video>
                </form>
                <br>
              </div>
            </div>

            <div class="box-footer col-md-12">
              <ul class="mailbox-attachments clearfix">
                <li v-for="(material) in materials">
                  <div
                    v-show="['jpg', 'png', 'jpeg', 'mp4', 'mov', 'avi', 'wmv', 'mkv'].includes(material.type.toLowerCase())">
                    <span class="mailbox-attachment-icon">
                      <img v-show="['jpg', 'png', 'jpeg'].includes(material.type.toLowerCase())" :src='material.file'
                        height="200px" width="180px">
                      <video v-show="['mp4', 'mov', 'avi', 'wmv', 'mkv'].includes(material.type.toLowerCase())"
                        :src='material.file' controls width="200px" height="200px"></video>
                    </span>

                    <div class="mailbox-attachment-info">
                      <p>{{ material.name }}</p>
                      <a class="btn btn-default btn-xs pull-left deleteFile" :id="material.id"
                        @click="deleteFile(material.id)"><i class="fa fa-trash"></i></a>
                      <span class="mailbox-attachment-size">
                        <a class="btn btn-default btn-xs pull-left editFile" :id="material.id"
                          @click="editFile(material.id)"><i class="fa fa-edit"></i></a>
                        &nbsp; &nbsp;
                        <a class="btn btn-default btn-xs pull-right downloadFile" @click="downloadFile(material)"
                          :id="material.id" :name="material.name"><i class="fa fa-cloud-download"></i></a>
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div><!-- /.box-body -->
        </div><!-- /.box -->
      </div><!-- /.col -->

      <module-personaje :idProject="parseInt(this.$route.params.id)"></module-personaje>
      <module-delivery :idProject="parseInt(this.$route.params.id)"></module-delivery>
      <modal v-if="showModalStatus" @close="showModalStatus = false" :iconClasses="['modal-md']">
        <h3 slot="header">Actualizar Status</h3>
        <div slot="body">
          <p>Al actualizar el status, se le notificara a los usuarios del cambio desea continuar?</p>
        </div>
        <button slot="footer" type="button" class="btn btn-info" v-on:click="changeUpdateStatus">Continuar</button>

      </modal>
    </div><!-- /.row -->
  </section>
</template>
<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css');
</style>
<script>
import axios from 'axios'
import api from '../../api'
import ModulePersonaje from './project/ModulePersonaje.vue'
import ModuleDelivery from './project/ModuleDelivery.vue'
import toastr from 'toastr'
import project from '../../models/project'
import Modal from '../widgets/Modal.vue'
import util from '../../utils/util'
import config from '../../config'

export default {
  name: 'Admins',
  components: {
    ModulePersonaje,
    Modal,
    ModuleDelivery
  },
  data() {
    return {
      table: null,
      materials: [],
      file: null,
      previewSrc: { src: '', type: '' },
      isPreviewFile: false,
      showModalStatus: false,
      role: 0,
      isDisable: true,
      uploadProgress: 0,
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
        // start_date: '',
        // end_date: '',
        updated_at: '',
        is_active: false,
        characteristics: '',
        description: '',
        payment_condition: '',
        covid_test: '',
        casting_days: '',
        casting_dynamics: '',
        work_day: '',
        buy_out: '',
        exclusiveness: '',
        territory: '',
        notes: '',
        multi_character: false
      },
      error: {
        name: '',
        recording_date: '',
        fitting_date: '',
        callback_date: ''
      },
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
      this.role = this.$store.state.user.role
      if (Object.prototype.hasOwnProperty.call(this.$route.params, 'id')) {
        this.isDisable = false
        this.project.id = this.$route.params.id
        this.fetchProyect(this.$route.params.id)
      }
    })
  },
  methods: {
    changeStatus(event) {
      this.project.is_active = event.target.checked
      this.showModalStatus = true
    },
    fetchProyect(idProject) {
      api
        .request('get', 'projects/' + idProject + '/', {}, { Authorization: this.$store.state.token })
        .then(response => {
          this.project = response.data
          this.fetchMaterial(this.project.id)
        })
        .catch(error => {
          if (error.response) {
            const errors = error.response.data
            console.log(errors)
          }
        })
    },
    updateProyect(dProyect) {
      const that = this
      api
        .request('patch', 'projects/' + dProyect.id + '/', this.project, { Authorization: this.$store.state.token })
        .then(response => {
          this.alertShow('Actualizacion', 'Se guardo correctamente los datos', 'success', 'fa fa-check')
          that.project = project
          console.log(this.role)
          if (this.role === util.ADMIN) {
            that.$router.push({ name: 'admin/proyects' })
          } else {
            that.$router.push({ name: 'manager/proyects' })
          }
        })
        .catch(error => {
          this.alertShow('Actualizacion', 'No se pudo guardar intente nuevamente', 'error', 'fa fa-ban')
          Object.keys(this.error).forEach(key => {
            this.error[key] = ''
          })
          if (error.response) {
            const errors = error.response.data
            Object.keys(errors).forEach(key => {
              this.error[key] = errors[key][0]
            })
          }
        })
    },
    changeUpdateStatus() {
      const that = this
      api
        .request('patch', 'projects/' + that.project.id + '/', { 'is_active': this.project.is_active, 'is_notify': true }, { Authorization: this.$store.state.token })
        .then(response => {
          that.alertShow('Notificar', 'Los usuarios seran notificados del cambio', 'success', 'fa fa-check')
          console.log(this.project)
          that.showModalStatus = false
        })
        .catch(error => {
          that.alertShow('Notificar', 'No se pudo realizar el cambio', 'error', 'fa fa-ban')
          Object.keys(this.error).forEach(key => {
            that.error[key] = ''
          })
          if (error.response) {
            const errors = error.response.data
            Object.keys(errors).forEach(key => {
              that.error[key] = errors[key][0]
            })
          }
        })
    },
    saveProyect() {
      const that = this
      if (this.validateForm()) {
        api
          .request('post', 'projects/', this.project, { Authorization: this.$store.state.token })
          .then(response => {
            this.alertShow('Guardar', 'Se guardo correctamente los datos', 'success', 'fa fa-check')
            that.project = project
            if (this.role === util.ADMIN) {
              that.$router.push({ name: 'admin/proyects' })
            } else {
              that.$router.push({ name: 'manager/proyects' })
            }
          })
          .catch(error => {
            this.alertShow('Guardar', 'No se pudo actualizar intente nuevamente', 'error', 'fa fa-ban')
            if (error.response) {
              const errors = error.response.data
              Object.keys(errors).forEach(key => {
                this.error[key] = errors[key][0]
              })
            }
          })
      }
    },
    renderView(data, row) {
      return `<td><button class="btn delete" id="${data}"><i class="fa fa-trash"></i></button><button class="btn edit" id="${data}"><i class="fa fa-edit"></i></button></td>`
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files
      if (files.length) {
        this.previewSrc.src = ''
        this.previewSrc.type = ''
        console.log(this.previewSrc)
        this.createImage(files[0])
      }
    },
    createImage(file) {
      const that = this
      const reader = new FileReader()
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
      console.log(this.file.size)
      if (this.file.size > (1024 * 1024 * 50)) {
        this.alertShow('Limite', 'No  se permite un archivo mayor a 50MB', 'error', 'fa fa-check')
        return false
      }
      const formData = new FormData()
      formData.append('file', this.file)
      formData.append('name', this.nameMaterial)
      axios.post(config.serverURI + 'projects/' + this.project.id + '/material/', formData, {
        headers: { 'Content-Type': 'multipart/form-data', 'Authorization': this.$store.state.token },
        onUploadProgress: (progressEvent) => {
          this.uploadProgress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
        }
      }).then(response => {
        console.log('Subido:', response.data)
        this.uploadProgress = 0
        const material = response.data
        this.materials.push({ id: material['id'], file: material['file'], type: material['file'].split('.').pop() })
        document.getElementById('materials').value = ''
        this.previewSrc.src = ''
        this.previewSrc.type = ''
        this.isPreviewFile = false
        this.alertShow('Guardar', 'Se guardo el material', 'success', 'fa fa-check')
      }).catch(error => {
        console.error('Error al subir:', error)
        this.uploadProgress = 0
      })
      // api
      //   .request('post', 'projects/' + this.project.id + '/material/', formData, { 'Authorization': this.$store.state.token })
      //   .then(response => {
      //     var material = response.data
      //     this.materials.push({ id: material['id'], file: material['file'], type: material['file'].split('.').pop() })
      //     document.getElementById('materials').value = ''
      //     this.previewSrc.src = ''
      //     this.previewSrc.type = ''
      //     this.isPreviewFile = false
      //     this.alertShow('Guardar', 'Se guardo el material', 'success', 'fa fa-check')
      //   })
      //   .catch(error => {
      //     if (error.response) {
      //       var errors = error.response.data
      //       console.log(errors)
      //     }
      //   })
    },
    fetchMaterial(idProject) {
      const that = this
      api
        .request('get', 'projects/' + idProject + '/material/', {}, { Authorization: this.$store.state.token })
        .then(response => {
          that.materials = response.data.map(function (elem) {
            return { id: elem['id'], name: elem['name'], file: elem['file'], type: elem['file'].split('.').pop() }
          })
        })
        .catch(error => {
          if (error.response) {
            const errors = error.response.data
            console.log(errors)
          }
        })
    },
    validatePresupuestoAgencia(e) {
      const number = e.target.value
      if (/^(?!0+\.00)(?=.{1,9}(\.|$))(?!0(?!\.))\d{1,3}(,\d{3})*(\.\d+)?$/.test(number)) {
        this.error.agency_budget = ''
        console.log(number)
      } else {
        console.log(number)
        this.project.agency_budget = ''
      }
    },
    deleteFile(materialId) {
      console.log(materialId)
      const that = this
      api
        .request('delete', `projects/${this.project.id}/material/${materialId}/`, {}, { Authorization: this.$store.state.token })
        .then(response => {
          that.materials = that.materials.filter(el => el.id !== parseInt(materialId))
          this.alertShow('Eliminacion', 'Se elimino el material', 'success', 'fa fa-check')
        })
        .catch(error => {
          if (error.response) {
            const errors = error.response.data
            console.log(errors)
          }
        })
    },
    downloadFile(material) {
      console.log(material)
      this.download(material.file, material.name)
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
    editFile(materialId) {
      const that = this
      api
        .request('get', `projects/${this.project.id}/material/${materialId}/`, {}, { Authorization: this.$store.state.token })
        .then(response => {
          that.idMaterial = response.data.id
          that.nameMaterial = response.data.name
          that.isEditMaterial = true
          // that.previewSrc.src = response.data.file
          // that.previewSrc.type = response.data.type
          // that.isPreviewFile = true
        })
        .catch(error => {
          if (error.response) {
            const errors = error.response.data
            console.log(errors)
          }
        })
    },
    updateMaterial(e) {
      e.preventDefault()
      console.log(e.target)
      const that = this
      api
        .request('patch', `projects/${this.project.id}/material/${this.idMaterial}/`, { name: this.nameMaterial }, { Authorization: this.$store.state.token })
        .then(response => {
          that.cancelMaterial()
          that.fetchMaterial(this.project.id)
        })
        .catch(error => {
          if (error.response) {
            const errors = error.response.data
            console.log(errors)
          }
        })
    },
    cancelMaterial() {
      this.idMaterial = 0
      this.isEditMaterial = false
      this.nameMaterial = ''
    },
    validateForm() {
      if (this.project.name === '') {
        this.error.name = 'Ingrese un nombre es un dato obligatorio'
        return false
      }
      return true
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

#app>div>div>section.content>div.modal-mask.modal>div>div>div.modal-body>div>div {
  overflow-y: scroll;
  max-height: 500px;
}

.mailbox-attachments li {
  width: 200px;
  border: 1px solid #eee;
  margin-bottom: 10px;
  margin-right: 10px;
  display: inline-block;
}

.progress-container {
  position: relative;
  width: 100%;
  /* o 100%, o lo que necesites */
  height: 24px;
  background-color: #eee;
  border-radius: 8px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  color: white;
  /* cambia según el contraste del fondo */
}
</style>
