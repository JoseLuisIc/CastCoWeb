<template>
  <div class="col-md-3">

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
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="character in characters" :id="'character' + character.id">
                <td> {{ character.id }}</td>
                <td> {{ character.name }}</td>
                <td style="widget:100px">
                  <div class="btn-group">
                    <button class="btn delete" v-on:click="deleteCharacters(character.id)"><i
                        class="fa fa-trash"></i></button>
                    <button class="btn edit" v-on:click="showEdit(character)"><i class="fa fa-edit"></i></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div><!-- /.table-responsive -->
      </div><!-- /.box-body -->
      <div class="box-footer clearfix">
        <button id="btnModalCharacter" class="btn btn-sm btn-info btn-flat pull-left" data-toggle="modal"
          data-target="#modalCharacter"><i class="fa fa-plus"></i> Agregar</button>
      </div><!-- /.box-footer -->
    </div><!-- /.box -->
    <div class="modal fade" id="modalCharacter" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Nuevo Personaje</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
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
                <input type="text" class="form-control" id="name" v-model="description">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" v-show="id != 0" class="btn btn-primary" v-on:click="update">Actualizar</button>
            <button type="button" v-show="id == 0" class="btn btn-primary" v-on:click="save">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  </div><!-- /.col -->
</template>

<script>
import api from '../../../api'
import * as $ from 'jquery'
import toastr from 'toastr'

export default {
  name: 'ModulePersonaje',
  data() {
    return {
      characters: [],
      name: '',
      description: '',
      id: 0,
      errorName: ''
    }
  },
  props: {
    idProject: 0,
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
    update() {
      api
        .request('patch', `projects/${this.idProject}/characters/${this.id}/`, { name: this.name, description: this.description }, { 'Authorization': this.$store.state.token })
        .then(response => {
          console.log(response.data)
          this.alertShow('Actualizacion', 'Se ha actualizado correctamente', 'success', 'fa fa-check')
          $('#tableCharacters').find('tr').removeClass('info')
          $('#closeModal').trigger('click')
          $('#character' + response.data.id).addClass('info')
          $('#character' + response.data.id).find('td:nth-child(2)').html(response.data.name)
          this.id = 0
          this.name = ''
          this.description = ''
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
        .request('post', `projects/${this.idProject}/characters/`, { name: this.name, description: this.description }, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.alertShow('Guardado', 'Se ha guardado correctamente', 'success', 'fa fa-check')
          var character = response.data
          this.characters.unshift(character)
          setTimeout(function () {
            $('#character' + character.id).addClass('success')
          }, 500)
          $('#closeModal').trigger('click')
          this.id = 0
          this.name = ''
          this.description = ''
        })
        .catch(error => {
          console.log(error)
        })
    },
    checkForm: function () {
      this.errorName = ''

      if (this.name === '') {
        this.errorName = 'El nombre es obligatorio.'
      }
      return this.errorName.length > 0
    },
    index() {
      api
        .request('get', 'projects/' + this.idProject + '/characters/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.characters = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteCharacters(id) {
      api
            .request('delete', `projects/${this.idProject}/characters/${id}/`, {}, { 'Authorization': this.$store.state.token })
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
      this.description = character.description
      $('#btnModalCharacter').trigger('click')
    },
    alertShow(title, message, type, iconClass) {
      this.message = message
      this.type = type
      this.title = title
      this.iconClass = iconClass
      toastr[type](message, title)
    }
  },
  validateName() {
    if (/^[A-Za-z]+$/.test(this.name)) {
      this.errorName = ''
    } else {
      this.errorName = 'ingrese nombre valido'
    }
  }
}
</script>
