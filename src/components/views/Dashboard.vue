<template>
  <!-- Main content -->
  <section class="content">
    <div class="row">
      <!-- Info boxes -->
      <!-- /.col -->
      <div class="col-md-3 col-sm-6 col-xs-12" v-can="'view_admins'">
        <info-box color-class="bg-black" :icon-classes="['fa', 'fa-user']" text="Administradores" :number="admins"
          link="admins"></info-box>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12" v-can="'view_managers'">
        <info-box color-class="bg-orange" :icon-classes="['fa', 'fa-user']" text="Managers" :number="managers"
          link="managers"></info-box>
      </div>
      <!-- /.col -->
      <div class="col-md-3 col-sm-6 col-xs-12" v-can="'view_talents'">
        <info-box color-class="bg-red" :icon-classes="['fa', 'fa-users']" text="Talentos" :number="talents"
          link="talents"></info-box>
      </div>
      <!-- /.col -->
      <div class="col-md-3 col-sm-6 col-xs-12" v-can="'view_agencies'">
        <info-box color-class="bg-green" :icon-classes="['fa', 'fa-user']" text="Agencias" :number="agencies"
          link="agencies"></info-box>
      </div>
      <!-- /.col -->

      <!-- fix for small devices only -->
      <div class="clearfix visible-sm-block"></div>

      <div class="col-md-3 col-sm-6 col-xs-12" v-can="'view_projects'">
        <info-box color-class="bg-blue" :icon-classes="['fa', 'fa-list-alt']" text="Proyectos" :number="projects"
          link="proyects"></info-box>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12" v-can="'view_postulations'">
        <info-box color-class="bg-yellow" :icon-classes="['fa', 'fa-list-alt']" text="Postulaciones" :number="applications"
          link="proyects"></info-box>
      </div>
    </div>
    <!-- /.row -->

    <div class="col-xs-12" style="display: none;">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title"></h3>
          <div class="box-body">
            <div class="col-sm-6 col-xs-12">
              <p class="text-center">
                <strong>Web Traffic Overview</strong>
              </p>
              <canvas id="trafficBar"></canvas>
            </div>
            <hr class="visible-xs-block">
            <div class="col-sm-6 col-xs-12">
              <p class="text-center">
                <strong>Language Overview</strong>
              </p>
              <canvas id="languagePie"></canvas>
            </div>
          </div>
        </div>
        <div class="text-center">
          <small><b>Pro Tip</b> Don't forget to star us on github!</small>
        </div>
      </div>
    </div>
    <!-- /.row -->

  </section>
  <!-- /.content -->
</template>

<script>
import Chart from 'chart.js'
import Alert from '../widgets/Alert'
import InfoBox from '../widgets/InfoBox'
import ProcessInfoBox from '../widgets/ProcessInfoBox'
import api from '../../api'

export default {
  name: 'Dashboard',
  components: {
    Alert,
    InfoBox,
    ProcessInfoBox
  },
  data() {
    return {
      admins: 0,
      talents: 0,
      agencies: 0,
      projects: 0,
      managers: 0,
      applications: 0,
      generateRandomNumbers(numbers, max, min) {
        var a = []
        for (var i = 0; i < numbers; i++) {
          a.push(Math.floor(Math.random() * (max - min + 1)) + max)
        }
        return a
      }
    }
  },
  methods: {
    getTotal() {
      api.request('get', `dashboard-analytics/`, {}, { 'Authorization': this.$store.state.token })
        .then(response => {
          var json = response.data
          this.admins = json.admins
          this.talents = json.talents
          this.agencies = json.agencies
          this.projects = json.projects
          this.managers = json.managers
          this.applications = json.applications
        })
        .catch(console.log())
    }
  },
  computed: {
    coPilotNumbers() {
      return this.generateRandomNumbers(12, 1000000, 10000)
    },
    personalNumbers() {
      return this.generateRandomNumbers(12, 1000000, 10000)
    },
    isMobile() {
      return (window.innerWidth <= 800 && window.innerHeight <= 600)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getTotal()
      var ctx = document.getElementById('trafficBar').getContext('2d')
      var config = {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
            label: 'CoPilot',
            fill: false,
            borderColor: '#284184',
            pointBackgroundColor: '#284184',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            data: this.coPilotNumbers
          }, {
            label: 'Personal Site',
            borderColor: '#4BC0C0',
            pointBackgroundColor: '#4BC0C0',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            data: this.personalNumbers
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: !this.isMobile,
          legend: {
            position: 'bottom',
            display: true
          },
          tooltips: {
            mode: 'label',
            xPadding: 10,
            yPadding: 10,
            bodySpacing: 10
          }
        }
      }

      new Chart(ctx, config) // eslint-disable-line no-new

      var pieChartCanvas = document.getElementById('languagePie').getContext('2d')
      var pieConfig = {
        type: 'pie',
        data: {
          labels: ['HTML', 'JavaScript', 'CSS'],
          datasets: [{
            data: [56.6, 37.7, 4.1],
            backgroundColor: ['#00a65a', '#f39c12', '#00c0ef'],
            hoverBackgroundColor: ['#00a65a', '#f39c12', '#00c0ef']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: !this.isMobile,
          legend: {
            position: 'bottom',
            display: true
          }
        }
      }

      new Chart(pieChartCanvas, pieConfig) // eslint-disable-line no-new
    })
  }
}
</script>
<style>
.info-box {
  cursor: pointer;
}

.info-box-content {
  text-align: center;
  vertical-align: middle;
  display: inherit;
}

.fullCanvas {
  width: 100%;
}
</style>
