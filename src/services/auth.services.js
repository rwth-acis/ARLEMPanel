import axios from 'axios'

const authServices = {
  postSignIn (email, password) {
    return new Promise((resolve) => {
      axios.patch(`signin`, {
        'email': email,
        'password': password
      }).then(response => {
        resolve(response.data)
      }).catch(error => {
        console.log(error)
      })
    })
  },

  postSignUp (name, email, password) {

  },

  postForgetPassword (email) {

  },

  postChangePassword (newPassword) {

  }

}

export default authServices
