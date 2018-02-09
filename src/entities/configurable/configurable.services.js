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
