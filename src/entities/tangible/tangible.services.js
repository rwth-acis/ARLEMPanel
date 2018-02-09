import axios from 'axios'

const tangibleServices = {
  getList (searchObject) {
    return new Promise((resolve) => {
      axios.get(`tangibles`).then(response => {
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
      axios.post(`tangible/person/create`, {
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

  putEdit (objWorkplace, listItems) {

  },

  delete (id) {

  }

}

export default tangibleServices
