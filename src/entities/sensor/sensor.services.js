import axios from 'axios'

const sensorServices = {
  getList (searchObject) {
    return new Promise((resolve) => {
      axios.get(`sensor`).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  get (id) {
    return new Promise((resolve) => {
      axios.get(`sensor/` + id).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  postCreate (objSensor) {
    return new Promise((resolve) => {
      axios.post(`sensor`, {
        'type': objSensor.type,
        'name': objSensor.name,
        'url': objSensor.url,
        'username': objSensor.username,
        'password': objSensor.password
      }).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  putUpdate (objSensor) {
    return new Promise((resolve) => {
      axios.put(`sensor/` + objSensor.id, {
        'type': objSensor.type,
        'name': objSensor.name,
        'url': objSensor.url,
        'username': objSensor.username,
        'password': objSensor.password
      }).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  delete (id) {
    return new Promise((resolve) => {
      axios.delete(`sensor/` + id).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  }

}

export default sensorServices
