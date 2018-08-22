var config = {
  apiKey: "AIzaSyD3ucfrdZAXNrMEF-sHRO0WX7JhqRivCZY",
  authDomain: "animaker-e60e2.firebaseapp.com",
  databaseURL: "https://animaker-e60e2.firebaseio.com",
  projectId: "animaker-e60e2",
  storageBucket: "animaker-e60e2.appspot.com",
  messagingSenderId: "951293181827"
};
firebase.initializeApp(config);

const logout = document.getElementById('logout');
const hiUsername = document.getElementById('HiUsername');

document.addEventListener('DOMContentLoaded', e =>{
var user = firebase.auth().currentUser;

if (user != null) {
  console.log(user)
  console.log(hiUsername)
  var email = user.email;
  email = email.substring(0, email.indexOf('@'))
  hiUsername.innerHTML= "Hi," + " " + email;
}
})


//Logout User
logout.addEventListener('click', e => {
  firebase.auth().signOut().then(function() {
    window.open("login.htm","_self");
  }).catch(function(error) {
    console.log(error.message)
  });
})
