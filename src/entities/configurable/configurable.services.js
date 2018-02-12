import axios from 'axios'

const configurableServices = {
  getList (searchObject) {
    return new Promise((resolve) => {
      axios.get(`configurables`).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  postAppCreate (objApp) {
    return new Promise((resolve) => {
      axios.post(`configurable/app/create`, {
        'name': objApp.name,
        'manifest': objApp.manifest
      }).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  postDeviceCreate (objApp) {
    return new Promise((resolve) => {
      axios.post(`configurable/device/create`, {
        'name': objApp.name,
        'type': objApp.type
      }).then(response => {
        if (response) {
          resolve(response.data)
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
