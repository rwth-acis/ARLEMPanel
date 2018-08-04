import axios from 'axios'

const workplaceServices = {
  getList (searchObject) {
    return new Promise((resolve) => {
      axios.get(`workplace`).then(response => {
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

export default workplaceServices
