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
var inTime_f=null, outTime_f=null;
var uid;

const logout = document.getElementById('logout');
const hiUsername = document.getElementById('HiUsername');
const profilePasswordReset = document.getElementById('profilePasswordReset')
const saveProfile = document.getElementById('saveProfile');
const profileName = document.getElementById('profileName');
const profileDOB = document.getElementById('profileDOB');
const inOut = document.getElementById('in-out');
const inTime = document.getElementById('inTime');
const outTime = document.getElementById('outTime');
const HiUsername=document.getElementById('HiUsername');

document.addEventListener('DOMContentLoaded', e =>{
setTimeout(function(){
var user = firebase.auth().currentUser;

if (user != null) {
  console.log(user)
  console.log(hiUsername)
  var email = user.email;
  email = email.substring(0, email.indexOf('@'))
  hiUsername.innerHTML= "Hi," + " " + email;
  uid=firebase.auth().currentUser.uid;
  var todayDate = moment(new Date()).format("DD-MM-YYYY")
  database.ref('/users/' +uid+'/attendance/'+todayDate).on('value',function(snapshot) {
  var in_time = (snapshot.val() && snapshot.val().inTime) || 'Anonymous';
  var out_time = (snapshot.val() && snapshot.val().outTime) || 'Anonymous';
  if(in_time!="Anonymous")
  inTime.innerHTML=in_time;
  else {
    inTime.innerHTML=" "
  }
  if(out_time!="Anonymous")
  outTime.innerHTML=out_time;
  else {
    outTime.innerHTML=" "
  }

  database.ref('/users/' +uid+'/profile').on('value',function(snapshot) {
  var displayName = (snapshot.val() && snapshot.val().displayName) || 'Anonymous';
  console.log(displayName)
  if(displayName=="Anonymous"){
    var email = user.email;
    email = email.substring(0, email.indexOf('@'))
    hiUsername.innerHTML= "Hi," + " " + email;
  }
  else{
    hiUsername.innerHTML = "Hi," + " " + displayName;
  }
});
  })
}
},2000)
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
var profileDOB_f = (moment(profileDOB.value).format("DD/MM/YYYY")).toString();

user.updateProfile({
  displayName: profileName_f,
}).then(function() {
  var todayDate = moment(new Date()).format("DD/MM/YYYY");
  database.ref('users/' + uid + '/profile').set({
    displayName: profileName_f,
    dateOfBirth: profileDOB_f
  },function(error) {
  if (error) {
    alert("NOt Saved")
  } else {
    alert("Saved")
  }

})
}, function(error) {

});
});

inOut.addEventListener('change', e => {
  var todayDate = moment(new Date()).format("DD-MM-YYYY");
if(inTime_f==null){
  inTime_f=moment(new Date()).format("HH:mm")
  database.ref('users/'+uid+'/attendance/'+todayDate).set({
    inTime: inTime_f,
    outTime: " "
  },function(error){
    if (error) {

  }else{

  }
})
}
else{
  outTime_f=moment(new Date()).format("HH:mm")
  database.ref('users/'+uid+'/attendance/'+todayDate).set({
    inTime: inTime_f,
    outTime: outTime_f
  },function(error){
    if (error) {

  }else{

  }
})
}
});
