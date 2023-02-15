<template>
  <section class="content">
    <div class="row center-block">
      <h2></h2>
      <div class="col-md-12">
        <!-- Custom Tabs -->
        <div class="nav-tabs-custom">
          <ul class="nav nav-tabs">
            <li class="active"><a href="#tab_1" data-toggle="tab"><i class="fa fa-user fa-lg"></i> Postulaciones</a>
            </li>
            <li><a href="#tab_2" data-toggle="tab"><i class="fa fa-star-o fa-lg"></i> Castings</a></li>
            <!-- <li><a href="#tab_3" data-toggle="tab"><i class="fa fa-fa-users fa-lg"> Personajes</a></li> -->
            <li class="pull-right"><a href="#" class="text-muted"><i class="fa fa-gear"></i></a></li>
          </ul>
          <div class="tab-content">
            <div class="tab-pane active" id="tab_1">
              <div class="box">
                <div class="box-header">
                  <h3 class="box-title"></h3>

                </div>
                <!-- /.box-header -->
                <div class="box-body">
                </div>
                <!-- /.box-body -->
              </div>
              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table aria-describedby="example1_info" role="grid" id="tableProyects"
                    class="table table-bordered table-striped dataTable display responsive nowrap">
                    <thead>
                      <tr role="row">
                        <th aria-sort="ascending" colspan="1" rowspan="1" aria-controls="example1" tabindex="0"
                          class="sorting_asc">Usuario</th>
                        <th colspan="1" rowspan="1" class="sorting" tabindex="1">Nombre</th>
                        <th colspan="1" rowspan="1" class="sorting" tabindex="2">Nombre público
                        </th>
                        <th colspan="1" rowspan="1" class="sorting" tabindex="3">Descripción</th>
                        <th colspan="1" rowspan="1" class="sorting" tabindex="4">Personaje</th>
                        <th colspan="1" rowspan="1" class="sorting" tabindex="4"># Entrega</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="application in applications">
                        <td>{{ application.user.first_name }} </td>
                        <td>{{ application.project.name }} </td>
                        <td>{{ application.project.public_name }} </td>
                        <td>{{ application.project.description }} </td>
                        <td><select name="" id="" :value="application.character.id" class="form-control">
                          <option :value="character.id" v-for="character in characters">{{character.name}}</option>
                        </select></td>
                        <td><select name="" id="" class="form-control">
                          <option :value="delivery.id" v-for="delivery in deliveries">{{delivery.name}}</option>
                        </select></td>
                      </tr>
                    </tbody>

                    <!-- <tfoot>
                      <tr>
                        <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                            placeholder="Productora" data-index="0"></th>
                        <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                            placeholder="Nombre" data-index="1"></th>
                        <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                            placeholder="Nombre público" data-index="2"></th>
                        <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                            placeholder="Descripción" data-index="3"></th>
                        <th rowspan="1" colspan="1" class="sorting_disabled"><input type="text" class="form-control"
                            placeholder="Tipo de material" data-index="4">
                        </th>

                      </tr>
                    </tfoot> -->
                  </table>
                  <pagination
                    :totalPages="totalPage"
                    :perPage="length"
                    :currentPage="currentPage"
                    @pagechanged="onPageChange"
                  />
                </div>
              </div>
            </div><!-- /.tab-pane -->
            <div class="tab-pane" id="tab_2">
            </div><!-- /.tab-pane -->
            <!--<div class="tab-pane" id="tab_3">
            </div> /.tab-pane -->
          </div><!-- /.tab-content -->
        </div><!-- nav-tabs-custom -->
      </div>
    </div>
  </section>

</template>

<script>
import $ from 'jquery'
import api from '../../api'

import Pagination from '../widgets/Pagination.vue'
// Datatable Modules
export default {
  name: 'Admins',
  components: {
    Pagination
  },
  data() {
    return {
      totalPage: 1,
      idProject: 0,
      start: 0,
      length: 1,
      page: 1,
      count: 0,
      applications: [],
      currentPage: 1,
      project: [],
      characters: [],
      deliveries: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$route.params.hasOwnProperty('id')) {
        this.fetchProject(this.$route.params.id)
        this.fetchApplications(this.$route.params.id)
      }
    })
  },
  methods: {
    onPageChange(page) {
      this.currentPage = page
      this.fetchApplications()
    },
    fetchApplications(id) {
      var params = new FormData()
      // ?search=&project=7829&character&delivery&user&page_size=10&page=1
      params.append('search', '')
      params.append('project', id)
      params.append('character', '')
      params.append('delivery', '')
      params.append('user', '')
      params.append('page_size', this.length)
      params.append('page', this.currentPage)
      api
        .request('get', `applications/?` + new URLSearchParams(params).toString(), {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          console.log(response)
          var json = response.data
          this.count = json.count
          this.applications = json.results
          this.totalPage = Math.ceil(this.count / this.length)
        })
        .catch(error => {
          if (error.response) {

          }
        })
    },
    fetchProject(idProject) {
      api
        .request('get', 'projects/' + idProject + '/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.project = response.data
          this.characters = response.data.characters
          this.deliveries = response.data.deliveries
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
          }
        })
    },
    confirmDelete(idProject) {
      api
        .request('get', 'projects/' + idProject + '/', {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          this.project = response.data
          $('#btnModalDelete').trigger('click')
        })
        .catch(error => {
          if (error.response) {
            var errors = error.response.data
            console.log(errors)
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

div#tableProyects_filter {
  display: none;
}

th.dt-center,
td.dt-center {
  text-align: center;
}

div.dt-buttons {
  position: relative;
  float: right;
}

li {
  list-style: none;
}
a.disable       {
  pointer-events: none;
}
</style>
