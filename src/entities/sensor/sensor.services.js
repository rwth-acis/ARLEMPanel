import axios from 'axios'

const sensorServices = {
  getList (searchObject) {
    return new Promise((resolve) => {
      axios.get(`sensors`).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  getSingle (id) {

  },

  postCreate (objSensor, listItems) {
    return new Promise((resolve) => {
      axios.post(`sensor/create`, {
        'id': objSensor.id,
        'name': objSensor.name,
        'uri': objSensor.uri,
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
