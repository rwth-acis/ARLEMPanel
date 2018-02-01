import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8080'

const authServices = {
  postSignIn (email, password) {

  },

  postSignUp (name, email, password) {

  },

  postForgetPassword (email) {

  },

  postChangePassword (newPassword) {

  }

}

export default authServices
