<template>
  <ul class="sidebar-menu">
    <li class="header">Administracion</li>
    <router-link tag="li" class="pageLink" to="/agency/talents">
      <a>
        <i class="fa fa-user"></i>
        <span class="page">Talentos</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/agency/proyects">
      <a>
        <i class="fa fa-list-alt"></i>
        <span class="page">Proyectos</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/agency/profile">
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
  name: 'MenuAgency',
  props: ['slug', 'isActive'],
  mixins: [commonMethods],
  mounted() {
    if (['admins', 'talents', 'agencies'].includes(this.slug)) {
      this.isActive = true
    } else {
      this.isActive = false
    }
  }
}
</script>
