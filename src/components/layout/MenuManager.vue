<template>
  <ul class="sidebar-menu">
    <li class="header">Administracion</li>
    <router-link tag="li" class="pageLink" to="/manager/dashboard">
      <a>
        <i class="fa fa-desktop"></i>
        <span class="page">Dashboard</span>
      </a>
    </router-link>

    <li class="treeview" v-bind:class="{ active: isActive }">
      <a href="#">
        <i class="fa fa-users"></i>
        <span class="treeview-title">Usuarios</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li v-bind:class="{ active: slug === 'managers' }">
          <router-link class="pageLink" to="/manager/managers">
            <a>
              <i class="fa fa-user"></i>
              <span class="page">Managers</span>
            </a>
          </router-link>
        </li>
        <!-- <li v-bind:class="{ active: slug === 'admins' }">
          <router-link class="pageLink" to="/manager/managers">
            <a>
              <i class="fa fa-user"></i>
              <span class="page">Administradores</span>
            </a>
          </router-link>
        </li> -->
        <li v-bind:class="{ active: slug === 'talents' }">
          <router-link class="pageLink" to="/manager/talents">
            <a>
              <i class="fa fa-user"></i>
              <span class="page">Talentos</span>
            </a>
          </router-link>
        </li>
        <!-- <li v-bind:class="{ active: slug === 'agencies' }">
          <router-link class="pageLink" to="/manager/agencies">
            <a>
              <i class="fa fa-user"></i>
              <span class="page">Agencias</span>
            </a>
          </router-link>
        </li> -->
      </ul>
    </li>
    <router-link tag="li" class="pageLink" to="/manager/proyects">
      <a>
        <i class="fa fa-list-alt"></i>
        <span class="page">Proyectos</span>
      </a>
    </router-link>
    <!-- <router-link tag="li" class="pageLink" to="/manager/states">
      <a>
        <i class="fa fa-list-alt"></i>
        <span class="page">Estados</span>
      </a>
    </router-link> -->
    <router-link tag="li" class="pageLink" to="/manager/profile">
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
import commonMethods from '../../commons/commonMethods'
export default {
  name: 'MenuManager',
  props: ['slug', 'isActive'],
  mixins: [commonMethods],
  data() {
    return {
      localIsActive: this.isActive
    }
  },
  mounted() {
    if (['admins', 'talents', 'agencies'].includes(this.slug)) {
      this.localIsActive = true
    } else {
      this.localIsActive = false
    }
  }
}
</script>
