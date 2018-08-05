import axios from 'axios'

const triggerServices = {
  getList (searchObject) {
    return new Promise((resolve) => {
      axios.get(`trigger`, {params: searchObject}).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  postPredicateCreate (objTrigger, category) {
    return new Promise((resolve) => {
      axios.post(`trigger/primitive`, {
        'name': objTrigger.name,
        'type': objTrigger.type,
        'size': objTrigger.size,
        'url': objTrigger.url,
        'option': objTrigger.option,
        'symbol': objTrigger.symbol,
        'category': category
      }).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  postPredicateOtherCreate (objTrigger, category) {
    return new Promise((resolve) => {
      axios.post(`trigger/primitive`, {
        'name': objTrigger.name,
        'type': objTrigger.type,
        'category': category
      }).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  postDetectableCreate (objTrigger) {
    return new Promise((resolve) => {
      axios.post(`trigger/detectable`, {
        'name': objTrigger.name,
        'type': objTrigger.type,
        'sensor': objTrigger.sensor,
        'url': objTrigger.url
      }).then(response => {
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
