<template>
  <div>
    <menu-admin :isActive=isActive :slug=slug v-if="user.roles === ADMIN"></menu-admin>
    <menu-manager :isActive=isActive :slug=slug v-if="user.roles === MANAGER"></menu-manager>
    <menu-talent :isActive=isActive :slug=slug v-if="user.roles === TALENT"></menu-talent>
    <menu-agency :isActive=isActive :slug=slug v-if="user.roles === AGENCY"></menu-agency>
  </div>
</template>
<script>
import util from '../../utils/util'
import MenuAdmin from './MenuAdmin.vue'
import MenuManager from './MenuManager.vue'
import MenuAgency from './MenuAgency.vue'
import MenuTalent from './MenuTalent.vue'

export default {
  name: 'SidebarMenu',
  props: ['user'],
  components: {
    MenuAdmin,
    MenuManager,
    MenuAgency,
    MenuTalent
  },
  data: function () {
    return {
      ADMIN: util.ADMIN,
      MANAGER: util.MANAGER,
      AGENCY: util.AGENCY,
      TALENT: util.TALENT,
      isActive: false,
      slug: this.$route.path.replace('/', '')
    }
  },
  mounted() {
    if (['admins', 'talents', 'agencies'].includes(this.slug)) {
      this.isActive = true
    } else {
      this.isActive = false
    }
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
