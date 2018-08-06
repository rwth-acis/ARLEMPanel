import axios from 'axios'

const memberServices = {
  getDashboard () {
    return new Promise((resolve) => {
      axios.get(`dashboard`).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  }

}

export default memberServices
