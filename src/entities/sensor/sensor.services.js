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

  getSingle (id) {

  },

  postCreate (objSensor) {
    return new Promise((resolve) => {
      axios.post(`sensor`, {
        'type': objSensor.type,
        'name': objSensor.name,
        'url': objSensor.uri,
        'username': objSensor.username,
        'password': objSensor.password
      }).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  putEdit (objWorkplace, listItems) {

  },

  delete (id) {

  }

}

export default sensorServices
