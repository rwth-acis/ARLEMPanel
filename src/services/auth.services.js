import axios from 'axios'

const authServices = {
  patchSignIn (email, password) {
    return new Promise((resolve) => {
      axios.patch(`signin`, {
        'email': email,
        'password': password
      }).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  postSignUp (name, email, password) {
    return new Promise((resolve) => {
      axios.post(`signup`, {
        'name': name,
        'email': email,
        'password': password
      }).then(response => {
        if (response) {
          resolve(response.data)
        }
      })
    })
  },

  postForgetPassword (email) {
    return new Promise((resolve) => {
      axios.post(`forget`, {
        'email': email
      }).then(response => {
        resolve(response.data)
      })
    })
  },

  postChangePassword (code, newPassword, rePassword) {
    return new Promise((resolve) => {
      axios.patch(`change/${code}`, {
        'password': newPassword,
        'repassword': rePassword
      }).then(response => {
        resolve(response.data)
      })
    })
  }

}

export default authServices
