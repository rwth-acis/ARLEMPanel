import axios from 'axios'

const triggerServices = {
  getList (searchObject) {
    return new Promise((resolve) => {
      axios.get(`triggers`, {params: searchObject}).then(response => {
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

export default triggerServices
