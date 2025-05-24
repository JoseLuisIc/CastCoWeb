<template>
  <div class="col-md-6 col-lg-6 col-sm-12">

    <div class="box box-warning">
      <div class="box-header with-border">
        <h3 class="box-title">Personajes</h3>
        <div class="box-tools pull-right">
          <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
        </div>
      </div><!-- /.box-header -->
      <div class="box-body">
        <div class="table-responsive">

          <table class="table table-bordered" id="tableCharacters">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <!-- <th scope="col">Genero</th>
                <th scope="col">Etnia</th>
                <th scope="col">Edad aparente</th> -->
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="character in characters" :id="'character' + character.id">
                <td> {{ character.id }}</td>
                <td> {{ character.name }}</td>
                <!-- <td> {{ character.gender }}</td>
                <td> {{ character.ethnic_group }}</td>
                <td> {{ character.apparent_age }}</td> -->
                <td style="widget:100px">
                  <div class="btn-group">
                    <button class="btn delete" v-on:click="deleteCharacters(character.id)"><i
                        class="fa fa-trash"></i></button>
                    <button class="btn edit" v-on:click="showEdit(character)"><i class="fa fa-edit"></i></button>
                    <button class="btn show" v-on:click="showMaterial(character.id)"><i class="fa fa-file"></i></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div><!-- /.table-responsive -->
      </div><!-- /.box-body -->
      <div class="box-footer clearfix">
        <button id="btnModalCharacter" class="btn btn-sm btn-info btn-flat pull-left" @click="showModal"> <i
            class="fa fa-plus"></i>
          Agregar</button>
      </div><!-- /.box-footer -->
    </div><!-- /.box -->
    <modal v-if="showModalCharacter" @close="showModalCharacter = false" :iconClasses="['modal-md']">
      <h3 slot="header">Nuevo Personaje</h3>
      <div slot="body">
        <div class="row">
          <div class="col-md-12">
            <form>
              <div class="form-group" v-bind:class="errorName !== '' ? 'has-error' : ''">
                <label for="name" class="col-form-label">Nombre:</label>
                <input type="text" class="form-control" id="name" v-model="name">
                <div v-if=errorName class="text-red">
                  <p>{{ errorName }}</p>
                </div>
              </div>

              <div class="form-group">
                <label for="name" class="col-form-label">Descripción:</label>
                <textarea class="form-control" name="notes" id="notes" cols="30" rows="5"
                  v-model="description"></textarea>
              </div>

              <div class="form-group">
                <label for="name" class="col-form-label">Genero:</label>
                <input type="text" class="form-control" id="name" v-model="gender">
              </div>

              <div class="form-group">
                <label for="name" class="col-form-label">Etnia:</label>
                <input type="text" class="form-control" id="name" v-model="ethnic_group">
              </div>

              <div class="form-group">
                <label for="name" class="col-form-label">Edad aparente:</label>
                <input type="text" class="form-control" id="name" v-model="apparent_age">
              </div>
            </form>
          </div>
        </div>
      </div>

      <button slot="footer" type="button" v-show="id != 0" class="btn btn-primary"
        v-on:click="update">Actualizar</button>
      <button slot="footer" type="button" v-show="id == 0" class="btn btn-primary" v-on:click="save">Guardar</button>
    </modal>

    <modal v-if="showModalMaterial" @close="showModalMaterial = false" :iconClasses="['modal-lg']">
      <h3 slot="header">Referencia visual</h3>
      <div slot="body">
        <div class="row">
          <!-- MAP & BOX PANE -->
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
          <div class="col-md-12">
            <div class="form-group">
              <label for="name" class="col-form-label">Nombre:</label>
              <input type="text" class="form-control" id="nameReference" v-model="nameReference">
            </div>
            <div class="form-group" v-if="!isEditMaterial">
              <input type="file" name="materials" class="form-control" id="materials" @change="onFileChange"
                accept="image/*,video/mp4">
            </div>
            <button type="button" class="btn btn-primary" v-on:click="uploadFile"
              v-if="!isEditMaterial">Agregar</button>
            <div class="form-group">
              <button type="button" class="btn btn-primary" v-on:click="updateMaterial"
                v-if="isEditMaterial">Actualizar</button>
              <button type="button" class="btn btn-default" v-on:click="cancelMaterial"
                v-if="isEditMaterial">Cancelar</button>
            </div>
          </div><!-- /.box-footer -->
          <div class="box-footer">
            <ul class="mailbox-attachments clearfix">
              <li v-for="(material) in materials">
                <div v-show="['jpg', 'png', 'jpeg', 'mp4', 'avi', 'PNG', 'jfif'].includes(material.type)">
                  <span class="mailbox-attachment-icon has-img">
                    <img class="reference-visual" v-show="['jpg', 'png', 'jpeg', 'PNG'].includes(material.type)"
                      :src='material.file' :alt="material.name">
                    <video v-show="['mp4', 'avi'].includes(material.type)" :src='material.file' controls
                      width="200px"></video>
                  </span>
                  <div class="mailbox-attachment-info">
                    <div>{{ material.name }}.{{ material.type }}</div>
                    <a class="btn btn-default btn-xs pull-left deleteFile" :id="material.id" @click="deleteFile"><i
                        class="fa fa-trash"></i> Eliminar</a>
                    <span class="mailbox-attachment-size">
                      <a class="btn btn-default btn-xs pull-left editFile" :id="material.id" @click="editFile"><i
                          class="fa fa-edit"></i> Editar</a>
                      &nbsp;
                      <a :href="material.file" class="btn btn-default btn-xs pull-right" @click="downloadFile"
                        :id="material.id"><i class="fa fa-cloud-download"></i> Descargar</a>
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </modal>
  </div>
  <!-- /.col -->
</template>

<script>
import api from '../../../api'
import * as $ from 'jquery'
import toastr from 'toastr'
import Modal from '../../widgets/Modal.vue'
import moment from 'moment'

export default {
  name: 'ModulePersonaje',
  components: {
    Modal
  },
  data() {
    return {
      showModalCharacter: false,
      showModalMaterial: false,
      isPreviewFile: false,
      materials: [],
      file: null,
      previewSrc: { src: '', type: '' },
      characters: [],
      id: 0,
      name: '',
      apparent_age: '',
      description: '',
      ethnic_group: '',
      gender: '',
      errorName: '',
      nameReference: '',
      isEditMaterial: false
    }
  },
  props: {
    idProject: {
      type: Number, // Aquí estamos diciendo que `idProject` debe ser de tipo `Number`.
      default: 0 // Y su valor por defecto será `0`.
    },
    edit: {
      type: Function
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.index()
    })
  },
  methods: {
    showModal() {
      this.showModalCharacter = true
      this.name = ''
      this.id = 0
    },
    update() {
      api
        .request('patch', `projects/${this.idProject}/characters/${this.id}/`, { name: this.name, description: this.description, gender: this.gender, apparent_age: this.apparent_age, ethnic_group: this.ethnic_group }, { Authorization: this.$store.state.token })
        .then(response => {
          console.log(response.data)
          this.alertShow('Actualizacion', 'Se ha actualizado correctamente', 'success', 'fa fa-check')
          $('#tableCharacters').find('tr').removeClass('info')
          $('#closeModalCharacter').trigger('click')
          $('#character' + response.data.id).addClass('info')
          $('#character' + response.data.id).find('td:nth-child(2)').html(response.data.name)
          this.clearForm()
          this.showModalCharacter = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    save() {
      console.log(this.checkForm())
      if (this.checkForm()) {
        return
      }
      api
        .request('post', `projects/${this.idProject}/characters/`, { name: this.name, description: this.description }, { Authorization: this.$store.state.token })
        .then(response => {
          this.alertShow('Guardado', 'Se ha guardado correctamente', 'success', 'fa fa-check')
          const character = response.data
          this.characters.unshift(character)

          this.showModalCharacter = false
          setTimeout(function () {
            $('#character' + character.id).addClass('success')
          }, 500)
          this.clearForm()
        })
        .catch(error => {
          console.log(error)
        })
    },
    clearForm: function () {
      this.id = 0
      this.name = ''
      this.description = ''
      this.gender = ''
      this.apparent_age = ''
      this.ethnic_group = ''
    },
    checkForm: function () {
      this.errorName = ''

      if (this.name === '') {
        this.errorName = 'El nombre es obligatorio.'
      }
      return this.errorName.length > 0
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files
      if (files.length) {
        this.file = files[0]
      }
    },
    deleteFile(e) {
      e.preventDefault()
      console.log(e.target)
      const materialId = e.target.id
      const that = this
      api
        .request('delete', `projects/${this.idProject}/characters/${this.id}/visual-reference/${materialId}/`, {}, { Authorization: this.$store.state.token })
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
    uploadFile() {
      console.log(this.materials)
      if (this.materials.length > 5) {
        this.alertShow('Limite', 'Se alcanzo el limite permitido', 'error', 'fa fa-check')
        return false
      }
      const formData = new FormData()
      formData.append('file', this.file)
      formData.append('name', this.nameReference)
      api
        .request('post', `projects/${this.idProject}/characters/${this.id}/visual-reference/`, formData, { Authorization: this.$store.state.token })
        .then(response => {
          const material = response.data
          this.materials.push({ id: material['id'], file: material['file'], name: material['name'], type: material['file'].split('.').pop() })
          document.getElementById('materials').value = ''
          this.previewSrc.src = ''
          this.previewSrc.type = ''
          this.isPreviewFile = false
          this.alertShow('Guardar', 'Se guardo el material', 'success', 'fa fa-check')
        })
        .catch(error => {
          if (error.response) {
            const errors = error.response.data
            console.log(errors)
          }
        })
    },
    index() {
      api
        .request('get', 'projects/' + this.idProject + '/characters/', {}, { Authorization: this.$store.state.token })
        .then(response => {
          this.characters = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteCharacters(id) {
      api
        .request('delete', `projects/${this.idProject}/characters/${id}/`, {}, { Authorization: this.$store.state.token })
        .then(response => {
          $('#character' + id).remove()
        })
        .catch(error => {
          console.log(error)
        })
    },
    showEdit(character) {
      this.id = character.id
      this.name = character.name
      this.gender = character.gender
      this.ethnic_group = character.ethnic_group
      this.apparent_age = character.apparent_age
      this.showModalCharacter = true
      this.description = character.description
    },
    showMaterial(characterId) {
      this.id = characterId
      api
        .request('get', `projects/${this.idProject}/characters/${characterId}/visual-reference/`, {}, { Authorization: this.$store.state.token })
        .then(response => {
          this.showModalMaterial = true
          this.materials = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    alertShow(title, message, type, iconClass) {
      this.message = message
      this.type = type
      this.title = title
      this.iconClass = iconClass
      toastr[type](message, title)
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
      const materialId = e.target.id
      const that = this
      api
        .request('get', `projects/${this.idProject}/characters/${this.id}/visual-reference/${materialId}/`, {}, { Authorization: this.$store.state.token })
        .then(response => {
          that.idMaterial = response.data.id
          that.nameReference = response.data.name
          that.isEditMaterial = true
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
        .request('patch', `projects/${this.idProject}/characters/${this.id}/visual-reference/${this.idMaterial}/`, { name: this.nameReference }, { Authorization: this.$store.state.token })
        .then(response => {
          console.log(response.data)
          that.cancelMaterial()
          that.showMaterial(that.id)
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
      this.nameReference = ''
    }
  }
}
</script>
<style>
.reference-visual {
  max-width: 100%;
  height: auto;
  background-size: cover;
  width: 50px;
}
</style>
