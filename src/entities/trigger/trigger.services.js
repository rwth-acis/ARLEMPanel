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

  get (type, id) {
    return new Promise((resolve) => {
      axios.get(`trigger/` + type + `/` + id).then(response => {
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

  putPredicateUpdate (objTrigger, category) {
    return new Promise((resolve) => {
      axios.put(`trigger/primitive/` + objTrigger.id, {
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

  putPredicateOtherUpdate (objTrigger, category) {
    return new Promise((resolve) => {
      axios.put(`trigger/primitive/` + objTrigger.id, {
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

  putDetectableUpdate (objTrigger) {
    return new Promise((resolve) => {
      axios.put(`trigger/detectable/` + objTrigger.id, {
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

  delete (id, type) {
    return new Promise((resolve) => {
      type = (type === 'warning' || type === 'hazard' || type === 'predicate' ? 'primitive' : 'detectable')
      axios.delete(`trigger/` + type + `/` + id).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  }

}

export default triggerServices
