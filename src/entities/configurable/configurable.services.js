import axios from 'axios'

const configurableServices = {
  getList (searchObject) {
    return new Promise((resolve) => {
      axios.get(`configurable`, {params: searchObject}).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  get (type, id) {
    return new Promise((resolve) => {
      axios.get(`configurable/` + type + `/` + id).then(response => {
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

  putAppUpdate (objApp) {
    return new Promise((resolve) => {
      axios.put(`configurable/app/` + objApp.id, {
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

  putDeviceUpdate (objApp) {
    return new Promise((resolve) => {
      axios.put(`configurable/device/` + objApp.id, {
        'name': objApp.name,
        'type': objApp.type
      }).then(response => {
        if (response) {
          resolve(response)
        }
      })
    })
  },

  delete (id, type) {
    return new Promise((resolve) => {
      axios.delete(`configurable/` + type + `/` + id).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  }

}

export default configurableServices
