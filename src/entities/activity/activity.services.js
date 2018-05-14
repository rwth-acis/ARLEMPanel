import axios from 'axios'

const activityServices = {
  getList (searchObject) {
    return new Promise((resolve) => {
      axios.get(`activities`).then(response => {
        console.log(response)
        if (response) {
          resolve(response.data)
        }
      })
    })
  }
}

export default activityServices
