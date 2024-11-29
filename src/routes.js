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
import ProyectsDetailView from './components/views/ProyectDetail.vue'
import PostulateView from './components/views/Postulate.vue'
import StatesView from './components/views/State.vue'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/admin',
    component: DashView,
    children: [
      {
        path: '/admin/dashboard',
        alias: '',
        component: DashboardView,
        name: 'admin/ashboard',
        meta: {
          module: 'Dashboard',
          requiresAuth: true,
          description: 'Overview of environment',
          middleware: [auth, admin]
        }
      },
      {
        path: '/admin/admins',
        component: AdminView,
        name: 'admin/admins',
        meta: {
          module: 'Administadores',
          description: 'Listado de Administradores',
          requiresAuth: true,
          middleware: [auth, admin]
        }
      },
      {
        path: '/admin/talents',
        component: TalentView,
        name: 'admin/talentos',
        meta: {
          module: 'Talentos',
          description: 'Listado de Talentos',
          requiresAuth: true,
          middleware: [auth, admin]
        }
      },
      {
        path: '/admin/agencies',
        component: AgencyView,
        name: 'admin/agencies',
        meta: {
          module: 'Agencias',
          description: 'Listado de Agencias',
          requiresAuth: true,
          middleware: [auth, admin]
        }
      },
      {
        path: '/admin/agencies/talents',
        component: TalentView,
        name: '/admin/agencies/talents',
        meta: {
          module: 'Agencias',
          description: 'Listado de Agencias',
          requiresAuth: true,
          middleware: [auth, admin]
        }
      },
      {
        path: '/admin/agencies/talents/:id',
        component: TalentView,
        name: '/admin/agency/talentos',
        module: 'Talentos',
        meta: { description: 'Listado de Talentos', requiresAuth: true, middleware: [auth] }
      },
      {
        path: '/admin/proyects',
        component: ProyectsView,
        name: 'admin/proyects',
        meta: {
          module: 'Proyectos',
          description: 'Listado de Proyectos',
          requiresAuth: true,
          middleware: [auth, admin]
        }
      },
      {
        path: '/admin/proyects/:id/edit',
        component: EditProyectView,
        name: 'admin/proyects/edit',
        meta: {
          module: 'Editar',
          description: 'Proyecto',
          requiresAuth: true,
          middleware: [auth, admin]
        }
      },
      {
        path: '/admin/proyects/create',
        component: EditProyectView,
        name: 'admin/proyects/create',
        meta: {
          module: 'Crear',
          description: 'Proyecto',
          requiresAuth: true,
          middleware: [auth, admin]
        }
      },
      {
        path: '/admin/proyects/detail/:id',
        component: ProyectsDetailView,
        name: 'admin/proyects/detail',
        meta: {
          module: 'Detalle',
          description: 'Proyecto',
          requiresAuth: true,
          middleware: [auth, admin]
        }
      },
      {
        path: '/admin/profile',
        component: ProfileView,
        name: 'admin/profile',
        meta: {
          module: 'Perfil',
          description: 'Editar de Perfil',
          requiresAuth: true,
          middleware: [auth, admin]
        }
      },
      {
        path: '/admin/states',
        alias: '',
        component: StatesView,
        name: 'admin/states',
        meta: {
          module: 'States',
          requiresAuth: true,
          description: 'Overview of environment',
          middleware: [auth, admin]
        }
      }
    ]
  },
  {
    path: '/agency',
    component: DashView,
    children: [
      {
        path: '/agency/dashboard',
        alias: '',
        component: DashboardView,
        name: 'agency/dashboard',
        module: 'Dashboard',
        meta: {
          requiresAuth: true,
          description: 'Overview of environment',
          middleware: [auth]
        }
      },
      {
        path: '/agency/talents',
        component: TalentView,
        name: 'agency/talentos',
        module: 'Talentos',
        meta: { description: 'Listado de Talentos', requiresAuth: true, middleware: [auth] }
      },
      {
        path: '/agency/talents/:id',
        component: PostulateView,
        name: 'agency/talentos/postulaciones',
        module: 'Talentos',
        meta: { description: 'Listado de Talentos', requiresAuth: true, middleware: [auth] }
      },
      {
        path: '/agency/proyects',
        component: ProyectsView,
        name: 'agency/proyectos',
        module: 'Proyectos',
        meta: {
          description: 'Listado de Proyectos',
          requiresAuth: true,
          middleware: [auth]
        }
      },
      {
        path: '/agency/proyects/:id/edit',
        component: EditProyectView,
        name: 'agency/proyects/edit',
        module: 'Proyectos',
        meta: {
          description: 'Proyecto',
          requiresAuth: true,
          middleware: [auth]
        }
      },
      {
        path: '/agency/proyects/create',
        component: EditProyectView,
        name: 'agency/proyects/create',
        module: 'Crear',
        meta: {
          description: 'Proyecto',
          requiresAuth: true,
          middleware: [auth]
        }
      },
      {
        path: '/agency/proyects/detail/:id',
        component: ProyectsDetailView,
        name: 'agency/proyects/detail',
        module: 'Detalle',
        meta: {
          description: 'Proyecto',
          requiresAuth: true,
          middleware: [auth]
        }
      },
      {
        path: '/agency/profile',
        component: ProfileView,
        name: 'agency/profile',
        module: 'Perfil',
        meta: {
          description: 'Editar de Perfil',
          requiresAuth: true,
          middleware: [auth]
        }
      }
    ]
  },
  {
    path: '/talent',
    component: DashView,
    children: [
      {
        path: '/talent/profile',
        component: ProfileView,
        name: 'talent/profile',
        module: 'Perfil',
        meta: {
          description: 'Editar de Perfil',
          requiresAuth: true,
          middleware: [auth]
        }
      },
      {
        path: '/talent/postulates',
        component: PostulateView,
        name: 'talent/postulates',
        module: 'Perfil',
        meta: {
          description: 'Postulaciones',
          requiresAuth: true,
          middleware: [auth]
        }
      }
    ]
  },
  {
    path: '/',
    redirect: to => {
      // the function receives the target route as the argument
      // we return a redirect path/location here.
      return { path: '/login' }
    }
  },
  {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
