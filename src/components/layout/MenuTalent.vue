<template>
  <ul class="sidebar-menu">
    <router-link tag="li" class="pageLink" to="/talent/postulates">
      <a>
        <i class="fa fa-list-alt"></i>
        <span class="page">Postulaciones</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/talent/profile">
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
  name: 'MenuTalent',
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
