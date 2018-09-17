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

  get (id, isXML = false) {
    return new Promise((resolve) => {
      axios.get(`activity/` + id, {
        headers: {
          'Content-Type': isXML === true ? 'application/xml' : 'application/json'
        }
      }).then(response => {
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
  },

  delete (id) {
    return new Promise((resolve) => {
      axios.delete(`activity/` + id).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  }
}

export default activityServices
