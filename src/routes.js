import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import AdminView from './components/views/Admin.vue'
import TalentView from './components/views/Talent.vue'
import AgencyView from './components/views/Agency.vue'
import ProyectsView from './components/views/Proyects.vue'
import EditProyectView from './components/views/EditProyect.vue'
import ProfileView from './components/views/Profile.vue'
import auth from './components/middleware/auth'
import admin from './components/middleware/admin'
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
        path: '/dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {
          requiresAuth: true,
          description: 'Overview of environment',
          middleware: [auth, admin]
        }
      },
      {
        path: '/admins',
        component: AdminView,
        name: 'Administadores',
        meta: {
          description: 'Listado de Administradores', requiresAuth: true, middleware: [auth, admin]
        }
      },
      {
        path: '/talents',
        component: TalentView,
        name: 'Talentos',
        meta: { description: 'Listado de Talentos', requiresAuth: true, middleware: [auth, admin] }
      },
      {
        path: '/agencies',
        component: AgencyView,
        name: 'Agencias',
        meta: {
          description: 'Listado de Agencias',
          requiresAuth: true,
          middleware: [auth, admin]
        }
      },
      {
        path: '/proyects',
        component: ProyectsView,
        name: 'Proyectos',
        meta: {
          description: 'Listado de Proyectos',
          requiresAuth: true,
          middleware: [auth, admin]
        }
      },
      {
        path: '/proyects/:id/edit',
        component: EditProyectView,
        name: 'Editar',
        meta: {
          description: 'Proyecto',
          requiresAuth: true,
          middleware: [auth, admin]
        }
      },
      {
        path: '/proyects/create',
        component: EditProyectView,
        name: 'Crear',
        meta: {
          description: 'Proyecto',
          requiresAuth: true,
          middleware: [auth, admin]
        }
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
