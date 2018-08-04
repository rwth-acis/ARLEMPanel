import axios from 'axios'

const activityServices = {
  getList (searchObject) {
    return new Promise((resolve) => {
      axios.get(`activity`).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  post (createObject) {
    return new Promise((resolve) => {
      axios.post(`activity`, createObject).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  }
}

export default activityServices
