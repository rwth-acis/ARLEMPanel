import axios from 'axios'

const workplaceServices = {
  getList (searchObject) {
    return new Promise((resolve) => {
      axios.get(`workplace`, {params: searchObject}).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  get (id, isXML = false) {
    return new Promise((resolve) => {
      axios.get(`workplace/` + id, {
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

  postCreate (objWorkplace, listItems) {
    return new Promise((resolve) => {
      axios.post(`workplace`, {
        'name': objWorkplace.name,
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
    return new Promise((resolve) => {
      axios.delete(`workplace/` + id).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  getEntityList (term) {
    return new Promise((resolve) => {
      axios.get(`entity`, {
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
