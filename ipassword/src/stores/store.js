import { observable, action, computed, observe } from 'mobx';
import fire  from '../fire'
import bcrypt from 'bcryptjs'
import Cryptr from 'cryptr'


const cryptr = new Cryptr(process.env.REACT_APP_KEY)

class Store {

  @observable AppPasses = 'empty'
  @observable userList = []

  userFetch = () => {
    fire.database().ref('users').on('value', snap => {
      let temp = []
      snap.forEach(element => {
        temp.push(element.val().username)
      })
      this.userList = temp
    })
  }

  fetch = () => {
    fire.database().ref('AppPasses').on('value', snap => {
      let temp = []
      snap.forEach(element => {
        if(element.val().key === localStorage.getItem('key')) {
          temp.push({
            id: element.key,
            site: element.val().site,
            username: element.val().username,
            password: cryptr.decrypt(element.val().password)
          })
        }
      })
      this.AppPasses = temp
    })
  }

  register = (username, password) => {
    password = bcrypt.hashSync(password, 10)
    fire.database().ref('users').push({
      username,
      password,
    })

    // FIREBASE REGISTER
    // fire.auth().createUserWithEmailAndPassword(username, password).catch(function(error) {
    //   alert(error.message)
    // })
    // callback()
  }

  addAppPass = (site, username, password) => {
    let createdAt = Date.now()
    let updatedAt = Date.now()
    password = cryptr.encrypt(password)
    // console.log(fire.database.ServerValue.TIMESTAMP)
    let key = localStorage.getItem('key')
    fire.database().ref('AppPasses').push({
      site,
      username,
      password,
      key,
      createdAt,
      updatedAt
    })
  }

  updateAppPass = (id, username, password) => {
    let updatedAt = Date.now()
    password = cryptr.encrypt(password)
    fire.database().ref(`AppPasses/${id}`).update({
      username,
      password,
      updatedAt
    })
  }

  deleteAppPass = (id) => {
    const itemRef = fire.database().ref(`/AppPasses/${id}`)
    itemRef.remove()
  }

  logout = () => {
    //FIREBASE LOGOUT
    // fire.auth().signOut().then(function() {
    //   localStorage.clear()
    // }).catch(function(error) {
    //   alert(error.message)
    // })
  }

  login = (username, password, callback) => {
    let isFound = false
    fire.database().ref('users').once('value', function (snapshot) {
      snapshot.forEach(element => {
        let user = element.val()
        if (user.username === username && bcrypt.compareSync(password, user.password)) {
          localStorage.setItem('user', username)
          localStorage.setItem('pass', user.password)
          localStorage.setItem('key', element.key)
          isFound = true
          callback()
        }
      })
      if (!isFound) {
        alert('wrong username or password')
      }
    })

    // FIREBASE AUTH
    // let isFound = true
    // fire.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
    //   alert(error.message)
    //   isFound = false
    //   console.log(isFound)
    // })

    // if (isFound) {
    //   password = bcrypt.hashSync(password, 10)
    //   fire.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //       localStorage.setItem('user', user.email)
    //       localStorage.setItem('pass', password)
    //       localStorage.setItem('key', user.uid)
    //       callback()
    //     } else {
    //       localStorage.clear()
    //     }
    //   })
    // }

  }
}

const singleton = new Store();
export default singleton;