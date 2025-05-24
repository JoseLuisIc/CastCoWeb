<template>
  <section class="content">
    <div class="row center-block">
      <h2></h2>
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
                  Mostrar <select name="pant_size" class="form-control" id="pant_size" v-model="length"
                    @change="search">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select> entradas
                  <table aria-describedby="example1_info" role="grid" id="tableStates"
                    class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th aria-sort="ascending" style="width: 167px;" colspan="1" rowspan="1" aria-controls="example1"
                          tabindex="0">Code</th>
                        <th>Name</th>
                        <th style="width: 101px;">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="state in states">
                        <td>{{ state.code }} </td>
                        <td>{{ state.name }} </td>
                        <td>
                          <div class="btn-group">
                            <button class="btn delete" v-on:click=confirmDelete(state.id)><i
                                class="fa fa-trash"></i></button>
                            <button class="btn edit" v-on:click=editData(state.id)><i class="fa fa-edit"></i></button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                    <div v-if="states.length === 0">
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
    <modal v-if="showModalDelete" @close="showModalDelete = false" :iconClasses="['modal-md']">
      <h3 slot="header">Eliminar Estado</h3>
      <div slot="body">
        <p>Esta seguro que quiere eliminar el Estado?</p>
      </div>

      <button slot="footer" type="button" class="btn btn-danger" v-on:click="deleteData">Eliminar</button>

    </modal>
    <modal v-if="showModal" @close="showModal = false" :iconClasses="['modal-md']">
      <h3 v-if="isNew" slot="header">Nuevo Estado</h3>
      <h3 v-if="!isNew" slot="header">Actualizar Estado</h3>
      <div slot="body">
        <form>
          <div class="form-group">
            <label for="code" class="col-form-label">Code:</label>
            <input class="form-control" id="code" v-model="state.code" maxlength="3">
          </div>
          <div class="form-group">
            <label for="name" class="col-form-label">Nombre:</label>
            <input class="form-control" id="name" v-model="state.name" />
          </div>

          <div class="form-group">
            <input class="form-control" id="id" type="hidden" v-model="state.id" />
          </div>
        </form>
      </div>
      <button v-if="isNew" slot="footer" type="button" class="btn btn-primary" v-on:click="saveData">Guardar</button>
      <button v-if="!isNew" slot="footer" type="button" class="btn btn-primary"
        v-on:click="updateData(state)">Actualizar</button>
    </modal>

  </section>

</template>
<script>
import toastr from 'toastr'
import api from '../../api'
import Pagination from '../widgets/Pagination.vue'
import Modal from '../widgets/Modal.vue'
// Require needed datatables modules
require('datatables.net')

export default {
  name: 'States',
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
      state: { code: '', name: '' },
      error: { code: '', name: '' },
      table: null,
      states: [],
      showModal: false,
      showModalDelete: false,
      isNew: true,
      errors: {},
      filter: {
        search: ''
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.callData()
    })
  },
  methods: {
    onPageChange(page) {
      this.currentPage = page
      this.callData()
    },
    openModal() {
      this.showModal = true
      this.isNew = true
      this.state = {
        id: 0,
        name: '',
        code: ''
      }
    },
    updateData(pData) {
      api
        .request('put', 'state-handler/' + pData.id + '/', this.state, { Authorization: this.$store.state.token })
        .then(response => {
          this.showModal = false
          this.callData()
          toastr.success('Actualización', 'Se ha actualizado la informacion')
        })
        .catch(error => {
          if (error.response) {
            const errors = error.response.data
            this.error.email = errors.email[0]
          }
        })
    },
    saveData() {
      api
        .request('post', 'state-handler/', this.state, { Authorization: this.$store.state.token })
        .then(response => {
          this.showModal = false
          this.callData()
          toastr.success('Creación', 'Se ha creado el estado')
        })
        .catch(error => {
          if (error.response) {
            const errors = error.response.data
            console.log(errors)
          }
          toastr.error('Creación', 'No se ha creado correctamente')
        })
    },
    editData(id) {
      console.log(id)
      this.isNew = false
      api
        .request('get', 'state-handler/' + id + '/', {}, { Authorization: this.$store.state.token })
        .then(response => {
          this.state = response.data
          this.showModal = true
        })
        .catch(error => {
          if (error.response) {
            const errors = error.response.data
            console.log(errors)
          }
        })
    },
    callData() {
      const params = new URLSearchParams()
      params.append('search', this.filter.search)
      params.append('ordering', 'name')
      params.append('page', this.currentPage)
      params.append('length', this.length)
      api
        .request('get', 'state-handler/?' + params.toString(), {}, { Authorization: this.$store.state.token })
        .then(response => {
          const json = response.data
          this.states = json.results
          this.count = json.count
          this.totalPage = Math.ceil(this.count / this.length)
        })
        .catch(error => {
          if (error.response) {
            const errors = error.response.data
            console.log(errors)
          }
        })
    },
    confirmDelete(id) {
      api
        .request('get', 'state-handler/' + id + '/', {}, { Authorization: this.$store.state.token })
        .then(response => {
          this.state = response.data
          this.showModalDelete = true
        })
        .catch(error => {
          if (error.response) {
            const errors = error.response.data
            console.log(errors)
          }
        })
    },
    deleteData() {
      api
        .request('delete', 'state-handler/' + this.state.id + '/', {}, { Authorization: this.$store.state.token })
        .then(response => {
          this.showModalDelete = false
          toastr.error('Eliminación', 'Se ha eliminado el estado')
          this.callData()
        })
        .catch(error => {
          if (error.response) {
            const errors = error.response.data
            this.error.email = errors.email[0]
          }
        })
    },
    search() {
      this.callData()
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
