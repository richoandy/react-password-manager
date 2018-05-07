import { observable, action, computed, observe } from 'mobx';
import fire  from '../fire'

class Store {

  register = (username, password) => {
    fire.database().ref('users').push({
      username,
      password,
    })
    // fire.auth().createUserWithEmailAndPassword(username, password).catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // ...
    // });
  }

  addAppPass = (site, username, password) => {
    let createdAt = Date.now()
    let updatedAt = Date.now()
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
    fire.database().ref(`AppPasses/${id}`).update({
      username,
      password,
      updatedAt
    })
  }

  deleteAppPass = (id) => {
    const itemRef = fire.database().ref(`/AppPasses/${id}`);
    itemRef.remove();
  }

  login = (username, password) => {
    fire.database().ref('users').once('value', function (snapshot) {
      snapshot.forEach(element => {
        let user = element.val()
        if (user.username === username, user.password === password) {
          alert('login success')
          localStorage.setItem('user', username)
          localStorage.setItem('pass', password)
          localStorage.setItem('key', element.key)
        } else {

        }
      })
    })
  }
}

const singleton = new Store();
export default singleton;