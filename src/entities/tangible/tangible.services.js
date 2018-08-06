import axios from 'axios'

const tangibleServices = {
  getList (searchObject) {
    return new Promise((resolve) => {
      axios.get(`tangible`).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  getSingle (id) {

  },

  postPersonCreate (objPerson) {
    return new Promise((resolve) => {
      axios.post(`tangible/person`, {
        'name': objPerson.name,
        'twitter': objPerson.twitter,
        'mbox': objPerson.mbox,
        'detectable': objPerson.detectable,
        'persona': objPerson.persona
      }).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  postPlaceCreate (objThing) {
    return new Promise((resolve) => {
      axios.post(`tangible/place`, {
        'name': objThing.name,
        'detectable': objThing.detectable
      }).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  postThingCreate (objThing) {
    return new Promise((resolve) => {
      axios.post(`tangible/thing`, {
        'name': objThing.name,
        'urn': objThing.urn,
        'poi': objThing.pois,
        'detectable': objThing.detectable
      }).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  putEdit (objWorkplace, listItems) {

  },
  delete (id, type) {
    return new Promise((resolve) => {
      axios.delete(`tangible/` + type + `/` + id).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  }

}

export default tangibleServices
