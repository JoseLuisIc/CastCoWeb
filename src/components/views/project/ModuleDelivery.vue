<template>

  <div class="col-md-6 col-lg-6 col-sm-12">

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
        <button id="btnModalDelivery" class="btn btn-sm btn-info btn-flat pull-left" @click="showModal"> <i class="fa fa-plus"></i> Agregar</button>
      </div><!-- /.box-footer -->
    </div><!-- /.box -->
    <modal v-if="showModalDelivery" @close="showModalDelivery = false" :iconClasses="['modal-md']">
      <h3 slot="header">Nuevo Entrega</h3>
      <div slot="body">
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

      <button slot="footer" type="button" v-show="id != 0" class="btn btn-primary" v-on:click="update">Actualizar</button>
      <button slot="footer" type="button" v-show="id == 0" class="btn btn-primary" v-on:click="save">Guardar</button>
    </modal>
  </div><!-- /.col -->
</template>

<script>
import api from '../../../api'
import $ from 'jquery'
import toastr from 'toastr'
import Modal from '../../widgets/Modal.vue'

export default {
  name: 'ModuleDelivery',
  components: {
    Modal
  },
  data() {
    return {
      showModalDelivery: false,
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
    showModal() {
      this.showModalDelivery = true
      this.name = ''
      this.id = 0
    },
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
          this.showModalDelivery = false
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

          this.showModalDelivery = false
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
      api
            .request('delete', `projects/${this.idProject}/deliveries/${id}/`, {}, { 'Authorization': this.$store.state.token })
            .then(response => {
              $('#derivery' + id).remove()
            })
            .catch(error => {
              console.log(error)
            })
    },
    showEdit(delivery) {
      this.id = delivery.id
      this.name = delivery.name
      this.showModalDelivery = true
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
