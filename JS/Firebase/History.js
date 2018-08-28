var config = {
  apiKey: "AIzaSyD3ucfrdZAXNrMEF-sHRO0WX7JhqRivCZY",
  authDomain: "animaker-e60e2.firebaseapp.com",
  databaseURL: "https://animaker-e60e2.firebaseio.com",
  projectId: "animaker-e60e2",
  storageBucket: "animaker-e60e2.appspot.com",
  messagingSenderId: "951293181827"
};
firebase.initializeApp(config);

var database = firebase.database();
var uid;

const HiUsername = document.getElementById('HiUsername');
const editHistory = document.getElementById('editHistory');

document.addEventListener('DOMContentLoaded', e =>{
setTimeout(function(){
var user = firebase.auth().currentUser;

if (user != null) {

  uid=firebase.auth().currentUser.uid;



  database.ref('/users/' +uid+'/profile').on('value',function(snapshot) {
  var displayName = (snapshot.val() && snapshot.val().displayName) || 'Anonymous';
  console.log(displayName)
  if(displayName=="Anonymous"){
    var email = user.email;
    email = email.substring(0, email.indexOf('@'))
    HiUsername.innerHTML= "Hi," + " " + email;
  }
  else{
    HiUsername.innerHTML = "Hi," + " " + displayName;
  }
});
}
},2000)
})

editHistory.addEventListener('click', e => {

})
