import axios from 'axios'

const workplaceServices = {
  getList (searchObject) {
    return new Promise((resolve) => {
      axios.get(`workplace`).then(response => {
        console.log(response)
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  getSingle (id) {

  },

  postCreate (objWorkplace, listItems) {
    return new Promise((resolve) => {
      axios.post(`workplace`, {
        'name': objWorkplace.name,
        'category': objWorkplace.category,
        'items': objWorkplace.items
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

  },

  getEntityList (term) {
    return new Promise((resolve) => {
      axios.get(`entities`, {
        params: {
          'term': term
        }
      }).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  }

}

export default workplaceServices
