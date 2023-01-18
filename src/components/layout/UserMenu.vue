<template>
  <li class="dropdown user user-menu">
    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
      <!-- The user image in the navbar-->
      <img :src="'https://ui-avatars.com/api/?background=random&name=' + user.displayName" class="user-image"
        alt="User Image">
      <!-- hidden-xs hides the username on small devices so only the image appears. -->
      <span class="hidden-xs">{{(user.displayName || user.email)}}</span>
    </a>
    <!-- Account Info and Menu -->
    <ul class="dropdown-menu">
      <li class="user-header" style="height:auto;min-height:85px;padding-bottom:15px;">
        <p>
          <span>{{ user.displayName }}</span>
          <small>{{ getRol(user.roles) }}</small>
        </p>
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
export default {
  name: 'UserMenu',
  props: ['user'],
  mounted() {
    console.log(this.user)
    $.ajaxSetup({
      headers: { 'Authorization': localStorage.getItem('token') },
      error: function (x, status, error) {
        console.log(x, status, error)
      }
    })
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
    }
  }
}
</script>
