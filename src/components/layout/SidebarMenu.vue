<template>
  <ul class="sidebar-menu">
    <li class="header" v-if="user.roles === MANAGER">Administracion</li>
    <router-link tag="li" class="pageLink" to="/admin/dashboard" v-if="user.roles === MANAGER">
      <a>
        <i class="fa fa-desktop"></i>
        <span class="page">Dashboard</span>
      </a>
    </router-link>

    <li class="treeview" v-if="user.roles === MANAGER" v-bind:class="{ active: isActive }">
      <a href="#">
        <i class="fa fa-users"></i>
        <span class="treeview-title">Usuarios</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li v-bind:class="{ active: slug === 'admins' }">
          <router-link class="pageLink" to="/admin/admins" v-if="user.roles === MANAGER">
            <a>
              <i class="fa fa-user"></i>
              <span class="page">Administradores</span>
            </a>
          </router-link>
        </li>
        <li v-bind:class="{ active: slug === 'talents' }">
          <router-link class="pageLink" to="/admin/talents" v-if="user.roles === MANAGER">
            <a>
              <i class="fa fa-user"></i>
              <span class="page">Talentos</span>
            </a>
          </router-link>
        </li>
        <li v-bind:class="{ active: slug === 'agencies' }">
          <router-link class="pageLink" to="/admin/agencies" v-if="user.roles === MANAGER">
            <a>
              <i class="fa fa-user"></i>
              <span class="page">Agencias</span>
            </a>
          </router-link>
        </li>
      </ul>
    </li>
    <router-link tag="li" class="pageLink" to="/agency/talents" v-if="user.roles === AGENCY">
      <a>
        <i class="fa fa-user"></i>
        <span class="page">Talentos</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/admin/proyects" v-if="user.roles === MANAGER">
      <a>
        <i class="fa fa-list-alt"></i>
        <span class="page">Proyectos</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/talent/postulates" v-if="user.roles === TALENT">
      <a>
        <i class="fa fa-list-alt"></i>
        <span class="page">Postulaciones</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/admin/profile" v-if="user.roles === MANAGER">
      <a>
        <i class="fa fa fa-user"></i>
        <span class="page">Perfil</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/agency/profile" v-if="user.roles === AGENCY">
      <a>
        <i class="fa fa fa-user"></i>
        <span class="page">Perfil</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/talent/profile" v-if="user.roles === TALENT">
      <a>
        <i class="fa fa fa-user"></i>
        <span class="page">Perfil</span>
      </a>
    </router-link>
    <li>
      <a href="javascript:;" v-on:click="logout">
        <i class="fa fa-sign-out"></i>
        <span>Cerrar Sesión</span>
      </a>
    </li>
  </ul>
</template>
<script>
import util from '../../utils/util'

export default {
  name: 'SidebarMenu',
  props: ['user'],
  data: function () {
    return {
      MANAGER: util.MANAGER,
      AGENCY: util.AGENCY,
      TALENT: util.TALENT,
      isActive: false,
      slug: this.$route.path.replace('/', '')
    }
  },
  mounted() {
    console.log(this.user)
    if (['admins', 'talents', 'agencies'].includes(this.slug)) {
      this.isActive = true
    } else {
      this.isActive = false
    }
  },
  methods: {
    logout() {
      this.$store.commit('SET_USER', null)
      this.$store.commit('SET_TOKEN', null)

      if (window.localStorage) {
        window.localStorage.setItem('user', null)
        window.localStorage.setItem('token', null)
      }

      this.$router.push('/login')
    },
    getRol(rolId) {
      var rolString = ''
      switch (rolId) {
        case util.AGENCY: rolString = 'Agencia'
          break
        case util.TALENT: rolString = 'Talento'
          break
        case util.MANAGER: rolString = 'Administrador'
          break
      }
      return rolString
    },
    profile() {
      this.$router.push('profile')
    }
  }
}
</script>
<style>
/* override default */
.sidebar-menu>li>a {
  padding: 12px 15px 12px 15px;
}

.sidebar-menu li.active>a>.fa-angle-left,
.sidebar-menu li.active>a>.pull-right-container>.fa-angle-left {
  animation-name: rotate;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
}

.treeview-title {
  z-index: 1;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-90deg);
  }
}
</style>
