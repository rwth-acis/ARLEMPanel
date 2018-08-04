import axios from 'axios'

const configurableServices = {
  getList (searchObject) {
    return new Promise((resolve) => {
      axios.get(`configurable`).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  postAppCreate (objApp) {
    return new Promise((resolve) => {
      axios.post(`configurable/app`, {
        'name': objApp.name,
        'type': objApp.type,
        'manifest': objApp.manifest
      }).then(response => {
        if (response) {
          resolve(response)
        }
      })
    })
  },

  postDeviceCreate (objApp) {
    return new Promise((resolve) => {
      axios.post(`configurable/device`, {
        'name': objApp.name,
        'type': objApp.type
      }).then(response => {
        if (response) {
          resolve(response)
        }
      })
    })
  },

  getSingle (id) {

  },

  postCreate (objWorkplace, listItems) {

  },

  putEdit (objWorkplace, listItems) {

  },

  delete (id) {

  }

}

export default configurableServices
