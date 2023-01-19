import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import TablesView from './components/views/Tables.vue'
import TasksView from './components/views/Tasks.vue'
import SettingView from './components/views/Setting.vue'
import AccessView from './components/views/Access.vue'
import ServerView from './components/views/Server.vue'
import ReposView from './components/views/Repos.vue'
import AdminView from './components/views/Admin.vue'
import TalentView from './components/views/Talent.vue'
import AgencyView from './components/views/Agency.vue'
import ProyectsView from './components/views/Proyects.vue'
import EditProyectView from './components/views/EditProyect.vue'
import ProfileView from './components/views/Profile.vue'
// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {
          requiresAuth: true,
          description: 'Overview of environment'
        }
      }, {
        path: 'tables',
        component: TablesView,
        name: 'Tables',
        meta: { description: 'Simple and advance table in CastCo' }
      }, {
        path: 'tasks',
        component: TasksView,
        name: 'Tasks',
        meta: { description: 'Tasks page in the form of a timeline' }
      }, {
        path: 'setting',
        component: SettingView,
        name: 'Settings',
        meta: { description: 'User settings page' }
      }, {
        path: 'access',
        component: AccessView,
        name: 'Access',
        meta: { description: 'Example of using maps' }
      }, {
        path: 'server',
        component: ServerView,
        name: 'Servers',
        meta: { description: 'List of our servers', requiresAuth: true }
      }, {
        path: 'repos',
        component: ReposView,
        name: 'Repository',
        meta: { description: 'List of popular javascript repos' }
      },
      {
        path: 'admins',
        component: AdminView,
        name: 'Administadores',
        meta: { description: 'Listado de Administradores', requiresAuth: true }
      },
      {
        path: 'talents',
        component: TalentView,
        name: 'Talentos',
        meta: { description: 'Listado de Talentos', requiresAuth: true }
      },
      {
        path: 'agencies',
        component: AgencyView,
        name: 'Agencias',
        meta: { description: 'Listado de Agencias', requiresAuth: true }
      },
      {
        path: 'proyects',
        component: ProyectsView,
        name: 'Proyectos',
        meta: { description: 'Listado de Proyectos', requiresAuth: true }
      },
      {
        path: '/proyects/:id/edit',
        component: EditProyectView,
        name: 'Proyecto',
        meta: { description: 'Editar de Proyecto', requiresAuth: true }
      },
      {
        path: '/proyects/create',
        component: EditProyectView,
        name: 'Proyecto',
        meta: { description: 'Editar de Proyecto', requiresAuth: true }
      },
      {
        path: '/profile',
        component: ProfileView,
        name: 'Perfil',
        meta: { description: 'Editar de Perfil', requiresAuth: true }
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
