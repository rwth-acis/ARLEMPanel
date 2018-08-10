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

  get (type, id) {
    return new Promise((resolve) => {
      axios.get(`tangible/` + type + `/` + id).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  postPersonCreate (objPerson) {
    return new Promise((resolve) => {
      axios.post(`tangible/person`, {
        'name': objPerson.name,
        'twitter': objPerson.twitter,
        'mbox': objPerson.mbox,
        'detectable': objPerson.detectableId,
        'persona': objPerson.persona
      }).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  putPersonUpdate (objPerson) {
    return new Promise((resolve) => {
      axios.put(`tangible/person/` + objPerson.id, {
        'name': objPerson.name,
        'twitter': objPerson.twitter,
        'mbox': objPerson.mbox,
        'detectable': objPerson.detectableId,
        'persona': objPerson.persona
      }).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  postPlaceCreate (objPlace) {
    return new Promise((resolve) => {
      axios.post(`tangible/place`, {
        'name': objPlace.name,
        'detectable': objPlace.detectableId
      }).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  putPlaceUpdate (objPlace) {
    return new Promise((resolve) => {
      axios.put(`tangible/place/` + objPlace.id, {
        'name': objPlace.name,
        'detectable': objPlace.detectableId
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
        'detectable': objThing.detectableId
      }).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  putThingUpdate (objThing) {
    return new Promise((resolve) => {
      axios.put(`tangible/thing/` + objThing.id, {
        'name': objThing.name,
        'urn': objThing.urn,
        'poi': objThing.pois,
        'detectable': objThing.detectableId
      }).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
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
