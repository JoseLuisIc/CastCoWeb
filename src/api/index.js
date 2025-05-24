import axios from 'axios'
import config from '../config'
import { can } from '../commons/functions'
import toastr from 'toastr'

export default {
  request(method, uri, data = null, headers = {}, permission) {
    if (!method) {
      console.error('API function call requires method argument')
      return
    }

    if (!uri) {
      console.error('API function call requires uri argument')
      return
    }
    if (permission && !can(permission)) {
      console.error('No tienes permiso para realizar esta acción:', permission)
      toastr.error('Acceso denegado', 'No tienes permiso para realizar esta acción.')
      return Promise.reject(new Error('Permiso denegado'))
    }
    const url = config.serverURI + uri
    return axios({ method, url, data, headers })
  }
}
