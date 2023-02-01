<template>

  <div class="col-md-3">

    <div class="box box-info">
      <div class="box-header with-border">
        <h3 class="box-title">Entregas</h3>
        <div class="box-tools pull-right">
          <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
        </div>
      </div><!-- /.box-header -->
      <div class="box-body">
        <div class="table-responsive">

          <table class="table table-bordered" id="tableDeliveries">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="delivery in deliveries" :id="'derivery' + delivery.id">
                <td> {{ delivery.id }}</td>
                <td> {{ delivery.name }}</td>
                <td style="widget:100px">
                  <div class="btn-group">
                    <button class="btn delete" v-on:click="deleteDeliveries(delivery.id)"><i
                        class="fa fa-trash"></i></button>
                    <button class="btn edit" v-on:click="showEdit(delivery)"><i class="fa fa-edit"></i></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div><!-- /.table-responsive -->
      </div><!-- /.box-body -->
      <div class="box-footer clearfix">
        <button id="btnModalDelivery" class="btn btn-sm btn-info btn-flat pull-left" data-toggle="modal"
          data-target="#modalDelivery"> <i class="fa fa-plus"></i> Agregar</button>
      </div><!-- /.box-footer -->
    </div><!-- /.box -->
    <div class="modal fade" id="modalDelivery" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Nuevo Entrega</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="closeModalDelivery">
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
import Swal from 'sweetalert2'
import $ from 'jquery'
import toastr from 'toastr'

export default {
  name: 'ModuleDelivery',
  data() {
    return {
      deliveries: [],
      name: '',
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
        .request('patch', `projects/${this.idProject}/deliveries/${this.id}/`, { name: this.name }, { 'Authorization': this.$store.state.token })
        .then(response => {
          console.log(response)
          this.alertShow('Actualizacion', 'Se ha actualizado correctamente', 'success', 'fa fa-check')
          $('#tableDeliveries').find('tr').removeClass('info')
          $('#closeModalDelivery').trigger('click')
          $('#derivery' + response.data.id).addClass('info')
          $('#derivery' + response.data.id).find('td:nth-child(2)').html(response.data.name)
          this.id = 0
          this.name = ''
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
        .request('post', `projects/${this.idProject}/deliveries/`, { name: this.name }, { 'Authorization': this.$store.state.token })
        .then(response => {
          var delivery = response.data
          this.deliveries.unshift(delivery)
          setTimeout(function () {
            $('#derivery' + delivery.id).addClass('success')
          }, 500)
          this.alertShow('Guardar', 'Se guardo correctamente', 'success', 'fa fa-check')
          $('#closeModalDelivery').trigger('click')
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
        .request('get', 'projects/' + this.idProject + '/deliveries/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.deliveries = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteDeliveries(id) {
      Swal.fire({
        title: 'Estas seguro de eliminar?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .request('delete', `projects/${this.idProject}/deliveries/${id}/`, {}, { 'Authorization': this.$store.state.token })
            .then(response => {
              Swal.fire(
                'Eliminacion!',
                'Se ha eliminado.',
                'success'
              )
              $('#derivery' + id).remove()
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    },
    showEdit(delivery) {
      this.id = delivery.id
      this.name = delivery.name
      $('#btnModalDelivery').trigger('click')
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
