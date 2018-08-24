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
const profilePasswordReset = document.getElementById('profilePasswordReset')
const saveProfile = document.getElementById('saveProfile');
const profileName = document.getElementById('profileName');
const profileDOB = document.getElementById('profileDOB');


document.addEventListener('DOMContentLoaded', e =>{
setTimeout(function(){
var user = firebase.auth().currentUser;

if (user != null) {
  console.log(user)
  console.log(hiUsername)
  var email = user.email;
  email = email.substring(0, email.indexOf('@'))
  hiUsername.innerHTML= "Hi," + " " + email;
}
},3000)
})


//Logout User
logout.addEventListener('click', e => {
  firebase.auth().signOut().then(function() {
    window.open("login.htm","_self");
  }).catch(function(error) {
    console.log(error.message)
  });
})

//Password Reset
profilePasswordReset.addEventListener('click', e => {
var user = firebase.auth();
var emailAddress = user.currentUser.email;
console.log(emailAddress)

user.sendPasswordResetEmail(emailAddress).then(function() {
  alert("Password reset link sent!")
}).catch(function(error) {
  // An error happened.
});
})

//Logout User
saveProfile.addEventListener('click', e => {
var user = firebase.auth().currentUser;
var profileName_f = profileName.value;
var profileDOB_f = (moment(profileDOB.value).format("DDMMYYYY")).toString();

// Saving DOB in the phonenumber field as Ph num imp is complex

console.log(profileDOB_f)
user.updateProfile({
  
  phoneNumber: "+11234567890",

}).then(function() {
alert("updated Successfully")
}, function(error) {

});

})
