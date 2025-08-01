<template>
  <li class="dropdown user user-menu">
    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
      <!-- The user image in the navbar-->
      <img :src="'https://ui-avatars.com/api/?background=random&name=' + user.displayName" class="user-image"
        alt="User Image">
      <!-- hidden-xs hides the username on small devices so only the image appears. -->
      <span class="hidden-xs">{{(user.displayName)}}</span>
    </a>
    <!-- Account Info and Menu -->
    <ul class="dropdown-menu">
      <li class="user-header" style="height:auto;min-height:85px;padding-bottom:15px;">
        <p>
          <span>{{ user.displayName }}</span>
          <small>{{ getRol(user.roles) }}</small>
          <small>{{ user.email}}</small>
        </p>
      </li>
      <li class="user-footer">
        <a href="javascript:;" v-on:click="profile" class="btn btn-default btn-flat btn-block">
          <i class="fa fa-user"></i>
          <span>Perfil</span>
        </a>
      </li>

      <li class="user-footer">
        <a href="javascript:;" v-on:click="logout" class="btn btn-default btn-flat btn-block">
          <i class="fa fa-sign-out"></i>
          <span>Logout</span>
        </a>
      </li>
    </ul>
  </li>
</template>

<script>
import $ from 'jquery'
import util from '../../utils/util'
import commonMethods from '../../commons/commonMethods'
export default {
  name: 'UserMenu',
  props: ['user'],
  mixins: [commonMethods],
  mounted() {
    $.ajaxSetup({
      headers: { Authorization: this.$store.state.token },
      error: function (x, status, error) {
        console.log(x, status, error)
      }
    })
  },
  methods: {
    getRol(rolId) {
      let rolString = ''
      switch (rolId) {
        case util.AGENCY: rolString = 'Agencia'
          break
        case util.TALENT: rolString = 'Talento'
          break
        case util.ADMIN: rolString = 'Administrador'
          break
          
        case util.MANAGER: rolString = 'Manager'
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
